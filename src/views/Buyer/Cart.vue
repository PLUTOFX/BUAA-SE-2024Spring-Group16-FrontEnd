<template>
	<div class="cart-container">  
      <el-table :data="cartList" style="width: 100%">
		<el-table-column width="180">  
          <template #default="{ row }">  
            <el-checkbox @click="selectFromCart(row.cid)"></el-checkbox> 
          </template>  
        </el-table-column>  
        <el-table-column prop="productImageBig" label="" width="180">
			<template #default="scope">
            <el-image :src="scope.row.productImageBig"></el-image>
            </template>
		</el-table-column>  
        <el-table-column prop="productName" label="商品名称" width="180"></el-table-column>  
        <el-table-column prop="salePrice" label="价格" width="180"></el-table-column>  
        <el-table-column prop="quantity" label="数量" width="180">  
          <template #default="{ row }">  
            <el-input-number v-model="row.quantity" :min="1" @change="handleQuantityChange(row)"></el-input-number>  
          </template>  
        </el-table-column>  
        <el-table-column prop="total" label="总价" width="180"></el-table-column>   
        <el-table-column width="180">  
          <template #default="{ row }">  
            <el-button @click="removeFromCart(row.cid)">删除</el-button> 
          </template>  
        </el-table-column>  
      </el-table>  
      <div class="cart-footer">
		<div>总价：{{ totalPrice }}</div>
		<div>收件人：{{ esname }}</div>
		<div>地址：{{ esaddress }}</div>
		<div>联系电话：{{ esphone }}</div>
		<el-button @click="dialogVisible=true">选择地址</el-button>
        <el-button type="primary" @click="checkout">结算</el-button>
		<el-dialog v-model="dialogVisible" class="address-select">
	       <el-table :data="addresses" style="width: 100%;">
			<el-table-column prop="name" label="收件人" width="180"></el-table-column>
			<el-table-column prop="address" label="地址"></el-table-column>
		    <el-table-column prop="phone" label="联系电话" width="180"></el-table-column>
			<el-table-column>
				<template #default="{row}">
					<el-button @click="selectAddress(row.name,row.address,row.phone)">选择</el-button>
				</template>
			</el-table-column>
		   </el-table>
           <el-button @click="dialogVisible = false">取 消</el-button>  
        </el-dialog>
      </div>
	</div> 
</template>

<script>
import {getAddress} from '../../api/apis.js'
import Postcard from '../../assets/postcard.jpg'
import Postcard2 from '../../assets/postcard2.jpg'
export default {

	data() {
		return {
			Postcard,
			Postcard2,
			cartList: [],
			getGoodsUrl: '',
			name:'未选择',
			address:'未选择',
			phone:'未选择',
			addresses:[],
			dialogVisible: false,
			isSelectAddress:false,
			isSelectGood:false,
			selectedGoods:[],
		}
	},
	computed: {  
    // 使用计算属性来计算price的总和  
    totalPrice() {  
      // 使用reduce方法来累加price的值  
      return this.selectedGoods.reduce((total, item) => {  
        return total + item.total;  
      }, 0); // 初始值设为0  
    },  
    },
	methods: {
		selectAddress(name,ad,phone){
			this.esname=name;
			this.esaddress=ad;
			this.esphone=phone;
			this.isSelectAddress=true;
			this.dialogVisible=false;
		},
		getAddress,
		getAllAddressesRequest() {
			this.addresses = [
				{
                    aid:1,
					name: "3",
					phone: 11451419198,
					address: "北京市海淀区学院路37号北京航空航天大学",
				},
                {
                    aid:2,
					name: "2",
					phone: 22225555333,
					address: 114514.19,
				},
                {
                    aid:3,
					name: 'Test Goods',
					phone: 3333,
					address: 114514.19,
				},
			];
			getAddress().then((res) => {
				console.log(res);
				if (res.status === '200') {
					this.addresses = res.data
				} else {
					if (res.statusText) {
						ElMessage.error(res.statusText);
					} else {
						ElMessage.error('未知错误, Status: ' + res.status);

					}
				}
			});
		},
		selectFromCart(cid){
		if(this.selectedGoods.find(item => item.cid === cid) === undefined)	
			this.selectedGoods.push(this.cartList.find(item =>item.cid===cid));
		else
		    this.selectedGoods=this.selectedGoods.filter(item => item.cid !== cid);
		},
		getAllGoods() {
			// axios.get(this.getGoodsUrl, {
			// 	headers: { 'Content-Type': 'application/json'}
			// }).then(res => {
			// 	this.goods = res.data;
			// })
			this.cartList = [
				{
					cid: 1,
					productName: 'Test Goods',
					productImageBig: this.Postcard,
					salePrice: 20.19,
                    quantity:10,
					total:201.9,
				},
				{
					cid: 2,
					productName: 'Test Goods 2',
					productImageBig: this.Postcard2,
					salePrice: 11.19,
                    quantity:20,
					total:223.8,
				},
				{
					cid: 3,
					productName: 'Test Goods 3',
					productImageBig: this.Postcard,
					salePrice: 10.4,
                    quantity:15,
					total:156,
				},
				{
					cid: 4,
					productName: 'Test Goods 4',
					productImageBig: this.Postcard,
					salePrice: 10.3,
                    quantity:16,
					total:164.8,
				},
				{
					cid: 5,
					productName: 'Test Goods 4',
					productImageBig: this.Postcard,
					salePrice: 10.1,
                    quantity:20,
					total:202,
				},
			];
			
		},
      handleQuantityChange(item) {  
        item.total = item.salePrice * item.quantity;
      },  
      removeFromCart(id) {  
        this.cartList = this.cartList.filter(item => item.cid !== id);
		this.selectedGoods=this.selectedGoods.filter(item => item.cid !== id);  
      },  
      checkout() {  
        if(this.selectedGoods.length===0)
		  alert("请选择要购买的商品");
		else if(this.isSelectAddress==false)
		  alert("请选择地址");
		else{
			this.$router.push({path:'/Comment'});
			alert("购买成功");
		}
      },
	},
	mounted() {
		this.getAllGoods();
		this.getAllAddressesRequest();
	}

}
</script>

<style lang="scss" scoped>
.carousel {
	// background-color: var(--ep-color-warning-light-3);
	margin-left: 20%;
	margin-right: 20%;
}

.text {
	// color: #ffffff;
	opacity: 0.9;
	line-height: 200px;
	margin: 0;
	text-align: center;
}


.img-item {
	display: flex;
	flex-direction: column;
}
.cart-container{
	width:100%;
	text-align: center;
}
.cart-footer {  
    margin-top: 60px;  
    text-align: right;
	color:grey;
	font-size: large;
	line-height: 40px;  
  }
.total-price{
	text-align: center;
	margin-top: 20px;
	color:gray;
	font-size:30px;
	vertical-align: bottom;
}
.address-select{
	width: 100%; 
    text-align: left;
	font-size: large;
}  
</style>
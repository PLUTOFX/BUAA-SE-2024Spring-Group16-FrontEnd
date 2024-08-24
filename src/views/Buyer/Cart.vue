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
            <el-input-number v-model="row.quantity" :min="1" :max="findInventory(row.pid)" @change="handleQuantityChange(row)"></el-input-number> 
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
import {getAddress,getCartList,getInventory,afterbuy,remove_cart} from '../../api/apis.js'
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
			inventories:[],
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
		findInventory(id){
			return this.inventories.find(item => item.pid===id).inventory;
		},
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
		getInventory,
		getInventoryRequest(){
			this.inventories=[
				{
					pid:1,
					inventory:12,
				},
				{
					pid:2,
					inventory:4,
				},
				{
					pid:3,
					inventory:5,
				},
				{
					pid:4,
					inventory:10,
				},
				{
					pid:5,
					inventory:11,
				}
			];
			getInventory().then((res) => {
				console.log(res);
				if (res.status === '200') {
					this.inventories = res.data
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
		getCartList,
		getAllGoods() {
			this.cartList = [
				{
					cid: 1,
					pid:1,				
					productName: 'Test Goods',
					productImageBig: this.Postcard,
					salePrice: 20.19,
                    quantity:1,
					total:20.19,
				},
				{
					cid: 2,
					pid:2,
					productName: 'Test Goods 2',
					productImageBig: this.Postcard2,
					salePrice: 11.19,
                    quantity:1,
					total:11.19,
				},
				{
					cid: 3,
					pid:3,
					productName: 'Test Goods 3',
					productImageBig: this.Postcard,
					salePrice: 10.4,
                    quantity:1,
					total:10.4,
				},
				{
					cid: 4,
					pid:4,
					productName: 'Test Goods 4',
					productImageBig: this.Postcard,
					salePrice: 10.3,
                    quantity:1,
					total:10.3,
				},
				{
					cid: 5,
				    pid:5,
					productName: 'Test Goods 4',
					productImageBig: this.Postcard,
					salePrice: 10.1,
                    quantity:1,
					total:10.1,
				},
			];
			getCartList().then((res) => {
				console.log(res);
				if (res.status === '200') {
					this.cartList = res.data
				} else {
					if (res.statusText) {
						ElMessage.error(res.statusText);
					} else {
						ElMessage.error('未知错误, Status: ' + res.status);

					}
				}
			});
			
		},
      handleQuantityChange(item) {  
        item.total = item.salePrice * item.quantity;
      }, 
	  remove_cart, 
      removeFromCart(id) {  
        this.cartList = this.cartList.filter(item => item.cid !== id);
		this.selectedGoods=this.selectedGoods.filter(item => item.cid !== id);
		remove_Cart(id).then(res => {
            console.log(res);
            if (res.status === '200') {
              ElMessage.success(res.statusText);
            } else {
              if (res.statusText) {
                ElMessage.error(res.statusText);
              } else {
                ElMessage.error('未知错误, Status: ' + res.status);

              }
            }
          }).catch(error => {
            if (error.response) {
              // 请求已发出，但服务器响应了状态码不在2xx范围内
              console.error('Error status', error.response.status);
              console.error('Error data', error.response.data);
            } else if (error.request) {
              // 请求已发出，但没有收到响应
              console.error('No response received', error.request);
            } else {
              // 请求配置时出现错误
              console.error('Error', error.message);
            }
          });
      },
	  afterbuy,  
      checkout() {  
        if(this.selectedGoods.length===0)
		  alert("请选择要购买的商品");
		else if(this.isSelectAddress==false)
		  alert("请选择地址");
		else{
			afterbuy(this.selectedGoods).then(res => {
            console.log(res);
            if (res.status === '200') {
              ElMessage.success(res.statusText);
            } else {
              if (res.statusText) {
                ElMessage.error(res.statusText);
              } else {
                ElMessage.error('未知错误, Status: ' + res.status);

              }
            }
          }).catch(error => {
            if (error.response) {
              // 请求已发出，但服务器响应了状态码不在2xx范围内
              console.error('Error status', error.response.status);
              console.error('Error data', error.response.data);
            } else if (error.request) {
              // 请求已发出，但没有收到响应
              console.error('No response received', error.request);
            } else {
              // 请求配置时出现错误
              console.error('Error', error.message);
            }
            });
			this.selectedGoods.length=0;
			this.$router.push({path:'/Comment'});
			alert("购买成功");
		}
      },
	},
	mounted() {
		this.getInventoryRequest();
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
	text-align: left;
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
<template>
  <div class="shop-detail">
    <div class="shop-info-box">
      <h1>{{ shop.shopName }}</h1>
      <el-button v-if="!isSubscribed" type="info" @click="subscribeShopRequest"> 关注店铺 </el-button>
      <el-button v-else type="primary" @click="cancelSubscribingShopRequest"> 取消关注店铺 </el-button>
      <h3>粉丝数 {{ shop.shopSubscriberCount }}</h3>
      <h3>总销量 {{ shop.shopSaleCount }}</h3>
    </div>
    <div class="img-item">
      <el-tabs class="w">
        <el-tab-pane label="热门商品">
          <div class="goods-box w">
            <template v-for="(item, i) in goods" :key="i">
              <GoodsCard v-if="item.isHot" :productID="item.pid" :productName="item.name"
                :productImageBig="item.imageSrc" :salePrice="item.price" />
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他商品">
          <div class="goods-box w">
            <template v-for="(item, i) in goods" :key="i">
              <GoodsCard v-if="!item.isHot" :productID="item.pid" :productName="item.name"
                :productImageBig="item.imageSrc" :salePrice="item.price" />
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- <el-pagination
						v-if="!noResult&&!error"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[8, 20, 40, 80]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total">
					</el-pagination> -->
    </div>
  </div>
</template>

<script>
import { getShopDetail, getShopProducts, subscribeShop, cancelSubscribingShop, checkShopSubscribed } from '../../api/apis';
import { ElMessage } from 'element-plus'
import Postcard from '../../assets/postcard.jpg'
import Postcard2 from '../../assets/postcard2.jpg'

export default {

  name: 'SrcShopDetail',

  data() {
    return {
      goods: [],
      shop: {},
      isSubscribed: false,
      Postcard,
      Postcard2,
    };
  },

  mounted() {
    // 顺序不能换
    this.getShopInfo();
    this.checkShopSubscribedRequest();
    this.getShopProductsRequest();
  },

  methods: {
    getShopDetail,
    getShopProducts,
    subscribeShop,
    cancelSubscribingShop,
    checkShopSubscribed,
    getShopInfo() {
      console.log(localStorage.getItem('loginUserName'));
      this.shop.shopId = this.$route.params.shopId;
      // console.log(this.shop.shopId);
      // this.shop = {
      //   shopId: -1,
      //   shopName: 'Bemani Sound Team',
      //   shopSubscriberCount: 1000,
      //   shopSaleCount: 2000,
      // }
      getShopDetail({ sid: this.shop.shopId }).then(res => {
        if (res.stateCode) {
          console.log(res.data);
          this.shop = res.data;
          // shopId赋值两遍是为了防止从后端拿完数据后覆盖掉
          this.shop.shopId = this.$route.params.shopId;
        } else {
          if (res.stateMsg) {
            ElMessage.error(res.stateMsg);
          } else {
            ElMessage.error('未知错误, Status: ' + res.stateCode);

          }
        }
      });
    },
    getShopProductsRequest() {
      this.shop.shopId = this.$route.params.shopId;
      console.log(this.shop.shopId);
      getShopProducts({ sid: this.shop.shopId }).then(res => {
        if (res.stateCode) {
          console.log(res.data);
          this.goods = res.data;
        } else {
          if (res.stateMsg) {
            ElMessage.error(res.stateMsg);
          } else {
            ElMessage.error('未知错误, Status: ' + res.stateCode);
          }
        }
      });
    },
    subscribeShopRequest() {
      subscribeShop({ username: localStorage.getItem('loginUserName'), sid: this.shop.shopId }).then(res => {
        if (res.stateCode == '200') {
          ElMessage.success('关注店铺成功');
          this.isSubscribed = true;
        } else {
          if (res.stateMsg) {
            ElMessage.error(res.stateMsg);
          } else {
            ElMessage.error('未知错误, Status: ' + res.stateCode);

          }
        }
      });
      this.checkShopSubscribedRequest();
    },
    cancelSubscribingShopRequest() {
      cancelSubscribingShop({ username: localStorage.getItem('loginUserName'), sid: this.shop.shopId }).then(res => {
        if (res.stateCode == '200') {
          ElMessage.success('取消关注店铺成功');
          this.isSubscribed = false;
        } else {
          if (res.stateMsg) {
            ElMessage.error(res.stateMsg);
          } else {
            ElMessage.error('未知错误, Status: ' + res.stateCode);
          }
        }
      });
      this.checkShopSubscribedRequest();
    },
    checkShopSubscribedRequest() {
      checkShopSubscribed({ username: localStorage.getItem('loginUserName'), sid: this.shop.shopId }).then(res => {
        if (res.stateCode == '200') {
          console.log(res.data);
          this.isSubscribed = res.data;
        } else {
          if (res.stateMsg) {
            ElMessage.error(res.stateMsg);
          } else {
            ElMessage.error('未知错误, Status: ' + res.stateCode);
          }
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.shop-detail {
  width: 1700px;
  margin: 3% auto;
  display: flex;
}

.goods-box {
  >div {
    float: left;
    border: 1px solid var(--ep-color-info-light-8);
  }
}

.img-item {
  width: 83.3%;
  display: flex;
  flex-direction: column;
}

.shop-info-box {
  background-color: var(--ep-fill-color-light);
  float: left;
  border: 1px solid var(--ep-color-info-light-8);
  width: 20%;
  text-align: center;
  height: 100%;
  /* margin-right: 16.7%; */

  h3 {
    color: var(--ep-color-warning)
  }
}
</style>
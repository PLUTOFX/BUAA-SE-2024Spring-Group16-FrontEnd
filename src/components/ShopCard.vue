<template>
	<!-- 展示用的商品卡片 -->
	<div class="shop-item" @click="openShop">
		<div class="good-img">
			<!-- <a @click="openShop(shopId)">
				<img :src="productImageBig" :alt="productName" :key="productImageBig">
			</a> -->
			<h6 class="good-title">{{ shopName }}</h6>
			<div class="shop-goodsImage">
				<el-row>
					<template v-for="(goods, i) in shopGoodsImage" :key="i">
						<el-col :span=12>
							<el-image fit="cover" :src="goods" style="margin: 5%"/>
						</el-col>
					</template>
				</el-row>
			</div>
			<div class="shop-bottom">
				<el-row>
					<el-col :span="12">粉丝数 {{ shopSubscriberCount }}</el-col>
					<el-col :span="12">总销量 {{ shopSaleCount }}</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['shopId', 'shopName', 'shopGoodsImage', 'shopSubscriberCount', 'shopSaleCount'],
	methods: {
		openShop() {
			
			this.$router.replace({ path: '/ShopDetail/' + this.shopId });
			// this.goodsDetails(id);
			// window.open('//' + window.location.host + '/goodsDetail?shopId=' + id)
		},
	},
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../styles/custom/mixin";
// @import "../styles/theme";

.shop-item {
	background-color: var(--ep-color-danger-light-9);
	width: 25%;
	transition: all .5s;
	height: 430px;

	&:hover {
		transform: translateY(-3px);
		box-shadow: 1px 1px 20px #999;

		.good-price p {
			display: none;
		}

		.ds {
			display: flex;
		}
	}

	.ds {
		@extend %block-center;
		width: 100%;
		display: none;
	}

	.shop-goodsImage {
		padding: 5%;

	}

	.good-title {
		line-height: 1.4;
		font-size: 20px;
		margin: 5% auto;
		padding: 0 14px;
		text-align: center;
		overflow: hidden;
	}

	.shop-bottom {
		text-align: center;
		font-size: 18px;
		color: var(--ep-color-primary);
	}
}
</style>
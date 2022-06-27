<template>
	<view>
		<!-- 购物车标题部分 -->
		<view class="title">
			<uni-icons type="shop-filled" size="22"></uni-icons>
			<text>购物车</text>
		</view>
		<!-- 列表部分 -->
		<uni-list>
			<uni-list-item class="goods-list" v-for="goods in cartList" :key="goods.goods_id">
				<!-- 选择部分 -->
				<template v-slot:header>
						<label class="radio">
							<radio value="2" color="red" :checked="isCheck"/>
						</label>
				</template>
				<!-- 商品图片 -->
				<template v-slot:body>
					<view class="goods_img">
						<img :src="goods.goods_smail_logo" alt="">
					</view>
				</template>
				<!-- 商品信息 -->
				<template v-slot:footer>
					<view class="goods-info">
						<text>{{goods.goods_name}}</text>
						<view class="footer">
							<view class="goods-price">{{goods.goods_price}}</view>
							<view class="goods-count"></view>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import tabbarBadge from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [tabbarBadge],
		data() {
			return {
				isCheck: false
			};
		},
		methods: {
			
		},
		
		computed: {
			...mapState('cart',['cartList']),		
		}
	}
</script>

<style lang="scss" scoped>
 .title {
	 display: flex;
	 padding-left: 10rpx;
	 height: 80rpx;
	 align-items: center;
	 border-bottom: 1rpx solid #efefef;
	 text {
		 margin-left: 20rpx;
	 }
 }
 
 .goods-list {
	 display: flex;
 }
</style>

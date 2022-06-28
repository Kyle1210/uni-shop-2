<template>
	<view class="settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="red" :checked="isAllCheck" @click="radioClickHandle"/><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="total">
			<text>合计:</text>
			<text class="price"> ￥{{cartPrice}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle">
			结算({{cartCountStr}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapState,mapMutations} from 'vuex'
	export default {
		name:"Settle",
		data() {
			return {
				
			};
		},
		
		methods: {
			...mapMutations('cart',['SET_GOODS_ALLSTATUS']),

			// 点击全选框,修改所有商品的选中状态
			radioClickHandle() {
				this.SET_GOODS_ALLSTATUS(!this.isAllCheck)
			}
		},
		
		computed: {
			...mapGetters('cart',['cartCountStr','cartPrice']),
			...mapState('cart',['cartList']),
			
			// 用于控制全选状态
			isAllCheck() {
				// 循环遍历购物车，只要所有商品都是勾选状态，那么直接让全选框选中
				// 一假则false
				return this.cartList.every(item => item.goods_status)
			}
		}
	}
</script>

<style lang="scss" scoped>
 .settle-container {
	 position: fixed;
	 bottom: 0;
	 left: 0;
	 width: 100%;
	 height: 100rpx;
	 background-color: white;
	 z-index: 999;
	 display: flex;
	 justify-content: space-between;
	 align-items: center;
	 padding-left: 20rpx;
	 .radio {
		 display: flex;
		 align-items: center;
	 }
	 
	 .total {
		 .price {
			 color: red;
		 }
	 }
	 
	 .btn-settle {
		 color: #FFFFFF;
		 background-color: red;
		 height: 100%;
		 line-height: 100rpx;
		 padding: 0 20rpx;
		 min-width: 200rpx;
		 text-align: center;
		 margin-right: 10rpx;
	 }
 }
</style>
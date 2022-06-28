<template>
	<view>
		<!-- 购物车标题部分 -->
		<view class="title">
			<uni-icons type="shop-filled" size="22"></uni-icons>
			<text>购物车</text>
		</view>
		<!-- 列表部分 -->
		<uni-swipe-action>
			<view v-for="item in prictToFiex" :key="item.goods_id">
				<uni-swipe-action-item :right-options="options" @click="onClick"
					@change="change">
					<view class="goods-list-item">
						<!-- 单选框 -->
						<label class="radio">
							<radio :checked="item.goods_status" @click="editChecked(item)" value="" color="red" />
						</label>
						<!-- 图片部分 -->
						<view class="goods-img">
							<img :src="item.goods_smail_logo" alt="">
						</view>
						<!-- 商品名称与价格以及购买数量部分 -->
						<view class="goods-info-box">
							<!-- 名称 -->
							<text>{{item.goods_name}}</text>
							<view class="goods-price-count">
								<!-- 价格 -->
								<text>￥ {{item.goods_price}}</text>
								<!-- 购买数量-->
								<uni-number-box @change=changeHandle(item,$event) :min="1" :value="item.goods_count">
								</uni-number-box>
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</view>
		</uni-swipe-action>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import tabbarBadge from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [tabbarBadge],
		data() {
			return {
				// 左滑删除的配置
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		methods: {
			// 购物车
			onClick() {
				
			}

			...mapMutations('cart', ['SET_GOODS_STATUS', 'SAVA_TO_STORAGE', 'SET_GOODS_COUNT']),

			// 修改购买数量
			changeHandle(goods, val) {
				console.log(goods, val);
				// 清除定时器
				clearTimeout(this.timer)
				// 将最新的商品购买数量同步到vuex
				this.SET_GOODS_COUNT({
					goods,
					val
				})
			},


			editChecked(goods) {
				// 修改当前商品的选中状态
				goods.goods_status = !goods.goods_status
				// 将最新的状态同步到vuex
				this.SET_GOODS_STATUS(goods)

			}
		},

		computed: {
			...mapState('cart', ['cartList']),

			// 处理价格的小数点
			prictToFiex() {
				this.cartList.forEach(item => {
					item.goods_price = parseInt(item.goods_price).toFixed(2)
				})
				return this.cartList
			}
		}
	}
</script>

<style lang="scss">
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

	.goods-list-item {
		background-color: #FFFFFF;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.goods-img {
			width: 240rpx;
			height: 240rpx;

			img {
				width: 240rpx;
				height: 100%;
			}
		}

		.goods-info-box {
			flex: 1;
			height: 240rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;

			text {
				font-size: 26rpx
			}

			.goods-price-count {
				display: flex;
				justify-content: space-between;

				text {
					font-size: 36rpx;
					color: red;
				}
			}
		}
	}
</style>

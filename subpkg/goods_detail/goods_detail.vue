<template>
	<view>
		<!-- 轮播图区域 -->
		<view class="swiper-box">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="item in goodsInfo.pics" :key="item.pics_id" @click="preview(item)">
					<img :src="item.pics_mid" alt="">
				</swiper-item>
			</swiper>
		</view>

		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<uni-list :border="false">
				<uni-list-item direction="column">
					<template v-slot:header>
						<text class="goods-price">￥ {{goodsInfo.goods_price}}</text>
					</template>
					<template v-slot:body>
						<view class="goods-body">
							<text class="goods-name">{{goodsInfo.goods_name}}</text>
							<view class="goods-collect">
								<uni-icons type="star" size="18" color="#8C8B8C"></uni-icons>
								<text>收藏</text>
							</view>
						</view>
					</template>
					<template v-slot:footer>
						<text class="footer">快递：免运费</text>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
		<!--  -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 商品导航栏 -->
		<uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="clickHendle" @buttonClick="" />
	</view>
</template>

<script>
	import {
		reqGetGoodsDetailList
	} from '@/api/goodsDetail/goodsDetail.js'
	export default {
		onLoad(options) {
			this.getGoodsDetail(options.goods_id)
		},

		data() {
			return {
				goodsInfo: {},
				options: [{
						icon: 'shop',
						text: '店铺',
					},
					{
						icon: 'cart',
						text: '购物车',
						info: 2
					}
				],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},

		methods: {
			// 点击购物车
			clickHendle(e) {
				if(e.content.text === '购物车') {
					// 跳转到购物车页面
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			
			// 点击轮播图放大图片
			preview(item) {
				uni.previewImage({
					urls: [item.pics_big_url]
				})
			},

			// 获取商品详情信息
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await reqGetGoodsDetailList(goods_id)
				if (res.meta.status === 200) {
					// 
					res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
					this.goodsInfo = res.message
				} else {
					uni.$showMsg('获取商品信息失败.')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		swiper {
			height: 750rpx;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.goods-info-box {
		padding: 0 10rpx;

		.goods-price {
			color: red;
			padding: 10rpx 0;
		}

		.goods-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 26rpx;
				margin-bottom: 10rpx;
			}

			.goods-collect {
				font-size: 26rpx;
				color: gray;
				width: 200rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1rpx solid #EFEFEF;
			}
		}

		.footer {
			color: gray;
			font-size: 24rpx
		}
	}
</style>

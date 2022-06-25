<template>
	<view>
		<view class="search-box">
			<!-- 搜索框 -->
			<Search @click.native="goSearch"></Search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detil/goods_detil?cid=' + item.goods_id">
					<img :src="item.image_src" alt="">
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航部分 -->
		<view class="nav-list">
			<view v-for="(img,index) in cateList" :key="index" @click="navClickHandler(img)">
				<img :src="img.image_src" alt="img.name">
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 标题部分 -->
				<view class="floor-title">
					<img :src="item.floor_title.image_src" alt="">
				</view>
				<!-- 图片部分 -->
				<view class="floor-img-box">
					<!-- 左侧部分 -->
					<view class="left">
						<!-- mode="widthFix",有了宽度，加上这个属性可以让图片自适应。可以解决图片变形 -->
						<img mode="widthFix" :src="item.product_list[0].image_src" alt="" @click="toProductList(item.product_list[0])"
							:style="'width:' + item.product_list[0].image_width +'rpx'">
					</view>
					<!-- 右侧 -->
					<view class="right">	
						<template v-for="(element,i) in item.product_list">
							<img mode="widthFix" :style="'width:' + element.image_width +'rpx'" :src="element.image_src" alt="" :key="i" v-if="i !== 0" @click="toProductList(element)">
						</template>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		reqGetSwiperList,
		reqGetcateList,
		reqGetFloorList
	} from '@/api/home/home.js'
	export default {
		onLoad() {
			// 请求轮播图数据
			this.getSwiperList()
			// 请求导航栏数据
			this.getCateList()
			// 获取楼层数据
			this.getFloorList()
		},
		data() {
			return {
				// 轮播图数据
				swiperList: [],
				// 分类导航数据
				cateList: [],
				// 楼层数据
				floorList: []
			}
		},

		methods: {
			// 点击搜索，跳转到搜索页面
			goSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			
			// 点击图片，跳转到对应的列表页
			toProductList(item) {
				item.navigator_url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
				// 页面跳转
				uni.navigateTo({
					url: item.navigator_url
				})
			},
			
			// 获取楼层数据
			async getFloorList() {
				const {
					data: res
				} = await reqGetFloorList()
				if (res.meta.status === 200) {
					this.floorList = res.message
				} else {
					uni.$showMsg('获取楼层数据失败')
				}
			},

			// 获取轮播图数据
			async getSwiperList() {
				const {
					data: res
				} = await reqGetSwiperList()
				if (res.meta.status === 200) {
					this.swiperList = res.message
					uni.$showMsg('数据请求成功')
				} else {
					uni.$showMsg()
				}
			},

			// 获取分类导航数据
			async getCateList() {
				const {
					data: res
				} = await reqGetcateList()
				if (res.meta.status === 200) {
					this.cateList = res.message
				} else {
					uni.$showMsg('请求导航分类数据失败')
				}
			},

			// 处理分类导航的点击事件
			navClickHandler(item) {
				// 判断点击的是否为分类页面
				if (item.name === '分类') {
					// 跳转到分类页面
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-box {
		// 吸顶效果。
		position: sticky;
		top: 0;
		// 提高层级，防止被其他的盖住
		z-index: 999;
	}
	
	swiper {
		height: 330rpx;

		.swiper-item,
		img {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15rpx 0;

		img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor {
		padding-left: 10rpx;
		.floor-item {
			.floor-title {
				img {
					height: 60rpx;
					width: 100%;
				}
			}
			.floor-img-box {
				display: flex;
				.right {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
				}
			}
		}
	}
</style>

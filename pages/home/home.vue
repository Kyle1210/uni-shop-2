<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detil/goods_detil?goods_id=' + item.goods_id">
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
		
	</view>
</template>

<script>
	import {reqGetSwiperList,reqGetcateList,reqGetFloorList} from '@/api/home.js'
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
			// 获取楼层数据
			async getFloorList() {
				const {data: res} = await reqGetFloorList()
				if(res.meta.status === 200) {
					this.floorList = res.message
				} else {
					uni.$showMsg('获取楼层数据失败')
				}
			},
			
			// 获取轮播图数据
			async getSwiperList() {
				const {data: res} = await reqGetSwiperList()
				if(res.meta.status === 200) {
					this.swiperList = res.message
					uni.$showMsg('数据请求成功')
				} else {
					uni.$showMsg()
				}
			},
			
			// 获取分类导航数据
			async getCateList() {
				const {data: res} = await reqGetcateList()
				if(res.meta.status === 200) {
					this.cateList = res.message
				} else {
					uni.$showMsg('请求导航分类数据失败')
				}
			},
			
			// 处理分类导航的点击事件
			navClickHandler(item) {
				// 判断点击的是否为分类页面
				if(item.name === '分类') {
					// 跳转到分类页面
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
		},
	}
</script>

<style lang="scss">
swiper {
	height: 330rpx;
	.swiper-item,img {
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
</style>

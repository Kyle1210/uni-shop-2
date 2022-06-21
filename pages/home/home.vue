<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<view class="swiper-item">
					<img :src="item.image_src" alt="">
				</view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getSwiperList()
		},
		data() {
			return {
				swiperList: []
			}
		},

		methods: {
			// 获取轮播图数据
			async getSwiperList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status === 200) {
					this.swiperList = res.message
				} else {
					// 提示消息
					uni.showToast({
						// 提示内容
						title: '数据请求失败',
						// 1.5S后自动消失
						duration: '1500',
						icon: 'none'
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
</style>

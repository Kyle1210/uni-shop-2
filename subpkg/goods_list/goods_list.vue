<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(item,index) in goodsList" :key="index">
				<template v-slot:header>
					<view class="img">
						<img mode="widthFix" :src="item.goods_small_logo">
					</view>
				</template>
				<template v-slot:footer>
					<view class="container">
						<view class="title">{{item.goods_name}}</view>
						<view class="price">￥{{item.goods_price}}</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
	import {reqGetGoodsList} from '@/api/goodsList/goodsList.js'
	export default {
		onLoad(options) {
			this.options = options
			this.getGoodsList(options.query)
		},
		
		// 下拉刷新
		onPullDownRefresh() {
			// 初始化商品列表
			this.goodsList = []
			// 初始化当前页
			this.currentPage = 1
			this.getGoodsList(this.options.query,10,this.currentPage).then(() => {
				uni.$showMsg('刷新成功！')
				uni.stopPullDownRefresh()
			}).catch(() => {
				uni.$showMsg('刷新失败！')
			})
		},
		
		// 上拉加载数据
		onReachBottom() {
			// 将当前页+1
			this.currentPage = this.currentPage + 1
			this.getGoodsList(this.options.query,10,this.currentPage)
		},
		
		data() {
			return {
				goodsList: [],
				currentPage: 1,
				options: {},
				status: 'more'
			};
		},
		
		methods: {
			
			// 获取商品列表
			async getGoodsList(query,limit,currentPage) {
				this.status = 'loading'
				const {data: res} = await reqGetGoodsList(query,limit,currentPage)
				if(res.meta.status === 200) {
					this.goodsList = this.goodsList.concat(res.message.goods)
					if(res.message.goods.length > 0) {
						this.status = 'more'
					} else {
						this.status = 'no-more'
					}
				} else {
					uni.$showMsg()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
img {
	width: 200rpx
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.title {
		font-size: 30rpx
	}
	.price {
		color: red;
	}
}
</style>

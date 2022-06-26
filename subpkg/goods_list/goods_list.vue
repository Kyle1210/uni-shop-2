<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(item,index) in goodsList" :key="index"  link="navigateTo" :to="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
				<template v-slot:header>
					<view class="img">
						<img mode="widthFix" :src="item.goods_small_logo">
					</view>
				</template>
				<template v-slot:footer>
					<view class="container">
						<view class="title">{{item.goods_name}}</view>
						<view class="price">￥{{item.goods_price | toFixed}}</view>
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
			this.queryObj.cid = options.cid || '',
			this.queryObj.query = options.query || ''
			this.getGoodsList()
		},
		
		// 下拉刷新
		onPullDownRefresh() {
			// 初始化商品列表
			this.goodsList = []
			// 初始化当前页
			this.queryObj.pagenum = 1
			// 初始化总条数
			this.total = null
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		
		// 上拉加载数据
		onReachBottom() {
			// 判断是否已经是最后一页
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
				// 已经是最后一页了，不要在发请求
				return
			}
			// 将当前页+1
			this.queryObj.pagenum += 1
			this.getGoodsList()
		},
		
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: null,
				status: 'more'
			};
		},
		
		methods: {
			// 获取商品列表
			async getGoodsList(cb) {
				this.status = 'loading'
				const {data: res} = await reqGetGoodsList(this.queryObj)
				// 数据已经请求回来了，此时立马关闭刷新
				cb && cb()
				if(res.meta.status === 200) {
					this.goodsList = this.goodsList.concat(res.message.goods)
					this.total = res.message.total
					if(res.message.goods.length === 10) {
						this.status = 'more'
					} else {
						this.status = 'no-more'
					}
				} else {
					uni.$showMsg()
				}
			}
		},
		
		// 过滤器
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
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

<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(item,index) in goodsList.goods" :key="index">
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
	</view>
</template>

<script>
	import {reqGetGoodsList} from '@/api/goodsList/goodsList.js'
	export default {
		onLoad(options) {
			console.log(options);
			this.getGoodsList(options.query,10)
		},
		
		data() {
			return {
				goodsList: []
			};
		},
		
		methods: {
			// 获取商品列表
			async getGoodsList(query,limit) {
				const {data: res} = await reqGetGoodsList(query,limit)
				if(res.meta.status === 200) {
					this.goodsList = res.message
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

<template>
	<view>
		<view class="search-box">
			<uni-search-bar :focus="true" cancelButton="none" @input="inputHandle" placeholder="请输入搜索内容" :radius="100">
			</uni-search-bar>
		</view>
		<!-- 搜索推荐列表 -->
		<uni-list v-if="searchResult">
			<!-- link :to="'/subpkg/goods_detil/goods_detil?goodsId=' + item.goods_id" -->
			<uni-list-item :to="'/subpkg/goods_detail/goods_detail?cid=' + item.goods_id" class="list-item"
				direction="row" v-for="(item,index) in searchResult" :key="item.goods_id">
				<template v-slot:header>
					<text>{{item.goods_name}}</text>
				</template>
				<template v-slot:footer>
					<uni-icons type="forward"></uni-icons>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 搜索历史 -->
		<view class="search-record" v-if="searchResult.length === 0">
			<view class="search-history">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" @click="searchHistory = []" size="20"></uni-icons>
			</view>
			<!-- 搜索标签 -->
			<view class="search-tag">
				<uni-tag :text="item" v-for="(item,index) in historys" :key="index"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		reqGetSearchList
	} from '@/api/search/search.js'
	export default {
		onLoad() {
			if(uni.getStorageSync('searchHistory')) {
				this.searchHistory = JSON.parse(uni.getStorageSync('searchHistory') || [])
			}	
		},
		
		data() {
			return {
				// 定时器
				timer: null,
				inputVal: '',
				// 搜索结果
				searchResult: [],
				// 搜索历史
				searchHistory: []
			};
		},

		methods: {
			// 搜索框的值发生变化时执行
			inputHandle(e) {
				// 防抖
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.inputVal = e
					this.getSearchList()
				}, 500)
			},

			// 获取搜索推荐列表
			async getSearchList() {
				if (this.inputVal === '' || this.inputVal.length === 0) {
					// 输入的是空字符串
					this.searchResult = []
					return
				}
				// 发送请求
				const {data: res} = await reqGetSearchList(this.inputVal)
					// 向搜索记录中添加数据
					this.searchHistory.push(this.inputVal)
					// 将数据持久化储存到本地
					uni.setStorageSync('searchHistory',JSON.stringify(this.searchHistory))
				if (res.meta.status === 200) {
					// 判断返回的结果是否无数据
					if (res.message.length === 0) {
						uni.$showMsg('没有搜到你想要的奥.')
						return
					}
					this.searchResult = res.message
				} else {
					uni.$showMsg('获取搜索列表失败')
				}

			}
		},

		computed: {
			// 这里要注意，由于数组是引用数据类型，不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
			historys() {
				return [...this.searchHistory].reverse()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-box {
		// 吸顶
		position: sticky;
		top: 0;
		z-index: 999;

		::v-deep .uni-searchbar {
			background-color: #C00000;
		}
	}

	uni-icons {
		display: flex;
		align-items: center;
	}

	text {
		// 文字允许换行
		white-space: nowrap;
		// 隐藏溢出部分
		overflow: hidden;
		// 溢出的部分用...替代
		text-overflow: ellipsis;
		margin-right: 10rpx;
	}

	.search-record {
		padding: 0 10rpx;

		.search-history {
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid gainsboro;
			font-size: 26rpx
		}

		.search-tag {
			display: flex;
			flex-wrap: wrap;

			uni-tag {
				margin-top: 10rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>

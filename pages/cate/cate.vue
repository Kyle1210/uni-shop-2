<template>
	<view class="cate-container">

		<scroll-view class="left" scroll-y="true" :style="'height:' + comHeight + 'px'">
				<view @click="activeItem(item,index)" class="left-item" v-for="(item,index) in cateList" :key="index" :class="index===active?'active':''">
					{{item.cat_name}}
				</view>
		</scroll-view>
		<scroll-view class="right" :style="'height:' + comHeight + 'px'" scroll-y="true" >
				<view class="cate" v-for="(level2Cate,index) in level2CateList">
					<view class="title">/ {{level2Cate.cat_name}} /</view>
					<view class="cs">
						<view class="content" v-for="(item,index) in level2Cate.children" :key="index">
							<img :src="item.cat_icon.replace(/dev/,'web')" alt="">
							<text>{{item.cat_name}}</text>
						</view>
					</view>
				</view>
		</scroll-view>
	</view>
</template>

<script>
	import {reqGetCateList} from '@/api/cate/cate.js'
	export default {
		onLoad() {
			this.getCateList()
			this.getComWidth()
		},
		data() {
			return {
				// 分类数据
				cateList: [],
				// 设备的可使用窗口高度
				comHeight: null,
				// 激活项
				active: 0,
				// 二级分类数据
				level2CateList: []
			};
		},
		
		methods:{
			// 激活项
			activeItem(item,index) {
				this.active = index
				this.level2CateList = this.cateList[index].children
			},
			
			// 获取设备的可使用窗口高度
			getComWidth() {
				const {windowHeight: res} = uni.getWindowInfo()
				this.comHeight = res
			},
			
			// 获取分类数据接口
			async getCateList() {
				const {data: res} = await reqGetCateList()
				console.log(res);
				if(res.meta.status === 200) {
					this.cateList = res.message
					this.level2CateList = this.cateList[0].children
				} else {
					uni.$showMsg('获取分类数据失败')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.cate-container {
	display: flex;
	.left {
		width: 250rpx;
		.left-item {
			background-color: #F7F7F7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			// 这里是个新知识。 如果标签同时包含left-item和active类名的话。下面样式则生效 
			&.active { 
				background-color: #FFF;
				position: relative;
				&::before {
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #C00000;
					position: absolute;	
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
		
	}
	.right {
		background-color: #FFF;
		.cate {
			.title {
				text-align: center;
				font-size: 24rpx;
				font-weight: bold;
				padding: 30rpx 0;
			}
			.cs {
				display: flex;
				flex-wrap: wrap;
				.content {
					width: 33.33%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 20rpx;
					img {
						width: 120rpx;
						height: 120rpx;
					}
					text {
						font-size: 24rpx
					}
				}
			}
		}
	}
}
</style>

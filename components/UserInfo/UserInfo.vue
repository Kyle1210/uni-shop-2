<template>
	<view class="user-info-container">
		<!-- 头像和昵称区域 -->
		<view class="top-box">
			<img :src="userInfo.avatarUrl" alt="">
			<text>{{userInfo.nickName}}</text>
		</view>
		
		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="order-box">
				<view class="my-order">我的订单</view>
				<view class="list">
					<view class="list-item">
						<img src="/static/my-icons/icon1.png" alt="">
						<text>待付款</text>
					</view>
					<view class="list-item">
						<img src="/static/my-icons/icon2.png" alt="">
						<text>待收货</text>
					</view>
					<view class="list-item">
						<img src="/static/my-icons/icon3.png" alt="">
						<text>退货/退款</text>
					</view>
					<view class="list-item">
						<img src="/static/my-icons/icon4.png" alt="">
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="address">
				<view class="address-item">
					<text>收货地址</text>
					<uni-icons type="forward"></uni-icons>
				</view>
				<view class="address-item">
					<text>联系客服</text>
					<uni-icons type="forward"></uni-icons>
				</view>
				<view class="address-item" @click="logout">
					<text>退出登陆</text>
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"UserInfo",
		data() {
			return {
				
			};
		},
		
		methods: {
			...mapMutations('user',['DELETE_TOKEN']),
			// 退出登陆
			logout() {
				this.DELETE_TOKEN()
			}
		},
		
		computed: {
			...mapState('user',['userInfo'])
		}
	}
</script>

<style lang="scss" scoped>
.user-info-container {
	height: 100%;
	background-color: #F4F4F4;
	.top-box {
		background-color: red;
		height: 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		img {
			width: 180rpx;
			height: 180rpx;
			border-radius: 90rpx;
			border: 4rpx solid #FFFFFF;
			box-shadow: 0 1rpx 10rpx black;
		}
		text {
			font-size: 32rxp;
			color: #FFFFFF;
			margin-top: 20rpx;
		}
	}
	
	.panel-list {
		position: relative;
		top: -20rpx;
		padding: 0 30rpx;
		.panel {
			.panel-body {
				border-radius: 6rpx;
				display: flex;
				justify-content: space-around;
				background-color: #FFFFFF;
				.panel-item {
					padding: 20rpx 0;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-size: 26rpx
				}
			}
		}
		.order-box {
			.my-order {
				height: 70rpx;
				border: 1rpx solid #EFEFEF;
				line-height: 70rpx;
				text-indent: 20rpx;
				font-size: 30rpx
			}
			margin-top: 20rpx;
			background-color: #FFFFFF;
			border-radius: 6rpx;
			.list {
				display: flex;
				justify-content: space-around;
				.list-item {
					padding: 20rpx 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					img {
						width: 60rpx;
						height: 60rpx;
					}
					text {
						font-size: 26rpx
					}
				}
			}
		}
		
		.address {
			margin-top: 20rpx;
			background-color: #FFFFFF;
			.address-item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 20rpx;
				font-size: 26rpx
			}
		}
	}
}
</style>
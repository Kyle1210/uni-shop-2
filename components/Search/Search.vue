<template>
	<view class="search-container">
		<view class="search-box">
			<uni-icons type="search" size="17"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Search",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.search-container {
	height: 100rpx;
	background-color: #C00000;
	display: flex;
	align-items: center;
	padding: 0 15rpx;
	.search-box {
		flex: 1;
		background-color: #FFFFFF;
		height: 72rpx;
		border-radius: 36rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		text {
			margin-left: 10rpx;
		}
	}
}
</style>
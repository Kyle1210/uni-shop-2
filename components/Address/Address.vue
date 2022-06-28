<template>
	<view>
			<!-- 选择收货地址 -->
			<view class="address-select-box" v-if="JSON.stringify(address) === '{}'">
				<button type="primary" size="mini" @click="selectAddres">
					请选择收货地址
					<uni-icons size="mini" type="plusempty" color="#FFFFF"></uni-icons>
					</button>
			</view>
			<!-- 渲染收货信息的盒子 -->
			<view class="address-box" @click="selectAddres" v-else>
				<!-- 第一行 -->
				<view class="row1">
					<text class="name">收货人: {{address.userName}}</text>
					<text class="phone">电话: {{address.telNumber}}</text>
				</view>
				<!-- 第二行 -->
				<view class="row2">
					<text class="address">收货地址：</text>
					<text> {{addressStr}}</text>
				</view>
			</view>
			<!-- 底部边框线 -->
			<img class="address-border" src="/static/cart_border@2x.png" alt="">
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState,mapGetters} from 'vuex'
	export default {
		name:"Address",
		data() {
			return {
			};
		},
		
		methods: {
			...mapMutations('user',['SAVA_USER_ADDRESS']),
			
			// 选择收货地址
			async selectAddres() {
				const res = await uni.chooseAddress().catch(err => err)
				if(res[1].errMsg === 'chooseAddress:ok') {
					this.SAVA_USER_ADDRESS(res[1])
				}
				
			}
		},
		
		computed: {
			...mapState('user',['address']),
			...mapGetters('user',['addressStr'])
		}
	}
</script>

<style lang="scss" scoped>
.address-select-box {
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.address-border {
	width: 100%;
	height: 10rpx;
}

.address-box {
	font-size: 24rpx;
	height: 120rpx;
	display: flex;
	padding: 0 10rpx;
	flex-direction: column;
	justify-content: center;
	padding: 0 20rpx;
	.row1 {
		display: flex;
		justify-content: space-between;
		flex: 1;
	}
	.row2 {
		margin-top: 20rpx;
		display: flex;
		flex: 1;
		.address {
			white-space: nowrap;
		}
	}
}
</style>
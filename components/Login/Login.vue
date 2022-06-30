<template>
	<view class="login-container">
		<!-- 图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登陆按钮 -->
		<button class="login-btn" type="primary" @click="getUserInfo">一键登陆</button>
		<!-- 文字部分 -->
		<text>登陆后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	import {login} from '@/api/user/user.js'
	export default {
		name:"Login",
		data() {
			return {
				query: {}
			};
		},
		
		methods: {
			...mapMutations('user',['SET_TOKEN','SET_BACK_INFO']),
			
			getUserInfo() {
				this.getUser()
			},
			
			// 获取code
			getCode() {
				uni.login({
					onlyAuthorize: true,
					success: (res) => {
						this.query.code = res.code
						this.login()
					},
					fail() {
						// 失败
						_this.$showMsg('登陆失败.')
						return
					}
				})
			},
			
			// 获取用户基本信息
			getUser() {
				const _this = this
				uni.getUserProfile({
					desc: '获取用户基本信息。',
					// 调用成功的方法
					success(res) {
						// 保存参数
						_this.query.iv = res.iv
						_this.query.encryptedData = res.encryptedData
						_this.query.rawData = res.rawData
						_this.query.signature = res.signature
						// 将用户信息本地化储存
						uni.setStorageSync('userInfo',JSON.stringify(res.userInfo))
						_this.getCode()
					},
					// 调用失败的方法
					fail(res) {
						if(res.errMsg === 'getUserProfile:fail auth deny') {
							// 未授权
							uni.$showMsg('您取消了登陆授权.')
							return 
						}
					}
				})
			},
			
			// 登陆
			async login() {
				const res = await login(this.query)
				// 无权限,照抄接口文档的token
				this.SET_TOKEN('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
				// 登陆成功
				if(this.backInfo && this.backInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.backInfo.from,
						complete: () => {
							this.SET_BACK_INFO(null)
						}
					})
				}
			}		 	
		},
		
		computed: {
			...mapState('user',['backInfo'])
		}
	}
</script>

<style lang="scss" scoped>
.login-container {
	background-color: #F8F8F8;
	padding-top: 200rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.login-btn {
		width: 90%;
		background-color: #C00000;
		border-radius: 200rpx;
		margin: 25rpx 0;
	}
	text {
		color: gray;
		font-size: 24rpx;
	}
}
</style>
<template>
	<view class="settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="red" :checked="isAllCheck" @click="radioClickHandle"/><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="total">
			<text>合计:</text>
			<text class="price"> ￥{{cartPrice}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="btnClickHandle">
			结算({{cartCountStr}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapState,mapMutations} from 'vuex'
	import {reqCreateOrder,reqGetunifiedOrder} from '@/api/order/order.js'
	export default {
		name:"Settle",		
		data() {
			return {
				// 默认倒计时的秒数
				countDown: 3,
				// 定时器的id
				timer: null
			};
		},
		
		methods: {				
			// 创建订单的方法
			async createOrder() {
				// 收集参数
				const orderInfo = {
					consignee_addr: this.addressStr,
					order_price: this.cartPrice,
					goods: this.checkGoodsCount.map(item => ({
						goods_id: item.goods_id,
						goods_number: item.goods_count,
						goods_price: item.goods_price
					}))
				}
				const {data: res} = await reqCreateOrder(orderInfo)
				if(res.meta.status === 200) {
					// 订单创建成功，储存订单编号
					const unifiedOrder = res.message.order_number
					// 获取预支付对象，这里报用户id不存在
					const {data: result} = await reqGetunifiedOrder(unifiedOrder)
					console.log(result)
				} else {
					uni.$showMsg('订单创建失败.')
					return
				}
			},
			
			// 展示倒计时
			showContDown(n) {
				uni.showToast({
					icon: 'none',
					title: '您未登陆，'+ n + '秒后跳转到登陆页面。',
					// 遮罩层，防止点击穿透
					mask: true,
					duration: 1000
				})
			},
			
			// 点击了结算按钮
			btnClickHandle() {
				// 用户未勾选商品
				if(this.checkGoodsCount.length === 0) {
					uni.$showMsg('请勾选商品！')
					return
				}
				// 用户未填收货地址
				// 这里获得的数据是 {__ob__: Observer}，只能判断不行。
				if(Object.entries(this.address).length === 0){
					uni.$showMsg('请选择收货地址！')
					return
				}
				// 用户未登陆
				if(!this.token) {
					// 弹窗提醒
					this.showContDown(this.countDown)
					// 设置定时器
					this.timer = setInterval(() => {
						if(this.countDown <= 1) {
							clearInterval(this.timer)
							// 跳转到登陆页
							uni.switchTab({
								url: '/pages/my/my',
								success: () => {
									// 跳转成功后，将当前页面的信息保存用vuex
									this.SET_BACK_INFO({
										from: '/pages/cart/cart',
										openType: 'switchTab'
									})
								},
								// 不管是否跳转成功，都要初始化倒计时默认值
								complete: () => {
									this.countDown = 3
								}
							})
							return
						}
						this.countDown--
						this.showContDown(this.countDown)
					}, 1000)
				}
				// 创建订单
				this.createOrder()
			},
			
			...mapMutations('cart',['SET_GOODS_ALLSTATUS']),
			...mapMutations('user',['SET_BACK_INFO']),

			// 点击全选框,修改所有商品的选中状态
			radioClickHandle() {
				this.SET_GOODS_ALLSTATUS(!this.isAllCheck)
			}
		},
		
		computed: {
			...mapGetters('cart',['cartCountStr','cartPrice','checkGoodsCount']),
			...mapState('cart',['cartList']),
			// 用户收货地址 token
			...mapState('user',['address','token']),
			...mapGetters('user',['addressStr']),
			// 用于控制全选状态
			isAllCheck() {
				// 循环遍历购物车，只要所有商品都是勾选状态，那么直接让全选框选中
				// 一假则false
				return this.cartList.every(item => item.goods_status)
			}
		}
	}
</script>

<style lang="scss" scoped>
 .settle-container {
	 position: fixed;
	 bottom: 0;
	 left: 0;
	 width: 100%;
	 height: 100rpx;
	 background-color: white;
	 z-index: 999;
	 display: flex;
	 justify-content: space-between;
	 align-items: center;
	 padding-left: 20rpx;
	 .radio {
		 display: flex;
		 align-items: center;
	 }
	 
	 .total {
		 .price {
			 color: red;
		 }
	 }
	 
	 .btn-settle {
		 color: #FFFFFF;
		 background-color: red;
		 height: 100%;
		 line-height: 100rpx;
		 padding: 0 20rpx;
		 min-width: 200rpx;
		 text-align: center;
		 margin-right: 10rpx;
	 }
 }
</style>
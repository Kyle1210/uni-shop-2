import {mapState} from 'vuex'

export default {
	onShow() {
		this.setBadge()
	},
	
	methods: {
		// 设置购物车的角标
		setBadge() {	
			if(this.cartCount) {
				uni.setTabBarBadge({
					index: 2,
					text: this.cartCount + ''
				})
			} else {
				uni.removeTabBarBadge({
					index: 2
				})
			}
		}
	},
	
	computed: {
		...mapState('cart',['cartList']),
		
		// 购物车数量
		cartCount() {
			let number = 0
			if(this.cartList.length > 0) {
				this.cartList.forEach(item => {
					number = number + item.goods_count
				})
				return number
			} else {
				return null
			}
		}
	},
	
	watch: {
		// 监听购物车数量的变化
		cartList: {
			handler() {
				this.setBadge()
			},
			// 深度监听
			deep: true
		}
	}
}
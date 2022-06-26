import {mapState} from 'vuex'

export default {
	onShow() {
		this.setBadge()
	},
	
	methods: {
		// 设置当前页面的角标
		setBadge() {
			if(this.cartCount) {
				uni.setTabBarBadge({
					index: 2,
					text: this.cartCount + ''
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
	}
}
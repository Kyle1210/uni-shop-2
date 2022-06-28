const actions = {

}

const mutations = {
	// 修改全选选中状态
	// 这里掉进了一个不该掉进的坑,方法重名了，导致方法一直不执行。该死的编译器也没报错，导致找了20分钟的错误
	SET_GOODS_ALLSTATUS(state,isAllCheck) {
			state.cartList.forEach(item => {
				item.goods_status = isAllCheck
			})
			// 将修改后的数据本地化储存
			this.commit('cart/SAVA_TO_STORAGE')
	},
		
	// 根据id删除商品
	DELETE_GOODS(state,goods) {
		state.cartList = state.cartList.filter(item => item.goods_id !== goods.goods_id)
		// 本地化储存
		this.commit('cart/SAVA_TO_STORAGE')
	},
	
	// 修改购物车商品的购买数量
	SET_GOODS_COUNT(state,goodsInfo) {
		const result = state.cartList.find(item => item.goods_id === goodsInfo.goods.goods_id)
		if(result) {
			result.goods_count = goodsInfo.val
			// 本地化储存
			this.commit('cart/SAVA_TO_STORAGE')
		}
	},
	
	// 修改商品的选中状态
	SET_GOODS_STATUS(state,goodsInfo) {
		if(goodsInfo) {
			const result =  state.cartList.find(item => item.goods_id === goodsInfo.goods_id)
			result.goods_status = goodsInfo.goods_status
			// 本地持久储存
			this.commit('cart/SAVA_TO_STORAGE')
		}
	},
	
	// 添加一个商品到vuex
	ADD_GOODS(state,goodsInfo) {
		// 查询vuex里有没有这个商品. 如果有的话，find方法返回的就是查询出来商品信息。没有的话返回的则是undefined
		const findGoods = state.cartList.find(item => item.goods_id === goodsInfo.goods_id)
		if(findGoods) {
			// 有这个商品，那么让其购买数量+1
			findGoods.goods_count += 1
		} else {
			// 没有这个商品，则pushvuex
			state.cartList.push(goodsInfo)
		}
	},
	
	// 将当前购物车的数据持久化储存到本地
	SAVA_TO_STORAGE(state) {
		uni.setStorageSync('cartLtst',JSON.stringify(state.cartList))
	}
} 

const state = {
	cartList: JSON.parse(uni.getStorageSync('cartLtst') || '[]') 
}

const getters = {
	// 购物车总数
	cartCountStr(state) {
		let number = 0
		state.cartList.forEach(item => {
			number = number + item.goods_count
		})
		return number
	},
	
	// 总价格
	cartPrice(state) {
		let price = 0
		const resultArr = state.cartList.filter(item => item.goods_status)
		resultArr.forEach(item => {
			price = price + (item.goods_count * item.goods_price)
		})
		return price.toFixed(2)
	}
}

export default {
	namespaced: true,
	actions,
	mutations,
	state,
	getters
}
const actions = {

}

const mutations = {
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

export default {
	namespaced: true,
	actions,
	mutations,
	state
}
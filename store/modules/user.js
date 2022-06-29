const actions = {
	
}

const mutations = {
	// 删除token
	DELETE_TOKEN(state) {
		state.token = ''
		uni.setStorageSync('token',state.token)
	},
	
	// 将token保存到vuex中,并本地化保存
	SET_TOKEN(state,token) {
		state.token = token
		// 本地化储存
		uni.setStorageSync('token',token)
	},
	
	// 保存用户的收货地址
	SAVA_USER_ADDRESS(state,address) {
		state.address = address
		this.commit('user/SAVA_ADDRESS_STORAGE')
	},
	
	// 将当前用户的收货地址本地化储存
	SAVA_ADDRESS_STORAGE(state) {
		uni.setStorageSync('address',JSON.stringify(state.address))
	}
}

const state = {
	address: JSON.parse(uni.getStorageSync('address') || '{}'),
	token: uni.getStorageSync('token') || '',
	userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}')
}

const getters = {
	addressStr() {
		if(!state.address) {
			return ''
		}
		return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
	}
}

export default {
	namespaced: true,
	actions,
	mutations,
	state,
	getters
}
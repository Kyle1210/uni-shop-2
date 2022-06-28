const actions = {
	
}

const mutations = {
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
	address: JSON.parse(uni.getStorageSync('address') || '{}')
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
// 导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/modules/cart.js'
import user from '@/store/modules/user.js'

// 将vuex安装为vue的插件
Vue.use(Vuex)

// 创建vuex仓库实例
const store = new Vuex.Store({
	namespaced: true,
	modules: {
		cart,
		user
	}
})

export default store
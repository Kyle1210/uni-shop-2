
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import  {showMsg} from '@/utils/common.js'
// 导入网络请求包
import {$http} from '@escook/request-miniprogram'

Vue.config.productionTip = false

uni.$showMsg = showMsg

// 设置请求根路径
$http.baseUrl = 'https://api-ugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest = (options) => {
	// 展示loading
	uni.showLoading({
		title: '数据加载中...'
	})
}

// 响应拦截器
$http.afterRequest = () => {
	// 关闭loading
	uni.hideLoading()
}


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
// 导入网络请求包
import {$http} from '@escook/request-miniprogram'

// 商品列表数据
export const reqGetGoodsList = (queryObj) => $http.get('/api/public/v1/goods/search',queryObj)
	
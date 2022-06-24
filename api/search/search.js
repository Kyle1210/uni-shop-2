// 导入网络请求包
import {$http} from '@escook/request-miniprogram'

// 获取搜索推荐列表
export const reqGetSearchList = (query) => $http.get('/api/public/v1/goods/qsearch',{query})
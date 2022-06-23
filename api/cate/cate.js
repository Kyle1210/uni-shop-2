import {$http} from '@escook/request-miniprogram'

// 请求分类数据接口
export const reqGetCateList = () => $http.get('/api/public/v1/categories')
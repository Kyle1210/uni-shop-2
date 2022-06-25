// 导入网络请求包
import {$http} from '@escook/request-miniprogram'

export const reqGetGoodsDetailList = (goods_id) => $http.get('/api/public/v1/goods/detail',{goods_id})
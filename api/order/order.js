// 导入网络请求包
import {$http} from '@escook/request-miniprogram'

// 创建订单
export const reqCreateOrder = (orderInfo) => $http.post('/api/public/v1/my/orders/create',orderInfo)

// 获取订单预支付对象
export const reqGetunifiedOrder = (orderNumber) => $http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number: orderNumber})
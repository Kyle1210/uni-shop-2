// 导入网络请求包
import {$http} from '@escook/request-miniprogram'

// 登陆
export const login = (userInfo) => $http.post('/api/public/v1/users/wxlogin',userInfo) 
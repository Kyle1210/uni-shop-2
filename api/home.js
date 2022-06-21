// 导入网络请求包
import {$http} from '@escook/request-miniprogram'

// 获取轮播图数据
export const reqGetSwiperList = () => $http.get('/api/public/v1/home/swiperdata')

// 获取分类导航数据
export const reqGetcateList = () => $http.get('/api/public/v1/home/catitems')

// 获取楼层数据
export const reqGetFloorList = () =>$http.get('/api/public/v1/home/floordata')
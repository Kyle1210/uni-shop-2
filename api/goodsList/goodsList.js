// 导入网络请求包
import {$http} from '@escook/request-miniprogram'

// 商品列表数据
export const reqGetGoodsList = (query,limit = 10,currentPage = 1) => {
	// 判断是query是否能转为数字，能的话说明传过来的是cid
	if(Number(query).toString() === 'NaN') {  //传过来的是字符串
		return $http.get('/api/public/v1/goods/search',{
						query: query,
						pagesize: limit,
						pagenum: currentPage,})	
	} else { //传过来的是cid 
		return $http.get('/api/public/v1/goods/search',{
						cid: query,
						pagesize: limit,
						pagenum: currentPage,
		})
	}
}
	
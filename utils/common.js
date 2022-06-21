export const showMsg = function(title = '数据请求失败', duration = 1500) {
	return uni.showToast({
		title: title,
		duration: duration,
		icon: "none"
	})
}
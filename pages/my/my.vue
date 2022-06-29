<template>
	<view class="my-container">
		<Login v-if="!token"></Login>
		<UserInfo v-else></UserInfo>
	</view>
</template>

<script>
	import tabbarBadge from '@/mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		
		mixins: [tabbarBadge],
		
		data() {
			return {
				
			};
		},
		
		computed: {
			...mapState('user',['token'])
		}
	}
</script>

<style lang="scss" scoped>
.my-container {
	height: 100%;
}
</style>

<style lang="scss">
page {
	height: 100%;
}
</style>

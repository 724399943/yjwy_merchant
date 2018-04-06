<template>
	<!-- 底部固定菜单 -->
    <footer class="y-ycar-foot">
      	<router-link to="/" :class="{on : $store.state.isActive == 'index'}">
        	<em class="icon"><i></i>首页</em>
      	</router-link>
      	<router-link to="/orderList" :class="{on : $store.state.isActive == 'orderList'}">
        	<em class="icon"><i></i>订单</em>
      	</router-link>
      	<router-link to="/messageIndex" :class="{on : $store.state.isActive == 'messageIndex'}">
        	<em class="icon"><i></i>消息</em>
      	</router-link>
      	<router-link to="/personalCenter" :class="{on : $store.state.isActive == 'personalCenter'}">
        	<em class="icon"><i></i>我的</em>
      	</router-link>
    </footer>	
</template>
<script>
export default {

	data () {
		return {			
	    }
	},
	watch : {
    		
	}

}
</script>
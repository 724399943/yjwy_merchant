<template>
  	<div class="content">
  		<div class="centerWarp">
  			<div class="u-top">							
				<div class="u-top-wrap">
					<router-link to="/shopInfo" class="u-top-user">
						<div class="wimgbox">
							<div class="imgbox">
								<img v-bind:src="list.logo">							
							</div>
						</div>
						<span>{{list.agent_name}}</span>
						<p class="level"><em></em><span class="num">Lv. {{list.level}}</span></p>
					</router-link>
				</div>					
			</div>
			<div class="ysecline">												
				<div class="p_cen_m">					
					<ul>
						<li>
							<router-link to="/myBalance">
							<a href="javascript:;">
								<em class="ico1"></em>
								<span class="s1">账户余额</span>
								<em class="ei"></em>
							</a>
							</router-link>
						</li>						
						<li>
							<router-link to="cashFlow">
							<a href="javascript:;">
								<em class="ico2"></em>
								<span class="s1">现金流水</span>
								<em class="ei"></em>
							</a>
							</router-link>
						</li>						
						<li>
							<router-link to="goodsManagement">
							<a href="javascript:;">
								<em class="ico3"></em>
								<span class="s1">商品管理</span>
								<em class="ei"></em>
							</a>
							</router-link>
						</li>												
						<li>
							<router-link to="afterSalesOrder">
							<a href="javascript:;">
								<em class="ico4"></em>
								<span class="s1">售后订单</span>
								<em class="ei"></em>
							</a>
							</router-link>							
						</li>
						<li>
							<router-link to="salesStatistics">
							<a href="javascript:;">
								<em class="ico5"></em>
								<span class="s1">销售统计</span>
								<em class="ei"></em>
							</a>	
							</router-link>						
						</li>
						<li>
							<router-link to="forgotPassword">
								<em class="ico6"></em>
								<span class="s1">修改密码</span>
								<em class="ei"></em>
							</router-link>							
						</li>
					</ul>
				</div>
			</div>
  		</div>  		
        <!-- 底部固定菜单 -->
        <VFooter></VFooter>
  	</div>
</template>
<script>
import VFooter from './Footer'
export default {

  data () {
    return {
    	list : [],
      dataJson:{
      	session_id : localStorage.session_id,
      }
    }
  },
  components : {
  	VFooter
  },
  created(){
  	this.showAgent();
  },
  methods: {
   showAgent : function(){
   		this.$http.post('/Shop/Agent/agentInfo', this.dataJson,{emulateJSON:true}).then(function(response){
  			var returnData = response['data'];
  			this.list = returnData['data']['list'];
  		})
   }
  }
  
}
</script>


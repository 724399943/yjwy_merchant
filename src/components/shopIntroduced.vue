<template>
  	<div class="content">
		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">店铺介绍</h1>
		</header>
		<div class="main">
			<div class="shIntrwrap" v-html="list.introduction">
				<!-- <img src="http://placehold.it/350x150">
				<p>{{list.introduction}}</p> -->
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
    	list : [],
      	dataJson : {
      		session_id : localStorage.session_id,
      }
    }
  },
  created(){
  	this.shopIntroduction();
  },
  methods: {
    shopIntroduction : function(){
  		this.$http.post('/Shop/Agent/agentInfo', this.dataJson,{emulateJSON:true}).then(function(response){
  			var returnData = response['data'];
  			this.list = returnData['data']['list'];
  			
  		})
  	},
  }

}
</script>


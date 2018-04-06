<template>
  	<div class="content">
		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">选择商品</h1>
		</header>
		<div class="main">
			<div class="chogoWrap">
				<div class="cmgoods-m">
            <div class="mm-cgwl" v-for="item in list">
                <div class="s_goods_wrap">
                    <div class="s_cbox">
                        <input type="checkbox" id="sel1" > 
                        <label for="sel1"></label>
                    </div>
                </div>
                <div class="imgbox">
                    <img :src="'http://www.yijia.com/'+item.goods_image">
                </div>
                <div class="m-ggmsg yi">
                    <p class="name db-overflow">{{item.goods_name}}</p>
                    <p class="price">￥ {{item.goods_price}}</p>
                </div>                        
            </div>
        </div>
			</div>
			<a href="javascript:;" class="chobtn">保存</a>
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
      },
    }
  },
  created(){
    this.getGoods();
  },
  methods: {
      getGoods : function(){
      var that = this.dataJson;
      this.$http.post('/Shop/Agent/agentGoods', that,{emulateJSON:true}).then(function(response){
        var returnData = response['data'];
        if(returnData.status == '200000'){
         this.list = returnData['data']['list'];
          console.log(that);
        }else{
          this.$store.commit('alert',{show:true,text:returnData.message});
          this.dataJson = {};
        }
        
      })
    }
  }

}
</script>


<template>
  	<div class="content" id="orderList">
		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">售后订单</h1>
		</header>
		<div class="main">
			<div class="asoWrap" >
				<div class="asfNav ">
					<span :class="{on : status0}" @click="changeStatus(0)">退货审核中</span>
					<span :class="{on : status1}" @click="changeStatus(1)">审核已通过</span>
					<span :class="{on : status2}" @click="changeStatus(2)">审核不通过</span>
				</div>
				<div class="asfCont" >
					<ul class="odlist">
						<li v-for="item in list">
							<router-link :to="{name : 'aftermarketDetails',query : {return_sn : item.return_sn}}">
							<!-- <a href="javascript:;"> -->
								<div class="odlsn">
									<p>订单号：{{item.return_sn}}</p>
									<span class="asfz" v-if="item.status == 0">退货审核中</span>
									<span class="asfz" v-if="item.status == 1">审核已通过</span>
									<span class="asfz" v-if="item.status == 2">审核未通过</span>
								</div>
								<div class="mm-cgwl" style="overflow:hidden">
                    <div class="imgbox">
                        <img :src="item.goods_image">
                    </div>
                    <div class="m-ggmsg">
                        <p class="name db-overflow">{{item.goods_name}}</p>
                        <p class="gmsnum"><span>{{item.attr_list}}</span></p>
                    </div>		                        
                    <span class="asfnum">x {{item.goods_number}}</span>
			         </div>
								<div class="odlwow">
									<div class="owowl">{{item.add_time | time}}</div>
									<span class="asfMoney">退款金额：{{item.price}}</span>
								</div>
							<!-- </a> -->
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
    	status0 : true,
    	status1 : false,
    	status2 : false,
      nomore : 0,
      list : [],
      dataJson : {
          session_id : localStorage.session_id,
          status : 0,
          page : 0,
      },
      loadData : true,
      nomore : false,
    }
  },
  created(){
     this.$store.commit('loading',{show:true,text:'加载中...'});
  	 this.showData();
  },
  mounted(){
    this.$store.commit('loading',{show:true});
    this.loadMore();
  },
  methods: {
    showData : function(){
        var that = this;
        if( that.loadData == true){
          that.loadData = false;
          that.dataJson.page++;
          // console.log(this.dataJson);
          that.$http.post('/Shop/OrderGoodsReturn/merchantAfterSaleOrder',that.dataJson,{emulateJSON:true}).then(function(response){
              var returnData = response.data;
              // console.log(returnData);
              if ( returnData['data']['list'].length ) {
                // alert(0);
                  that.list = ( that.list.length ) ? that.list.concat(returnData['data']['list']) : returnData['data']['list'];
              }else {
                  if ( that.list.length ) {
                      that.nomore = true;
                  }
              } 
              that.$nextTick(function () {
                  that.loadData = true;
                  this.$store.commit('loading',{show:false});
              })
          });
        }
    },
    loadMore(){         
      var that = this;
      that.$store.commit('scrollFun',{dom:'orderList', auto:true, bottomCall:function(){  
          if ( that.nomore == false ) {
              that.showData();
          }
      }})
    },
    changeStatus(status){
      this.dataJson.page = 0;
      this.nomore = false;
      this.list = [];
    	
    	this.dataJson.status = status;
    	if(!status){
    		this.status0 = !status;
    		this.status1 = this.status2 = status;
    	}
    	else if(status == 1){
    		this.status0 = this.status2 = false;
    		this.status1 = true;
    	}
    	else if(status == 2){
    		this.status0 = this.status1 = false;
    		this.status2 = true;
    	}
    	this.showData();
    }
  }

}
</script>


<template>
  	<div class="content" id="saleList">
		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">销售统计</h1>
			<span class="interval" @click="showDate(1)"></span>
		</header>
		<div class="main">
			<div class="salesStaWrap">
				<div class="store-goods-u">
	                <a href="javascript:;" v-bind:class="{on : saleClass}" @click="toggle('sale',dataJson.saleSort)">销量
						        <span v-bind:class="sortClass" ></span>
	                </a> 
	                <a href="javascript:;" class="price " v-bind:class="{on :priceClass}" @click="toggle('price',dataJson.totalSort)">价格
	                    <span v-bind:class="sortClass" ></span>
	                </a>
	            </div>
	            <div class="salsteGoods" >
	            	<div class="cmgoods-m" v-for="item in list">
	                    <div class="mm-cgwl">
	                    	<a href="javascript:;">
		                        <div class="imgbox">
		                            <img :src="item.goods_image">
		                        </div>
		                        <div class="m-ggmsg">
		                            <p class="name db-overflow">{{item.goods_name}}</p>
		                            <div class="mssInprice">
		                            	<p class="msp">
		                            		<span>销售数量：{{item.sale_number}}</span>
		                            		<span>总销售额：<em class="sem">{{item.sale_total}}</em></span>
		                            	</p>
		                            	<p class="msp">
		                            		<span>退款金额：{{item.return_total}}</span>
		                            		<span>实销金额：<em class="sem">{{item.real_total}}</em></span>
		                            	</p>
		                            </div>
		                        </div>	    
		                    </a>                    
	                    </div>
	                </div>
	            </div>

			</div>
			<!-- 筛选区间 -->
	        <div class="scrIntWrap" v-bind:style="{display : displayStyle}" @touchmove.prevent>
	            <header class="head">
	              <span class="back" @click="showDate(0)"></span>
	              <h1 class="y-confirm-order-h1">筛选区间</h1>
	              <span class="close" @click="showDate(0)"></span>
	            </header>
	            <div class="scrIntCont">
	                <div class="strList">
	                    <span>起始日期</span>
	                    <input id="startTime" type="date" name=""  v-model="dataJson.startTime">
	                </div>
	                <div class="strList">
	                    <span>结束日期</span>
	                    <input id="endTime" type="date" name=""  v-model="dataJson.endTime">
	                </div>
	                <a href="javascript:;" class="strbtn" @click="checkDate()">确定</a>
	            </div>   
	        </div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
    	saleClass : true,
    	priceClass : false,
    	sortClass : 'down',
    	loadData : true,
    	nomore : false,
    displayStyle : 'none',
    list : [],
    dataJson : {
      	session_id : localStorage.session_id,
      	startTime : '',
      	endTime : '',
      	saleSort : '-1',
      	totalSort : '-1',
      	page : 0,
      }
    }
  },
  mounted(){
  	this.$store.commit('loading',{show:true});
    this.loadMore();
  },
  created(){
    // this.initTime();
    this.$store.commit('loading',{show:true,text:'加载中...'});
    this.showData();
  },
  methods: {
  	toggle(what,sort){
  		var that = this.dataJson;
  		if(sort == -1)
  			sort = 1;
  		if(what == 'sale'){
  			this.saleClass = true;
  			this.priceClass = false;
  			that.totalSort = -1;
  			sort == 0 ? that.saleSort = 1 : that.saleSort = 0;
  			sort == 0 ? this.sortClass = 'down' : this.sortClass = 'up';
  		}else{
  			this.priceClass = true;
  			this.saleClass = false;
  			that.saleSort = -1;
  			sort == 0 ? that.totalSort = 1 : that.totalSort = 0;
  			sort == 0 ? this.sortClass = 'down' : this.sortClass = 'up';
  		}
  		this.reShowData();
  		
  	},
  	showData : function(){
  		var that = this;
  		if(that.loadData == true){
  			that.loadData = false;
        that.dataJson.page++;
  			this.$http.post('/Shop/Finance/sellingStatistics', that.dataJson,{emulateJSON:true}).then(function(response){ 
  		          var returnData = response.data;console.log(returnData);
  		          if( returnData['data']['list'].length ){
  		          	that.list = ( that.list.length ) ? that.list.concat( returnData['data']['list']) : returnData['data']['list'];
  		          }else{
  		          	if( that.list.length ){
  		          		that.nomore = true;
  		          	}
  		          }
  		          that.$nextTick(function () {
  		              that.loadData = true;
  		              this.$store.commit('loading',{show:false});
  		          })
  		    })
  		}

  	},
    loadMore(){
      var that = this;
      that.$store.commit('scrollFun',{dom:'saleList', auto:true, bottomCall:function(){  
          if ( that.nomore == false ) {
              that.showData();
          }
      }})
    },
  	reShowData : function(){
      // this.initTime();
  		this.dataJson.page = 0;
  		this.list = [];
  		this.nomore = false;
  		this.showData();
  	},
  	checkDate(){
  		  var startTime = document.getElementById('startTime').value;
	      var endTime = document.getElementById('endTime').value;
	      if(!startTime || !endTime){
	        this.$store.commit('alert',{show:true,text:'请选择完整的日期时间'});
	        return;
	      }
        if(startTime == endTime){
          this.$store.commit('alert',{show:true,text:'请选择正确的日期区间'});
          return;
        }
        console.log(this.dataJson);
	      this.submitData();
  	},
  	submitData : function(){
  		var that = this.dataJson;
  		that.startTime = this.formatStamp(that.startTime);
  		that.endTime = this.formatStamp(that.endTime);
  		this.reShowData();
  		this.showDate(0);
  	},
    showDate(is_show){
    	if(is_show){
    		this.displayStyle = 'block';
    	}
    	else
    		this.displayStyle = 'none';
    },
    //转化为时间戳
    formatStamp(time){
      var timeStamp = Date.parse(new Date(time));
      return timeStamp/1000;
    },
    //初始化一月内时间
    initTime(){
      var date = new Date();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var monthFirstDay = year + '-' + month +'-'+'1';
      this.dataJson.startTime = this.formatStamp(monthFirstDay);
      var Nowdate = new Date();
      this.dataJson.endTime = this.formatStamp(Nowdate);
    }
  }

}
</script>


<template>
  	<div class="content">
		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">售后详情</h1>
		</header>
		<div class="main">
			<div class="afterDetail">
				<div class="afdGoods">
					<p class="title">退货商品信息</p>
					<div class="in-goods">
            <div class="imgbox">
                <img :src="list.goods_image">
            </div>
            <div class="ingmsg">
                <p class="name db-overflow">{{list.goods_name}}</p>
                <div class="invattr">
                    <span>{{list.attr_list}}</span>
                    <span></span>
                </div>
                <div class="invpn">
                    <span class="price">￥{{list.price}}</span>
                    <span class="num">x{{list.goods_number}}</span>
                </div>
            </div>                        
        </div>
				</div>
				<div class="asdAppen">
					<div class="edomsg">
						<h1>退款申请</h1>
						<div class="odlmsg">
							<div class="omls">
								<span>服务单号</span>
								<p>{{list.return_sn}}</p>
							</div>
							<div class="omls">
								<span>申请时间</span>
								<p>{{list.add_time | time}}</p>
							</div>
							<div class="omls">
								<span>退款状态</span>
								<p v-if="list.status == 0">退货审核中</p>
								<p v-if="list.status == 1">审核已通过</p>
								<p v-if="list.status == 2">审核不通过</p>
							</div>
							<div class="omls">
								<span>问题描述</span>
								<p v-if="list.description == ''">无问题描述</p>
								<p v-else>{{list.description}}</p>
							</div>
						</div>
					</div>
					<div class="asdPic">
						<div class="imgbox" v-for="pic in list.image" v-if="list.image != ''">
							<img :src="pic">
						</div>
						<div class="imgbox" v-if="list.image == ''">尚无图片
						</div>
					</div>
				</div>
				<div class="asdResback" v-bind:style="{display : remarkStyle}">
					<div class="edomsg">
						<h1>审核留言</h1>
						<p class="asdback" v-if="list.status !== 0">{{list.remark}}</p>
					</div>
				</div>
				<div class="asdMarketBtn" v-bind:style="{display : btnStyle}">
					<a href="javascript:;" class="asdmBtn" :class="{grey : pass}" @click="showBtn(1)">审核通过</a>
					<a href="javascript:;" class="asdmBtn" :class="{grey : fail}" @click="showBtn(0)">审核不通过</a>
				</div>
			</div>
			<!-- 弹窗 -->
			<div v-bind:style="{display:displayStyle}">
				<div class="mask" @click="showWindow(0)"></div>
				<div class="afdWindow">
          <div class="mskcont">
  					<p v-if="this.message == true">审核通过</p>
  					<p v-else="this.message == false">审核不通过</p>
  					<textarea placeholder="请输入文字~" rows="4" v-model="dataJson.remark"></textarea>
          </div>
  				<a href="javascript:;" @click="submitRemark()">确定</a>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
    	list : [],
    	pass : false,
    	fail : true,
    	message : true,
    	btnStyle : 'none',
    	remarkStyle : 'none',
    	displayStyle : 'none',
      dataJson : {
      	session_id : localStorage.session_id,
        status : '',
      }
    }
  },
  created(){
  	this.showData();
  },
  methods: {
    showData : function(){
    	var that = this.dataJson;
    	that.return_sn = this.$route.query.return_sn;
    	this.$http.post('/Shop/OrderGoodsReturn/merchantAfterSaleOrderDetail', that,{emulateJSON:true}).then(function(response){ 
              var returnData = response.data;
              if( returnData['status'] == "200000" ){
              	this.list = returnData['data']['list'];
              	//处理中
              	if(this.list.status == 0){
              		this.remarkStyle = 'none';
              		this.btnStyle = 'block';
              	}else{//已经处理
              		this.remarkStyle = 'block';
              		this.btnStyle = 'none';
              	}
              }
              else{
                this.$store.commit('alert',{show:true,text:response.data.message});
              }    
        })
    },
    showBtn(is_pass){
    	this.pass = !is_pass;
    	this.fail = is_pass;
    	this.message = is_pass;
    	this.showWindow(1,is_pass);
    },
    showWindow(onoff,is_pass){
    	if(onoff){
    		this.displayStyle = 'block';
    		this.dataJson.status = is_pass;
    	}
    	else
    		this.displayStyle = 'none';
    },
    submitRemark : function(){
      this.dataJson.status = (!this.message) ? '2' : '1';
    	this.$http.post('/Shop/OrderGoodsReturn/checkAfterSaleOrder', this.dataJson,{emulateJSON:true}).then(function(response){ 
		          var returnData = response.data;
		          if( returnData['status'] == "200000" ){
                this.showData();
		          }
		          else{
		            this.$store.commit('alert',{show:true,text:response.data.message});
		          }    
		    });
    	this.displayStyle = 'none';
    	
    }
  }

}
</script>


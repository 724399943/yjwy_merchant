
<template>
	<div class="content">
		<header class="head">
		<router-link :to="{name:'goodsManagement'}">
			<a class="back" href=""></a>
		</router-link>
			<h1 class="y-confirm-order-h1">商品详情</h1>
		</header>
		<div class="main">
			<div class="goodsDetail_m">
				<!-- 轮播图片 -->
				<div class="ggoodsImg_wrap" style="height:auto">  
                  <div class="goods_img_cont">
                  	<swiper auto dots-position="center" aspect-ratio="1">
                  		<template v-for="pic in goodsImages">
	                        <swiper-item class="goods_img_box">
	                            <img :src="pic">
	                        </swiper-item>
                        </template>
                  	</swiper>                    
                   </div>
                   <!-- <div class="slide_num">1/6</div> -->
              	</div>

				<!-- 轮播图片 -->

				<div class="goods_msg">
					<p class="name db-overflow">{{goodsInfo.goods_name}}</p>		
					<div class="g_msg_tt">
						<span>￥{{goodsInfo.goods_price}}</span>										
						<p>已售:{{goodsInfo.sale_number}}个</p>
					</div>
				</div>
				<div class="goods_fuwu">
					<div class="gt">
						<div class="cb">
							<div class="check_box">
								<input type="checkbox" id="select">
								<label for="select"></label>
							</div>
						</div>
						<div class="tt">
							<span>上门安装</span>
							<span>￥ : {{goodsInfo.install_price}}</span>
						</div>
					</div>
					<div class="gm">
						<div class="gtext" v-if="goodsInfo.goods_attr == 1">非标商品</div>
						<div class="gtext on" v-else-if="goodsInfo.goods_attr == 0">成品</div>
						<div class="gtext" v-if="goodsInfo.can_install == 1">上门安装</div>
						<div class="gtext on" v-else-if="goodsInfo.can_install == 0">不支持上门安装</div>
						<div class="gtext" v-if="goodsInfo.can_return == 1">支持退货</div>
						<div class="gtext on" v-else-if="goodsInfo.can_return == 0">不支持退货</div>
					</div>					
				</div>		
				<div class="goods_jgkc">
					<div class="ggjg">价格库存
						<router-link :to="{name:'editGoods',query:{goods_id : dataJson.goods_id}}">
							<!-- <a href="javascript:;"></a> -->
						</router-link>
					</div>
					<div class="ggjkcTab">
						<span>颜色</span>
						<span>规格</span>
						<span>价格</span>
						<span>库存</span>
					</div>
					<div class="ggjkcTab" v-for="item in attrList">
						<span>{{item.attr.color | filterStr}}</span>
						<span>{{item.attr.size  | filterStr}}</span>
						<span>{{item.goods_price}}</span>
						<span>{{item.goods_number}}</span>
					</div>
				</div>						
				<div class="goods_detail">
					<div class="g_de_t">
						<em class="lf"></em>
						<span>商品详情</span>
						<em class="rt"></em>
					</div>
					<div class="detailCont" v-html="goods.goodsDesc"></div>
				</div>				
			</div>			
		</div>		

  	</div>
</template>
<script>
import {Swiper,SwiperItem}from 'vux/src/components/swiper'
export default {

  data () {
    return {
    	attrList : [],
    	goodsInfo : [],
    	goodsImages : [],
    	goods : [],
        dataJson : {
      	 session_id : localStorage.session_id,
       }
    }
  },
  created(){
    this.showData();
    this.showAttr();
  },
  computed: {
    
  },
  components : {
      Swiper,
      SwiperItem
  },
  filters:{
		filterStr : function(string){
			if(!string)
				return '-';
			if(string.length > 4)
				string = string.substring(0,4) + '...';
			return string;
		}
  	},
  methods: {
  	showData : function(){
  		var that = this.dataJson;
  		that.goods_id = this.$route.query.goods_id;
  		this.$http.post('/Shop/Goods/goodsDetail', that,{emulateJSON:true}).then(function(response){
  			var returnData = response['data'];
  			if(returnData.status == '200000'){
  				this.goods = returnData['data'];
  				this.goodsInfo = returnData['data']['goodsInfo'];
  				this.goodsImages = returnData['data']['goodsImages'];
  			}else{
  				this.$store.commit('alert',{show:true,text:returnData.message});
    			this.dataJson = {};
  			}
  			
  		});
  	},
  	showAttr : function(){
  		var that = this.dataJson;
  		that.goods_id = this.$route.query.goods_id;
		this.$http.post('/Shop/Goods/agentGoodsDetail', that,{emulateJSON:true}).then(function(response){
			var returnData = response['data'];
			if(returnData.status == '200000'){
				this.attrList = returnData['data']['goodsInfo'];
			}
			
		});
  	}
    
  }

}
</script>
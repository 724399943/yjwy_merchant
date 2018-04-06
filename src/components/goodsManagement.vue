<template>
  	<div class="content" id="goodsList">
		<header class="head">
    <router-link :to="{name: 'personalCenter'}">
			<a class="back" ></a>
    </router-link>
			<h1 class="y-confirm-order-h1">商品管理</h1>
			<span class="search" @click="showSearch(1)"></span>
		</header>
		<!-- 搜索 -->
		<header class="head" v-bind:style="{display:searchStyle}">
			<div class="hgmType">
				<p class="sst" >
          <span @click="toggleCat()">{{category}}</span>
          <em v-bind:class="{on : onClass}"></em>
        </p>
				<ul class="hstul" :style="{display: catStyle}">
					<li @click="selectCategory('','全部')">全部</li>
          <li v-for="(vo,index) in firstCat" @click="selectCategory(vo.category_path,vo.category_name)">{{vo.category_name}}</li>
				</ul>
			</div>
			<div class="hgmSearch">
				<div class="hgmsBox"  @click="reShowData">
					<input type="text" name="" placeholder="请输入搜索产品" v-model="dataJson.keyword">
				</div>				
			</div>
		</header>
		<div class="main">
			<div class="ggmmentWrap">
				<div class="cmgoods-m">
              <div class="mm-cgwl" v-for="(item,index) in list" :class="{touchleft:is_target == index,touchright:is_target == -1}" @touchstart="bindEvent">
                <router-link :data-index=index :to="{name:'goodsDetail',query:{goods_id : item.id}}">
                  <div class="imgbox">
                      <img :src="item.goods_image">
                  </div>
                  <div class="m-ggmsg" :data-index=index>
                      <p class="name db-overflow">{{item.goods_name}}</p>
                      <p class="gmsnum"><span>售价：{{item.goods_price}}</span><span>库存：{{item.goods_number}}</span></p>
                  </div>
                </router-link>
                  <div class="mm-arrow" :class="{on : onStyle == index}"></div>
                  <div class="m-delbtn">
                    <router-link :to="{name:'editGoods',query :{goods_id :item.id}}"><span>编辑</span></router-link>
                  </div>
              </div>
        </div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      is_target : -1,
      startX : 0,
      onStyle : -1,
      category : '全部',
    	list : [],
      firstCat : [],
    	onClass : false,
    	catStyle : 'none',
      searchStyle : 'none',
    	onOff : true,
      onOff2 : true,
      dataJson : {
      	session_id : localStorage.session_id,
        page : 0,
        category_path : '',
      },
      loadData : true,
      nomore : false,
      selNum : 0,
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
    	var that = this.dataJson;
      if(this.loadData == true){
        this.loadData = false;
        that.page++;
        this.$http.post('/Shop/Agent/agentGoods', that,{emulateJSON:true}).then(function(response){
          var returnData = response['data'];
          if( returnData['data']['list'].length ){
            this.list = ( this.list.length ) ? this.list.concat(returnData['data']['list']) : returnData['data']['list'];
            this.firstCat = returnData['data']['firstCat'];
          }else{
            if( this.list.length ){
              this.nomore = true;
            }
          }
          this.$nextTick(function () {
              this.loadData = true;
              this.$store.commit('loading',{show:false});
          })
        })
      }
    },
    selectCategory : function(index,path){
      this.selNum = index;
      this.dataJson.category_path = path;
      this.list = [];
      this.dataJson.page = 0;
      this.showData();
    },
    reShowData(){
      if(!this.onOff2){
        this.dataJson.page = 0;
        this.list = [];
        this.showData();
        this.searchStyle = 'none';
        this.onOff2 = !this.onOff2;
      }else
      this.onOff2 = !this.onOff2;
      
    },
    loadMore(){         
      var that = this;
      that.$store.commit('scrollFun',{dom:'goodsList', auto:true, bottomCall:function(){  
          if ( that.nomore == false ) {
              that.showData();
          }
      }})
    },
    showSearch(is_show){
      if(is_show )
        this.searchStyle = 'block';
      else
        this.searchStyle = 'none';
    },
    toggleCat(){
    	if(this.onOff){
    		this.catStyle = 'block';
    		this.onClass = true;
    	}else{
    		this.catStyle = 'none';
    		this.onClass = false;
    	}
    	this.onOff = !this.onOff;
    },
    selectCategory : function(path,name){
      this.dataJson.page = 0;
      this.list = [];
      this.dataJson.category_path = path;
      this.showData();
      this.showCategory(name);
    },
    showCategory(what){
      this.category = what;
      this.catStyle = 'none';
      this.onClass = false;
      this.onOff = !this.onOff;
    },
     touchSatrtFun : function(event){
        var x = Number(event.touches[0].pageX);
        this.startX = x;           
    },
    touchMoveFun : function(event){  
        var x = Number(event.touches[0].pageX); 
        var index = event.target.parentNode.parentNode.getAttribute('data-index');
        if( x - this.startX < 0 ){
          this.onStyle = index;        
          this.is_target = index;
        }else{
          this.is_target = -1;
          this.onStyle = -1;        
        }
    },
    bindEvent : function(){
        document.addEventListener('touchstart', this.touchSatrtFun, false);
        document.addEventListener('touchmove', this.touchMoveFun, false);
    }
  }

}
</script>


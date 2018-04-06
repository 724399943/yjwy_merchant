<template>
  	<div class="content">		
		<div class="basicWrap">
			<div class="basic_top">
				<header class="head shead">
					<a class="back" href="javascript:window.history.go(-1);"></a>
					<h1 class="y-confirm-order-h1">店铺信息</h1>
				</header>
				<div class="bhwow">
					<div class="wow">
						<div class="imgbox" @click="show(1)">
							<img v-bind:src="logoSrc">
						</div>
					</div>
					<div class="qrwow" @click="show(0)">
							<img src="../assets/images/store_icon_QR@2x.png">
					</div>
				</div>
			</div>
			<ul class="basicCont">
				<li>
					<a href="javascript:;">
						<router-link to="/basicData"><span>基本信息</span></router-link>
					</a>
				</li>
				<li>
					<a href="javascript:;">
						<router-link to="/shopIntroduced"><span>店铺介绍</span></router-link>
					</a>
				</li>
				<li>
					<a href="javascript:;" @click="jumpToPanorama(list['panorama'])">
						<span>3D全景</span>
					</a>
				</li>				
			</ul>
		</div>
		<a href="javascript:;" class="widup" @click="logout">退出登录</a>
		<!-- 弹窗 -->
		<div class="shInmask" v-bind:style="{display:pop}">
			<!-- 弹logo -->
			<div class="shincont" v-bind:style="{display:popLogo}">
				<div class="close"></div>				
				<div class="simgwrap" @click="close">
					<div class="imgbox" >
						<img v-bind:src="logoSrc" >
					</div>
				</div>				
			</div>

			<!-- 弹二维码 -->
			<div class="shincont" v-bind:style="{display:popCode}">
				<div class="close"></div>	
				<div class="simgwrap" @click="close">
					<div class="qrimg">
						<img v-bind:src="agentQrCode">
					</div>
					<p class="qrtips">扫扫上面的二维码，查看我的店铺</p>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {
  data () {
    return {
		pop : 'none',
		popLogo : 'none',
		popCode : 'none',
		logoSrc : '',
		agentQrCode : '',
		dataJson : {
			session_id : localStorage.session_id,
		},
		list : {},
		iphone : false,
		android : false,
    }
  },
  created(){
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('micromessenger') == -1) {
		if (ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 || ua.indexOf('ipod') != -1) {
			this.iphone = true;
			this.android = false;
		} else {
			this.iphone = false;
			this.android = true;
		}
	}
  	this.getData();
  },
  methods: {
  	getData : function(){
  		this.$http.post('/Shop/Agent/agentInfo', this.dataJson,{emulateJSON:true}).then(function(response){
  			var returnData = response['data'];
  			this.list = returnData['data']['list'];
  			this.logoSrc = this.list.logo;
  			this.agentQrCode = this.list.agentQrCode;
  		})
  	},
  	logout(){
			this.$http.post('/Shop/Login/logout', {}, {emulateJSON:true}).then(function(response){
                var returnData = response['data'];
                if( returnData['status'] == "200000" ){
                    localStorage.clear();
                    this.$router.push({name: 'login'});
                } 
            });
		},
  	show : function(islogo){
  		if(islogo){
  			this.pop = 'block';
    		this.popLogo = 'block';
    		this.popCode = 'none';
  		}else{
  			this.pop = 'block';
    		this.popCode ="block";
  		}
  	},
  	close : function(){
  		this.pop = 'none';
  	},
  	jumpToPanorama(url){
        if ( this.android === true ) {
          window.location.href = url;
        } else {
          var title = encodeURI('全景逛店'),
          uri = encodeURIComponent(url);
          window.location.href = "mitchell://blank?url="+ uri +"&title="+ title;
        }
      }
  }

}
</script>


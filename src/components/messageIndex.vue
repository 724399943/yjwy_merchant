<template>
  	<div class="content" id="messageIndex">
  		<header class="head">
			<a class="back" href="javascript:window.history.go(-1);"></a>
			<h1 class="y-confirm-order-h1">消息</h1>
		</header>
		<div class="main">
			<div class="news_wrap">					
				<div class="chat_news">
					<ul>
						<li v-for="(data, index) in list" @click="jumpToChat(userInfo['id'],data['id'],data['nickname'],data['headimgurl'])">
							<div class="cnews">
								<div class="imgbox">
									<img :src="data['headimgurl']">
									<em class="dot" v-if="data['count']>0">{{data['count']}}</em>
								</div>
								<div class="s_new_m">
									<p class="stt"><span>{{data['nickname']}}</span><em>{{data['add_time'] | filterTime}}</em></p>
									<p class="nmt" v-if="data['content'] && data['content']['type'] == '1'">{{data['content']['content']}}</p>
									<p class="nmt" v-else-if="data['content'] && data['content']['type'] == '2'">[图片]</p>
									<p class="nmt" v-else-if="data['content'] && data['content']['type'] == '3'">[语音]</p>
								</div>
							</div>
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
			dataJson : {
				page : 0,
			},
			list : [],
			userInfo : {},
			loadData : true,
			nomore : false,
			noResult : false,
			userAgent : navigator.userAgent.toLowerCase(),
			wechatAgent : false,
			from : '',
		}
	},
	beforeCreate(){
		this.$store.commit('imini');
	},
	created(){
		this.wechatAgent = ( this.userAgent.indexOf('micromessenger') != -1 ) ? true : false;
		// this.wechatAgent = true;
		this.loadUserChat();
	},
	components :{
		
	},
	mounted(){
		this.loadMore();
  	},
  	watch : {
		'$store.state.messageData':'initMessage',
	},
	filters:{
		filterTime:function(timestamp){
			timestamp = timestamp * 1000;
			var date = new Date();
			var now = date.getTime(); //当前时间戳

			var date = new Date();
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			var today = date.getTime(); //今天0点时间戳

			var timer = (now - timestamp) / 1000;   // 转换为秒级时间戳
			var tips = '';
			var timeTips = new Date(timestamp).getHours() + ' : ' + new Date(timestamp).getMinutes();
			if (timer <= 0) {
			  	tips = timeTips;
			} else if (Math.floor(timer/60) <= 0) {
			  	tips = timeTips;
			} else if (timer < 3600) {
			  	tips = timeTips;
			} else if (timer >= 3600 && (timestamp - today >= 0) ) {
			  	tips = timeTips;
			} else {
				var date = new Date(timestamp);
				var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				tips = date.getFullYear() + '-' + month + "-" + day;
			}
			return tips;
		},
  	},
	methods: {
		loadUserChat(){
			var that = this;
		    if ( that.loadData == true ) {
		        that.dataJson.page++;
		        that.loadData = false;
		        that.$http.post('/Shop/Chat/chatHistory', that.dataJson, {emulateJSON:true}).then(function(response){
		            var returnData = response['data'];
		            this.userInfo = returnData['data']['user'];
		            this.from = 'yjwy' + this.userInfo.id;
		            if ( returnData['data']['list'].length ) {
		                that.list = ( that.list.length ) ? that.list.concat(returnData['data']['list']) : returnData['data']['list'];
		                if ( this.wechatAgent === true ) {
                        	that.$store.commit('imlogin', {userId : this.from, passWord: this.from});
                        }
		            	// this.$store.commit('imlogin', {userId : this.from, passWord: this.from});
		                this.initMessage();
		            } else {
		                if ( that.list.length ) {
		                    that.nomore = true;
		                } else {
		                    that.noResult = true;
		                }
		            }
		            that.$nextTick(function () {
		                that.loadData = true;
		                // that.$store.commit('loading',{show:false});
		            })
		        });
		    }
		},
		loadMore(){
		    this.$store.commit('scrollFun',{dom:'messageIndex',auto:true,bottomCall:function(){        
		        if ( this.nomore == false ) {
		            this.loadUserChat();
		        }
		    }})
		},
		initMessage(){
			var messageList = localStorage.messageList;
			if ( messageList ) {
				var messageList = JSON.parse(messageList);
				/****处理显示列表信息*****/
				for(var i=0; i<this.list.length; i++){
					for(var j=0; j<messageList.length; j++){
						var list_from = 'yjwy' + this.list[i].id,
							messageData = messageList[j];
						if( list_from == messageData.id ){
							this.list[i].content = {type:messageData['type'],content:messageData['content']};
							this.list[i].count = messageData.total;
							// this.list[i].add_time = this.filterTime(messageData.time);
							this.list[i].add_time = messageData.time / 1000;
							break;
						}
					}
				}
			}
		},
		//重置本地信息的total
		resetTotal(fromId){
			fromId = 'yjwy' + fromId;
			var messageList =  localStorage['messageList'];
			if ( messageList ) {
				var messageList = JSON.parse(messageList);
				for(var i=0; i<messageList.length; i++){
					if( messageList[i].id == fromId ){
						messageList[i].total = 0;
						break;
					}
				}
				localStorage['messageList'] = JSON.stringify(messageList);
			}
			this.initMessage();
		},
		jumpToChat(uid,aid,aname,headimgurl){
			this.resetTotal(aid);
			if ( this.wechatAgent === true ) {
				this.$router.push({name:'consultation', query:{uid:uid,aid:aid,aname:aname}});
			} else {
				window.location.href = 'mitchell://chat?user_id='+ aid +'&nickname='+ aname +'&headimgurl='+ headimgurl;
			}
		}
	}

}
</script>


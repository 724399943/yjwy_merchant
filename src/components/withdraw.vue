<template>
  	<div class="content">
		<header class="head">
      <router-link :to="{name: 'myBalance'}">
			 <a class="back" href=""></a>
      </router-link>
			<h1 class="y-confirm-order-h1">申请提现</h1>
		</header>
		<div class="main">
			<div class="whdrawWrap">
				<div class="drawMsg">
					<div class="ondraw">
						<span>持卡人</span>
						<input type="text" name="" placeholder="请输入持卡人姓名" v-model="dataJson.truename" @input="checkFinish">
					</div>
					<div class="ondraw">
						<span>卡号</span>
						<input type="text" name="" placeholder="请输入银行卡号" v-model="dataJson.account" @input="checkFinish">
					</div>
					<div class="ondraw">
						<span>开户行</span>
						<div class="odselect">
							<select v-model="dataJson.bank">
								<option>选择银行</option>
                <option v-for="item in banks">{{item.bank_name}}</option>
							</select>
						</div>
					</div>
					<div class="ondraw">
						<span>开户支行</span>
						<input type="text" name="" placeholder="请输入开户支行" v-model="dataJson.bank_branch"  @input="checkFinish" >
					</div>
				</div>
				<div class="drawMsg">
					<p class="title">提现金额</p>
					<div class="txmoney">
						<span>￥</span>
						<input type="text" name="" value="0" v-model="dataJson.money" @input="checkFinish">
					</div>
					<p class="tips">当前余额：{{money}}元</p>
				</div>
				<a href="javascript:;" class="whdrawBtn" @click="withdraw" v-bind:style="{background : btnStyle}">提现</a>
			</div>
			<!-- 弹窗 -->
			<div class="whdrawMask" v-bind:style="{display:displayStyle}">
				<div class="whdmbox">
					<p>提现申请成功，工作人员将在每周二统一处理上一周申请，款项将在处理后3个工作日内到账</p>
					<router-link to="/myBalance">确定</router-link>
				</div>
			</div>
		</div>
  	</div>
</template>
<script>
export default {

  data () {
    return {
      btnStyle : '#CCC',
    	money : 0,
    	displayStyle : 'none',
    	banks : '',
      dataJson : {
      	session_id : localStorage.session_id,
        bank : '选择银行',
      }
    }
  },
  created(){
  	this.getMoney();
  	this.getBank();
  },
  methods: {
    withdraw : function(){
    	var that = this.dataJson;
    	if(!that.truename){
    		this.$store.commit('alert',{show:true,text:'请输入持卡人姓名'});
    		return;
    	}
    	if(!that.account){
    		this.$store.commit('alert',{show:true,text:'请输入银行卡号'});
    		return;
    	}
      if(that.bank == '选择银行'){
    		this.$store.commit('alert',{show:true,text:'请选择银行'});
        return;
      }
      if(!that.bank_branch){
        this.$store.commit('alert',{show:true,text:'请输入开户支行'});
        return;
      }
      if(!that.money){
        this.$store.commit('alert',{show:true,text:'请输入提现金额'});
        return;
      }
      if(!this.verifyMoney(that.money)){
        this.$store.commit('alert',{show:true,text:'请输入正确的提现金额'});
        return;
      }
    	this.$http.post('/Shop/Finance/withdraw', this.dataJson,{emulateJSON:true}).then(function(response){
  			var returnData = response.data;
  			if(returnData.status = '200000'){
          this.displayStyle = 'block';
  			}else{
  				this.$store.commit('alert',{show:true,text:returnData.message});
  			}
  		})
    },
    checkFinish : function(){
      var that = this.dataJson;
      if(that.money > this.money)
        that.money = this.money;
      if( that.truename && that.account && that.bank_branch && this.verifyMoney(that.money) && that.bank != '选择银行')
        this.btnStyle = '';
      else
        this.btnStyle = '#CCC';
    },
    //获得当前余额
    getMoney : function(){
    	this.$http.post('/Shop/Finance/moneyLog', {},{emulateJSON:true}).then(function(response){
  			var incomeData = response['data'];
        this.money = incomeData['data']['money'];
        this.dataJson.money = this.money;
  		})
    },
    //显示提现按钮
    //获得提现的银行
    getBank : function(){
    	this.$http.post('/Shop/Public/getwithdrawBank',{},{emulateJSON:true}).then(function(response){
  			var returnData = response.data;
  			if(returnData['status'] == 200000){
  				this.banks = returnData['data']['banks'];
  			}
  		})
    },
    verifyMoney(s){
      var reg = /^\d+(?=\.{0,1}\d+$|$)/
      if(reg.test(s)) return true;
      return false ; 
    },
  }

}
</script>


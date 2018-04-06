import Vue from 'vue'
import Router from 'vue-router'
// 首页
import index from '@/components/index'
// 登录
import login from '@/components/login'
// 编辑订单
import editOrder from '@/components/editOrder'
// 编辑配送信息
import editDeliveryMsg from '@/components/editDeliveryMsg'
// 编辑配送信息
import sellerRemarks from '@/components/sellerRemarks'
// 订单列表
import orderList from '@/components/orderList'
// 订单详情
import orderDetail from '@/components/orderDetail'
// 消息聊天
import consultation from '@/components/consultation'
// 选择商品
import chooseGoods from '@/components/chooseGoods'
// 消息
import messageIndex from '@/components/messageIndex'
// 我的
import personalCenter from '@/components/personalCenter'
// 基本信息
import basicData from '@/components/basicData'
// 店铺介绍
import shopIntroduced from '@/components/shopIntroduced'
// 3D全景图
import panorama from '@/components/panorama'
// 店铺信息
import shopInfo from '@/components/shopInfo'
// 我的余额
import myBalance from '@/components/myBalance'
// 申请提现
import withdraw from '@/components/withdraw'
// 销售统计
import salesStatistics from '@/components/salesStatistics'
// 商品详情
import goodsDetail from '@/components/goodsDetail'
// 编辑商品
import editGoods from '@/components/editGoods'
// 商品管理
import goodsManagement from '@/components/goodsManagement'
// 售后订单
import afterSalesOrder from '@/components/afterSalesOrder'
// 售后详情
import aftermarketDetails from '@/components/aftermarketDetails'
// 现金流水
import cashFlow from '@/components/cashFlow'
// 忘记密码
import forgotPassword from '@/components/forgotPassword'

Vue.use(Router)

export default new Router({
  base: '/Saler/',
  mode: 'history',
  routes: [    
    {
      path: '/',
      name: 'index',
      components: {
        default: index
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: login
      }
    },
    {
      path: '/editOrder',
      name: 'editOrder',
      components: {
        default: editOrder
      }
    },
    {
      path: '/editDeliveryMsg',
      name: 'editDeliveryMsg',
      components: {
        default: editDeliveryMsg
      }
    },
    {
      path: '/sellerRemarks',
      name: 'sellerRemarks',
      components: {
        default: sellerRemarks
      }
    },
    {
      path: '/orderList',
      name: 'orderList',
      components: {
        default: orderList
      }
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      components: {
        default: orderDetail
      }
    },
    {
      path: '/consultation',
      name: 'consultation',
      components: {
        default: consultation
      }
    },
    {
      path: '/chooseGoods',
      name: 'chooseGoods',
      components: {
        default: chooseGoods
      }
    },
    {
      path: '/messageIndex',
      name: 'messageIndex',
      components: {
        default: messageIndex
      }
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      components: {
        default: personalCenter
      }
    },
    {
      path: '/basicData',
      name: 'basicData',
      components: {
        default: basicData
      }
    },
    {
      path: '/shopIntroduced',
      name: 'shopIntroduced',
      components: {
        default: shopIntroduced
      }
    },
    {
      path: '/panorama',
      name: 'panorama',
      components: {
        default: panorama
      }
    },
    {
      path: '/shopInfo',
      name: 'shopInfo',
      components: {
        default: shopInfo
      }
    },
    {
      path: '/myBalance',
      name: 'myBalance',
      components: {
        default: myBalance
      }
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      components: {
        default: withdraw
      }
    },
    {
      path: '/salesStatistics',
      name: 'salesStatistics',
      components: {
        default: salesStatistics
      }
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      components: {
        default: goodsDetail
      }
    },
    {
      path: '/editGoods',
      name: 'editGoods',
      components: {
        default: editGoods
      }
    },
    {
      path: '/goodsManagement',
      name: 'goodsManagement',
      components: {
        default: goodsManagement
      }
    },
    {
      path: '/afterSalesOrder',
      name: 'afterSalesOrder',
      components: {
        default: afterSalesOrder
      }
    },
    {
      path: '/aftermarketDetails',
      name: 'aftermarketDetails',
      components: {
        default: aftermarketDetails
      }
    },
    {
      path: '/cashFlow',
      name: 'cashFlow',
      components: {
        default: cashFlow
      }
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      components: {
        default: forgotPassword
      }
    }
  ]
})

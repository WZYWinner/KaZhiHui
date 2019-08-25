//index.js
//获取应用实例
const app = getApp()
var config = require("../../config.js")
// 加密
var fengMd5 = require("../../utils/fengMd5.js");

Page({
  data: {
    jiangliShow: false,
    imgUrls1: [],
    imgUrls2: [],
    indicatorDots1: true,
    autoplay1: true,
    interval1: 5000,
    duration1: 1000,
    imgHttp: "",
    indicatorDots2: true,
    autoplay2: true,
    interval2: 3000,
    duration2: 1000,
    noicon: "none"
  },
  // 页面加载 页面每次打开  每次调用
  onShow: function () {

    // 判断缓存中是否有token 若无跳转到登录界面
    // if (!wx.getStorageSync('token')) {
    //   wx.navigateTo({
    //     url: '../login/index'
    //   });
    // }else{
    this.setData({
      imgHttp: config.imgserver
    })
    // 轮播图
    wx.request({
      url: config.netServer + "Home/AppHome", //开发者服务器接口地址",
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        apiToken: wx.getStorageSync('token'),
        uid: wx.getStorageSync('uid'),
        from: "web"
      },
      dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: res => {
        console.log("1", res)
        this.setData({
          imgUrls1: res.data.result.banner,
          imgUrls2: res.data.result.adList
        })
      },
      fail: () => {},
      complete: () => {}
    });
    // }

  },
  // 页面显示 一个页面只加载一次
  onLoad: function () {

  },
  // 前往奖励页
  onreward: function () {

  },
  // 奖励机制关闭
  jiangliClose: function (e) {
    this.setData({
      jiangliShow: false
    })
  },
  // 商户收款
  onmerchantReceipt: function (e) {
    wx.navigateTo({
      url: '../merchantReceipt/index'
    });
  },
  // 智能还款
  onchooseDebitCard: function () {

    // 查询用户是否已注册  注册 跳转到制定计划页面../customPlan/index   若无 跳转到 选择借记卡页面
    var resCode = "R00263";
    var resData = {
      UId: JSON.stringify(wx.getStorageSync('uid'))
    }
    var curTemp = fengMd5(resCode, resData);
    wx.request({
      url: config.admainServer + 'svr/RepaymentHelper.ashx',
      data: {
        reqdata: curTemp
      }, //请求的参数",
      method: 'GET',
      dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: res => {
        console.log('查看智能还款 用户是否已经注册', res)

        if (res.data.RespData.RespHead.Status == 200) {
          // count == 0  没注册
          if (res.data.RespData.RespBody.count == 0) {
            wx.navigateTo({
              url: '../chooseDebitCard/index'
            });
          }
          if (res.data.RespData.RespBody.count > 0) {
            wx.navigateTo({
              url: '../customPlan/index'
            });
          }
        }else{
          config.showToast(res.data.RespData.RespHead.Message,this.data.noicon)
        }

      },
      fail: () => {},
      complete: () => {}
    });


  },
  // 积分兑换
  onexchange: function (e) {
    wx.navigateTo({
      url: '../exchange/index'
    });
  },
  // 申请信用卡
  onappliCreditCard: function (e) {
    wx.navigateTo({
      url: '../appliCreditCard/index'
    });
  },
  // 贷款
  onchooseLoan: function (e) {
    wx.navigateTo({
      url: '../chooseLoan/index'
    });
  },
  // 卡医生
  onkaDoctor: function (e) {
    wx.navigateTo({
      url: '../kaDoctor/index'
    });
  },
  // 征信查询
  onzhengxinSearch: function (e) {
    wx.navigateTo({
      url: '../zhengxinSearch/index'
    });
  },
  // 账单查询
  onzhangdanSearch: function (e) {
    wx.navigateTo({
      url: '../zhangdanSearch/index'
    });
  },
})
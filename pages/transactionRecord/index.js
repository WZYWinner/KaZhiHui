// 引用实例
var app = getApp();
var config = require("../../config.js");
var fengMd5 = require("../../utils/fengMd5.js")
Page({
    data: {
        uid: "",
        recordList: []
    },
    // 
    onLoad: function(){
        // 获取商户收款的交易记录
        var reqCode = "R00015";
        this.setData({
            uid: JSON.stringify(wx.getStorageSync('uid'))
        })
        console.log(typeof this.data.uid)
        console.log(this.data.uid)
        var reqData = {
            userId: JSON.stringify(wx.getStorageSync('uid')),
        }
        var curTemp = fengMd5(reqCode,reqData);
        wx.request({
          url: config.admainServer + 'svr/KaBaoService.ashx', //开发者服务器接口地址",
          data: {
            reqdata: curTemp
          }, //请求的参数",
          method: 'GET',
          dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
          success: res => {
              console.log("记录", res.data.RespData.RespBody);
              this.setData({
                recordList: res.data.RespData.RespBody
              })
          },
          fail: () => {},
          complete: () => {}
        });
    },
})

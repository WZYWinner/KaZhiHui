// 引用实例
var app = getApp();
// 引用config
var config = require("../../config.js");
// 加密文件
var fengMd5 = require('../../utils/fengMd5.js');

Page({
    data: {
        zhangdanList: [],
        textfail: "请求出错",
        noicon: "none"
    },
    // 
    onLoad: function(){
        var reqCode = "R00220";
        var reqData = {
            apiToken: wx.getStorageSync('token'),
            UId: wx.getStorageSync('uid'),
        };
        var Temp = fengMd5(reqCode,reqData);
        console.log(111, Temp)
        wx.request({
          url: config.admainServer + "svr/AppApi.ashx",
          data: {
            reqdata: Temp
          }, //请求的参数",
          method: 'GET',
          dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
          success: res => {
              console.log(res)
              if (res.data.RespData.RespHead.Status == 200) {
                this.setData({
                    zhangdanList: res.data.RespData.RespBody
                })
            } else {
                // 显示请求错误
                config.showToast(this.data.textfail, this.data.noicon);
            }
          },
          fail: () => {},
          complete: () => {}
        });
    },
    // 银行服务大厅
    onbankServerDdting: function (e) {
        console.log(e.currentTarget.dataset.item)
        // console.log(e.currentTarget.dataset.item.积分查询)
        // console.log(e.currentTarget.dataset.item.账单查询)
        // console.log(e.currentTarget.dataset.item.额度查询)
        wx.navigateTo({
            url: '../bankServerDdting/index?bankName=' + e.currentTarget.dataset.name.substring(0, 2) + "&Phone=" + e.currentTarget.dataset.phone + "&Items="+JSON.stringify(e.currentTarget.dataset.item)
        });
    }
})
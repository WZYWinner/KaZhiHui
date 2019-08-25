// 引用实例
var app = getApp();
var config = require("../../config.js");
// 加密
var fengMd5 = require("../../utils/fengMd5.js");

Page({
    data: {
        passagewayList: []
    },
    onLoad: function () {
        // https://admin.fjkzh.cn/svr/KaBaoService
        // 通道列表
        var reqCode = "R10017";
        var reqData = {
            UId: JSON.stringify(wx.getStorageSync('uid')),
            version: "1.2.59"
        }
        var curTemp = fengMd5(reqCode, reqData)
        wx.request({
            url: config.admainServer + "svr/KaBaoService.ashx",
            data: {
                reqdata: curTemp
            }, //请求的参数",
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("通道列表", res.data);
                this.setData({
                    passagewayList: res.data.RespData.RespBody
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 可支持银行
    onsupportBank: function (e) {
        wx.navigateTo({
            url: '../supportBank/index'
        });
    },
    // 预约计划
    onreservaPlan: function (e) {
        console.log(e.currentTarget.dataset)
        wx.navigateTo({
            url: '../reservaPlan/index'
        });
    },
    // 交易记录
    onTransactionRecord: function () {
        wx.navigateTo({
            url: '../transactionRecord/index'
        });
    },
    // 选择借记卡
    onchooseDebitCard: function (e) {
        // extend
        console.log("传999", e.currentTarget.dataset.productcode);
        console.log("传1", e.currentTarget.dataset.userinfo);
        if (!e.currentTarget.dataset.userinfo) {
            wx.navigateTo({
                url: '../chooseDebitCard/index?productcode=' + e.currentTarget.dataset.productcode+"&extend="+e.currentTarget.dataset.extend
            });
        } else {
            wx.navigateTo({
                url: '../shannghuReceivables/index?productcode=' + e.currentTarget.dataset.productcode + "&userinfo=" + JSON.stringify(e.currentTarget.dataset.userinfo) + "&feerate=" + e.currentTarget.dataset.feerate+"&extend="+e.currentTarget.dataset.extend
            });
        }

    },

})
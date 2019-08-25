// 引用实例
var app = getApp();
// 引入
var config = require("../../config.js");

Page({
    data: {
        exchangeList: [],
        imgHttp: "",
    },
    onLoad: function () {
        this.setData({
            imgHttp: config.imgserver
        })
        // https://www.fjkzh.cn/Bank/GetBankList
        wx.request({
            url: config.netServer + "Bank/GetBankList",
            data: 'data', //请求的参数",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                apiToken: wx.getStorageSync('token'),
                uid: wx.getStorageSync('uid'),
                from: "web"
            },
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("333", res)
                this.setData({
                    exchangeList: res.data.result
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 跳转到详情页
    onexchangeDetail: function (e) {
        console.log(e.currentTarget.dataset.submittype)
        wx.navigateTo({
            url: '../exchangeDetail/index?bankId=' + e.currentTarget.dataset.id + "&submitType=" + e.currentTarget.dataset.submittype
        });
    },
})
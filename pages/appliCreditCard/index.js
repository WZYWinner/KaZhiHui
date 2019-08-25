// 引用实例
var app = getApp();
var config = require("../../config.js");

Page({
    data: {
        creditCardList: []
    },
    onLoad: function(){
        wx.request({
            url: config.netServer + "ApplayCreditCard/GetList",
            data: {
                Type: 1
            }, //请求的参数",
            header: config.temp,
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("999", res.data)
                this.setData({
                    creditCardList: res.data.result
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 立即申请
    onimmediApply: function(e){
        wx.navigateTo({ url: '../immediApply/index' });
    },
})
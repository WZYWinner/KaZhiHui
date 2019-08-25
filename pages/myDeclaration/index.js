// 引用实例
var app = getApp();
var config = require("../../config.js");

Page({
    data: {
        planActive: 1,
        noStartList: [],
        implementList: [],
        finishList: []

    },
    onplanChange: function(e){

    },
    onLoad: function () {
        this.setData({
            imgHttp: config.netServer
        })
        // http://www.fjkzh.cn/Submit/GetList
        wx.request({
            url: config.netServer + "Submit/GetList",
            data: {
                Type: 0
            }, //请求的参数",
            header: config.temp,
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("888", res.data)
                this.setData({
                    noStartList: res.data.result
                })
            },
            fail: () => {},
            complete: () => {}
        });

        wx.request({
            url: config.netServer + "Submit/GetList",
            data: {
                Type: 1
            }, //请求的参数",
            header: config.temp,
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("999", res.data)
                this.setData({
                    implementList: res.data.result
                })
            },
            fail: () => {},
            complete: () => {}
        });

        wx.request({
            url: config.netServer + "Submit/GetList",
            data: {
                Type: 2
            }, //请求的参数",
            header: config.temp,
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("000", res.data)
                this.setData({
                    finishList: res.data.result
                })
            },
            fail: () => {},
            complete: () => {}
        });
    }
})

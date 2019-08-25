// 引用实例
var APP = getApp();
var config = require("../../config.js");
var fengMd5 = require("../../utils/fengMd5.js");

Page({
    data: {
        productcode: "",
        comfirmShow: false,
        codeList: [],
        userInfo: null,
        usercardid: null,
        extend: null
    },
    // 
    onLoad: function (ops) {
        this.setData({
            extend: ops.extend,
            productcode: ops.productcode
        })
        // Mobile
        console.log(ops)
        console.log(typeof wx.getStorageSync('uid'));
        var reqCode = "R00401";
        var reqData = {
            UId: JSON.stringify(wx.getStorageSync('uid')),
            ChannelCode: this.data.productcode,
            CardCode: 0
        }
        var curTemp = fengMd5(reqCode, reqData)
        // 查询卡包
        wx.request({
            url: config.admainServer + 'svr/AppApi.ashx', //开发者服务器接口地址",
            data: {
                reqdata: curTemp
            }, //请求的参数",
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("我是卡包", res)
                if (res.data.RespData.RespBody.length != 0) {
                    this.setData({
                        codeList: res.data.RespData.RespBody
                    })
                }
            },
            fail: () => {},
            complete: () => {}
        });

    },
    // 添加借记卡
    onaddDebitCard: function (e) {
        wx.navigateTo({
            url: '../addDebitCard/index'
        });
    },
    // 点击卡片
    onshannghuReceivables: function (e) {
        // currentTarget
        console.log(e.currentTarget.dataset.id)
        this.setData({
            comfirmShow: true,
            usercardid: e.currentTarget.dataset.id
        })
    },
    // 弹出框关闭
    comfirmClose: function (e) {
        this.setData({
            comfirmShow: false
        })
    },
    // 弹出框确认后跳转
    onreward: function (e) {
        console.log(this.data.userInfo);
        console.log(typeof wx.getStorageSync('uid'))
        // 通道A
        if (this.data.extend == 1) {
            // 确认进行注册
            var reqCode = "R00007";
            var reqData = {
                userId: JSON.stringify(wx.getStorageSync('uid')),
                UserCardId: this.data.usercardid
            }
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/KaBaoService.ashx',
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log(res.data);
                    wx.navigateTo({
                        url: '../merchantReceipt/index'
                    });
                },
                fail: () => {},
                complete: () => {}
            });
        }

        // 通道B
        if (this.data.extend == 6) {
            // 确认进行注册
            var reqCode = "R00221";
            var reqData = {
                UserID: JSON.stringify(wx.getStorageSync('uid')),
                UserCardId: this.data.usercardid
            }
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/Chanpay11000.ashx',
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log(res.data);
                    wx.navigateTo({
                        url: '../merchantReceipt/index'
                    });
                },
                fail: () => {},
                complete: () => {}
            });
        }

        // 通道C
        if (this.data.extend == 7) {
            // 确认进行注册
            var reqCode = "R00221";
            var reqData = {
                UserID: JSON.stringify(wx.getStorageSync('uid')),
                UserCardId: this.data.usercardid
            }
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/JuFuPay.ashx',
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log(res.data);
                    if (res.data.RespData.RespHead.Status == 200) {
                        wx.navigateTo({
                            url: '../merchantReceipt/index'
                        });
                    } else {
                        config.showToast(res.data.RespData.RespHead.Message)
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        }
    },
})
// 引用实例
var app = getApp();
var config = require("../../config.js");

Page({
    data: {
        imageWidth: 0,
        imageHeight: 0,
        userInfo:[],
        money:3,
        id: 0,
        moneyVal: ""
    },
    withdrawalAccount: function(){
        wx.navigateTo({ url: '../withdrawalAccount/index' });
    },
    moneyCount: function(e){
        this.data.money=e.detail.value
        this.setData({
            moneyVal: e.detail.value
        })
        console.log(this.data.moneyVal)
    },
    onLoad: function(){
       var that=this;
        wx.request({
            url: config.netServer + "Home/AppUserCenter",
            data: {
               
            }, //请求的参数",
            header: config.temp,
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("info", res)
                that.setData({
                    userInfo: res.data.result.userInfo
                })
                console.log("info1",this.data.userInfo)
            },
            fail: () => {},
            complete: () => {}
        });
console.log("345",this.data.userInfo)
       
    },
    withdrawalRecord: function(){
        wx.navigateTo({ url: '../withdrawalRecord/index' });
    }
    ,


    onON: function(e){
        console.log(e.detail.value)
        var appp = e.detail.value;

        appp.AccountID = 10033
        console.log(appp)
        console.log(config.temp)
        wx.request({
            url: config.netServer + "User/WithdrawSubmitMoney",
            data: appp, //请求的参数",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                apiToken: wx.getStorageSync('token'),
                uid: wx.getStorageSync('uid'),
                from: "web"
            },
            method: 'POST',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("888", res)
                this.setData({
                    // userInfo: res.data.result.userInfo,
                    // id: res.data.result.userInfo.id
                })
                // console.log("info2",id)
            },
            fail: () => {},
            complete: () => {}
        });
    }
})

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
        moneyVal: "",
        CardInfo:''
    },
    
    CardInfochange: function(e){
        // this.data.CardInfo=e.detail
        this.setData({
            CardInfo: e.detail
        })
        console.log(this.data.CardInfo)
    },
    onLoad: function(){

        wx.request({
            url: config.netServer + "Home/AppUserCenter",
            data: {
               
            }, //请求的参数",
            header: config.temp,
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    userInfo: res.data.result.userInfo
                })
                console.log("info1",this.data.userInfo)
            },
            fail: () => {},
            complete: () => {}
        });


    },

    commit: function(e){
        // var RealName=e.target.dataset.realname
        // var UserName=e.target.dataset.username
        // var Phone=e.target.dataset.phone
        // var IDCard=e.target.dataset.idcard

        // console.log("tst",RealName+UserName)
        console.log("tsCardInfot",this.data.CardInfo)
        console.log("tsCardInfot",this.data.userInfo)

        wx.request({
            url: config.netServer + "User/BindBankCard",
            data: {
                RealName: this.data.userInfo.name,
                Phone: this.data.userInfo.phone,
                CardInfo: this.data.CardInfo,
                IDCard: this.data.userInfo.idCard,
                Type: "1"
            }, //请求的参数",
            header: config.temp,
            method: 'POST',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log(res)
                // this.setData({
                //     userInfo: res.data.result.userInfo
                // })
                wx.navigateTo({ url: '../withdrawalAccount/index' });
            },
            fail: () => {},
            complete: () => {}
        });

    }
})

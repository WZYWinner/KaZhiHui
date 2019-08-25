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
        AccountID:"",
        cardList:[]
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
        wx.request({
            url: config.netServer + "Home/AppUserCenter",
            data: {
               
            }, //请求的参数",
            header: config.temp,
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("info", res)
                this.setData({
                    userInfo: res.data.result.userInfo
                })
                console.log("info1",this.data.userInfo)
            },
            fail: () => {},
            complete: () => {}
        });

        // setTimeout(()=>{
        //     console.log("345",this.data.userInfo)
        // },3000)

        wx.request({
            url: config.netServer + "User/BankCards",
            data: {
                
            }, //请求的参数",
            header: config.temp,
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("info3", res)
                this.setData({
                   cardList: res.data.result
                })
               
            },
            fail: () => {},
            complete: () => {}
        });

       
    },
    withdrawalRecord: function(){
        wx.navigateTo({ url: '../withdrawalRecord/index' });
    }
    ,


    onON: function(e){
        console.log(e.detail)
        var appp = e.detail.value;
        var AccountID = e.detail.target.dataset.id
        console.log("acc",AccountID)
        appp.AccountID = AccountID
        appp.money=Number(appp.money)
        console.log(appp)
        console.log(config.temp)

        wx.request({
            url: config.netServer + "User/BankCards",
            data: {
                // UserID: AccountID
            }, //请求的参数",
            header: config.temp,
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("lala", res)

                // wx.request({
                //     url: config.netServer + "User/WithdrawSubmitMoney",
                //     data: appp, //请求的参数",
                //     // header: {
                //     //     "content-type": "application/x-www-form-urlencoded",
                //     //     apiToken: wx.getStorageSync('token'),
                //     //     uid: wx.getStorageSync('uid'),
                //     //     from: "web"
                //     // },
                //     header: config.temp,
                //     method: 'POST',
                //     dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                //     success: res => {
                //         console.log("888", res)
                //         this.setData({
                //             // userInfo: res.data.result.userInfo,
                //             // id: res.data.result.userInfo.id
                //         })
                //         // console.log("info2",id)
                //     },
                //     fail: () => {},
                //     complete: () => {}
                // });

                this.setData({
                    
                })
                
            },
            fail: () => {},
            complete: () => {}
        });

        
    }
})

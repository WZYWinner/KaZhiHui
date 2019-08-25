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
    withdrawalAccount: function(e){
        console.log("www",e)
        var index=e.currentTarget.dataset.index
        wx.navigateTo({ url: '../myEarningWithdrawal/index?cardID='+index });
    },
    withdrawalAccountAdd: function(){
        wx.navigateTo({ url: '../withdrawalAccountAdd/index' });
    },
    onload: function(){
       
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

                this.setData({
                    userInfo: res.data.result
                })
                
            },
            fail: () => {},
            complete: () => {}
        });


     

       
    },


    delete:function(e){

        var index=e.currentTarget.dataset.index
        var ID=this.data.userInfo.id
        console.log("tset",ID)

        wx.request({
            url: config.netServer + "User/DeleteBankCrad",
            data: {
                ID:this.data.userInfo[index].id
            }, 
            header: config.temp,
            method: 'POST',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                wx.navigateTo({ url: '../withdrawalAccount/index' });
                
            },
            fail: () => {},
            complete: () => {}
        });
    }
})

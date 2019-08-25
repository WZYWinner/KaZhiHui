// 引用实例
var app = getApp();
// 引用
var config = require("../../config.js");

Page({
    data: {
        planActive: 0,
        noStartList: true,
        implementList: true,
        finishList: false,
        promote_withdraw_arnings: 0.0004,
        promote_accumulated_earnings: 0.0005,
        promote_total_spending: 0.0006,
        daily_withdraw_arnings: 0.0007,
        daily_accumulated_earnings: 0.0000,
        daily_total_spending: 0.0000,
        application_active: 0,
        promote_active: 0,
        daily_active: 0,
        application_total_list: [],
        application_income_list: [],
        application_spending_list: [],
        promote_total_list: [],
        promote_income_list: [],
        promote_spending_list: [],
        daily_total_list: [],
        money: '',
        hisMoney: '',
        payment: '',
        totalMoney:'',
        inComeMoney:'',
        payMoney:''

    },
    onplanChange: function(e){

    },
    myApplyEarningWithdrawal: function(){
      wx.navigateTo({ url: '../myEarningWithdrawal/index' });
    },
    onShow: function(e){

        //应用收益
        wx.request({
            url: config.netServer+ "Money/SubmitMoney", //开发者服务器接口地址",
            data: {
                Type: 0
            }, //请求的参数",
            method: 'GET',
            header: config.temp,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    money: res.data.result.money,
                    hisMoney: res.data.result.hisMoney,
                    payment: res.data.result.payment
                })
              console.log("应用收益",res)
            },
            fail: () => {},
            complete: () => {}
          });
          //全部
        wx.request({
            url: config.netServer+ "Money/SubmitMoneyLog", //开发者服务器接口地址",
            data: {
                Type: 0
            }, //请求的参数",
            method: 'GET',
            header: config.temp,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    application_total_list: res.data.result
                })
              console.log("全部",this.data.application_total_list)
            },
            fail: () => {},
            complete: () => {}
          });

          //收入
          wx.request({
            url: config.netServer+ "Money/SubmitMoneyLog", //开发者服务器接口地址",
            data: {
                Type: 1
            }, //请求的参数",
            method: 'GET',
            header: config.temp,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    application_income_list: res.data.result
                })
            },
            fail: () => {},
            complete: () => {}
          });

          //支出
          wx.request({
            url: config.netServer+ "Money/SubmitMoneyLog", //开发者服务器接口地址",
            data: {
                Type: 2
            }, //请求的参数",
            method: 'GET',
            header: config.temp,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    application_spending_list: res.data.result
                })
              console.log("支出",res)
            },
            fail: () => {},
            complete: () => {}
          });

          //推广收益
          wx.request({
            url: config.netServer+ "Money/Money", //开发者服务器接口地址",
            data: {
               
            }, //请求的参数",
            method: 'GET',
            header: config.temp,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    promote_withdraw_arnings: res.data.result.money,
                    promote_accumulated_earnings: res.data.result.hisMoney,
                    promote_total_spending: res.data.result.payment
                })
              console.log("推广收益",res)
            },
            fail: () => {},
            complete: () => {}
          });

          
          //全部
        wx.request({
            url: config.netServer+ "Money/MoneyLog", //开发者服务器接口地址",
            data: {
                Type: 0
            }, //请求的参数",
            method: 'GET',
            header: config.temp,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    promote_total_list: res.data.result
                })
            },
            fail: () => {},
            complete: () => {}
          });

          //收入
          wx.request({
            url: config.netServer+ "Money/MoneyLog", //开发者服务器接口地址",
            data: {
                Type: 1
            }, //请求的参数",
            method: 'GET',
            header: config.temp,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    promote_income_list: res.data.result
                })
            },
            fail: () => {},
            complete: () => {}
          });

          //支出
          wx.request({
            url: config.netServer+ "Money/MoneyLog", //开发者服务器接口地址",
            data: {
                Type: 2
            }, //请求的参数",
            method: 'GET',
            header: config.temp,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    promote_spending_list: res.data.result
                })
            },
            fail: () => {},
            complete: () => {}
          });

          //每日收益
          wx.request({
            url: config.netServer+ "User/GetMoneyDayList", //开发者服务器接口地址",
            data: {
               
            }, //请求的参数",
            method: 'POST',
            header: config.temp,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    totalMoney: res.data.result.totalMoney,
                    inComeMoney: res.data.result.inComeMoney,
                    payMoney: res.data.result.payMoney,
                    daily_total_list: res.data.result.list
                })
              console.log("每日收益",res)
            },
            fail: () => {},
            complete: () => {}
          });
    }
})

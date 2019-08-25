// 引用实例
var app = getApp();
// config
var config = require("../../config.js");

Page({
    data: {
        submitType: "",
        bankId: "",
        tableTrList: [],
        imgHttp: "",
        stepImg: "",
        height: "",
    },
    onShow: function () {
        // 图片设置固定高度
        // var query = wx.createSelectorQuery()
        // query.select("#image").boundingClientRect((res)=>{
        //   console.log(res.width)
        //   this.setData({
        //     height: res.width * 1 + 'px'
        //   })
        // }).exec()
    },
    onLoad: function (ops) {
        console.log(ops.bankId);
        this.setData({
            bankId: ops.bankId,
            imgHttp: config.imgserver,
            submitType: ops.submitType
        })
        // 请求详细接口
        wx.request({
            url: config.netServer + 'Bank/GetBankDetail', //开发者服务器接口地址",
            data: {
                BankID: this.data.bankId
            }, //请求的参数",
            method: 'GET',
            header: config.temp,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("4", res.data)
                if (res.data.code == 100) {
                    this.setData({
                        tableTrList: res.data.result.products,
                        stepImg: res.data.result.steps[0].img
                    })
                }
                console.log(this.data.tableTrList)
            },
            fail: () => {},
            complete: () => {}
        });
        console.log(this.data.tableTrList)
    },
    // 自主报单
    onfillDeclartion: function (e) {
        console.log(e.currentTarget.dataset.item);
        wx.navigateTo({
            url: '../fillDeclartion/index?items=' + JSON.stringify(e.currentTarget.dataset.item) + "&bankId=" + this.data.bankId + "&submitType=" + this.data.submitType
        });
    }
})
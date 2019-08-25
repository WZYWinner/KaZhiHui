// 引用
var config = require('../../config.js');
// 加密文件
var fengMd5 = require("../../utils/fengMd5.js");

Page({
    data: {
        message: "",
        timer: "",
        textsuc: "提交成功",
        textfail: "请求出错",
        noicon: "none"
    },
    onLoad: function () {},
    // 编辑内容
    onmessageChange: function (e) {
        this.setData({
            message: e.detail
        })
    },
    // 提交文本
    onSave: function () {
        var reqCode = "R00410";
        var reqData = {
            apiToken: wx.getStorageSync('token'),
            UId: wx.getStorageSync('uid'),
            Title: "",
            Content: this.data.message
        }
        var Temp = fengMd5(reqCode, reqData);
        wx.request({
            url: config.admainServer + 'svr/AppApi.ashx',
            data: {
                reqdata: Temp
            },
            method: "GET",
            success: (res) => {
                console.log("提交成功", res);
                if (res.data.RespData.RespHead.Status == 200) {
                    // 显示提示并跳转tab页
                    config.showToast(this.data.textsuc, this.data.noicon);
                    wx.switchTab({
                        url: '../wenancopywriting/index'
                    });
                } else {
                    // 显示请求错误
                    config.showToast(this.data.textfail, this.data.noicon);
                }
            }
        })
    },
})
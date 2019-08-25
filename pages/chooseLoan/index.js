// 引用实例
var app = getApp();

Page({
    data: {

    },
    onloanApply: function (e) {
        wx.navigateTo({
            url: '../loanApply/index'
        });
    },
})
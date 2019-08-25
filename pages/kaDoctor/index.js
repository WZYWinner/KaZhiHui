// 引用实例
var app = getApp();

Page({
    data: {
        Name: "布兜",
        identityNum: "622666366655696998",
        creditCard: "",
        Phone: "",
        checked: false,
    },
    // 授权复选框
    oncheckedChange: function(e){
        this.setData({
            checked: e.detail
        })
    },
    // 查询记录
    oncepingRecord: function(e){
        wx.navigateTo({ url: '../cepingRecord/index' });
    }

})

// 引用实例
var app = getApp();

Page({
    data: {
        userName: "布兜",
        userIdentity: "620888999890986678",
        userPhone: "18099878909",
    },
    // 姓名
    onuserNameChange: function(e){
        console.log(e.detail);
        this.setData({
            userName: e.detail
        })
    },
    // 身份证号
    onuserIdentityChange: function(e){
        console.log(e.detail);
        this.setData({
            userIdentity: e.detail
        })
    },
    // 电话
    onuserPhoneChange: function(e){
        console.log(e.detail);
        this.setData({
            userPhone: e.detail
        })
    },
    onNextSave: function(e){
        console.log(1, this.data.userName)
        console.log(2, this.data.userIdentity)
        console.log(3, this.data.userPhone)
    }
})

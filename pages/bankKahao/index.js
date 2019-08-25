// 引用
var config = require("../../config.js");

Page({
    data: {
        bankKahao: "",
        format: "",
        setphonenum: ""
    },
    onLoad: function (ops) {
        this.setData({
            format: ops.format,
            setphonenum: ops.sendphonenum
        })
    },
    // 输入卡号
    onbankKahaoChange: function(e){
        this.setData({
            bankKahao: e.detail
        })
    },
    // 提交
    // onSave: function(){
    // }
})
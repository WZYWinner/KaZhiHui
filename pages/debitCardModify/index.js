// 引用
var config = require("../../config.js");
var fengMd5 = require("../../utils/fengMd5.js");
// 识别卡名
var bankcodeinfo = require('../../utils/bandCodeInfo.js');


Page({
    data: {
        xinyongShow: true,
        disable: true,
        userInfo: null,
        feerate: null,
        bankName: "",
        xinyongkaName: "",
        bankBehindfour: "",
        smsCode: "",
        daoshuTime: 0,
        daozhangKa: "",
        jiaoyiXinyong: "",
        jiaoyiprice: null,
        daozhangPrice: 0.00,
        textfail: "请求出错",
        textcodefail: "验证码发送失败",
        noicon: "none",
        textcodesucc: "发送成功",
        regionList: [],
        creditCardId: 0,
        debitCardModifyList: [],
        userInfo: [],
        RepaymentDate: '',
        creditCardId:'',
        expireDate: '',
        StatementDate: ''
    },
    onLoad: function (ops) {
        this.setData({
            debitCardModifyList:ops
        })
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
        
        
    },
    // 交易金额
    onjiaoyipriceChange: function (e) {
        this.setData({
            jiaoyiprice: e.detail,
        })
        var price = this.data.jiaoyiprice
        var fee = this.data.feerate;
        var pricess = price - price * fee - 1
        this.setData({
            daozhangPrice: parseFloat(pricess).toFixed(3).slice(0, -1)
        })
    }
})
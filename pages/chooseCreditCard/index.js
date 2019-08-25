// 引用实例
var APP = getApp();
var config = require("../../config.js");
var fengMd5 = require("../../utils/fengMd5.js");

Page({
    data: {
        productcode: "",
        comfirmShow: false,
        codeShow: false,
        smscode: "",
        applyTradeNo: "",
        codeList: [],
        userInfo: null,
        usercardid: null,
        IsBindsta: true,
        textb: "验证码必填",
        textcodefail: "发送验证码错误",
        textcodesucc: "发送成功",
        textfail: "请求出错",
        textjihuo: "激活失败",
        texttongdaofail: "通道注册失败",
        noicon: "none",
        bankaccountno:null,
        bankName:null,
        Mobile: null,
        id: null
        
    },
    // 
    onLoad: function (ops) {
        console.log("uuuuuu", ops)
        this.setData({
            productcode: wx.getStorageSync('productcode')
        })
        // Mobile
        console.log(typeof wx.getStorageSync('uid'))
        var reqCode = "R00401";
        var reqData = {
            UId: JSON.stringify(wx.getStorageSync('uid')),
            ChannelCode: this.data.productcode,
            CardCode: 1
        }
        var curTemp = fengMd5(reqCode, reqData)
        // 查询卡包
        wx.request({
            url: config.admainServer + 'svr/AppApi.ashx', //开发者服务器接口地址",
            data: {
                reqdata: curTemp
            }, //请求的参数",
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("我是信用卡", res)
                if (res.data.RespData.RespBody.length != 0) {
                    this.setData({
                        codeList: res.data.RespData.RespBody
                    })
                }
            },
            fail: () => {},
            complete: () => {}
        });


        

    },
    // 点击激活
    onjihuo: function (e) {
        this.setData({
            bankaccountno: e.currentTarget.dataset.bankaccountno,
            bankName: e.currentTarget.dataset.name,
            Mobile: e.currentTarget.dataset.mobile,
            id:e.currentTarget.dataset.id
        })
        console.log(e.currentTarget.dataset)
        // 阻止父元素的点击事件
        // svr/KaBaoService.ashx
        // 通道A
        if (wx.getStorageSync('extend') == 1) {
            var reqCode = "R00008";
            var reqData = {
                userId: JSON.stringify(wx.getStorageSync('uid')),
                UserCardId: e.currentTarget.dataset.id
            }
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/KaBaoService.ashx',
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log("激活成功了吗", res.data);
                    if (res.data.RespData.RespHead.Status == 200) {
                        this.setData({
                            codeShow: true,
                            applyTradeNo: res.data.RespData.RespBody.tradeNo
                        })
                        // 成功
                        config.showToast(this.data.textcodesucc, this.data.noicon)
                    } else {
                        // 显示错误提示
                        config.showToast(this.data.textcodefail, this.data.noicon)
                        return false;
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        }

        // 通道B
        if (wx.getStorageSync('extend') == 6) {
            var reqCode = "R00222";
            var reqData = {
                UserID: JSON.stringify(wx.getStorageSync('uid')),
                UserCardId: e.currentTarget.dataset.id
            }
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/Chanpay11000.ashx',
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log("激活成功了吗", res.data);
                    if (res.data.RespData.RespHead.Status == 200) {
                        this.setData({
                            codeShow: true,
                            applyTradeNo: res.data.RespData.RespBody.orderNo
                        })
                        // 成功
                        config.showToast(this.data.textcodesucc, this.data.noicon)
                    } else {
                        // 显示错误提示
                        config.showToast(this.data.textcodefail, this.data.noicon)
                        return false;
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        }


        // 通道C
        if (wx.getStorageSync('extend') == 7) {
            var reqCode = "R00222";
            var reqData = {
                UserID: JSON.stringify(wx.getStorageSync('uid')),
                UserCardId: e.currentTarget.dataset.id
            }
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/JuFuPay.ashx',
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log("激活成功了吗", res.data);
                    if (res.data.RespData.RespHead.Status == 200) {
                        this.setData({
                            codeShow: true,
                            applyTradeNo: res.data.RespData.RespBody.orderNo
                        })
                        // 成功
                        config.showToast(this.data.textcodesucc, this.data.noicon)
                    } else {
                        // 显示错误提示
                        config.showToast(this.data.textcodefail, this.data.noicon)
                        return false;
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        }

    },
    // 验证码
    onCodeChange: function (e) {
        console.log(e.detail)
        this.setData({
            smscode: e.detail
        })
    },
    // 弹出激活框确认
    onquerenjihuo: function (e) {
        // 通道A
        if (wx.getStorageSync('extend') == 1) {
            if (this.data.smscode) {
                var reqCode = "R00009";
                var reqData = {
                    userId: JSON.stringify(wx.getStorageSync('uid')),
                    deviceId: "shebei",
                    applyTradeNo: this.data.applyTradeNo,
                    verCode: this.data.smscode
                }
                var curTemp = fengMd5(reqCode, reqData);
                wx.request({
                    url: config.admainServer + 'svr/KaBaoService.ashx',
                    data: {
                        reqdata: curTemp
                    }, //请求的参数",
                    method: 'GET',
                    dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                    success: res => {
                        console.log(res.data)
                        // 成功状态之后跳转到商户收款页面
                        if (res.data.RespData.RespHead.Status == 200) {
                            wx.navigateTo({
                                url: '../shannghuReceivables/index?bankAccountNo=' + this.data.bankaccountno + "&bankName=" + this.data.bankName + "&Mobile=" + this.data.Mobile + "&cread=9" + "&xinyongId=" + this.data.id
                            })
                        } else {
                            // 否则激活失败关闭模态框
                            config.showToast(this.data.textjihuo, this.data.noicon);
                            this.setData({
                                codeShow: false
                            })
                        }

                    },
                    fail: (ero) => {
                        // 显示错误提示
                        config.showToast(this.data.textfail, this.data.noicon);
                        this.setData({
                            codeShow: false
                        })
                    },
                    complete: () => {}
                });
            } else {
                // 显示提示
                config.showToast(this.data.textb, this.data.noicon);
                this.setData({
                    codeShow: false
                })
                return false
            }
        }

        // 通道B
        if (wx.getStorageSync('extend') == 6) {
            if (this.data.smscode) {
                var reqCode = "R00223";
                var reqData = {
                    userId: JSON.stringify(wx.getStorageSync('uid')),
                    deviceId: "shebei",
                    orderNo: this.data.applyTradeNo,
                    smsCode: this.data.smscode
                }
                console.log("HSHHSHSHS",reqData)
                var curTemp = fengMd5(reqCode, reqData);
                wx.request({
                    url: config.admainServer + 'svr/Chanpay11000.ashx',
                    data: {
                        reqdata: curTemp
                    }, //请求的参数",
                    method: 'GET',
                    dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                    success: res => {
                        console.log(res.data)
                        // 成功状态之后跳转到商户收款页面
                        if (res.data.RespData.RespHead.Status == 200) {
                            wx.navigateTo({
                                url: '../shannghuReceivables/index?bankAccountNo=' + this.data.bankaccountno + "&bankName=" + this.data.bankName + "&Mobile=" + this.data.Mobile + "&cread=9" + "&xinyongId=" + this.data.id
                            })
                        } else {
                            // 否则激活失败关闭模态框
                            config.showToast(this.data.textjihuo, this.data.noicon);
                            this.setData({
                                codeShow: false
                            })
                        }
                    },
                    fail: (ero) => {
                        // 显示错误提示
                        config.showToast(this.data.textfail, this.data.noicon);
                        this.setData({
                            codeShow: false
                        })
                    },
                    complete: () => {}
                });
            } else {
                // 显示提示
                config.showToast(this.data.textb, this.data.noicon);
                this.setData({
                    codeShow: false
                })
                return false
            }
        }

        // 通道C
        if (wx.getStorageSync('extend') == 7) {
            if (this.data.smscode) {
                var reqCode = "R00223";
                var reqData = {
                    userId: JSON.stringify(wx.getStorageSync('uid')),
                    orderNo: this.data.applyTradeNo,
                    smsCode: this.data.smscode
                }
                console.log("HSHHSHSHS",reqData)
                var curTemp = fengMd5(reqCode, reqData);
                wx.request({
                    url: config.admainServer + 'svr/JuFuPay.ashx',
                    data: {
                        reqdata: curTemp
                    }, //请求的参数",
                    method: 'GET',
                    dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                    success: res => {
                        console.log(res.data)
                        // 成功状态之后跳转到商户收款页面
                        if (res.data.RespData.RespHead.Status == 200) {
                            wx.navigateTo({
                                url: '../shannghuReceivables/index?bankAccountNo=' + this.data.bankaccountno + "&bankName=" + this.data.bankName + "&Mobile=" + this.data.Mobile + "&cread=9" + "&xinyongId=" + this.data.id
                            })
                        } else {
                            // 否则激活失败关闭模态框
                            config.showToast(this.data.textjihuo, this.data.noicon);
                            this.setData({
                                codeShow: false
                            })
                        }
                    },
                    fail: (ero) => {
                        // 显示错误提示
                        config.showToast(this.data.textfail, this.data.noicon);
                        this.setData({
                            codeShow: false
                        })
                    },
                    complete: () => {}
                });
            } else {
                // 显示提示
                config.showToast(this.data.textb, this.data.noicon);
                this.setData({
                    codeShow: false
                })
                return false
            }
        }

    },
    // 添加信用卡  换加页面
    onaddDebitCard: function (e) {
        wx.navigateTo({
            url: '../addDebitCard/index'
        });
    },
    // 点击卡片
    onshannghuReceivables: function (e) {
        // currentTarget
        console.log(e.currentTarget.dataset)
        // console.log(JSON.stringify(e.currentTarget.dataset.items))
        wx.navigateTo({
            url: '../shannghuReceivables/index?bankAccountNo=' + e.currentTarget.dataset.bankaccountno + "&bankName=" + e.currentTarget.dataset.name + "&Mobile=" + e.currentTarget.dataset.mobile + "&cread=9" + "&xinyongId=" + e.currentTarget.dataset.id
        });
    },
    // 弹出框关闭2
    jihuoClose: function (e) {
        this.setData({
            codeShow: false
        })
    },


})
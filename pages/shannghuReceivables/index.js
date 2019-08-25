// 引用
var config = require("../../config.js");
var fengMd5 = require("../../utils/fengMd5.js");
// 识别卡名
var bankcodeinfo = require('../../utils/bandCodeInfo.js');


Page({
    data: {
        xinyongShow: true,
        quyuShow: true,
        disable: true,
        userInfo: null,
        feerate: null,
        productcode: "",
        bankName: "",
        xinyongkaName: "",
        xinyongNum: "",
        bankBehindfour: "",
        smsCode: "",
        phone: "",
        daoshuTime: 0,
        daozhangKa: "",
        jiaoyiXinyong: "",
        jiaoyiprice: null,
        daozhangPrice: 0.00,
        textfail: "请求出错",
        textcodefail: "验证码发送失败",
        noicon: "none",
        textcodesucc: "发送成功",
        textXYname: "选择信用卡",
        textjiaoprice: "填写交易金额",
        textcode: "填写验证码",
        textcity: "省市必选",
        shiji:[],
        region: [],
        customItem: '请选择',
        tradeNo: "",
        extend: "",
        multiName: []
    },
    // 确定区域
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            quyuShow: false,
            region: e.detail.value
        })
        this.setData({
            multiName: this.data.region[1]
        })
        console.log(1111111111111111,this.data.multiName)
      },
    onLoad: function (ops) {
        console.log("信用卡传过来", ops)
        if (wx.getStorageSync('extend')) {
            this.setData({
                extend: wx.getStorageSync('extend')
            })
        }

        // 截取卡号后四位 通道A
        if (ops.userinfo) {
            wx.setStorageSync('extend', ops.extend)
            wx.setStorageSync('productcode', ops.productcode)
            this.setData({
                extend: wx.getStorageSync('extend'),
                productcode: ops.productcode
            })
            if (JSON.parse(ops.userinfo).BankCardNo) {
                var bankFour = JSON.parse(ops.userinfo).BankCardNo.substring(JSON.parse(ops.userinfo).BankCardNo.length - 4);
                var binjie = bankcodeinfo(JSON.parse(ops.userinfo).BankCardNo).bankName + "(" + bankFour + ")"
                // 引入插件 根据卡号识别银行名
                this.setData({
                    userInfo: JSON.parse(ops.userinfo),
                    bankName: bankcodeinfo(JSON.parse(ops.userinfo).BankCardNo).bankName,
                    bankBehindfour: bankFour,
                    daozhangKa: binjie,
                    feerate: ops.feerate
                })
                // 缓存的名和后四位
                wx.setStorageSync('chuxuName', this.data.bankName)
                wx.setStorageSync('houFour', this.data.bankBehindfour)
                wx.setStorageSync('feerate', ops.feerate)
            }
            // 截取卡号后四位 通道B
            if (JSON.parse(ops.userinfo).BankAccountNo) {
                var bankFour = JSON.parse(ops.userinfo).BankAccountNo.substring(JSON.parse(ops.userinfo).BankAccountNo.length - 4);
                var binjie = bankcodeinfo(JSON.parse(ops.userinfo).BankAccountNo).bankName + "(" + bankFour + ")"
                // 引入插件 根据卡号识别银行名
                this.setData({
                    userInfo: JSON.parse(ops.userinfo),
                    bankName: bankcodeinfo(JSON.parse(ops.userinfo).BankAccountNo).bankName,
                    bankBehindfour: bankFour,
                    daozhangKa: binjie,
                    feerate: ops.feerate
                })
                // 缓存的名和后四位
                wx.setStorageSync('chuxuName', this.data.bankName)
                wx.setStorageSync('houFour', this.data.bankBehindfour)
                wx.setStorageSync('feerate', ops.feerate)
            }
        }

        // 判断是否从信用卡页面跳回来tradeNo
        if (ops.cread) {
            if (ops.bankName) {
                console.log("id", ops.xinyongId)
                var xinFour = ops.bankAccountNo.substring(ops.bankAccountNo.length - 4);
                this.setData({
                    xinyongShow: false,
                    daozhangKa: wx.getStorageSync('chuxuName') + "(" + wx.getStorageSync('houFour') + ")",
                    bankBehindfour: wx.getStorageSync('houFour'),
                    xinyongkaName: ops.bankName + "(" + xinFour + ")",
                    xinyongNum: ops.bankAccountNo,
                    phone: ops.Mobile,
                    xinyongId: ops.xinyongId
                })
            }
        }
        // console.log("信用卡名", this.data.xinyongkaName)
        // console.log("信用卡号", this.data.xinyongNum)

        var reCode = "R00404";
        var reqData = {};
        var curTemp = fengMd5(reCode, reqData);
        wx.request({
            url: config.admainServer + 'svr/AppApi.ashx',
            data: {
                reqdata: curTemp
            }, //请求的参数",
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                this.setData({
                    regionList: res.data.RespData.RespBody.Result
                })
                console.log(this.data.regionList)
            },
            fail: () => {},
            complete: () => {}
        });

        // 请求区域
        var reCode = "R00404";
        var reData = {};
        var cuTemp = fengMd5(reCode, reData);
        wx.request({
            url: config.admainServer + 'svr/AppApi.ashx',
            data: {
                reqdata: cuTemp
            }, //请求的参数",
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log('我是地域', res.data.RespData.RespBody.Result)
                this.setData({
                    regionList: res.data.RespData.RespBody.Result
                })
                // var provice = res.data.RespData.RespBody.Result;
                var province = res.data.RespData.RespBody.Result.map(item => { // 此方法将校区名称区分到一个新数组中
                    return item.AreaName;
                });
                this.setData({
                    region: [province, []], //
                    provinceList: res.data.RespData.RespBody.Result, //省份列表
                    provinceName: province
                })
                // 市级


                // var default_xiaoqu_id = xiaoquList[0]['Value']; //获取默认的校区对应的 teach_area_id
                // if (default_xiaoqu_id) {
                //     that.searchClassInfo(default_xiaoqu_id) // 如果存在调用获取对应的班级数据
                // }
            },
            fail: () => {},
            complete: () => {}
        });
    },
    // 到账储蓄卡
    ondaozhangKaChange: function (e) {
        this.setData({
            daozhangKa: e.detail
        })
    },
    // 点击选择信用卡
    onchooseCreditCard: function (e) {
        wx.navigateTo({
            url: '../chooseCreditCard/index?productcode=' + this.data.productcode
        });
    },
    // 交易金额
    onjiaoyipriceChange: function (e) {
        this.setData({
            jiaoyiprice: e.detail,
        })
        var price = this.data.jiaoyiprice
        var fee = wx.getStorageSync('feerate');
        var pricess = price - price * fee - 1
        this.setData({
            daozhangPrice: parseFloat(pricess).toFixed(3).slice(0, -1)
        })
    },
    // 验证码
    onPhoneCodeChange: function (e) {
        this.setData({
            smsCode: e.detail
        })
    },
    // 获取验证码
    onGetCode: function (e) {
        if (!this.data.xinyongkaName) {
            config.showToast(this.data.textXYname, this.data.noicon);
            return false
        }
        if (!this.data.jiaoyiprice) {
            config.showToast(this.data.textjiaoprice, this.data.noicon);
            return false
        }
        if (!this.data.phone) {
            // 显示提示
            config.showToast(this.data.textcodefail, this.data.noicon);
            return false;
        } else {
            this.setData({
                disable: false,
                daoshuTime: 90
            })
            var times = 90;
            var daoshu_timer = setInterval(() => {
                times--;
                this.setData({
                    daoshuTime: times
                })
                if (this.data.daoshuTime <= 0) {
                    this.setData({
                        disable: true,
                    })
                    clearInterval(daoshu_timer)
                }
            }, 1000)
            var reqCode = "R00012";
            var reqData = {
                userId: JSON.stringify(wx.getStorageSync('uid')),
                deviceId: "shebei",
                mobile: this.data.phone,
                UserCardId: this.data.xinyongId,
                amount: this.data.jiaoyiprice
            }
            // console.log("reqData",reqData)
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/KaBaoService.ashx', //开发者服务器接口地址",
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    // 状态成功
                    if (res.data.RespData.RespHead.Status == 200) {
                        config.showToast(this.data.textcodesucc, this.data.noicon);
                        this.setData({
                            tradeNo: res.data.RespData.RespBody.tradeNo
                        })
                    } else {
                        // 否则
                        config.showToast(this.data.textcodefail, this.data.noicon);
                        return false
                    }
                    // console.log('获取验证码请求到的数据', res.data);
                },
                fail: (ero) => {
                    // 错误提示
                    config.showToast(this.data.textfail, this.data.noicon);
                },
                complete: () => {}
            });
        }
    },
    // 提交确认申请
    onTijiaoBtn: function (e) {
        if (wx.getStorageSync('extend') == 1) {
            if (!this.data.xinyongkaName) {
                config.showToast(this.data.textXYname, this.data.noicon);
                return false
            }
            if (!this.data.jiaoyiprice) {
                config.showToast(this.data.textjiaoprice, this.data.noicon);
                return false
            }else{
                if(this.data.jiaoyiprice > 20000){
                    var te = "金额最高限制为20000";
                    config.showToast(te,this.data.noicon);
                    return false
                }
                if(this.data.jiaoyiprice < 103){
                    var tef = "金额最低限制为103";
                    config.showToast(tef,this.data.noicon);
                    return false
                }
            }
            if (!this.data.smsCode) {
                config.showToast(this.data.textcode, this.data.noicon);
                return false
            }
            // 提交
            var reqCode = "R00013";
            var reqData = {
                userId: JSON.stringify(wx.getStorageSync('uid')),
                deviceId: "shebei",
                orgOrderId: this.data.tradeNo,
                applyTradeNo: this.data.tradeNo,
                verCode: this.data.smsCode
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
                    console.log('提交确认成功了吗', res.data);
                    if (res.data.RespData.RespHead.Status == 200) {
                        wx.switchTab({
                            url: '../index/index'
                        });
                    } else {
                        var msg = res.data.RespData.RespHead.Message;
                        config.showToast(msg, this.data.noicon)
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        } else if (wx.getStorageSync('extend') == 7) {
            if (!this.data.xinyongkaName) {
                config.showToast(this.data.textXYname, this.data.noicon);
                return false
            }
            if (!this.data.jiaoyiprice) {
                config.showToast(this.data.textjiaoprice, this.data.noicon);
                return false
            }else{
                if(this.data.jiaoyiprice > 20000){
                    var te = "金额最高限制为20000";
                    config.showToast(te,this.data.noicon);
                    return false
                }
                if(this.data.jiaoyiprice < 103){
                    var tef = "金额最低限制为103";
                    config.showToast(tef,this.data.noicon);
                    return false
                }
            }
            // 提交
            var reqCode = "R00226";
            var reqData = {
                UserID: JSON.stringify(wx.getStorageSync('uid')),
                UserCardId: this.data.xinyongId,
                orderAmount: JSON.stringify(this.data.jiaoyiprice * 100)
            }
            // console.log("1",reqData)
            // console.log("2",typeof reqData.orderAmount)
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/JuFuPay.ashx',
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log('提交确认成功了吗', res.data.RespData);
                    if (res.data.RespData.RespHead.Status == 200) {
                        console.log(111,res.data.RespData.RespBody.qcodeUrl)
                        console.log(222,encodeURIComponent(res.data.RespData.RespBody.qcodeUrl))
                        wx.navigateTo({
                            url: '../tongdaoC/index?Curl=' + encodeURIComponent(res.data.RespData.RespBody.qcodeUrl) // encodeURIComponent进行编码 因为有 ? 浏览器可能不认
                        });
                    } else {
                        var msg = res.data.RespData.RespHead.Message;
                        config.showToast(msg, this.data.noicon)
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        }else if (wx.getStorageSync('extend') == 6) {
            if (!this.data.xinyongkaName) {
                config.showToast(this.data.textXYname, this.data.noicon);
                return false
            }
            if (!this.data.jiaoyiprice) {
                config.showToast(this.data.textjiaoprice, this.data.noicon);
                return false
            }else{
                if(this.data.jiaoyiprice > 20000){
                    var te = "金额最高限制为20000";
                    config.showToast(te,this.data.noicon);
                    return false
                }
                if(this.data.jiaoyiprice < 103){
                    var tef = "金额最低限制为103";
                    config.showToast(tef,this.data.noicon);
                    return false
                }
            }
            if (!this.data.multiName) {
                config.showToast(this.data.textcity, this.data.noicon);
                return false
            }
            // 提交
            var reqCode = "R00226";
            var reqData = {
                UserID: JSON.stringify(wx.getStorageSync('uid')),
                trxCtNm: this.data.multiName,
                UserCardId: this.data.xinyongId,
                orderAmount: JSON.stringify(this.data.jiaoyiprice * 100)
            }
            // console.log("1",reqData)
            // console.log("2",typeof reqData.orderAmount)
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/Chanpay11000.ashx',
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log('提交确认成功了吗', res.data.RespData);
                    if (res.data.RespData.RespHead.Status == 200) {
                        wx.switchTab({
                            url: '../index/index'
                        });
                    } else {
                        var msg = res.data.RespData.RespHead.Message;
                        config.showToast(msg, this.data.noicon)
                    }
                },
                fail: () => {},
                complete: () => {}
            });
        }
    }
})
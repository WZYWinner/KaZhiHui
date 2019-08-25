// 引用
var config = require("../../config.js");

Page({
    data: {
        userPhone: "",
        smsCode: "",
        NewPwd: "",
        disable: true,
        daoshuTime: 0,
        noicon: "none",
        textp: "电话格式不对",
        textb: "手机号码必填",
        textnew: "新密码必填",
        textcb: "验证码必填",
        textpwdfail: "密码修改失败",
        textfail: "请求出错"
    },
    // 手机号
    onuserPhoneChange: function (e) {
        this.setData({
            userPhone: e.detail
        })
    },
    // 新密码
    onNewPwdChange: function (e) {
        this.setData({
            NewPwd: e.detail
        })
    },
    // 验证码
    onPhoneCodeChange: function (e) {
        this.setData({
            smsCode: e.detail
        })
    },
    // 获取手机验证码
    onGetCode: function (e) {
        // 校验手机号码
        if (this.data.userPhone) {
            var reqPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            // var reqPhone = /^1[3|4|5|7|8][0-9]{9}$/;
            if (reqPhone.test(this.data.userPhone)) {
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
                wx.request({
                    url: config.netServer + 'PhoneCode/Send', //开发者服务器接口地址",
                    data: {
                        Phone: this.data.userPhone
                    }, //请求的参数",
                    header: {
                        token: "",
                        uid: "",
                        from: "web"
                    },
                    method: 'GET',
                    dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                    success: res => {
                        if (res.data.result.state) {
                            config.showToast(res.data.result.msg, this.data.noicon);
                        } else {
                            this.setData({
                                disable: true,
                            })
                            config.showToast(res.data.result.msg, this.data.noicon);
                            return false;
                        }
                        console.log('获取验证码请求到的数据', res.data);
                    },
                    fail: () => {},
                    complete: () => {}
                });
            } else {
                config.showToast(this.data.textp, this.data.noicon);
                return false
            }

        } else {
            config.showToast(this.data.textb, this.data.noicon);
            return false
        }


    },
    // 确定修改
    onpwdSave: function (e) {
        if (!this.data.userPhone) {
            config.showToast(this.data.textb, this.data.noicon);
            return false
        }
        if (!this.data.NewPwd) {
            config.showToast(this.data.textnew, this.data.noicon);
            return false
        }
        if (!this.data.smsCode) {
            config.showToast(this.data.textcb, this.data.noicon);
            return false
        }
        // 校验验证码
        wx.request({
            url: config.netServer + 'PhoneCode/check', //开发者服务器接口地址",
            data: {
                Phone: this.data.userPhone,
                Code: this.data.smsCode
            }, //请求的参数",
            method: 'GET',
            header: {
                token: "",
                uid: "",
                from: "web"
            },
            success: res => {
                console.log("校验验证码", res)
                var curToken = res.data.result.token
                if (res.data.result.state) {
                    // 登录接口
                    wx.request({
                        url: config.netServer + 'user/pwd', //开发者服务器接口地址",
                        data: {
                            Token: curToken,
                            phone: this.data.userPhone,
                            Pwd: this.data.NewPwd
                        }, //请求的参数",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            token: "",
                            uid: "",
                            from: "web"
                        },
                        method: 'POST',
                        success: res => {
                            if (res.data.state) {
                                wx.navigateTo({
                                    url: '../login/index'
                                });
                            } else {
                                config.showToast(this.data.textpwdfail, this.data.noicon);
                                return false;
                            }
                        },
                        fail: () => {
                            config.showToast(this.data.textfail, this.data.noicon);
                        },
                        complete: () => {}
                    });
                } else {
                    config.showToast(res.data.result.msg, this.data.noicon);
                }
            },
            fail: (ero) => {
                config.showToast(this.data.textfail, this.data.noicon);
            },
            complete: () => {}
        });
    },

})
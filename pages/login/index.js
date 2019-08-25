// 引用
var config = require("../../config.js");

Page({
    data: {
        userPhone: "",
        smsCode: "",
        userPwd: "",
        disable: true,
        daoshuTime: 0,
        isCode: true,
        isPassword: false,
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
    // 验证码
    onPhoneCodeChange: function (e) {
        this.setData({
            smsCode: e.detail
        })
    },
    // 密码
    onuserPwdChange: function (e) {
        this.setData({
            userPwd: e.detail
        })
    },
    // 密码设置
    setPassword: function (e) {
        wx.navigateTo({
            url: '../setPassword/index'
        });
    },
    // 切换密码登录
    onshowPwd: function (e) {
        this.setData({
            isCode: false,
            isPassword: true
        })
    },
    // 切换验证码登录
    onshowCode: function (e) {
        this.setData({
            isPassword: false,
            isCode: true,
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
                        "Content-Type": "application/x-www-form-urlencoded",
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
                        console.log('获取验证码请求到的数据', res);
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
    // 验证码登录
    onCodeLogin: function (e) {
        if (!this.data.userPhone) {
            config.showToast(this.data.textb, this.data.noicon);
            return false
        }
        if (!this.data.smsCode) {
            config.showToast(this.data.textcb, this.data.noicon);
            return false
        }
        // 提交
        console.log('Phone', this.data.userPhone);
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
                if (res.data.result.state) {
                    // 登录接口
                    wx.request({
                        url: config.netServer + 'user/LoginByPhone', //开发者服务器接口地址",
                        data: {
                            Phone: this.data.userPhone,
                            Code: this.data.smsCode
                        }, //请求的参数",
                        header: {
                            token: "",
                            uid: "",
                            from: "web"
                        },
                        method: 'GET',
                        success: res => {
                            
                            if (res.data.code == 100) {
                                wx.setStorageSync('token', res.data.result.token);
                                wx.setStorageSync('level', res.data.result.level);
                                wx.setStorageSync('uid', res.data.result.uid);
                                wx.switchTab({
                                    url: '../index/index'
                                });
                            } else {
                                config.showToast(this.data.textfail, this.data.noicon);
                                return false;
                            }
                        },
                        fail: () => {},
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
    // 密码登录
    onPwdLogin: function () {
        // 校验手机号码
        if (this.data.userPhone) {
            var reqPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            // var reqPhone = /^1[3|4|5|7|8][0-9]{9}$/;
            if (reqPhone.test(this.data.userPhone)) {
                wx.request({
                    url: config.netServer + 'user/login', //开发者服务器接口地址",
                    data: {
                        Phone: this.data.userPhone,
                        pwd: this.data.userPwd,
                        did: ""
                    }, //请求的参数",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        token: "",
                        uid: "",
                        from: "web"
                    },
                    method: 'POST',
                    dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                    success: res => {
                        console.log("登录数据",res.data)
                        if (res.data.code == 100) {
                            wx.setStorageSync('token', res.data.result.token);
                            wx.setStorageSync('level', res.data.result.level);
                            wx.setStorageSync('uid', res.data.result.uid);
                            wx.switchTab({
                                url: '../index/index'
                            });
                        } else {
                            config.showToast(res.data.msg, this.data.noicon);
                            return false;
                        }
                        console.log('获取验证码请求到的数据', res);
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
})
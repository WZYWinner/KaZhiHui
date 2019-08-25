// 引用实例
var app = getApp();
var config = require("../../config.js");
// 引入md5
// var md5 = require("../../utils/md5.js");
// 引入加密分装
var fengMd5 = require('../../utils/fengMd5.js');

Page({
    data: {
        Curpage: 1,
        copywritingList: [],
        //（用来控制显示哪个按钮） false表示还没首次进行弹框授权，或者已经授权了；true表示在首次授权弹框时拒绝授权，或者在设置页面还是拒绝了授权
        isAuthSavePhoto: false,
        timer: "",
        textfail: "请求错误！",
        noicon: "none",
        texting: '玩命加载中',
        iconing: "loading"
    },
    onLoad: function () {
        // 判断缓存中是否有token 若无跳转到登录界面
    if (!wx.getStorageSync('token')) {
        wx.navigateTo({
          url: '../login/index'
        });
      }
        var reqCode = "R00411";
        var reqData = {
            apiToken: wx.getStorageSync('token'),
            UId: wx.getStorageSync('uid'),
            Curpage: this.data.Curpage
        }
        var Temp = fengMd5(reqCode, reqData);
        wx.request({
            url: config.admainServer + 'svr/AppApi.ashx',
            data: {
                reqdata: Temp
            },
            method: "GET",
            success: (res) => {
                console.log("列表", res);
                if (res.data.RespData.RespHead.Status == 200) {
                    this.setData({
                        copywritingList: res.data.RespData.RespBody
                    })
                } else {
                    // 显示请求错误
                    config.showToast(this.data.textfail, this.data.noicon);
                }
            }
        })
      

       
    },
    // 下拉刷新
    onPullDownRefresh: function () {
        // 显示顶部刷新图标
        wx.showNavigationBarLoading();
        var reqCode = "R00411";
        var reqData = {
            apiToken: wx.getStorageSync('token'),
            UId: wx.getStorageSync('uid'),
            Curpage: 0
        }
        var Temp = fengMd5(reqCode, reqData);
        wx.request({
            url: config.admainServer + 'svr/AppApi.ashx',
            data: {
                reqdata: Temp
            },
            method: "GET",
            success: (res) => {
                console.log("列表", res);
                if (res.data.RespData.RespHead.Status == 200) {
                    this.setData({
                        copywritingList: res.data.RespData.RespBody
                    })
                    // 隐藏导航栏加载框
                    wx.hideNavigationBarLoading();
                    // 停止下拉动作
                    wx.stopPullDownRefresh();
                } else {
                    // 显示请求错误
                    config.showToast(this.data.textfail, this.data.noicon);
                }
            }
        })

    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // var that = this;
        // 显示加载图标
        config.showToast(this.data.texting, this.data.iconing);
        // 页数+1
        var page = this.data.Curpage + 1;
        this.setData({
            Curpage: page
        })
        var reqCode = "R00411";
        var reqData = {
            apiToken: wx.getStorageSync('token'),
            UId: wx.getStorageSync('uid'),
            Curpage: this.data.Curpage
        }
        var Temp = fengMd5(reqCode, reqData);
        wx.request({
            url: config.admainServer + 'svr/AppApi.ashx',
            data: {
                reqdata: Temp
            },
            method: "GET",
            success: (res) => {
                console.log("列表", res);
                if (res.data.RespData.RespHead.Status == 200) {
                    this.setData({
                        copywritingList: this.data.copywritingList.concat(res.data.RespData.RespBody)
                    })
                } else {
                    // 显示请求错误
                    config.showToast(this.data.textfail, this.data.noicon);
                }
            }
        })
    },
    // 提交文本
    onsubmitText: function (e) {
        wx.navigateTo({
            url: '../submitText/index'
        });
    },
    // 复制文本
    copyTextBtn: function (e) {
        console.log(e)
        wx.setClipboardData({
            data: e.currentTarget.dataset.text, //需要设置的内容,
            success: res => {
                console.log(res)
                wx.showToast({
                    title: '复制成功', //提示的内容,
                    icon: 'success', //图标,
                    duration: 2000, //延迟时间,
                });
            }
        });
    },
    // 保存图片到手机相册
    saveImgBtn(e) {
        console.log(e.currentTarget.dataset.url)
        this.getSetting().then((res) => {
            // 判断用户是否授权了保存到本地的权限
            if (!res.authSetting['scope.writePhotosAlbum']) {
                this.authorize().then(() => {
                    this.savedownloadFile(e.currentTarget.dataset.url)
                    this.setData({
                        isAuthSavePhoto: false
                    })
                }).catch(() => {
                    wx.showToast({
                        title: '您拒绝了授权',
                        icon: 'none',
                        duration: 1500
                    })
                    this.setData({
                        isAuthSavePhoto: true
                    })
                })
            } else {
                this.savedownloadFile(e.currentTarget.dataset.url)
            }
        })
    },
    //打开设置，引导用户授权
    onOpenSetting() {
        wx.openSetting({
            success: (res) => {
                console.log(res.authSetting)
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.showToast({
                        title: '您未授权',
                        icon: 'none',
                        duration: 1500
                    })
                    this.setData({ // 拒绝授权
                        isAuthSavePhoto: true
                    })

                } else { // 接受授权
                    this.setData({
                        isAuthSavePhoto: false
                    })
                    this.onSaveToPhone() // 接受授权后保存图片

                }

            }
        })

    },
    // 获取用户已经授予了哪些权限
    getSetting() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success: res => {
                    resolve(res)
                }
            })
        })
    },
    // 发起首次授权请求
    authorize() {
        return new Promise((resolve, reject) => {
            wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success: () => {
                    resolve()
                },
                fail: res => { //这里是用户拒绝授权后的回调
                    console.log('拒绝授权')
                    reject()
                }
            })
        })
    },
    savedownloadFile(img) {
        this.downLoadFile(img).then((res) => {
            return this.saveImageToPhotosAlbum(res.tempFilePath)
        }).then(() => {})
    },
    //单文件下载(下载文件资源到本地)，客户端直接发起一个 HTTPS GET 请求，返回文件的本地临时路径。
    downLoadFile(img) {
        return new Promise((resolve, reject) => {
            wx.downloadFile({
                url: img,
                success: (res) => {
                    console.log('downloadfile', res)
                    resolve(res)
                }
            })
        })
    },
    // 保存图片到系统相册
    saveImageToPhotosAlbum(saveUrl) {
        return new Promise((resolve, reject) => {
            wx.saveImageToPhotosAlbum({
                filePath: saveUrl,
                success: (res) => {
                    wx.showToast({
                        title: '保存成功',
                        duration: 1000,
                    })
                    resolve()
                }
            })
        })
    },
    // 弹出模态框提示用户是否要去设置页授权
    showModal() {
        wx.showModal({
            title: '检测到您没有打开保存到相册的权限，是否前往设置打开？',
            success: (res) => {
                if (res.confirm) {
                    console.log('用户点击确定')
                    this.onOpenSetting() // 打开设置页面          
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})
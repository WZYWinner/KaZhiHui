// 引用实例
var app = getApp();
var config = require("../../config.js");

Page({
    data: {
        avatar: '../images/kzhlog.png',
        texting: "正在上传",
        iconing: "loading",
        userInfo: [],
        httpImg: ""
    },
    onShow:function(){
         // 判断缓存中是否有token 若无跳转到登录界面
    if (!wx.getStorageSync('token')) {
        wx.navigateTo({
          url: '../login/index'
        });
      }
    },
    onLoad: function(){
       
        this.setData({
            httpImg: config.imgserver
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
    change: function (event) {
        wx.navigateTo({
            url: '../changePassword/index'
        })
    },
    realName: function (event) {
        wx.navigateTo({
            url: '../realName/index'
        })
    },
    exit: function (event) {
        wx.clearStorage();
        wx.navigateTo({
            url: '../login/index'
        })
    },
    uploadAvatar: function (event) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                console.log('我是图片上传成功后的回调', res)
                var imgs = res.tempFiles[0].path
                var photoImg;
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                this.setData({
                    avatar: imgs
                })

                //启动上传等待中...
                config.showToast(this.data.texting,this.data.iconing);
                var uploadImgCount = 0;
                // wx.uploadFile({
                //     url: 'https://admin.facezhifu.cn/Common/UploadImg?mark=' + this.data.jiejikazheng,
                //     filePath: imgs,
                //     name: 'photo',
                //     success: res => {
                //         this.setData({
                //             jiejikazhengphoto: res.data
                //         })
                //     },
                //     fail: ero => {
                    // config.showToast(this.data.textfail,this.data.iconfail);
                //         console.log('上传失败', ero)
                //     }
                // });
            }
        })
    },
})

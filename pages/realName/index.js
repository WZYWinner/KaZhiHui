// 引用实例
var app = getApp();
var config = require("../../config.js");

Page({
    data: {
        cardZheng: '../images/cardZheng.png',
        cardFan: '../images/cardFan.png',
        texting: "正在上传",
        iconing: "loading"
    },
    commitZheng: function (event) {
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
                    cardZheng: imgs
                })
                
                //启动上传等待中...  
                config.showToast(this.data.texting,this.data.iconing);
                var uploadImgCount = 0;
            }
        })
    },
    commitFan: function (event) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                console.log('我是图片上传成功后的回调', res)
                var imgss = res.tempFiles[0].path
                var photoImg;
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                var tempFilePaths = res.tempFilePaths;
                this.setData({
                    cardFan: imgss
                })
                //启动上传等待中...  
                config.showToast(this.data.texting,this.data.iconing);
                var uploadImgCount = 0;
            }
        })
    }
})

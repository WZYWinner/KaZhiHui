// 引用实例
var app = getApp();
// 引用useImg
import useImg from "../js/useImg"

Page({
    data: {
        imageWidth: 0,
        imageHeight: 0
    },
    imageLoad: function (e){
        // 获取图片的原始宽高
        let originalWidth = e.detail.width;
        let originalHeight = e.detail.height;
        let imageSize = useImg.imageZoomWidthUtil(originalWidth,originalHeight,600); 
        this.setData({imageWidth:imageSize.imageWidth,imageHeight:imageSize.imageHeight});
    }
})

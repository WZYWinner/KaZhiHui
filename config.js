// 小程序封装公用组件  配置文件
var config = {
    // 后台开发坏境 www
    netServer: "https://www.fjkzh.cn/",
    // 开发坏境 admai
    admainServer: "https://www.kzhapp.cn/",
    token: wx.getStorageSync('token'),
    // 图片域名
    imgserver: "http://img.fjkzh.cn",
    temp: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: wx.getStorageSync('token'),
        uid: wx.getStorageSync('uid'),
        from: "web"
    },
    // 封装显示
    showToast: function(text,sta){
        wx.showToast({
          title: text, //提示的内容,
          icon: sta, //图标,
          duration: 2000, //延迟时间,
        });
    }
}

// 导出
module.exports = config;
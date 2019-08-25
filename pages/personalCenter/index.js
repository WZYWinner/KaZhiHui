
// 引用实例
var app = getApp();
var config = require("../../config.js");

Page({
    data: {
        userInfo:[],
        httpImg:'',
        id: 0,
        list: [
            {
                img: '../images/personalCenter/kabao.png',
                span: '我的卡包'
            },{
                img: '../images/personalCenter/friends.png',
                span: '我的好友'
            },{
                img: '../images/personalCenter/baodan.png',
                span: '我的报单'
            },{
                img: '../images/personalCenter/baoxian.png',
                span: '我的保险'
            },{
                img: '../images/personalCenter/fuwu.png',
                span: '专属服务'
            },{
                img: '../images/personalCenter/tupian.png',
                span: '推广图制作'
            },{
                img: '../images/personalCenter/help.png',
                span: '帮助中心'
            },{
                img: '../images/personalCenter/huodong.png',
                span: '活动中心'
            },{
                img: '../images/personalCenter/zixun.png',
                span: '资讯'
            },{
                img: '../images/personalCenter/shezhi.png',
                span: '设置'
            }
        ]
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
    goto: function (event) {
        console.log(event)
        var index = event.currentTarget.dataset.index
        console.log(index)
        if(index===0){
            wx.navigateTo({
                url: '../myCard/index'
            })
        }else if(index===1){
            wx.navigateTo({
                url: '../myFriends/index'
            })
        }else if(index===2){
            wx.navigateTo({
                url: '../myDeclaration/index'
            })
        }else if(index===3){
            wx.navigateTo({
                url: '../myInsurance/index'
            })
        }else if(index===4){
            wx.navigateTo({
                url: '../Serve/index'
            })
        }else if(index===5){
            wx.navigateTo({
                url: '../pictureProduction/index'
            })
        }else if(index===6){
            wx.navigateTo({
                url: '../helpCenter/index'
            })
        }else if(index===7){
            wx.navigateTo({
                url: '../activeCenter/index'
            })
        }else if(index===8){
            wx.navigateTo({
                url: '../informationCenter/index'
            })
        }else if(index===9){
            wx.navigateTo({
                url: '../Setting/index'
                })
            }
        },
    myInfo: function (event) {
        wx.navigateTo({
            url: '../Setting/index'
        })
    },
    myEarnings: function(event) {
        wx.navigateTo({
            url: '../myEarnings/index'
        })
    }
})

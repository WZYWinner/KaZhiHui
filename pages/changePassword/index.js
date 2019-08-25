// 引用
var config = require("../../config.js");
var fengMd5 = require("../../utils/fengMd5.js");
// 识别卡名
var bankcodeinfo = require('../../utils/bandCodeInfo.js');
// 引用实例
var app = getApp();

Page({
    data: {
        oldPassword:'',
        passWord: '',
        passWord1: ''
    },
    watchOldPassword: function(e){
            this.data.oldPassword = e.detail.value
        console.log(this.data.oldPassword);
    },

    watchPassWord: function(e){
        this.data.passWord = e.detail.value
    console.log(this.data.passWord);
    },
    
    watchPassWord1: function(e){
    this.data.passWord1 = e.detail.value
    console.log(this.data.passWord1);
    },
    confirm: function (e){
        if (this.data.oldPassword == '') {
            wx: wx.showToast({
              title: '输入不能为空',
              icon: 'none'
            })
            return false
          }
          else if (this.data.passWord == '') {
            wx: wx.showToast({
              title: '输入不能为空',
              icon: 'none'
            })
            return false
          }else if (this.data.passWord1 == '') {
            wx: wx.showToast({
              title: '输入不能为空',
              icon: 'none'
            })
            return false
          }
            else if(this.data.passWord!=this.data.passWord1){
              wx.showToast({
                title: '两次输入的密码不一致',
                icon: 'none'
              })
            }else{
            wx.request({
              url: config.netServer+ "User/FotrePwd", //开发者服务器接口地址",
              data: {
                Old: this.data.oldPassword,
                New: this.data.passWord
              }, //请求的参数",
              method: 'POST',
              header: config.temp,
              dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
              success: res => {
                if(res.data.state===false){
                    wx.showToast({
                        title: '旧密码输入错误',
                        icon: 'none'
                      })
                }else{
                    wx.showToast({
                        title: '修改成功',
                        icon: 'none',
                        duration: 2000
                      })
                      wx.navigateTo({ url: '../Setting/index' });
                }
                  console.log(res)
              },
              fail: () => {},
              complete: () => {}
            });
        }
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
    }
})

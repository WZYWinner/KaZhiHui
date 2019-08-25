// 引用config
var config = require("../../config.js");

Page({
    data: {
        Phone: "",
        bankName: "",
        jifenList: [],
        jifenName: "",
        zhangdanList: [],
        zhangdanName: "",
        eduList: [],
        eduName: "",
    },
    onLoad: function (options) {

        // 动态修改导航的文字
        wx.setNavigationBarTitle({
            title: options.bankName + "银行服务大厅"
        });
        this.setData({
            Phone: options.Phone,
            bankName: options.bankName
        })

        var list = JSON.parse(options.Items)
        if (list.积分查询) {
            this.setData({
                jifenName: "积分查询",
                jifenList: list.积分查询
            })
        }
        if (list.账单查询) {
            this.setData({
                zhangdanName: "账单查询",
                zhangdanList: list.账单查询
            })
        }
        if (list.额度查询) {
            this.setData({
                eduName: "额度查询",
                eduList: list.额度查询
            })
        }
    },
    // 调用电话
    onCalling: function (e) {
        console.log(e.currentTarget.dataset.phone)
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone,
            success: (res)=> {
                console.log("拨打电话成功！")
            },
            fail: (ero)=> {
                console.log("拨打电话失败！")
            }
        });
    },
    // 发送短信
    onbankKahao: function (e) {
        // wx.navigateTo({
        //     url: '../bankKahao/index?format='+e.currentTarget.dataset.format+"&sendphonenum="+e.currentTarget.dataset.sendphonenum
        // });
    }
})
// 引用实例
var app = getApp();
var config = require("../../config.js")
// 加密
var fengMd5 = require("../../utils/fengMd5.js");
Page({
    data: {
        show: false,
        planActive: 0,
        creditCardList: [],
        debitCardList: [],
        Repay: []
    },
    onplanChange: function (e) {

    },
    onClose: function (e) {
        this.setData({
            show: false
        })
    },
    onTo: function () {
        this.setData({
            show: true
        })
    },
    creditCardAdd: function () {
        wx.navigateTo({
            url: '../addCreditCard/index'
        });
    },
    debitCardAdd: function () {
        wx.navigateTo({
            url: '../addDebitCard/index'
        });
    },

    //信用卡修改
    creditCardModify: function (event) {
        wx.navigateTo({
            url: '../creditCardModify/index?creditCardId=' + event.currentTarget.dataset.bankaccountno + "&expireDate=" + event.currentTarget.dataset.expireddate + "&StatementDate=" + event.currentTarget.dataset.statementdate + "&RepaymentDate=" + event.currentTarget.dataset.repaymentdate
        });
    },
    //借记卡修改
    debitCardModify: function (event) {
        wx.navigateTo({
            url: '../debitCardModify/index?debitCardId=' + event.currentTarget.dataset.bankaccountno
        });
    },

    onLoad: function () {

        //我的卡包
        var reqCode = "R00401";
        var reqData = {
            UId: JSON.stringify(wx.getStorageSync('uid')),
            ChannelCode: "",
            CardCode: "1"
        }
        var reqData1 = {
            UId: JSON.stringify(wx.getStorageSync('uid')),
            ChannelCode: "",
            CardCode: "0"
        }
        var curTemp = fengMd5(reqCode, reqData)
        var curTemp1 = fengMd5(reqCode, reqData1)
        let repay = []

        //请求信用卡接口
        wx.request({
            url: config.admainServer + "svr/AppApi.ashx",
            data: {
                reqdata: curTemp
            }, //请求的参数",
            method: 'GET',
            async: false,
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("信用卡", res.data.RespData.RespBody);

                for (let i = 0; i < res.data.RespData.RespBody.length; i++) {
                    repay[i] = Number(res.data.RespData.RespBody[i].RepaymentDate);
                    console.log(repay[i])
                    this.data.Repay.push(repay[i])
                    // var ary = this.data.Repay
                    // this.setData({
                    //     Repay: this.data.Repay.push(repay[i])
                    // })
                }
                console.log("999", this.data.Repay)

                var aaa = res.data.RespData.RespBody.map((item)=>{
                    // var bbb = "bbb"
                    item.bbb = "";
                    console.log("nadao", item)

                    const backDay = this.data.Repay


			// 获得指定月份的天数
			var getMonthDayNumber = function (year, month) {
			return new Date(year, month, 0).getDate()
			}


			var getDate = function (backDay) {
			let date = new Date()
			// 获得当前号数
			const today = date.getDate()
			const nowMonth = date.getMonth() + 1
			const nowYear = date.getFullYear()
			// 距离还款
			let repayMentNumberDate = []
			// 当前月份的天数
			let nowMonthDay = getMonthDayNumber(nowYear, nowMonth)
			for (let i = 0; i < backDay.length; i++) {
			repayMentNumberDate[i] = {}
			if (backDay[i] > today) {
			repayMentNumberDate[i].day = backDay[i] - today
			repayMentNumberDate[i].month = nowMonth
			} else {
			repayMentNumberDate[i].day = nowMonthDay - today + backDay[i]
			if (nowMonth < 12) {
			repayMentNumberDate[i].month = nowMonth + 1
			} else {
			repayMentNumberDate[i].month = 1
			}
			}
			}
			return repayMentNumberDate
            }
            var needData=getDate(backDay)
            console.log("need",needData) 
            item.monthDay=needData
            // 还款日 
            
            var newMonth=needData.month
            console.log("newMonth",newMonth)

                    return item
                })
                console.log("新数据", aaa)


                

                this.setData({
                    creditCardList: res.data.RespData.RespBody
                })

            },
            fail: () => {},
            complete: () => {}
        });

        console.log("8888", this.data.Repay)

        //请求借记卡接口
        wx.request({
            url: config.admainServer + "svr/AppApi.ashx",
            data: {
                reqdata: curTemp1
            }, //请求的参数",
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("借记卡", res.data.RespData.RespBody);
                this.setData({
                    debitCardList: res.data.RespData.RespBody
                })
            },
            fail: () => {},
            complete: () => {}
        });
    }
})
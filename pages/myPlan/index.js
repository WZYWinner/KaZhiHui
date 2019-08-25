// 引用实例
var app = getApp();
var config = require('../../config.js');
var fengMd5 = require('../../utils/fengMd5.js');

Page({
    data: {
        planActive: 0,
        noStartList: [],
        implementList: [],
        finishList: [],
        failList: [],
        curpage: 1,
        dayNum: null,
        num: null,
        fun: function (Str) {
            var result = Str.split(",");
            return result;
        },
    },
    // 截取字符串
    subStr: function (Str) {
        var result = Str.split(",");
        console.log(result)
        return result.length;
    },
    onLoad: function (ops) {
        // console.log(this.subStr())
        // 未开始 svr/KFTService.ashx
        var reqCode = "R00267";
        var reqData = {
            curpage: this.data.curpage,
            PlanState: "0",
            userId: JSON.stringify(wx.getStorageSync('uid'))
        }
        var curTemp = fengMd5(reqCode, reqData);
        wx.request({
            url: config.admainServer + 'svr/KFTService.ashx', //开发者服务器接口地址",
            data: {
                reqdata: curTemp
            }, //请求的参数",
            method: 'GET',
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log("未执行数据", res.data);
                if (res.data.RespData.RespHead.Status == 200) {
                    this.setData({
                        noStartList: res.data.RespData.RespBody
                    })
                } else {
                    config.showToast(res.data.RespData.RespHead.Message, "none");
                    return false;
                }

            },
            fail: () => {},
            complete: () => {}
        });
    },
    onplanChange: function (e) {
        if (e.detail.index == 0) {
            // 未开始 svr/KFTService.ashx
            var reqCode = "R00267";
            var reqData = {
                curpage: this.data.curpage,
                PlanState: "0",
                userId: JSON.stringify(wx.getStorageSync('uid'))
            }
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/KFTService.ashx', //开发者服务器接口地址",
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log("未执行数据", res.data);
                    if (res.data.RespData.RespHead.Status == 200) {
                        noStartList: res.data.RespData.RespBody
                    }
                    else {
                        config.showToast(res.data.RespData.RespHead.Message, "none");
                        return false;
                    }

                },
                fail: (ero) => {
                    console.log(ero)
                    config.showToast("请求出错", "none");
                },
                complete: () => {}
            });
        }

        if (e.detail.index == 1) {
            // 未开始 svr/KFTService.ashx
            var reqCode = "R00267";
            var reqData = {
                curpage: this.data.curpage,
                PlanState: "1",
                userId: JSON.stringify(wx.getStorageSync('uid'))
            }
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/KFTService.ashx', //开发者服务器接口地址",
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log("未执行数据", res.data);
                    if (res.data.RespData.RespHead.Status == 200) {
                        var itemss = res.data.RespData.RespBody.map((item) => {
                            item.DatePlan = item.DatePlan.split(",").length
                            return item;
                        })
                        console.log("新数组吗", itemss)
                        this.setData({
                            implementList: res.data.RespData.RespBody
                        })
                    } else {
                        config.showToast(res.data.RespData.RespHead.Message, "none");
                        return false;
                    }

                },
                fail: (ero) => {
                    console.log(ero)
                    config.showToast("请求出错", "none");
                },
                complete: () => {}
            });
        }
        if (e.detail.index == 2) {
            // 未开始 svr/KFTService.ashx
            var reqCode = "R00267";
            var reqData = {
                curpage: this.data.curpage,
                PlanState: "2",
                userId: JSON.stringify(wx.getStorageSync('uid'))
            }
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/KFTService.ashx', //开发者服务器接口地址",
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log("未执行数据", res.data);
                    if (res.data.RespData.RespHead.Status == 200) {
                        var itemss = res.data.RespData.RespBody.map((item) => {
                            item.DatePlan = item.DatePlan.split(",").length
                            return item;
                        })
                        console.log("新数组吗", itemss)
                        this.setData({
                            finishList: res.data.RespData.RespBody
                        })
                    } else {
                        config.showToast(res.data.RespData.RespHead.Message, "none");
                        return false;
                    }

                },
                fail: (ero) => {
                    console.log(ero)
                    config.showToast("请求出错", "none");
                },
                complete: () => {}
            });
        }
        if (e.detail.index == 3) {
            // 未开始 svr/KFTService.ashx
            var reqCode = "R00267";
            var reqData = {
                curpage: this.data.curpage,
                PlanState: "3",
                userId: JSON.stringify(wx.getStorageSync('uid'))
            }
            var curTemp = fengMd5(reqCode, reqData);
            wx.request({
                url: config.admainServer + 'svr/KFTService.ashx', //开发者服务器接口地址",
                data: {
                    reqdata: curTemp
                }, //请求的参数",
                method: 'GET',
                dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                success: res => {
                    console.log("未执行数据", res.data);
                    if (res.data.RespData.RespHead.Status == 200) {
                        var itemss = res.data.RespData.RespBody.map((item) => {
                            item.DatePlan = item.DatePlan.split(",").length
                            return item;
                        })
                        console.log("新数组吗", itemss)
                        this.setData({
                            failList: res.data.RespData.RespBody
                        })
                    } else {
                        config.showToast(res.data.RespData.RespHead.Message, "none");
                        return false;
                    }

                },
                fail: (ero) => {
                    console.log(ero)
                    config.showToast("请求出错", "none");
                },
                complete: () => {}
            });
        }
        console.log(e.detail)
    },
    // 计划详情页
    onplanDetail: function (e) {
        // console.log(e)
        wx.navigateTo({
            url: '../../pages/planDetail/index'
        });
    },
})
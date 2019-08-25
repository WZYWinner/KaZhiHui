// 引用实例
var app = getApp();
var config = require('../../config.js');

Page({
    data: {
        proradList: [],
        true: true,
        token: "",
        bankId: "",
        submitType: "",
        Memo: "",
        radio: null,
        redeemCodevalue: "",
        timer: "",
        formInfo: null,
        file: "",
        icon: [],
        
        eqcode: "eqcode",
        eqcodeimage: "",
        eqcodephoto: "",
        texting: "正在上传……",
        iconing: "loading",
        textfail: "上传失败！",
        iconfail: "none",
        textcode: "兑换码不能为空",
        textPro: "商品必选",
    },
    onLoad: function (ops) {
        var items = JSON.parse(ops.items);
        this.setData({
            proradList: items,
            bankId: ops.bankId,
            submitType: ops.submitType
        })
        // 获取当前时间
        var nowTime = new Date()
        var curTime = nowTime.getFullYear() + "-" + (nowTime.getMonth() + 1) + "-" + nowTime.getDate() + " " + nowTime.getHours() + ":" + nowTime.getMinutes() + ":" + nowTime.getSeconds();
        this.setData({
            timer: curTime
        })
        console.log("当前时间", this.data.timer)
    },
    onradioChange: function (e) {
        console.log("变化选择", e)
        this.setData({
            radio: e.detail
        })
    },
    onradioClick: function (e) {
        console.log("点击选择", e.currentTarget.dataset);
        this.setData({
            radio: e.currentTarget.dataset.name
        })
    },
    // 预览图片
    previewImg: function (e) {
        var url = e.currentTarget.dataset.url;
        // wx.previewImage({
        //   current: url,//当前显示图片的链接
        // });
    },
    // 上传二维码
    chooseEqCodeimage(e) {
        console.log(e)
        // 调用手机扫描
                // wx.scanCode({
                //     //   onlyFromCamera: true, //是否只能从相机扫码，不允许从相册选择图片,
                //     success: res => {
                //         console.log(res)
                //         this.setData({
                //             eqcodeimage: res.result,
                //             redeemCodevalue: res.result
                //         })
                //     }
                // });
                // this.setData({
                    
                // })
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
               
                
                this.setData({
                    icon: res.tempFiles,
                    file: res.tempFiles
                })
                console.log('我是图片上传成功后的回调', JSON.stringify(this.data.icon))
                // 图片地址
                var imgs = res.tempFiles[0].path
                // console.log("999999999", this.getObjectURL(imgs))
                // var photoImg;
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                var tempFilePaths = res.tempFilePaths;
                this.setData({
                    eqcodeimage: imgs
                })
                //启动上传等待中...  
                config.showToast(this.data.texting, this.data.iconing);
                wx.uploadFile({
                  url: config.netServer + "Submit/Create", //开发者服务器 url
                  filePath: tempFilePaths[0], //要上传文件资源的路径
                  header: {
                    "Content-Type": "multipart/form-data"
                    },
                  name: 'file', //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                  formData: {
                    Token: wx.getStorageSync('token'),
                    BankID: this.data.bankId,
                    Memo:this.data.Memo,
                    SubmitCode: this.data.redeemCodevalue,
                    CodeTime: this.data.timer,
                    ProductID: this.data.radio
                  },
                  success: res => {
                      console.log(console.log("成功了吗",res))
                  },
                  fail: (reo) => {
                      console.log(reo)
                  },
                  complete: () => {}
                });

                // 识别



                // var uploadImgCount = 0;
                // wx.uploadFile({
                //     url: 'https://admin.facezhifu.cn/Common/UploadImg?mark=' + this.data.eqcode,
                //     filePath: imgs,
                //     name: 'photo',
                //     success: res => {
                //         this.setData({
                //             eqcodephoto: res.data
                //         })
                //     },
                //     fail: ero => {
                // config.showToast(this.data.textfail,this.data.iconfail);
                //         console.log('上传失败', ero)
                //     }
                // });
                

            },
        })


        // var query = wx.createSelectorQuery()
        // query.select("#imageEq").boundingClientRect((res)=>{
        //   console.log(res)
        // //   this.setData({
        // //     height: res.width * 1 + 'px'
        // //   })
        // }).exec()
    },
    // 扫描
    // scanCode: function(e){
    //     console.log("tupian",e)
    // },
    // 兑换码
    onredeemCodeChange: function (e) {
        // console.log("我是兑换码值", e);
        this.setData({
            redeemCodevalue: e.detail
        })
    },
    // 点击提交
    formSubmit: function (e) {
        console.log(e)
        if(!this.data.redeemCodevalue){
            config.showToast(this.data.textcode,this.data.iconfail);
            return false;
        }
        this.setData({
            token: wx.getStorageSync('token')
        })
        var appp = e.detail.value
        appp.Token = this.data.token
        appp.Icon = JSON.stringify(this.data.icon) 
        wx.request({
            url: config.netServer + "Submit/Create", //开发者服务器接口地址",
            data: appp,//请求的参数",
            method: 'POST',
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                apiToken: wx.getStorageSync('token'),
                uid: wx.getStorageSync('uid'),
                from: "web"
            },
            dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
            success: res => {
                console.log(res)
            },
            fail: (ero) => {
                console.log("1",ero)
            },
            complete: (er) => {
                console.log("12",er)
            }
          });
          


        // this.setData({

        // })

        
        
        // 两种情况 
        // debugger
        // submitType = 0
        // let formData1 = new FormData();
        
        // var formData1 = new window.FormData();
        // formData1.append("Token", wx.getStorageSync('token'));
        // formData1.append("Memo", this.data.Memo);
        // formData1.append("BankID", this.data.bankId);
        // formData1.append("ProductID", this.data.radio);
        // formData1.append("SubmitCode", this.data.redeemCodevalue);
        // formData1.append("CodeTime",  this.data.timer);
        // console.log(formData1.get("Token"))
        // if (this.data.submitType == 2) {

        // }
        // var formData1 = {
        //     Token: wx.getStorageSync('token'),
        //     Memo: this.data.Memo,
        //     BankID: this.data.bankId,
        //     ProductID: this.data.radio,
        //     SubmitCode: this.data.redeemCodevalue,
        //     CodeTime: this.data.timer
        // }
        // console.log(formData1)
        // if(this.data.submitType == 0){
            
        // }
    },
})
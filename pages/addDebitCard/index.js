// 引用实例
var app = getApp();
var config = require("../../config.js");
var fengMd5 = require("../../utils/fengMd5.js");

Page({
    data: {
        userInfo: [],
        quyuShow: true,
        region: [],
        customItem: '请选择',
        jiejikazheng: "jiejikazheng",
        jiejikaimagezheng: "",
        jiejikazhengphoto: "",
        jiejikafan: "jiejikafan",
        jiejikaimagefan: "",
        jiejikafanphoto: "",
        kaPhone: "",
        jiejikanum: "",
        zhihangName: "",
        textname: "持卡人姓名必填",
        textshen: "身份证号不为空",
        textPhone: "预留手机号不为空",
        textkahao: "卡号不为空",
        textcity: "省市必选",
        textzhihang: "支行名称必填",
        textPhonegeshi: "手机号格式不对",
        texting: "正在上传……",
        textzhengphoto: "卡正面必传",
        textfanphoto: "卡反面必传",
        iconing: "loading",
        textfail: "上传失败！",
        textjsfail: "请求失败",
        iconfail: "none",
        provName: '',
        multiName: '',
        kabao: "kabao",
    },
    onLoad: function(){
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
     // 手机号
     onPhonechange: function(e){
        this.setData({
            kaPhone: e.detail
        })
    },
    // 借记卡
    onjiejichange: function(e){
        this.setData({
            jiejikanum: e.detail
        })
    },
    // 支行名
    onzhichange: function(e){
        this.setData({
            zhihangName: e.detail
        })
    },
    
    // 确定区域
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            quyuShow: false,
            region: e.detail.value
        })
        this.setData({
            provName: this.data.region[0],
            multiName: this.data.region[1]
        })
        console.log(1111111111111111,this.data.multiName)
      },
    // 上传借记卡正面
    choosejiejikazhengimage(e) {
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
                    jiejikaimagezheng: imgs
                })
                
                //启动上传等待中...  
                config.showToast(this.data.texting,this.data.iconing);
                var uploadImgCount = 0;
                wx.uploadFile({
                    url: config.admainServer+'svr/UploadFile.ashx?path='+this.data.kabao,
                    filePath: imgs,
                    name: 'photo',
                    success: res => {
                        console.log('正面', JSON.parse(res.data))
                        this.setData({
                            jiejikazhengphoto: JSON.parse(res.data).result
                        })
                    },
                    fail: ero => {
                    config.showToast(this.data.textfail,this.data.iconfail);
                        console.log('上传失败', ero)
                    }
                });

            }
        })
    },
    // 上传借记卡反面
    choosejiejikafanimage(e) {
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
                    jiejikaimagefan: imgss
                })
                //启动上传等待中...  
                config.showToast(this.data.texting,this.data.iconing);
                var uploadImgCount = 0;
                wx.uploadFile({
                    url: config.admainServer+'svr/UploadFile.ashx?path='+this.data.kabao,
                    filePath: imgss,
                    name: 'photo',
                    success: res => {
                        console.log('反面',JSON.parse(res.data))
                        this.setData({
                            jiejikafanphoto: JSON.parse(res.data).result
                        })
                    },
                    fail: ero => {
                    config.showToast(this.data.textfail,this.data.iconfail);
                        console.log('上传失败', ero)
                    }
                });

            }
        })
    },
    // 提交
    toSave: function(e){
        var reqPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if(!this.data.kaPhone){
            config.showToast(this.data.textPhone,this.data.iconfail);
            return false;
        }else{
            // if(reqPhone.test(this.data.kaPhone)){
                
            // }else{
            //     config.showToast(this.data.textPhonegeshi,this.data.iconfail);
            //     return false;
            // }
        }
        if(!this.data.jiejikanum){
            config.showToast(this.data.textkahao,this.data.iconfail);
            return false;
        }
        if(!this.data.multiName){
            config.showToast(this.data.textcity,this.data.iconfail);
            return false;
        }
        if(!this.data.zhihangName){
            config.showToast(this.data.textzhihang,this.data.iconfail);
            return false;
        }
        if(!this.data.jiejikazhengphoto){
            config.showToast(this.data.textzhengphoto,this.data.iconfail);
            return false;
        }
        if(!this.data.jiejikafanphoto){
            config.showToast(this.data.textfanphoto,this.data.iconfail);
            return false;
        }
        var resCode = "R00402";
        var resData = {
            UId: JSON.stringify(wx.getStorageSync('uid')),
            Mobile: this.data.kaPhone,
            BankAccountNo: this.data.jiejikanum,
            BankChannelNo: "000000000000",
            BankSubName: this.data.zhihangName,
            BankProvince: this.data.provName,
            BankCity: this.data.multiName,
            CardPic1: this.data.jiejikazhengphoto,
            CardPic2: this.data.jiejikafanphoto
        }
        console.log("数据",resData)
        var curTemp = fengMd5(resCode,resData);
        wx.request({
          url: config.admainServer + 'svr/AppApi.ashx',
          data: {
              reqdata: curTemp
          }, //请求的参数",
          method: 'GET',
          dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
          success: res => {
              console.log("请求成功数据", res.data)
              if(res.data.RespData.RespHead.Message){
                wx.navigateTo({ url: '../myCard/index' });
              }else{
                  config.showToast(res.data.RespData.RespHead.Message,this.data.iconfail)
                // 
              }
          },
          fail: () => {
              config.showToast(this.data.textjsfail,this.data.iconfail)
          },
          complete: () => {}
        });
    }
})

// 引入md5.js加密
var md5 = require("../utils/md5.js");
function fengMd5(rCode,rData){

    
     // 获取当前时间
     var nowTime = new Date()
     
    //  var curTime = nowTime.getFullYear() + "-" + (nowTime.getMonth() + 1) + "-" + nowTime.getDate() + " " + nowTime.getHours() + ":" + nowTime.getMinutes() + ":" + nowTime.getSeconds();
     var curTime =  new Date().Format("yyyy-MM-dd hh:mm:ss")
    
     var sigm = rCode+ JSON.stringify(rData) + "864259031444752" + curTime;
    var sigmr = md5.md5(sigm).toLowerCase();

    console.log(sigm)
    console.log(sigmr)
     var curTemp = {
         AppKey: "864259031444752",
         ReqCode: rCode,
         Tim: curTime,
         version: "1.2.59",
         reqData: rData,
         sign: sigmr
     }
    return curTemp;
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 导出
module.exports =  fengMd5;
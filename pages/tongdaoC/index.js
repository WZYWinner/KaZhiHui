Page({
    data: {
        tongCUrl: ""
    },
    onLoad: function(ops){
        console.log(ops.Curl)
        console.log(decodeURIComponent(ops.Curl))
        this.setData({
            tongCUrl: decodeURIComponent(ops.Curl)  //decodeURIComponent  进行解码 还原刚开始的路径
        })
    }
})
//app.js
App({
  onLaunch: function () {
    
    //调用API从本地缓存中获取数据  
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  formartData:function(time){
    var _time= new Date(time*1000);
    return _time.getFullYear() + "-" + ((_time.getMonth() + 1) < 10 ? '0' + (_time.getMonth() + 1) : (_time.getMonth() + 1)) + "-" + (_time.getDate() < 10 ? '0' + _time.getDate() : _time.getDate())
  },
  globalData:{
    userInfo:null
  },
  shareData: {
    title: '募融富，尽览金融江湖事',
    path: 'pages/index/index',
    success: function (res) {
      // 转发成功
    },
    fail: function (res) {
      // 转发失败
    }
  }
})
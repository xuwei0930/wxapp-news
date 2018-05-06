
var WxParse = require('../../wxParse/wxParse.js');

Page({

  data: {
  },

  onShareAppMessage: function (res) {
    return getApp().shareData
  },
  onLoad: function (options) {

    var self = this;
    var optionId = options.id;
    wx.showLoading({
      title: '请稍后',
    })
    wx.request({
      url: 'https://murongfu.bulei.vc/api/index/page/id/' + optionId,
      method: "GET",
      success: function (res) {
        var article = res.data.data[0].content;
        self.setData({
          detail: res.data.data
        });
        wx.setNavigationBarTitle({ title: res.data.data.title });

        WxParse.wxParse('article', 'html', article, self, 5);
        wx.hideLoading()
      }
    });
  }



})
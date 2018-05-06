
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
      url: 'https://murongfu.bulei.vc/api/index/article_detail/id/' + optionId,
      method: "GET",
      success: function (res) {
        var article = res.data.data.content;
        console.log(res.data.data);
        var _data = res.data.data;
        _data.lasttime = getApp().formartData(_data.lasttime)
        self.setData({
          detail: _data
        });
        wx.setNavigationBarTitle({ title: res.data.data.title});

        WxParse.wxParse('article', 'html', article, self, 5);
        wx.hideLoading()
      }
    });
  }



})
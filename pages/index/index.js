

var currentPage = 0;
var loadType = 0;
var dataArr;

Page({

  data: {
    //body
    navs: [],
    datas: [],
    imgUrls:[],
    current:0,
    page:1,
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.setData({
      page: 1
    });
    this.getContentData(this.data.current, true, true);
  },
  onReachBottom: function () {
    this.setData({
      page: this.data.page+1
    });
    this.getContentData(this.data.current, true);
  },
  //view load
  onLoad: function () {
    loadType = 0;
    this.getNav();
    this.getBanner();
    this.getContentData();
  },
  onShareAppMessage: function (res) {
    return getApp().shareData
  },
  modalChange: function (e) {
    let _navs = this.data.navs;
    for (let i = 0; i < _navs.length;i++){
      if (_navs[i].cid == e.currentTarget.dataset.index){
        _navs[i].active=true
      }else{
        _navs[i].active = false
      }
    }
    this.setData({
      navs: _navs,
      current: e.currentTarget.dataset.index,
      page:1
    });
    this.getContentData(e.currentTarget.dataset.index, true, true);
  },

  getBanner: function () {
    var self = this;
    wx.request({
      url: 'https://murongfu.bulei.vc/api/index/article_flag',
      method: "GET",
      success: function (res) {
        var newData = res.data;
        var list = newData.data;
        self.setData({
          imgUrls: list
        })
      }
    });
  },
  getNav: function () {
    var self = this;
    wx.request({
      url: 'https://murongfu.bulei.vc/api/index/category',
      method: "GET",
      success: function (res) {
        var newData = res.data;
        var list = [{ name: "全部" ,active:true }];
        for (var i = 0; i < newData.data.length;i++){
          list.push(newData.data[i]);
        }
        self.setData({
          navs: list
        })
      }
    });
  },

  getContentData: function (cid,showLoading,isNew) {
    showLoading && wx.showLoading({
      title: '请稍后',
    });
    var self = this;
    var number = 10 + currentPage;
    wx.request({
      url: 'https://murongfu.bulei.vc/api/index/article_list',
      method: "GET",
      data:{
        cid: cid || '',
        p:this.data.page
      },
      success: function (res) {
        var newData = res.data.data;
        var list = isNew?[]:self.data.datas;
        if (!newData){
          wx.showToast({
            icon:'none',
            title: '没有更多内容了'
          })
          return;
        }
        for(var i=0;i<newData.length;i++){
          newData[i].lasttime = getApp().formartData(newData[i].lasttime)
          list.push(newData[i]);
        }
        self.setData({
          datas: list,
        })
        showLoading && wx.hideLoading()
      }
    });
  }


})




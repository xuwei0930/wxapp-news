// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:false,
    keyword:'',
    keywords: [
      "测试",
      "热门12",
      "热门3",
      "热门41",
      "热门15",
      "热门61",
      "热门17",
    ],
    list:[]
  },
  setkeyword:function(e){
    this.setData({
      keyword: e.currentTarget.dataset.key
    });
    this.search();
  },
  onShareAppMessage: function (res) {
    return getApp().shareData
  },
  blur:function(e){
    if (e.detail.value==''){
      this.setData({
        search: false
      });
    }
  },
  enter:function(e){
    this.setData({
      keyword:e.detail.value
    });
  },
  
  search: function () {
    if (this.data.keyword==''){
      wx.showToast({
        icon:'none',
        title: '请输入你要搜索的内容'
      });
      return;
    }
    let self=this
    wx.request({
      url: 'https://murongfu.bulei.vc/api/index/article_search/keywords/',
      method: "GET",
      data:{
        keywords: this.data.keyword
      },
      success: function (res) {
        var newData = res.data.data;

        for (var i = 0; i < newData.length; i++) {
          newData[i].lasttime = getApp().formartData(newData[i].lasttime)
        }
        self.setData({
          search:true,
          list: res.data.data || []
        });
      }
    });


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
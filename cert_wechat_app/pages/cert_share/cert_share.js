// pages/cert_share/cert_share.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageProps: null,
    serverName: app.globalData.serverName,
    userInfo: null,
    unionId: 0,
    canIUse: wx.canIUse('request.success.data.unionId'),
  },
  getBindData: function() {
    console.log('cert_share getBindData', this.data);
    wx.request({
      url: '/bindCert',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log('cert_share onLoad options', app.globalData.unionId, this.data.canIUse, options)
    this.setData({
      pageProps: options,
      userInfo: app.globalData.userInfo,
      unionId: app.globalData.unionId,
    })
    console.log('cert_share onLoad unionId', this.data.unionId)
    setTimeout(function() {
      console.log(app.globalData.unionId, _this.data.canIUse);
    }, 2000)
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
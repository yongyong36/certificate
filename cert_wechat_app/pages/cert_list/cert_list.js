// pages/cert_list/cert_list.js
import Api from "../../api/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverName: getApp().globalData.serverName,
    certList: [],
  },
  bindCert: function (event) {
    // console.log(event);
    console.log(event.currentTarget.dataset.certid);
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
    var _this = this;
    wx.request({
      url: _this.data.serverName + '/getCertBytesList', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        _this.setData({
          certList: res.data.certBytesList
        })
        console.log(_this.data.certList);
      }
    })
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
// pages/cert/cert.js
import Api from "../../api/api";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverName: getApp().globalData.serverName,
    userinfo: {},
    sensitiveUserData: null,
  },
  checkSession: function () {
    wx.checkSession({
      success: function () {
        console.log('checkSession success')
      },
      fail: function () {
        console.log('checkSession fail')
        wx.login() //重新登录
      }
    })
  },
  getAppid: function () {
    var _this = this;
    _this.data.sensitiveUserData = getApp().globalData.sensitiveUserData,
    console.log(_this.data.sensitiveUserData)
    if (_this.data.sensitiveUserData) {
      wx.request({
        url: _this.data.serverName + '/getAppid', //仅为示例，并非真实的接口地址
        data: _this.data.sensitiveUserData,
        method: "POST",
        dataType: 'json',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {

          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        }
      })
    } else {
      alert("请重新登录");
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getUserInfo({
      success: function(res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
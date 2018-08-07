// pages/cert/cert.js
import Api from "../../api/api";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverName: getApp().globalData.serverName,
    userInfo: null,
    sensitiveUserData: null,
    certId: 0,
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
    console.log(this.data.sensitiveUserData)
    if (this.data.sensitiveUserData) {
      wx.request({
        url: this.data.serverName + '/getSensitiveData', //仅为示例，并非真实的接口地址
        data: this.data.sensitiveUserData,
        method: "POST",
        dataType: 'json',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
        },
        fail: function (res) {
          console.log(res);
        }
      })
    } else {
      console.log("请重新登录");
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    var _this = this;
    app.userInfoReadyCallback = function () {
      _this.setData({
        userInfo: app.globalData.userInfo,
        sensitiveUserData: app.globalData.sensitiveUserData,
        certId: options.certId
      })
    }
    console.log(this.data.userInfo);
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
    console.log(this.data)
    return {
      title: this.data.userInfo.nickName + '自定义转发标题',
      path: '/index/index?id=123'
    }
  }
})
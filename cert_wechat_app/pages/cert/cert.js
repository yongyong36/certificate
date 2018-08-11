// pages/cert/cert.js
import Api from "../../api/api";
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageProps: null,
    serverName: app.globalData.serverName,
    userInfo: null,
    unionId: 0,
    certId: 0,
  },
  checkSession: function () {
    wx.checkSession({
      success: function () {
        console.log('cert checkSession success')
      },
      fail: function () {
        console.log('cert checkSession fail')
        wx.login() //重新登录
      }
    })
  },
  getUnionId: function () {
    console.log('cert getUnionId')
    if (this.data.sensitiveUserData) {
      wx.request({
        url: this.data.serverName + '/getUnionId', //仅为示例，并非真实的接口地址
        data: this.data.sensitiveUserData,
        method: "POST",
        dataType: 'json',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log('cert ', res.data);
        },
        fail: function (res) {
          console.log('cert ', res);
        }
      })
    } else {
      console.log("cert 请重新登录");
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('cert onLoad options', options)
    this.setData({
      pageProps: options,
      userInfo: app.globalData.userInfo,
      unionId: wx.getStorageSync('unionId'),
      // sensitiveUserData: app.globalData.sensitiveUserData,
      certId: options.certId
    })
    console.log('cert onLoad this.data', this.data)
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
    console.log('cert onShareAppMessage', this.data)
    return {
      title: this.data.userInfo.nickName + '向你发出了一个婚礼猫'+ this.data.pageProps.certMeaning+'证领取邀请',
      path: 'pages/cert_share/cert_share?' +
      'certId=' + this.data.pageProps.certId +
      'certMeaning=' + this.data.pageProps.certMeaning +
      'invitedNickName=' + this.data.userInfo.nickName +
      'inviterUnionId=' + this.data.unionId,
    }
  }
})
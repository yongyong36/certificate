// pages/cert_share/cert_share.js
let app = getApp();
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        pageProps: null,
        serverName: app.globalData.serverName,
        // userInfo: null,
        unionId: 0,
        oneself: false,
    },
    getBindData: function () {
        console.log('cert_share getBindData', this.data);
        if(!this.data.oneself) {
            wx.request({
                url: this.data.serverName + '/bindCert',
                method: 'POST',
                data: {
                    inviterUnionId: this.data.pageProps.inviterUnionId,
                    invitedUnionId: this.data.unionId,
                    certId: this.data.pageProps.certId,
                    isCouple: this.data.pageProps.isCouple,
                },
                success: function (res) {
                    console.log(res.data);
                },
                fail: function (err) {
                    console.log(err);
                }
            })
        }
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        _this.setData({
            pageProps: options,
            unionId: wx.getStorageSync('unionId'),
        });
        if (this.data.unionId === this.data.pageProps.inviterUnionId) {
            // 邀请者本人
            this.setData({
                oneself: true,
            });
        } else {
            // 非邀请者本人
        
        }
        
        
        
        console.log('cert_share onLoad options', options, this.data.unionId)
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
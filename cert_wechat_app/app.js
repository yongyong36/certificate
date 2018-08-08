//app.js
App({
    onLaunch: function () {
        let _this = this;
        // 展示本地存储能力
        let logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    
        _this.login();
        // 获取用户信息
        wx.getSetting({
            success: res => {
                // console.log('app getSetting', res)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // console.log('app getUserInfo', res)
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // this.globalData.sensitiveUserData = res
                            
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    login: function () {    // 登录，获取code
        let _this = this;
        wx.login({
            success: res => {
                console.log('app login', res)
                _this.getUnionId(res.code);
            }
        })
    },
    getUnionId: function(code) {    // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let _this = this;
        wx.request({
            url: this.globalData.serverName + '/storageCode',
            method: "POST",
            data: {code: code},
            success: function (res) {
                console.log('app storageCode success', res.data);
                _this.globalData.unionId = res.data.unionId;
            },
            fail: function (res) {
                console.log('app storageCode fail', res)
            }
        })
    },
    globalData: {
        // serverName: 'http://127.0.0.1:3000',
        serverName: 'http://192.168.2.35:3000',
        userInfo: null,
        unionId: 0,
        // sensitiveUserData: null
    }
})
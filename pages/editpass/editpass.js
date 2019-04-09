// pages/editpass/editpass.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    codee: '获取验证码',
    tel:""
  },
  formSubmit(e) {
    console.log(e)
    console.log(e.detail.value)
    var oldMi = e.detail.value.oldMi;
    var newMi = e.detail.value.newMi;
    var newMi2 = e.detail.value.newMi2;
    var newCode = e.detail.value.newCode;
    var tel = this.data.tel
    if (newMi == "" || newMi2 == "") {
      wx.showToast({
        title: '您的密码为空',
        icon: 'none',
        duration: 1500
      })
    } else if (newMi != newMi2) {
      wx.showToast({
        title: '您的新密码不一致',
        icon: 'none',
        duration: 1500
      })
    } else { //如果不为空,新密码一致,就发送请求
      wx.showLoading({
        title: '网络请求中......',
      })
      // 发送请求
      wx.request({
        url: 'http://192.168.0.106:8088/api/user/update/password',
        method: "post",
        header: {
          "Authorization": "Basic YXBwOmFwcDEwMTI=",
        },
        data: {
          account: tel,
          password: newMi,
          smsCode: newCode,
          smsType: 2
        },
        success: (res) => { //请求成功
          console.log(res.data);
       
            wx.showToast({
              title: "修改成功",
              icon: "success",
              duration: 1000,
              success: function() {
                wx.clearStorage()
                setTimeout(function() {
                  wx.navigateTo({
                    url: '../login/login',
                  })
                }, 2000)
              }
            })
       
        }
      })
    }
  },

  // 获取验证码
  goGetCode(e) {
    var tel=this.data.tel
    console.log(tel)
      var _this = this;
      var time = 60;
      // console.log(_that.setData)
      _this.setData({
        codee: '60秒后重发',
        disabled: true,
      })
      var Interval = setInterval(function () {
        time--;
        if (time > 0) {
          _this.setData({
            codee: time + '秒后重发'
          })
        } else {
          clearInterval(Interval);
          _this.setData({
            codee: '获取验证码',
            disabled: false
          })
        }
      }, 1000)
      wx.request({
        url: 'http://192.168.0.106:8088/api/system/send-sms',
        method: "post",
        header: {
          "Authorization": "Basic YXBwOmFwcDEwMTI=",
        },
        data: {
          tel: tel,
          type: 2
        },
        success: function (res) {
          wx.showToast({
            title: '获取验证码成功',
          })
        }
      })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const account = wx.getStorageSync("account")
    console.log(account)
    this.data.tel = account
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
// pages/retrieve/retrieve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    code: '获取验证码',
  },
  // 获取验证码
  goGetCode() {
    var _that = this;
    var time = 60;
    console.log(_that.setData)
    _that.setData({
      code: '60秒后重发',
      disabled: true,
    })
    var Interval = setInterval(function () {
      time--;
      if (time > 0) {
        _that.setData({
          code: time + '秒后重发'
        })
      } else {
        clearInterval(Interval);
        _that.setData({
          code: '获取验证码',
          disabled: false
        })
      }
    }, 1000)
  },
  formSubmit(e) {
    console.log(e.detail)
    var mobil = e.detail.value.mobil
    var userCode = e.detail.value.userCode
    if (mobil == "") {
      wx.showToast({
        title: '手机号为空',
        icon: 'none',
        mask: true,
        duration: 1500
      })
    }else if (userCode == "") {
      wx.showToast({
        title: '验证码不合法',
        icon: 'none',
        mask: true,
        duration: 1500
      })
    } else { //如果不为空,新密码一致,就发送请求
      wx.showLoading({
        title: '网络请求中......',
        mask: true
      })
      // 发送请求
      wx.request({
        url: '',
        method: 'POST',
        data: {
          mobil: mobil,
          passWord: passWord
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: (res) => {  //请求成功
          console.log(res.data);
          if (res.data.error) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: success,
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.navigateTo({
                    url: '../login/login',
                  })
                }, 2000)
              }
            })
          }
        }
      })
    }
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
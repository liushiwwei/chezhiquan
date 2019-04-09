// pages/register/register.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    codee: '获取验证码',
    mobil: "",
    num: 0,
    tel: "", //用户输入的手机号
  },
  tel(e) { //获取手机号
    console.log(e)
    let tel = e.detail.value
    this.setData({
      tel
    })
  },
  // 获取验证码
  goGetCode(e) {
    console.log(e)
    var _this = this;
    let tel = this.data.tel;
    if (tel == "" || tel.length < 11) {
      wx.showToast({
        title: '手机号不合法',
        icon: 'none',
        mask: true,
        duration: 1500
      })
    } else {
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
          type: 1 
        },
        success: function(res) {
          wx.showToast({
            title: '获取验证码成功',
          })
        }
      })
    }
  },


  // 点击注册
  formSubmit(e) {

    // console.log(e.detail.value)
    var mobil = e.detail.value.mobil //手机号
    var passWord = e.detail.value.passWord //密码
    var passWord2 = e.detail.value.passWord2 //确认密码
    var userCode = e.detail.value.userCode //验证码
    console.log(mobil)
    console.log(passWord)
    console.log(passWord2)
    console.log(userCode)
    if (mobil == "") {
      wx.showToast({
        title: '手机号为空',
        icon: 'none',
        mask: true,
        duration: 1000
      })
    } else if (passWord == "" || passWord2 == "") {
      wx.showToast({
        title: '请输入6位密码',
        icon: 'none',
        mask: true,
        duration: 1000
      })
    } else if (passWord.length== 6) {
      wx.showLoading({
        title: '网络请求中......',
        mask: true,
        duration: 1000
      })
      // 发送请求
      wx.request({
        url: 'http://192.168.0.106:8088/api/user/register',
        method: 'post',
        header: {
          "Authorization": "Basic YXBwOmFwcDEwMTI=",
        },
        data: {
          smsCode: userCode,
          password: passWord,
          account: mobil,
          smsType: 1
        },
        success: function (res) { //请求成功
          console.log(res);
          if (res.data.code == 100000) {
            wx.showLoading({
              title: "注册成功",
              mask: true,
              duration: 1000
            })
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }

        }
      })
    } else if (passWord != passWord2) {
      wx.showToast({
        title: '您的密码不一致',
        icon: 'none',
        mask: true,
        duration: 1000
      })
    } else if (userCode == "") {
      wx.showToast({
        title: '验证码不合法',
        icon: 'none',
        mask: true,
        duration: 1000
      })
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(util.b64EncodeUnicode("我是大哥"))
    // var boto = util.b64EncodeUnicode("app" + ":" + "app1012")
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
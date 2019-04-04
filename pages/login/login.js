// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: "", //手机号
    pass: "", //密码
    motto: "", //ip  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  retrieve() { //跳转到修改密码
    wx.navigateTo({
      url: '/pages/retrieve/retrieve',
    })
  },
  mobilusr(e) { //获取输入框号码
    let tel = e.detail.value
    this.setData({
      tel
    })
  },

  passusr(e) { //获取输入框号码
    let pass = e.detail.value
    this.setData({
      pass
    })
  },

  login() {
    console.log(this.data)
    var tel = this.data.tel;
    var pass = this.data.pass;
    var ip = this.data.motto;
    if (tel == "" && pass == "") {
      wx.showToast({
        icon: "none",
        title: '手机号或密码为空',
      })
    } else {
      wx.request({
        url: 'http://192.168.0.02:8088/api/user/login',
        method: "post",
        header: {
          "Authorization": "Basic YXBwOmFwcDEwMTI=",
        },
        data: {
          account: tel,
          password: pass,
          clientType: 1,
          ip: ip,
          appId: 86,
          appVersion: "1.0.2"
        },
        success: function(res) {
          console.log(res)
          if (res.data.code == 100000) {
            wx.showToast({
              title: "登陆成功",
              icon: 'none',
              mask: true,
            })
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.request({ //ip
      url: 'http://ip-api.com/json',
      success: function(e) {
        console.log(e.data.query);
        that.setData({
          motto: e.data.query
        })
      }
    })

    // wx.login({
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
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
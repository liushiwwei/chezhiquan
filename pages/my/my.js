// pages/my/my.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    usertel: "",
    ifno:"",

  },
  userInfo() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setBackgroundColor({
      backgroundColor: '#666', // 窗口的背景色为白色
    })
  
    wx.getSetting({
      success:function(res){
        // console.log(res.authSetting["scope.userLocation"])
        if (res.authSetting["scope.userLocation"]){
           // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              // console.log(res.userInfo,"调用")
            }
          })
        }
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
    var avatarUrl = wx.getStorageSync("avatarUrl") //用户头像
    this.setData({
      avatarUrl
    })
    if (typeof this.getTabBar === "function"  &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }

    var token = wx.getStorageSync("token") //令牌
    if (!token) { //验证登录
      // console.log("未登录")
      wx.reLaunch({
        url: '/pages/login/login',
      })
    } else {
      // console.log("已登录")
    }   //验证登录
    const account = wx.getStorageSync("account")
    const accId = wx.getStorageSync("accId")
    var myphone = account.substr(3, 4);
    var lphone = account.replace(myphone, "****");
    var ifno = this.data.ifno
    if (token) {
      ifno = true
    } else {
      ifno = false
    }

    this.setData({
      usertel: lphone,
      ifno
    })
    wx.login()
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


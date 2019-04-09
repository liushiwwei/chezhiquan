// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usertel: "",
    ifno:""
  },
  userInfo() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  editMima(){
    wx.navigateTo({
      url: '/pages/editpass/editpass',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setBackgroundColor({
      backgroundColor: '#666', // 窗口的背景色为白色
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
    const account = wx.getStorageSync("account")
    const token = wx.getStorageSync("token")
    const accId = wx.getStorageSync("accId")
    var ifno = this.data.ifno
    if (account) {
      ifno = true
    } else {
      ifno = false
    }

    this.setData({
      usertel: account,
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
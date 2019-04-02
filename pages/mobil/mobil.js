// pages/mobil/mobil.js
var util = require('../../utils/util.js') //引入时间js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: '',
    totimes: '',
    value: '0',
    checked: true 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var TIME = util.formatTime(new Date())
    var toTIME = util.fordatTime(new Date())
    console.log(util)
    this.setData({
      times: TIME,
      totimes: toTIME
    })
  },

  wayTap: function (e) {
    console.log(e);
    console.log(this.data);
    var checked = this.data.checked,
      checked = !checked;
    this.setData({
      checked: checked
    });
  },

  // 点击支付
  czqPay() {
    wx.showLoading({
      title: '数据加载中',
      icon: 'loading',
      duration: 1500
    })

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
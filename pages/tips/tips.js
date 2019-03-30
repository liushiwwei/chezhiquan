// pages/tips/tips.js
// 引入js
import tips from '../../datas/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tips
    })
  },

  tip(e){
    console.log(e.currentTarget.dataset.id)
    var dd = e.currentTarget.dataset.id
    if(dd==1){
      wx.navigateTo({
        url: '/pages/shock/shock',
      })
    }else if(dd==2){
      wx.navigateTo({
        url: '/pages/alarm/alarm',
      })
    } else if (dd == 3) {
      wx.navigateTo({
        url: '/pages/callbj/callbj',
      })
    }else{
      wx.navigateTo({
        url: '/pages/rail/rail',
      })
    }
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
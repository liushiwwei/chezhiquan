// pages/install/install.js
import times from '../../datas/install.js'
import tips from '../../datas/bjtips.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    times:[],
    tips:[],
    index:0,
    idx:0,
    state:"",
    stata:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      times,
      tips
    })
  },
  // 报警时长设置
  bindPickerChangeTime(e){
    // console.log(e)
    // console.log(this.data)
    var index = e.detail.value
    this.setData({
      state: this.data.times[index]
    })
  }, 
  // 报警提示设置
  bindPickerChangeTips(e) {
    console.log(e)
    console.log(this.data)
    var idx = e.detail.value
    this.setData({
      stata: this.data.tips[idx]
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
// pages/tips/tips.js
// 引入js
var util = require('../../utils/util.js') //引入时间js
import tips from '../../datas/tips.js'
var accId = wx.getStorageSync("accId") //用户id
var token = wx.getStorageSync("token") //令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips:[],
    devId:"",  //当前设备devid
    day:"" ,  //时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var TIME = util.formatTime(new Date()) //获取当前时间
    var day = TIME.replace("-", "").replace("-", "")
    this.setData({
      day,
    })

    console.log(options)
    var devId = options.devId
    this.setData({
      tips,
      devId
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
  onShow: function (e) {
    var _this= this;
    var devId = _this.data.devId;
    var day = _this.data.day;
    var Type = 2
    console.log(devId, day, Type, accId, token)
    wx.request({
      url: `http://192.168.0.106:8088/api/device/warn-specify/${devId}/${day}/${Type}`,
      method: "get",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        accId,
        token
      },
      success: function (res) {
     console.log(res)
      }
    })
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
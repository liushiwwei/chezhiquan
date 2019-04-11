// pages/ssmap/ssmap.js
var util = require('../../utils/util.js') //引入时间js
var token = wx.getStorageSync("token") //令牌
var accId = wx.getStorageSync("accId") //用户id
var devId = wx.getStorageSync("devId") //设备id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    lat: '',
    long: '',
    speed: '',
    mapSt:null,
    TIME:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.mapCtx = wx.createMapContext('myMap') //创建一个全局的MapContext实例，并且和组建的<map> 的id绑定
    var TIME = util.formatTime(new Date())      //获取当前时间
    var toTIME = util.fordatTime(new Date())
    var day=  TIME.replace("-", "").replace("-", "") 
    this.setData({
      TIME,
    })

    wx.request({
      url: `http://192.168.0.106:8088/api/device/gps-last/${devId}`,
      method: "get",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        token,
        accId,
        day
      },
      success: function (res) {
        console.log(JSON.parse(res.data.result))
        var result = JSON.parse(res.data.result)
        _this.setData({
          long: 114.08190678985596,
          lat: 22.544808209639864,
          markers: [{
            iconPath: '/resources/others.png',
            id: 1,
            latitude: 22.544808209639864,
            longitude: 114.08190678985596,
            width: "38rpx",
            height: "48rpx",
            iconPath: "/images/myweizhi.png",
          }],
        })
      }
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
    var _this = this;
    this.mapCtx = wx.createMapContext('myMap') //创建一个全局的MapContext实例，并且和组建的<map> 的id绑定
    _this.mapCtx.getCenterLocation({ //获取当前所在位置
      success: function (res) {

      }
    })




    // _this.mapCtx.moveToLocation();
  },

  // 点击回到自己位置
  aa(e) {
    var _this = this;
    console.log(e)

  },
  mpo(e) {
    console.log(this.data)

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
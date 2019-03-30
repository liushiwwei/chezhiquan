// pages/ssmap/ssmap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    guan: '/images/moren.png',
    kai: '/images/fanghu.png',
    weolan: false,
    latitude: '',
    longitude: '',
    speed: '',
    mapSt: null,
    scale: 18,
    circles: [],
    radius: 0,
    xxx: 4
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('myMap') //创建一个全局的MapContext实例，并且和组建的<map> 的id绑定

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.mapCtx.moveToLocation()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    this.mapCtx = wx.createMapContext('myMap') //创建一个全局的MapContext实例，并且和组建的<map> 的id绑定

    // 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用。
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        // 请求成功,存储坐标信息
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        // 同时在请求内部用setData更改data中的数据markers和circles
        _this.setData({
          markers: [{
            id: "1",
            latitude: res.latitude,
            longitude: res.longitude,
            width: "38rpx",
            height: "48rpx",
            iconPath: "/images/myweizhi.png",
          }],
          circles: [{
            latitude: _this.data.latitude,
            longitude: _this.data.longitude,
            color: '#4BC4F740',
            fillColor: '#7cb5ec80',
            radius: 4,
            strokeWidth: 0.1
          }]

        })
        console.log(_this.data.circles[0].radius)
      }
    })
  },

  // 围栏开关
  weilan(e) {
    var off = this.data.weolan
    off = !off
    console.log(off)
    console.log(this.data)
    this.setData({
      weolan: off
    })
  },

  // 围栏加
  add() {
    var _this = this;
    var total = this.data.total;
    if (total < 100) {  //小于100就+   超过一百就没反应
      this.setData({
        total: total + 4,  //用来反应进度条和计算半径的
        xxx: 2 * (total + 4)       //反应多少米
      })
    }
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        _this.setData({
          markers: [{
            id: "1",
            latitude: res.latitude,
            longitude: res.longitude,
            width: "38rpx",
            height: "48rpx",
            iconPath: "/images/myweizhi.png",
          }],
          circles: [{
            latitude: _this.data.latitude,
            longitude: _this.data.longitude,
            color: '#4BC4F740',
            fillColor: '#7cb5ec80',
            radius: _this.data.total * 2,
            strokeWidth: 0.1
          }]

        })
        console.log('我是半径' + _this.data.circles[0].radius)
      }
    })
    console.log(this.data)
    return
  },

  // 围栏减
  minus() {
    var _this = this;
    var total = this.data.total;
    if (total > 0) {
      this.setData({
        total: total - 4, //用来反应进度条和计算半径的
        xxx: 2 * (total - 4)       //反应多少米
      })
    }
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        _this.setData({
          markers: [{
            id: "1",
            latitude: res.latitude,
            longitude: res.longitude,
            width: "38rpx",
            height: "48rpx",
            iconPath: "/images/myweizhi.png",
          }],
          circles: [{
            latitude: _this.data.latitude,
            longitude: _this.data.longitude,
            color: '#4BC4F740',
            fillColor: '#7cb5ec80',
            radius: _this.data.total * 2,
            strokeWidth: 0.1
          }]

        })
        console.log('我是半径' + _this.data.circles[0].radius)
      }
    })
    return
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
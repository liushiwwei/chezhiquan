// pages/ssmap/ssmap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat: '',
    long: '',
    speed: '',
    mapSt:null
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
    _this.mapCtx.moveToLocation();

    this.mapSt = setInterval(    //设定一个定时器
      function spe() {

        wx.getLocation({
          success: function (res) {  //接口调用成功,返回的是wgs84定位,和手机的一样
            // console.log(res)
            if (res.speed < 0) {
              _this.setData({
                speed: 0,
                // lat: res.latitude,
                // long: res.longitude
              })
            } else {
              _this.setData({
                speed: res.speed
              })
            }
            // console.log(_this)
          },
          fail: function (err) { //如果接口调用失败,没有获取到定位信息
            // console.log(err)
            _this.setData({
              speed: "服务器繁忙,速度未获取",
            })
          }
        })
      }, 1000)

    console.log(_this.data);
  },

  // 点击回到自己位置
  backTap() {
    var _this = this;
    // _this.mapCtx = wx.createMapContext('myMap') //创建一个MapContext实例，并且和组建的<map> 的id绑定

    _this.mapCtx.moveToLocation();
    console.log(_this.data.lat);
    console.log(_this.data.long);

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
    clearInterval(this.mapSt)
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
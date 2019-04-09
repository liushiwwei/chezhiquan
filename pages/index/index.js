// pages/index/index.js
// 导入轮播图数据
import swipers from '../../datas/swipers.js'
import notice from '../../datas/notice.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '深圳市', '南山区'],
    swipers: [], //轮播图信息集合
    notice: [], //开关图片信息集合
    name: '车智犬', //车子名字
    fute: 40.67, //车子电池信息
    km: 99, //  今日里程
    totalkm: 9999, //总里程
    qidongon: false, //启动开关
    fanghuon: false, //防护开关
    results: [], //用户信息集合
    stata: "" //所选车的名字
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {

  },
  bindPickerChangeName(e) { //选择车辆

    var results = this.data.results //获取当前用户设备集合后,取出设备集合的devName,组成的新数组.来使用picker
    var idx = e.detail.value
    console.log("当前选择的第",idx,"两车")
    this.setData({
      stata: results[idx]
    })
  },
  // 选择城市的多项列表
  bindRegionChange: function(e) {
    // console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    if (typeof this.getTabBar === "function" &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    var token = wx.getStorageSync("token") //令牌
    var accId = wx.getStorageSync("accId") //用户id
    var stata = wx.getStorageSync("stata") //用户初始的设备

    this.setData({
      stata,
    })
    var _this = this
    var token = wx.getStorageSync("token")
    var accId = wx.getStorageSync("accId")
    //获取当前用户的设备列表
    wx.request({
      url: 'http://192.168.0.106:8088/api/device/list',
      method: "post",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        token,
        accId,
      },
      success: function (res) {    //获取到数据后
        var results = [];
        for (var i = 0; i < res.data.result.length; i++) { //对当前登录用户的设备集合进行遍历,取出进行遍历
          results.push(res.data.result[i].devName)
        }
        console.log(results, "遍历组合")
        _this.setData({ //将信息集合添加的页面中
          results,
        })
      }
    })
  },
  // 开关防护
  qidong() {
    var onnn = this.data.qidongon
    onnn = !onnn
    // console.log(this.data)
    this.setData({
      qidongon: onnn
    })
  },

  fanghu(eve) {
    var offf = this.data.fanghuon
    offf = !offf
    // console.log(offf)
    this.setData({
      fanghuon: offf
    })
  },
  // 实时位置的按钮
  sswz() {
    wx.navigateTo({
      url: '/pages/ssmap/ssmap',
    })
  },
  // 历史轨迹
  lsgj() {
    wx.navigateTo({
      url: '/pages/trail/trail',
    })
  },

  // 电子围栏
  dzwl() {
    wx.navigateTo({
      url: '/pages/enclosure/enclosure',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({  //轮播图数据
      swipers,
      notice
    })
   
  },
  carLove(e){
    console.log(e)
    if(e.type){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
   
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

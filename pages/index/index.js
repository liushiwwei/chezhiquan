// pages/index/index.js
// 导入轮播图数据
import swipers from '../../datas/swipers.js'
import notice from '../../datas/notice.js'

var accId = wx.getStorageSync("accId") //用户id
// var stata = wx.getStorageSync("stata") //用户初始的设备
var token = wx.getStorageSync("token") //令牌
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '深圳市', '南山区'],
    swipers: [], //轮播图信息集合
    notice: [], //开关图片信息集合
    name: '车智犬', //车子名字
    electric: 0, //电池电量
    carVoltage: 40.67, //车子电池信息
    km: 99, //  今日里程
    totalkm: 9999, //总里程
    qidongon: false, //启动开关
    fanghuon: false, //防护开关
    results: [], //选择设备集合
    result: [], //设备信息集合,用作设备信息匹配
    stata: "", //所选车的名字
    imei:"", //当前选择的车的imeii号
    devId:"", //当前选择车辆的devid
    length:""
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {

  },
  bindPickerChangeName(e) { //选择车辆
    var results = this.data.results //获取当前用户设备集合后,取出设备集合的devName,组成的新数组.来使用picker
    console.log(results)
    var idx = e.detail.value
    // console.log("当前选择的", this.data.result[idx], "它的devId是", 
    // this.data.result[idx].devId)
    console.log("当前选择的", this.data.result[idx], "它的devImei是", 
      this.data.result[idx].devImei)
   
    var devImei = this.data.result[idx].devImei
    var stata = this.data.result[idx].devName
    var devId = this.data.result[idx].devId
    this.setData({
      imei: this.data.result[idx].devImei,
      devId: this.data.result[idx].devId
    })
    wx.setStorageSync("devImei", devImei) //选择后保存,覆盖登录获取的初始信息
    wx.setStorageSync("devName", stata)   //选择后保存,覆盖登录获取的初始信息
    wx.setStorageSync("devId", devId)     //选择后保存,覆盖登录获取的初始信息 
    wx.request({ //1.选择车辆,请求获取当前车辆的电压,速度等信息
      url: 'http://192.168.0.106:8088/api/device/car-params',
      method: "post",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        devId,
        token
      },
      success: function(res) {
        console.log('picker发送选择改变，携带值为', res)
        // wx.request({    //2.选择车辆,请求获取当前车辆的电池等信息
        //   url: 'http://192.168.0.106:8088/api/device/car-set',
        //   method: "post",
        //   header: {
        //     "Authorization": "Basic YXBwOmFwcDEwMTI=",
        //   },
        //   data: {
        //     devId,
        //     paramsId: res.data.result.paramsId,
        //     carType: res.data.result.carType
        //   },
        //   success: function (res) {
        //     console.log('携带电池信息', res)
        //   }
        // })
      }
    })



    this.setData({
      stata
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
  onShow: function (e) {
    var stata = wx.getStorageSync("devName") //令牌
    if (typeof this.getTabBar === "function" && //自定义tab的索引渲染
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    if (!token) { //验证登录
      // console.log("未登录")
      wx.reLaunch({
        url: '/pages/login/login',
      })
    } else {
      // console.log("已登录")
    } //验证登录
    this.setData({
      stata,
    })
    var _this = this
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
      success: function(res) { //获取到数据后
        // console.log(res,"当前用户的设备集合")
        var results = [];
        for (var i = 0; i < res.data.result.length; i++) { //对当前登录用户的设备集合进行遍历,取出进行遍历
          results.push(res.data.result[i].devName)
        }
        // console.log(results, "遍历组合")
        _this.setData({ //将信息集合添加的页面中
          results,
          result: res.data.result,
          length: res.data.result.length
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
    var imei = this.data.imei
    wx.navigateTo({
      url: `/pages/ssmap/ssmap?imei=${imei}`,
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
    var imei = wx.getStorageSync("devImei") //用户id
    var devId = wx.getStorageSync("devId") //用户id
    var that = this
    var electric = this.data.electric
    var tim = setInterval(function() {
      electric++
      if (electric == 100) {
        electric = 0
        that.setData({
          electric
        })
      }
      that.setData({
        electric
      })
    }, 100)
    this.setData({ //轮播图数据
      swipers,
      notice,
      imei,   //没有选择设备时的imei
      devId   //没有选择设备时的devid
    })

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
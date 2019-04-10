// pages/install/install.js
import times from '../../datas/install.js'
import tips from '../../datas/bjtips.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    times: [],
    tips: [],
    index: 0,
    idx: 0,
    state: "",    //时长显示
    stata: "",    //状态显示
    edit:"",    //报警状态 true或false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      times,
      tips
    })
  },

  clearStor() { //清除缓存
    // console.log(111)
    wx.clearStorage()
    wx.showLoading({
      title: '请重新登录',
      icon: "none",
      mask: true,
      duration: 2000,
      success:function(){
        wx.hideLoading()
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }
    
    })
    // var token = wx.getStorageSync("token")//令牌
    // var accId = wx.getStorageSync("accId")//用户id
    // console.log(token)
    // console.log(accId)
    // wx.request({
    //   url: 'http://192.168.0.106:8088/api/user/exit',
    //   method: "post",
    //   header: {
    //     "Authorization": "Basic YXBwOmFwcDEwMTI=",
      
    //   },
    //   data: {
    //     accId,
    //     token,
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     if(res.data.code==100000){
    //       wx.showToast({
    //         title: '请重新登录',
    //         duration: 1500
    //       })
    //       wx.removeStorage({
    //         key: 'account',
    //       })
    //       wx.reLaunch({
    //         url: '/pages/login/login',
    //       })
    //     }
      
    //   }
    // })
   
  },
  switchChangeCall(e){//报警开关
    var devId = wx.getStorageSync("devId") //设备id
    var accId = wx.getStorageSync("accId") //用户id
    var token = wx.getStorageSync("token") //令牌
    var tel = wx.getStorageSync("account")  //当前登录的手机,需要报警的手机
    var edit = e.detail.value
    var val=null
    if(edit){
      val=1
    }else{
      val=0
    }
    console.log(val)
    wx.request({
      url: `http://192.168.0.106:8088/api/device/call-status/${devId}`,
      method: "get",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        devId,
        accId,
        token,
        tel,
        val
      },
      success: function (res) {
          console.log(res)
      }
    })
  },
  // 报警时长设置
  bindPickerChangeTime(e) {
    // console.log(e)
    var index = e.detail.value
    this.setData({
      state: this.data.times[index]
    })
    console.log(parseInt(this.data.state))
    
    var devId = wx.getStorageSync("devId") //设备id
    var accId = wx.getStorageSync("accId") //用户id
    var token = wx.getStorageSync("token") //令牌
    var tel = wx.getStorageSync("account")  //当前登录的手机,需要报警的手机
    var edit = e.detail.value
    var sec = parseInt(this.data.state)       //设置的报警时长

    console.log(sec)
    wx.request({
      url: `http://192.168.0.106:8088/api/device/call-status/${devId}`,
      method: "get",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        devId,
        accId,
        token,
        tel,
        sec
      },
      success: function (res) {
        console.log(res)
      }
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var devId = wx.getStorageSync("devId") //设备id
    var accId = wx.getStorageSync("accId") //用户id
    var token = wx.getStorageSync("token") //令牌
    var that = this
    console.log(devId)
    wx.request({
      url: `http://192.168.0.106:8088/api/device/call-status/${devId}`,
      method: "get",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        devId,
        accId,
        token,
      },
      success: function (res) {
        console.log("我是当前用户设备的报警状态",res.data.result)
        that.setData({
          edit: res.data.result
        })
      }
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
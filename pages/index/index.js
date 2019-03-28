// pages/index/index.js
// 导入轮播图数据
import swipers from '../../datas/swipers.js'
import notice from '../../datas/notice.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '深圳市','南山区'],
    swipers:[],
    notice:[],
    name:'车智犬',
    fute:40.67,
    km:99,
    totalkm:9999,
    qidongon:false,
    fanghuon:false
  },

  // 选择城市的多项列表
  bindRegionChange: function (e) {
    console.log(e.detail)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    // console.log(e)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    console.log(e)
  },
    // 开关防护
    qidong(){
      var onnn= this.data.qidongon
      onnn=!onnn
      // console.log(this.data)
       this.setData({
         qidongon:onnn
       })
    },
  
  fanghu(eve){
    var offf=this.data.fanghuon
    offf=!offf
    // console.log(offf)
    this.setData({
      fanghuon:offf
    })
  },
// 实时位置的按钮
  sswz(){
    wx.navigateTo({
      url: '/pages/ssmap/ssmap',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      swipers,
      notice
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
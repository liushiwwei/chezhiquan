// pages/serve/serve.js
import fluxc from '../../datas/call.js'
import serve from '../../datas/serve.js'
var sliderWidth = 162;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fluxc: [],
    tabs: ["维修", "保养", "安检"],
    activeIndex: 0, //初始位
    sliderOffset: 0, //下划线的距离
    sliderLeft: 0, //第一个的距离
    serve: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    // console.log(options)
    this.setData({
      fluxc,
      serve
    })

    var that = this;
    wx.getSystemInfo({ //获取机器的设备宽度信息
      success: function(res) {
        // console.log(res.windowWidth);//375
        // console.log(that.data.tabs.length);//3
        // console.log(sliderWidth);//162  自定义                          // 0
        // console.log(750 / that.data.tabs.length * that.data.activeIndex); ;
        that.setData({ //页面初始化的时候,获得下划线到右边屏幕的距离,由于使用插件问题,所以把宽度写固定750,按照i6的规格来匹配.因为是使用rpx,故不需要缩小放大
          // sliderLeft  750/3 - 162  第一个到边框距离      sliderOffset初始化页面时  750/3 * 0或1或2  这个就是下滑线的距离
          sliderLeft: 750 / that.data.tabs.length - sliderWidth,
          sliderOffset: 750 / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  // 电话报警和流量充值的点击事件
  llclick(event) {

  },

  // 三个服务单按钮  维修保养 安检
  tabClick: function(e) {

    this.setData({
      sliderOffset: e.currentTarget.id * 250,
      activeIndex: e.currentTarget.id
    });
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
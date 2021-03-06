// pages/trail/trail.js

var accId = wx.getStorageSync("accId") //用户id
var token = wx.getStorageSync("token") //令牌
var times;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifName: false, //开关
    // kai:'/images/end_bnt.png',
    // guan:'/images/playbtn.png',
    scale: 18, //地图缩放级别
    firstHours: "0" + 0, //播放的开始时间
    firstMins: 0 + "0", //播放的开始时间
    endHours: 10, //播放的结束时间
    endMins: 10, //播放的结束时间
    longitude: 0, //经度
    latitude: 0, //纬度
    point: [], //每一个定位的数据
    polyline: [], //路线的数据
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.mapCtx = wx.createMapContext('myMap') //创建一个全局的MapContext实例，并且和组建的<map> 的id绑定
    // ------------------------------------------------------------------------------------------------
    var _this = this
    var point = []
    // wx.request({
    //   url: '',
    //   data:{},
    //   header:{},
    //   success:function(res){
    //       var long=res.longitude;
    //       var lati=res.latitude;
    //       point.push({longitude:long,latitude:lati})
    //   }
    // })

    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        });
      }
    });
  },
  bindDateChange(e) { //选择日期的事件
    var _this = this
    var devId = wx.getStorageSync("devId") //设备id
    console.log(devId)
    console.log(e.detail.value.replace("-", "").replace("-", ""))
    var ym = e.detail.value.replace("-", "").replace("-", "")   //选择的年月日,日期
    this.setData({

    })
    wx.request({
      url: `http://192.168.0.106:8088/api/device/gps-specify/${devId}/${ym}`,
      method: "get",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        accId,
        token,
      },
      success: function (res) {
            console.log(res)
        var point =res.data.result    //服务器返回的定位对象集合
        _this.setData({       //选择日期,将请求当前设备的路径集合,并保存路径集合,在播放中获取集合
          point
        })
      }
    })
  },
  start() { //播放
  console.log("开始")
    var _this = this
    var point = this.data.point
    var ifon = _this.data.ifName
    ifon = !ifon
    console.log(ifon);
    // _this.setData({ 
    //   ifName: ifon,
    //   polyline: [{
    //     points: point,
    //     color: '#4bc4f7',
    //     width: 4,
    //     dottedLine: false
    //   }]
    // })

    times = setInterval(function () { _this.time()}, 1000)

  },
  stop() { //暂停
    var _this = this
    var ifon = _this.data.ifName
    ifon = !ifon
    console.log(ifon);
    _this.setData({
      ifName: ifon
    })
    console.log("暂停")
    clearInterval(times)
  },
  time: function() { //计时器
    var _this = this
    var firstHours = _this.data.firstHours;
    var firstMins = _this.data.firstMins;
    var endHours = _this.data.endHours;
    var endMins = _this.data.endMins;
    firstMins++


    //如果等于就清除定时器
    var endHours = _this.data.endHours
    var endMins = _this.data.endMins
    // if (firstHours == endHours && firstMins == endMins){
    //   clearInterval(times)
    // }
    // console.log(firstMins)
    // console.log(_this)
    if (firstHours <= 9 && firstMins >= 60) {
      firstMins = 0;
      firstHours++
      _this.setData({
        firstMins: "0" + firstMins,
        firstHours: "0" + firstHours
      })
    } else if (firstHours < 10 && firstMins < 10) {
      _this.setData({
        firstMins: "0" + firstMins,
        firstHours
      })
    } else if (firstHours < 10 && firstMins >= 10) {
      _this.setData({
        firstMins: firstMins,
        firstHours
      })
    } else if (firstHours >= 10 && firstMins >= 60) {
      firstMins = 0;
      firstHours++
      _this.setData({
        firstMins,
        firstHours: Math.round(firstHours)
      })
    } else if (firstHours >= 10 && firstMins < 10) {
      _this.setData({
        firstMins: "0" + firstMins,
        firstHours: Math.round(firstHours)
      })
    } else if (firstHours >= 10 && firstMins >= 10) {
      _this.setData({
        firstMins: firstMins,
        firstHours: Math.round(firstHours)
      })
    }

  },
  add() { //快进
    console.log('结束');
    clearInterval(this.timer);
  },
  pdd() { //后退
    console.log('结束');
    clearInterval(this.timer);
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
    this.timer = setInterval(repeat, 1000); //周期循环
    // function repeat() {
    //   console.log(111);

      console.log(_this.data)
      var point = _this.data.point
      var lat =0
      var lng =0
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          lat = res.latitude;
          lng = res.longitude;
          point.push({ latitude: lat, longitude: lng });
          console.log(point);
        }
      });
      console.log(222);
      _this.setData({
        polyline:[{
          points: point,
          color: '#4bc4f7',
          width: 4,
          dottedLine: false
        }]
      })
    // }

  }
})
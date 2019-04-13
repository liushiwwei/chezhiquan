// pages/ssmap/ssmap.js
var util = require('../../utils/util.js') //引入时间js
var token = wx.getStorageSync("token") //令牌
var accId = wx.getStorageSync("accId") //用户id
var devId = wx.getStorageSync("devId") //设备id
// 引入SDK核心类
var qqmpwx = require('../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var QQMapWX = qqmpwx.QQMapWX
var Util = qqmpwx.Utils


Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    lat: "", //目标地址经纬
    long: "",
    speed: '', //速度
    mapSt: null,
    TIME: "", //当前最新时间
    devImei: "", //当前设备imei号
    gpss: "", //地址
    startl: "",
    starta: "",
    ifname: true,
    pll: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var _this = this;
    var imei = options.imei //初次未选择车辆的默认imei
    var TIME = util.formatTimes(new Date()) //获取当前时间
    var toTIME = util.fordatTime(new Date())
    var day = TIME.replace("-", "").replace("-", "")
    this.setData({
      TIME,
      devImei: imei
    })

    wx.request({ //发送请求获取当前设备的所在定位  
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
      success: function(res) {
        console.log(JSON.parse(res.data.result))
        var result = JSON.parse(res.data.result)
        _this.setData({
          long: result.lon,
          lat: result.lat,
          markers: [{
            iconPath: '/resources/others.png',
            id: 1,
            longitude: result.lon,
            latitude: result.lat,
            width: "38rpx",
            height: "48rpx",
            iconPath: "/images/myweizhi.png",
            callout: {
              content: "我在这里哦!",
              color: "#fff",
              fontSize: 20,
              anchorX: 10,
              anchorY: -65,
              borderRadius: 2,
              borderWidth: 1,
              borderColor: "#4bc4f7",
              bgColor: "#1e1e1e",
              padding: 4,
              display: 'BYCLICK',
              textAlign: "center",
            }
          }],
        })
        var qqmapsdk = new QQMapWX({
          key: 'A3GBZ-MSTCX-6HF4B-ZROWL-4H6K7-HIF4N',
        });
        var api = "/ws/geocoder/v1?key="; //逆地址解析请求api地址 
        var key = qqmapsdk.key; //我的key
        var sk = "O6lBv47jBJG69vypF2oypJOy4Z70XARr"; //我的sk密钥
        var location = "&location=" + result.lat + "," + result.lon; //当前要查询的经纬地址
        console.log(location)
        var sig = Util.md5(api + key + location + sk) //mid5加密
        console.log(`https://apis.map.qq.com${api}${key}${location}&sig=${sig}`)
        wx.request({
          url: `https://apis.map.qq.com${api}${key}${location}&sig=${sig}`,
          method: "get",
          success: function(res) {
            _this.setData({
              gpss: res.data.result.address
            })
          },
          fail: function(error) {
            console.error(error);
          }
        })
      }
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
    var _this = this;
    this.mapCtx = wx.createMapContext('myMap') //创建一个全局的MapContext实例，并且和组建的<map> 的id绑定
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success: function(res) {
        _this.setData({
          startl: res.longitude.toFixed(5),
          starta: res.latitude.toFixed(5),
        })
      },
    })



    // _this.mapCtx.moveToLocation();
  },

  // 点击获取路线
  gpsbtn(e) {
    var _this = this;
    var qqmapsdk = new QQMapWX({
      key: 'A3GBZ-MSTCX-6HF4B-ZROWL-4H6K7-HIF4N',
    });
    const sk = "O6lBv47jBJG69vypF2oypJOy4Z70XARr"; //我的sk签名
    qqmapsdk.direction({
      mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: {
        latitude: _this.data.starta,
        longitude: _this.data.startl
      },
      to: {
        latitude: _this.data.lat,
        longitude: _this.data.long
      },
      sig: sk,
      success: function(ress) {
        var coors = ress.result.routes[0].polyline;
        var pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        console.log(pl)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        ///////测试

        // _this.setData({
        //   latitude: pl[0].latitude,
        //   longitude: pl[0].longitude,
        //   polyline: [{
        //     points: pl,
        //     color: '#4bc4f7',
        //     width: 4,
        //     dottedLine: false
        //   }]
        // })
      },
      fail: function(error) {
        console.error(error, "22");
      }
    })
    //---------------------------------------------------------------------------------------------------------------
    // 方式2 直接调用微信接口
    // wx.openLocation({ //去到目标地址
    //   longitude: 112.229344, //_this.data.long
    //   latitude: 30.055983, //_this.data.lat
    //   scale: 16
    // })
  },
  mpo(e) { //开关
    var onoff = this.data.ifname
    onoff = !onoff
    this.setData({
      ifname: onoff
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
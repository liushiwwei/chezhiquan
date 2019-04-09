// pages/manage/manage.js
// import manage from '../../datas/manage.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // result数组长度进行判断
    lovec: 0,
    result: [],
    // x轴方向的偏移
    x: 0,
    // 当前x的值
    currentX: 0,
    idx: 0,
    // 修改的遮罩层
    ifName: false,
    fName: false,
    // 修改的名字value
    entry: "",
    ifadd: false,
    imei: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var _this = this;
    const account = wx.getStorageSync("account")
    const token = wx.getStorageSync("token")
    const accId = wx.getStorageSync("accId")
    this.setData({
      ifName: false,
      fName: false,
    })
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
      success: function(res) {
        console.log(res.data.result)
        // const devId=  res.data.result.devId   //设备的id
        // const devImei = res.data.result.devImei   //设备的imei
        // const devName = res.data.result.devName     //设备的昵称

        _this.setData({
          result: res.data.result,
          lovec: res.data.result.length
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // 添加设备
  scanList() {
    var _this = this;
    var ifon = _this.data.ifadd
    ifon = !ifon
    console.log(ifon)
    _this.setData({
      ifadd: ifon
    })

  },
  imei(e) { //获取输入框emei码
    console.log(e)
    var _this = this;
    _this.setData({
      imei: e.detail.value
    })
  },
  okAdd() { //确认添加
    console.log(555)
    const account = wx.getStorageSync("account") //用户名
    const token = wx.getStorageSync("token") //令牌
    const accId = wx.getStorageSync("accId") //用户id
    const devImei = this.data.imei //用户输入的imei码
    var _this = this;
    var ifon = _this.data.ifadd
    wx.request({
      url: 'http://192.168.0.106:8088/api/device/has-acc',
      method: "post",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        accId,
        token,
        account,
        devImei
      },
      success: function(res) {
        console.log(res)
        if (res.data.code == 100000) {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1500
          })
          ifon = !ifon
          console.log(ifon)
          _this.setData({
            ifadd: ifon
          })
          wx.redirectTo({
            url: '/pages/manage/manage',
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
        }
      }
    })

  },
  // 打开相机
  // scanCode(){
  //   wx.scanCode({
  //     onlyFromCamera: true,    //是否只能从相机扫码，不允许从相册选择图片
  //     scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'], //扫码类型 一维码 二维码 Data Matrix码 PDF417条码
  //     success:function(res){

  //     }

  //   })

  // },
  // 删除功能,监听滑动事件
  handMoveChange(e) {
    // console.log(e.detail)
    this.currentX = e.detail.x
  },
  leftTapend(e) {
    // console.log(e)
    var idx = e.currentTarget.dataset.idx
    if (this.currentX < -120) {
      this.data.result[idx].x = -200;
      this.setData({
        result: this.data.result,
      });
    } else {
      this.data.result[idx].x = 0;
      this.setData({
        result: this.data.result,
        x: 0
      });
    }
  },

  // 删除功能
  delect_tap(e) {
    console.log(e)
    var fName = this.data.fName
    fName = !fName
    var token = wx.getStorageSync("token") //令牌
    var accId = wx.getStorageSync("accId") //用户id
    var idx = e.currentTarget.dataset.index;
    var result = this.data.result
    console.log(result)
    var devId = result[idx].devId     //设备id
    console.log(devId)
    result.splice(idx, 1)
    this.setData({
      result,
      fName
    })
    wx.request({
      url: 'http://192.168.0.106:8088/api/device/remove-acc',
      method: "post",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        accId: accId,
        token: token,
        devId: devId
      },
      success: function(res) {
        console.log(res)
        if (res.data.code == 100000) {
          wx.showToast({
            title: '已删除',
            icon: 'success',
            duration: 1500
          });
        }
      }
    })
  },
  // 修改功能
  edit_tap(e) {
    var _this = this;
    // 点击修改,把相对于id存入
    console.log(e.currentTarget.dataset.index)
    // _this.setData({

    // })
    wx.showModal({
      title: '亲!您好',
      content: '是否要修改您的车名',
      success: function(res) {

        if (res.confirm == true) {
          _this.setData({
            ifName: true,
            idx: e.currentTarget.dataset.index
          })
        } else {
          _this.setData({
            ifName: false
          })
        }
      }
    })
  },
  // 修改取消
  cancel(e) {
    var _this = this;
    var id = _this.data.idx //当前修改的id
    var manageb = this.data.result
    console.log(this.data.result)
    manageb[id].x = 0
    _this.setData({
      manege: manageb,
      ifName: false,
      fName: false
    })
    _this.onLoad()
  },
  // 确认修改
  confirm(e) {
    var _this = this;
    var accId = wx.getStorageSync("accId") //用户id
    var token = wx.getStorageSync("token") //令牌
    var idx = _this.data.idx;
    var result = this.data.result
    console.log(result)
    var devId = result[idx].devId     //设备id
    var entry = _this.data.entry //当前修改的设备名称
    console.log(entry)
    wx.request({
      url: 'http://192.168.0.106:8088/api/device/update/name',
      method: "post",
      header: {
        "Authorization": "Basic YXBwOmFwcDEwMTI=",
      },
      data: {
        accId: accId,
        token: token,
        devId: devId,
        devName: entry
      },
      success: function(res) {
        console.log(res)
        if (res.data.code == 100000) {
          wx.showToast({
            title: '已修改成功',
            icon: 'success',
            duration: 2500,
            success: function(res) {
              wx.redirectTo({
                url: '/pages/manage/manage',
              })
            }
          });
        }
      }
    })
  },
  binput(e) {
    // console.log(e)
    this.setData({
      entry: e.detail.value
    })
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
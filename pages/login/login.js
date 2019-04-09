// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: "", //手机号
    pass: "", //密码
    motto: "", //ip  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  retrieve() { //跳转到修改密码
    wx.navigateTo({
      url: '/pages/retrieve/retrieve',
    })
  },
  mobilusr(e) { //获取输入框号码
    let tel = e.detail.value
    this.setData({
      tel
    })
  },

  passusr(e) { //获取输入框密码
    let pass = e.detail.value
    this.setData({
      pass
    })
  },

  login() {
    var _this = this;
    wx.login({
      success: function(res) {
        var code =res.code
        // console.log(_this.data)
        var tel = _this.data.tel;
        var pass = _this.data.pass;
        var ip = _this.data.motto;
        if (tel == "" && pass == "") {
          wx.showToast({
            icon: "none",
            title: '手机号或密码为空',
          })
        } else {
          wx.request({
            url: 'http://192.168.0.106:8088/api/user/login',
            method: "post",
            header: {
              "Authorization": "Basic YXBwOmFwcDEwMTI=",
            },
            data: {
              account: tel,
              password: pass,
              clientType: 1,
              ip: ip,
              appId: code,
              appVersion: "1.0.2"
            },
            success: function(res) {
          
              if (res.data.code == 100000) {
                console.log(res)
                wx.setStorageSync("account", res.data.result.account)  //用户的手机号
                wx.setStorageSync("token", res.data.result.token)    //用户的token
                wx.setStorageSync("accId", res.data.result.accId)    //用户的accId
                //获取当前用户的设备列表
                wx.request({
                  url: 'http://192.168.0.106:8088/api/device/list',
                  method: "post",
                  header: {
                    "Authorization": "Basic YXBwOmFwcDEwMTI=",
                  },
                  data: {
                    token: res.data.result.token,
                    accId: res.data.result.accId,
                  },
                  success: function (res) {  //并且保存到本地
                    console.log(res.data.result[0].devName, "用户登录获取的")
                    wx.setStorageSync("stata", res.data.result[0].devName)  //初始设备名
                    // wx.setStorageSync("result", res.data.result)    //当前用户
                  }
                })


                wx.switchTab({    //存储之后,状态符合100000,跳转到我的页面
                  url: '/pages/my/my',
                })
              }else{
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  mask: true,
                })
              }
            }
          })
        }

      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.request({ //ip
      url: 'http://ip-api.com/json',
      success: function(e) {
        that.setData({
          motto: e.data.query
        })
      }
    })

    // wx.login({
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
    
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
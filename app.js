//app.js
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {


    // console.log("检查登录")  
    var tok = wx.getStorageSync("token")
    // console.log(tok)
    if (!tok){
      // console.log("未登录")
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }else{
      // console.log("已登录")
    }

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    // console.log("检查登录")
    // var tok = wx.getStorageSync("token")
    // console.log(tok)
    // if (!tok) {
    //   // console.log("未登录")
    //   wx.reLaunch({
    //     url: '/pages/login/login',
    //   })
    // } else {
    //   console.log("已登录")
    // }
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError  并带上错误信息
   */
  onError: function (msg) {
    
  }
})

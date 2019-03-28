// pages/editpass/editpass.js


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e){
    console.log(e)
    console.log(e.detail.value)
    var oldMi = e.detail.value.oldMi;
    var newMi = e.detail.value.newMi;
    var newMi2 = e.detail.value.newMi2;

    if (oldMi==""||newMi==""||newMi2==""){
      wx.showToast({
        title:'您的密码为空',
        icon:'none',
        duration:1500
      })
    } else if (newMi!=newMi2){
      wx.showToast({
        title: '您的新密码不一致',
        icon: 'none',
        duration: 1500
      })
    } else { //如果不为空,新密码一致,就发送请求
      wx.showLoading({
        title: '网络请求中......',
      })
      // 发送请求
      wx.request({
        url: '',
        method:'POST',
        data:{
          oldMi:oldMi,
          newMi:newMi
        },
        header:{
          'content-type':'application/x-www-form-urlencoded'
        },
        success:(res)=>{  //请求成功
          console.log(res.data);
          if(res.data.error){
            wx.showToast({
              title: res.data.msg,
              icon:'none',
              duration:2000,
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:success,
              duration:2000,
              success:function(){
               setTimeout(function(){
                 wx.navigateTo({
                   url: '../login/login',
                 })
               },2000)
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
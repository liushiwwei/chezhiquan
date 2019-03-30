// pages/manage/manage.js
import manage from '../../datas/manage.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lovec:1,
    manage:[],
    // x轴方向的偏移
    x:0,
     // 当前x的值
    currentX:0,
    idx:0,
    // 修改的遮罩层
    ifName:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      manage,
      ifName: true,
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var lovec = this.data.manage.length   //爱车的数组
    // console.log(lovec)
  },
// 打开相机
  scanCode(){
    wx.scanCode({
      onlyFromCamera: true,    //是否只能从相机扫码，不允许从相册选择图片
      scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'], //扫码类型 一维码 二维码 Data Matrix码 PDF417条码
      success:function(res){

      }

    })

  },
// 删除功能,监听滑动事件
  handMoveChange(e){
    // console.log(e.detail)
    this.currentX=e.detail.x
  },
  leftTapend(e){
    var idx = e.currentTarget.dataset.idx
    if (this.currentX < -120) {
      this.data.manage[idx].x = -200;
      this.setData({
        manage: this.data.manage,
      });
    } else {
      this.data.manage[idx].x = 0;
      this.setData({
        manage: this.data.manage,
        x:0
      });
    }
  },

  // 删除功能
  delect_tap(e){
    var idx = e.currentTarget.dataset.index;
    var manageb = this.data.manage
    manageb.splice(idx,1)
    this.setData({
      manage: manageb,
    })
    wx.showToast({
      title: '已删除',
      icon: 'success',
      duration: 1500
    });
  },
  // 修改功能
  edit_tap(e){
    var _this =this;
    wx.showModal({
      title: '亲!您好',
      content: '是否要修改您的车名',
      success:function(res){
        console.log(res)
        if(res.confirm==true){
          _this.setData({
            ifName: true
          })
        }else{
         _this.setData({
           ifName: false
         })
        }
      }
    })
  },
// 修改取消
  cancel(e){
    var _this = this;
    _this.setData({
      ifName: false
    })
  },
  // 确认修改
  confirm(e){
    var _this = this;

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
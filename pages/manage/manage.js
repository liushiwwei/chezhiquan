// pages/manage/manage.js
import manage from '../../datas/manage.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // manage数组长度进行判断
    lovec:1,
    manage:[],
    // x轴方向的偏移
    x:0,
     // 当前x的值
    currentX:0,
    idx:0,
    // 修改的遮罩层
    ifName:false,
    fName:false,
    // 修改的名字value
    entry:""
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      manage,
      ifName: false,
      fName: false,
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
    // 点击修改,把相对于id存入
    console.log(e.currentTarget.dataset.index)
    // _this.setData({
      
    // })
    wx.showModal({
      title: '亲!您好',
      content: '是否要修改您的车名',
      success:function(res){
       
        if(res.confirm==true){
          _this.setData({
            ifName: true,
            idx: e.currentTarget.dataset.index
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
    var id = _this.data.idx   //当前修改的id
    var manageb = this.data.manage
    console.log(this.data.manage)
    manageb[id].x = 0
    _this.setData({
      manege: manageb,
      ifName: false,
      fName:false
    })
    _this.onLoad()
  },
  // 确认修改
  confirm(e){
    var _this = this;
    var manageb = this.data.manage   //所有数据
    var id = _this.data.idx   //当前修改的id
    var entry = _this.data.entry   //当前修改的input的value
    manageb[id].text1 = entry
    _this.setData({
      manege:manageb,
      ifName: false
    })
    wx.showToast({
      title: '已修改成功',
      icon: 'success',
      duration: 2500,
      success:function(res){
        wx.redirectTo({
         url: '/pages/manage/manage',
       })
      }
       
    });
  },
  binput(e){
    // console.log(e)
    this.setData({
      entry: e.detail.value
    })
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
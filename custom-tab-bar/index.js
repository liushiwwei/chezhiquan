
Component({
  data: {
    selected: 0,
    color: "#333333",
    backgroundColor: "#fbfbfb",
    selectedColor: "#4bc4f7",
    borderStyle: "white",
    list: [{
      "pagePath": "/pages/index/index",
      "iconPath": "/static/img/index.png",
      "selectedIconPath": "/static/img/sindex.png",
      "text": "首页"
    }, {
        "pagePath": "/pages/serve/serve",
        "iconPath": "/static/img/serve.png",
        "selectedIconPath": "/static/img/sserve.png",
        "text": "服务"
      }, {
        "pagePath": "/pages/my/my",
        "iconPath": "/static/img/mmy.png",
        "selectedIconPath": "/static/img/smmy.png",
        "text": "我的"
      }]
  },
  attached() {

  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})
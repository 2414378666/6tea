//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    flag: true,
    teaList: [
      {
        url: '/img/01茶庄.jpg',
        url: '../../img/01tea.jpg',
        name: '落樱亭',
        sold: '152已售',
        mony: '58.00'
      },
      {
        url: '/img/02茶庄.jpg',
        url: '../../img/02tea.jpg',
        name: '幽篁居',
        sold: '184已售',
        mony: '58.00'
      },
      {
        url: '/img/03茶庄.jpg',
        url: '../../img/03tea.jpg',
        name: '萧关宛',
        sold: '172已售',
        mony: '68.00'
      },
    ],
    value: 5
  },
  //事件处理函数
  lookTea: function () {
    this.data.flag = !this.data.flag
    this.setData({
      flag: this.data.flag
    })
  },
  tapBind: function (even) {
    var name = even.currentTarget.dataset.name
    var sold = even.currentTarget.dataset.sold
    var mony = even.currentTarget.dataset.mony
    wx.navigateTo({
      url: `../shop/shop?name=${name}&sold=${sold}&mony=${mony}`
    })
  }
})

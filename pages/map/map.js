var fileData = require('../../utils/maplist')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showData: fileData.mtData().list,
    mapId: 'map',
    centerX: 114.4801638035,
    centerY: 38.0407364515,
    markers: [],
    controls: [{
      id: 1,
      position: {
        left: 0,
        top: 10,
        width: 40,
        height: 40
      },
      clickable: true
    }],
    shop_image: "",
    shop_name: "",
    flagWcxdd: false,
    setTime: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('地图定位！')
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;

        that.setData({
          centerX: longitude,
          centerY: latitude,
        })
        that.requestshoplist();
      },
      fail: (res) => {
        that.requestshoplist();
      }
    });
  },
 /**
   * 获取门店列表数据
   */
  requestshoplist: function () {
    let that = this
    let markers = [];
    for (let i = 0; i < that.data.showData.length; i++) {
      let marker = that.createMarker(that.data.showData[i]);
      markers.push(marker)
    }
    let shopitem = that.data.showData[0]
    that.setData({
      markers: markers,
      shop_image: shopitem.shop_image,
      shop_name: shopitem.shop_name,
    })
  },
  /**
   * 创建marker对象
   */
  createMarker(point) {
    let marker = {
      id: point || 0,
      name: point.shop_name || '',
      latitude: point.lat,
      longitude: point.lng,
      width: 30,
      height: 30,
    };
    return marker;
  },

  /**
   * 点击marker
   */
  markertap: function (shopitem) {
    let that = this
    that.setData({
      shop_image: shopitem.markerId.shop_image, 
      shop_name: shopitem.markerId.shop_name,
    })
  },
  moveTolocation: function () {
    //mapId 就是你在 map 标签中定义的 id
    let Id = this.data.mapId
    var mapCtx = wx.createMapContext(Id);
    mapCtx.moveToLocation();
  },
  clickButtom: function (options) {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  keFu: function () {
    wx.makePhoneCall({
      phoneNumber: '03123688777',
    })
  },
  dingDan: function () {
    this.data.flagWcxdd = true
    this.setData({
      flagWcxdd: this.data.flagWcxdd
    })

    this.data.setTime = ''
    this.setData({
      flagWcxdd: this.data.flagWcxdd
    })
    this.data.setTime = setTimeout(() => {
      this.data.flagWcxdd = false
      this.setData({
        flagWcxdd: this.data.flagWcxdd
      })
      clearTimeout(this.data.setTime)
    }, 2000)
  }
})

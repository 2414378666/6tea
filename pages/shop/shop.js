Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    background: ['../../img/01茶庄.jpg', '../../img/02茶庄.jpg', '../../img/03茶庄.jpg'],
    background: ['../../img/01tea.jpg', '../../img/02tea.jpg', '../../img/03tea.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    obj: {}, //保存上个页面的传值
    number: 1, //保存轮播图当前展示个数
    allNumber: 3, //轮播图总个数
    show: false, //几个组件的显示和隐藏
    dates: [], //保存月日星期几的
    dates2: '', //保存小时
    thisNum: 0, //保存月日的当前切换index
    hm3: [{hm1: -1,  hm2: -1}, {hm1: -1,  hm2: -1}, {hm1: -1,  hm2: -1}],
    thisHm: {},
    time: 0, //保存总共选择了多长时间
    dataNowH: '', //当前的时间
    dateNowG: '', //展示页时间
    timiFlag: false, //未选择一小时的弹窗判断
    setTime: '', //定时器
    arrSelect: [
      [{hm1: 15, hm2: 18}, {hm1: 25, hm2: 28}],
      [{hm1: 11, hm2: 16}, {hm1: 20, hm2: 24}],
      [{hm1: 16, hm2: 20}, {hm1: 22, hm2: 25}],
    ],
    arrSelect2: []
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  bindtransition: function(e) { //改变轮播图改变右下角数字
    if(e.detail.dx == 355) {
      this.setData({
        number: ++this.data.number
      })
    } else if(e.detail.dx == -355) {
      this.setData({
        number: --this.data.number
      })
    }
  },
  // bindtransition: function(e) { //改变轮播图改变右下角数字
  //   if(e.detail.dx >= 325) {
  //     this.setData({
  //       number: ++this.data.number
  //     })
  //   } else if(e.detail.dx <= -325) {
  //     this.setData({
  //       number: --this.data.number
  //     })
  //   }
  // },
  onLoad: function (options) { //options用于接收上个页面传递过来的参数，完成页面在取消注释
    this.data.obj = options
    this.setData({obj: this.data.obj})
  },
  onReady: function () { //页面加载完
    this.data.dataNowH = (new Date()).getTime()
    this.getDates()
    var timis1 = this.data.dates[0].mouth + '月' + this.data.dates[0].date + '日' + ' '
    var timis2 = this.data.dates[0].arr[0].hours + ':' + this.data.dates[0].arr[0].minutes
    var timis3 = this.data.dates[0].arr[1].hours + ':' + this.data.dates[0].arr[1].minutes
    this.data.dateNowG = timis1 + timis2 + "~" + timis1 + timis3
    this.setData({
      dateNowG: this.data.dateNowG
    })
    this.data.dates = []
    this.setData({
      dates: this.data.dates
    })
  },
  selectTime: function () { //点击选择预约时间按钮
    this.getDates()
    this.gethm(this.data.thisNum)
    this.setData({
      dates: this.data.dates
    })
    this.data.arrSelect2 = this.data.arrSelect[this.data.thisNum]
    this.setData({ arrSelect2: this.data.arrSelect2 })
    this.setData({ show: true });
  },
  onClose: function () { //上拉框关闭后触发
    this.setData({ show: false });
    this.data.dates = []
  },
  clickTap: function (e) {
    var num = e.currentTarget.dataset.index
    this.data.thisNum = num
    this.data.thisHm.hm1 = this.data.hm3[num].hm1
    this.data.thisHm.hm2 = this.data.hm3[num].hm2
    this.data.arrSelect2 = this.data.arrSelect[this.data.thisNum]
    this.setData({ arrSelect2: this.data.arrSelect2 })
    this.gethm(this.data.thisNum)
    this.setData({ thisHm: this.data.thisHm })
    this.setData({ thisNum: this.data.thisNum })
  },
  getDates: function () { //生成年月日
    var arr = ["日", "一", "二", "三", "四", "五", "六"]
    for(var i=0; i<3; i++) {
      var obj = new Object()
      var date = new Date()
      date.setTime(date.getTime()+(24*60*60*1000)*i)
      obj.mouth = date.getMonth() //得到月份
      obj.date = date.getDate() //得到日期
      obj.day = arr[date.getDay()] //得到星期
      var date = new Date(new Date().toLocaleDateString())
      date.setTime(date.getTime() + (24 * 60 * 60 * 1000)*i)
      obj.arr = []
      for(var n=0; n<24*2; n++) {
        if(date.getTime() > this.data.dataNowH) { //判断时间戳比现在大吗
          var obj2 = new Object()
          if((date.getHours()+'').length == 1) { //得到小时
            obj2.hours = '0' + date.getHours()
          } else {
            obj2.hours = date.getHours()
          }
          if((date.getMinutes()+'').length == 1) { //得到分钟
            obj2.minutes = '0' + date.getMinutes()
          } else {
            obj2.minutes = date.getMinutes()
          }
          obj.arr.push(obj2)
        }
        date.setTime(date.getTime() + 60 * 30 * 1000)
      }
      this.data.dates.push(obj)
    }
  },
  gethm: function (num) { //获取小时和分钟
    this.data.dates2 = this.data.dates[num].arr
    this.setData({ dates2: this.data.dates2 })
  },
  clickhm: function (e) { //判断点击小时的下标值
    var num = e.currentTarget.dataset.index
    var hm1 = this.data.hm3[this.data.thisNum].hm1
    var hm2 = this.data.hm3[this.data.thisNum].hm2
    if(hm1 == -1) { //判断里面的值来判断用户点击了那些时间段
      this.data.hm3[this.data.thisNum].hm1 = num
      this.data.hm3[this.data.thisNum].hm2 = num
    } else if(hm1 > num) {
      this.data.hm3[this.data.thisNum].hm1 = num
      this.data.hm3[this.data.thisNum].hm2 = num
    } else if(hm2 == -1) {
      this.data.hm3[this.data.thisNum].hm2 = num
    } else if(hm2>num || hm1<num) {
      this.data.hm3[this.data.thisNum].hm2 = num
    }
    if(this.data.hm3[this.data.thisNum].hm2>=this.data.hm3[this.data.thisNum].hm1) { //当第二个选择大于或等于第一个选择则计算时间
      var nums = 0
      for(var n=0; n<this.data.hm3.length; n++) {
        nums += (this.data.hm3[n].hm2 - this.data.hm3[n].hm1)
        console.log(this.data.hm3[n].hm2, this.data.hm3[n].hm1, nums);
      }
      this.data.time = nums * 0.5
    }
    this.data.thisHm.hm1 = this.data.hm3[this.data.thisNum].hm1
    this.data.thisHm.hm2 = this.data.hm3[this.data.thisNum].hm2
    this.setData({ time: this.data.time })
    this.setData({ thisHm: this.data.thisHm })
  },
  clickShow (Event) { //点击取消确定后触发
    if(Event.target.dataset.index == '1' && this.data.time < 1) {
      this.data.timiFlag = true
      this.data.setTime = setTimeout(() => {
      this.closeJingao()}, 2000)
      this.setData({
        timiFlag: this.data.timiFlag
      })
      return
    }
    this.data.show = !this.data.show
    this.data.dates = []
    this.setData({ show: this.data.show })
  },
  closeJingao: function () {
    clearTimeout(this.data.setTime)
    this.data.timiFlag = false
    this.setData({
      timiFlag: this.data.timiFlag
    })
  },
  callPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '03123688777',
    })
  }
})

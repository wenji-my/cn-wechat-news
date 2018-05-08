let newsType = [
  {
    type: "gn",
    name: "国内",
    showLoading: true
  },
  {
    type: "gj",
    name: "国际",
    showLoading: true
  },
  {
    type: "cj",
    name: "财经",
    showLoading: true
  },
  {
    type: "yl",
    name: "娱乐",
    showLoading: true
  },
  {
    type: "js",
    name: "军事",
    showLoading: true
  },
  {
    type: "ty",
    name: "体育",
    showLoading: true
  },
  {
    type: "other",
    name: "其他",
    showLoading: true
  }
]
Page({
  data:{
    isIphoneX: false,
    newsType: newsType,
    currentTab: 0,
    currentNews: [],
    preCurrent: 0
  },

  // onPullDownRefresh(){
  //   console.log(1)
  // },

  onLoad() {
    //适配iPhoneX
    wx.getSystemInfo({
      success: res => {
        let model = res.model;
        if (model.search('iPhone X') != -1) {
          this.setData({
            isIphoneX: true
          })
        }
      }
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: 'gn'
      },
      success: res => {
        let result = res.data.result
        // console.log(result)
        this.data.newsType[0].showLoading = false
        let newsType = this.data.newsType
        // console.log(this.data.newsLoading)
        this.setData({
          currentNews: result,
          newsType: newsType
        })
      }
    })
  },

  // onReachBottom() {
  //   console.log(1)
  // },

  scrollTab(e) {
    let current = e.detail.current
    this.setData({
      currentTab: current
    })
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType[current].type
      },
      success: res => {
        let result = res.data.result
        // console.log(result)
        this.data.newsType[current].showLoading = false
        this.data.newsType[this.data.preCurrent].showLoading = true
        let newsType = this.data.newsType
        // console.log(this.data.newsLoading)
        this.setData({
          currentNews: result,
          // newsType: newsType,
          preCurrent: current
        })
        setTimeout(() => {
          this.setData({
            newsType: newsType
          })
        }, 10)
      }
    })
  },

  onTaphNav(e){
    let index = e.target.dataset.index
    if (this.data.currentTab === index) {
      return false;
    } else {
      this.setData({
        currentTab: index
      })
    }
  }

})

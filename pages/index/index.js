let newsType = [
  {
    type: "gn",
    name: "国内"
  },
  {
    type: "gj",
    name: "国际"
  },
  {
    type: "cj",
    name: "财经"
  },
  {
    type: "yl",
    name: "娱乐"
  },
  {
    type: "js",
    name: "军事"
  },
  {
    type: "ty",
    name: "体育"
  },
  {
    type: "other",
    name: "其他"
  }
]
Page({
  data:{
    newsType: newsType,
    currentTab: 0,
    currentNews: [],
    showLoading: true
  },

  onPullDownRefresh(){
    let type = this.data.newsType[this.data.currentTab].type
    this.getNews(()=>{
      wx.stopPullDownRefresh()
    })
  },

  onLoad() {
    this.getNews()
  },

  onTaphNav(e) {
    let index = e.target.dataset.index
    if (this.data.currentTab === index) {
      return false;
    } else {
      this.setData({
        currentTab: index,
        showLoading: true
      })
      this.getNews()
    }
  },

  onTapNews(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
    })
  },

  getNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.newsType[this.data.currentTab].type
      },
      success: res => {
        let result = res.data.result
        result.forEach(data => {
          if (!data.source) {
            data.source = '作者不详'
          }
          let date = data.date.substr(0, 10)
          let time = data.date.substr(11, 5)
          data.date = date + ' ' + time
        })

        this.setData({
          currentNews: result,
          showLoading: false
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  }

})

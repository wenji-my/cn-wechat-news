const newsType = [
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
    isIphoneX: false,
    newsType: newsType,
    clientHeight: 0,
    currentTab: 0,
    cacheNews: [],
    currentNews: [],
    tabClickedMap: {},
    gnNews: [],
    gjNews: [],
    cjNews: [],
    ylNews: [],
    jsNews: [],
    tyNews: [],
    otherNews: []
  },

  // onPullDownRefresh(){
  //   console.log(1)
  // },

  onLoad() {
    this.initAllNews()
    //高度自适应
    wx.getSystemInfo({
      success: res => {
        let model = res.model;
        if (model.search('iPhone X') != -1) {
          this.setData({
            isIphoneX: true
          })
        }
        let clientHeight = res.windowHeight
        this.setData({
          clientHeight: clientHeight
        })
      }
    })
  },

  // onReachBottom() {
  //   console.log(1)
  // },

  scrollTab(e){
    let current = e.detail.current
    this.setData({
      currentTab: current
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
  },

  onTapNews(e){
    let type = e.currentTarget.dataset.type
    let id = 0
    switch (type) {
      case 'gn':
        id = this.data.gnNews[e.currentTarget.dataset.index].id
        break;
      case 'gj':
        id = this.data.gjNews[e.currentTarget.dataset.index].id
        break;
      case 'cj':
        id = this.data.cjNews[e.currentTarget.dataset.index].id
        break;
      case 'yl':
        id = this.data.ylNews[e.currentTarget.dataset.index].id
        break;
      case 'js':
        id = this.data.jsNews[e.currentTarget.dataset.index].id
        break;
      case 'ty':
        id = this.data.tyNews[e.currentTarget.dataset.index].id
        break;
      case 'other':
        id = this.data.otherNews[e.currentTarget.dataset.index].id
        break;
    }
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },

  initAllNews(){
    newsType.forEach(data => {
      wx.request({
        url: 'https://test-miniprogram.com/api/news/list',
        data: {
          type: data.type
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          if (res.data.code === 200) {
            let result = res.data.result
            switch (data.type) {
              case 'gn':
                this.setData({
                  gnNews: result
                })
                break;
              case 'gj':
                this.setData({
                  gjNews: result
                })
                break;
              case 'cj':
                this.setData({
                  cjNews: result
                })
                break;
              case 'yl':
                this.setData({
                  ylNews: result
                })
                break;
              case 'js':
                this.setData({
                  jsNews: result
                })
                break;
              case 'ty':
                this.setData({
                  tyNews: result
                })
                break;
              case 'other':
                this.setData({
                  otherNews: result
                })
                break;
            }
          }
        }
      })
    })
  }

})

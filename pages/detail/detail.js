
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: false,
    clientHeight: 0,
    newsTitle: '',
    newsSource: '',
    readCount: 0,
    newsImage: '',
    newsP: [],
    newsPTop: '',
    newsPBottom: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    let id = options.id
    //请求API数据
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id
      },
      success: res => {
        if (res.data.code === 200) {
          let result = res.data.result
          let content = result.content
          // console.log(result.content)
          content.forEach(data => {
            //type为p的是文本内容
            if (data.type.search('p') != -1) {
              this.data.newsP.push(data.text)
            }
          })
          let newsPTop = ''
          let newsPBottom = ''
          if (this.data.newsP.length > 0) {
            newsPTop = this.data.newsP[0]
            //拓展底部文本
            if (this.data.newsP.length > 1) {
              newsPBottom = this.data.newsP[1]
            }
            if (this.data.newsP.length > 2) {
              newsPBottom = this.data.newsP[1] + this.data.newsP[2]
            }
            if (this.data.newsP.length > 3) {
              newsPBottom = this.data.newsP[1] + this.data.newsP[2] + this.data.newsP[3]
            }
          }
          this.setData({
            newsTitle: result.title,
            newsSource: result.source,
            readCount: result.readCount,
            newsImage: result.firstImage,
            newsPTop: newsPTop,
            newsPBottom: newsPBottom
          })
        }
      }
    })
  },

  onTapBack() {
    //回退到上一个页面
    wx.navigateBack({
      delta: 1
    })
  }

})
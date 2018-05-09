
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsTitle: '',
    newsSource: '',
    readCount: 0,
    newsImage: '',
    newsStrong: '',
    newsP: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
          if (!result.source) {
            result.source = '作者不详'
          }
          let text = ''
          let strongText = ''
          let newsImage = ''
          content.forEach(data => {
            //type为p的是文本内容
            if (data.type.search('p') != -1) {
              text += data.text
            }
            if (data.type.search('strong') != -1) {
              strongText += data.text
            }
            if (data.type.search('image') != -1) {
              newsImage = data.src
            }
          })
          this.setData({
            newsTitle: result.title,
            newsSource: result.source,
            readCount: result.readCount,
            newsImage: newsImage,
            newsP: text,
            newsStrong: strongText
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
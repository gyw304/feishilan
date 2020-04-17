// pages/special/special.js
const app = getApp()
const util = require('../../utils/util')
const request = require('../../request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: [
      { ico: '../../image/j_1.png', url: '../detail/detail?cid=33' },
      { ico: '../../image/j_2.png', url: '../article/article?tag=9&title=一线访谈' },
      { ico: '../../image/j_3.png', url: '../detail/detail?cid=34' },
      { ico: '../../image/j_4.png', url: '../video/video' },
      { ico: '../../image/j_5.png', url: '../detail/detail?cid=26' },
      { ico: '../../image/j_6.png', url: '../detail/detail?cid=27' }

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  jumppage: function (e) {

    let _url = e.currentTarget.dataset.url

    if (_url == 'none') {
      util.alert('敬请期待')
    }
    else {
      wx.navigateTo({
        url: _url
      })
    }


  }
})
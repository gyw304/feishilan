// pages/article/article.js
const util = require('../../utils/util')
const request = require('../../request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list : [],
    isEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var that = this;

    wx.setNavigationBarTitle({
      title: options.title
    })


    wx.showLoading({
      title: '文章加载中...',
    })


    request.postRequest(request.api.article, { tag: options.tag }, function (res) {

      if (res.data.code == 1) {
        that.setData({
          list: res.data.data
        })

        wx.hideLoading()
      }
      else {
        util.alert(res.data.msg)
      }

    })


  },
  go_detail: function (e) {
    var _cid = e.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '../detail/detail?cid=' + _cid + ''
    })
  }
})
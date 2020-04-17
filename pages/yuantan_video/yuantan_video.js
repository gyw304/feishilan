// pages/yuantan_video/yuantan_video.js
const request = require('../../request')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    request.postRequest(request.api.video_talk, {}, function (res) {
      if (res.data.code == 1) {
        that.setData({
          src: res.data.data.src
        })
      }
      else {
        util.alert(res.data.msg)
      }
    })

  }
})
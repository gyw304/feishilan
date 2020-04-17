const app = getApp();
const request = require('../../request')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notices: [
      {
        content: '恭喜你了！你中奖了！',
        add_date: '2018.08.29'
      },
      {
        content: '集团将于10月20日举行庆功大会，请大家准时参加，地址：88楼天空大厅！',
        add_date: '2018.08.29'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    wx.showLoading({
      title: '加载中...',
    })

    request.postRequest(request.api.calls, {}, function (res) {
      if (res.data.code == 1) {
        that.setData({
          notices: res.data.data
        })
        wx.hideLoading()
      }
      else {
        util.alert(res.data.msg)
      }
    })




  }
})
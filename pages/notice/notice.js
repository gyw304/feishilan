const app = getApp();
const request = require('../../request')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notices : [
      {
        message : '恭喜你了！你中奖了！',
        date : '2018.08.29'
      },
      {
        message: '集团将于10月20日举行庆功大会，请大家准时参加，地址：88楼天空大厅！',
        date: '2018.08.29'
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

    request.postRequest(request.api.note, {  }, function (res) {
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
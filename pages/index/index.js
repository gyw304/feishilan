// pages/index/index.js

const app = getApp()
const util = require('../../utils/util')
const request = require('../../request')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中'
    })

    if (!wx.getStorageSync('usercode')) {
      getApp().getPass().then((resArg) => {
        if (resArg.status == 200) {
          console.log('获取用户信息成功！')
          wx.hideLoading()
          wx.redirectTo({
            url: '../home/home'
          })
        }
        else{
          util.alert('用户获取失败')
          return
        }
      })
    } else {
      console.log('已有用户信息,直接操作')
      wx.hideLoading()
      wx.redirectTo({
        url: '../home/home'
      })
    }

    // wx.redirectTo({
    //   url: '../home/home'
    // })

  }
})
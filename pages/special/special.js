// pages/special/special.js
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

  },
  jumppage : function(e){

    let _url = e.currentTarget.dataset.url

    if (_url == 'none'){
      util.alert('敬请期待')
    }
    else{
      wx.navigateTo({
        url: _url
      })
    }

    
  }
})
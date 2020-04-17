// pages/config_page/config_page.js
const request = require('../../request')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    request.postRequest(request.api.use_setting, {  }, function (res) {

      if (res.data.code == 1) {
        if (res.data.code == 1) {
          that.setData({
            content: res.data.data
          })
          
        }


      }
      else {
        util.alert(res.data.msg)
      }

    })

  },

})
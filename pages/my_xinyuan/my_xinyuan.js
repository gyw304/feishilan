// pages/my_aixin/my_aixin.js

const request = require('../../request')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    inf: {},

    xinyuanlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    request.postRequest(request.api.mywish, {}, function (res) {
      console.log(res)

      if (res.data.code == 1) {

        that.setData({
          xinyuanlist: res.data.data
        })

        request.postRequest(request.api.user, {

        }, function (res) {


          if (res.data.code == 1) {
            that.setData({
              inf: res.data.data
            })
          }
          else {
            util.alert(res.data.msg)
          }

        })


      }
      else {
        util.alert(res.data.msg)
      }



    })

  }
})
// pages/leave/leave.js

const app = getApp()
const util = require('../../utils/util')
const request = require('../../request')


Page({

  /**
   * 页面的初始数据
   */
  data: {

    isAuth: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var that = this;

    if (wx.getStorageSync('userInfo')) {

      this.setData({
        isAuth: true
      })

    }
    else {
      app.userInfoReadyCallback = res => {
        this.setData({
          isAuth: true
        })
        wx.setStorageSync('userInfo', res.userInfo)
      }
    }
  },

  getUserInfo: function (e) {

    if (e.detail.userInfo) {

      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.setData({
        isAuth: true
      })

    }
    else {
      wx.showModal({
        title: '温馨提示',
        content: '您点击了拒绝授权，将无法进行反馈，请授权之后再反馈!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }



  },

  formSubmit: function (e) {

    var that = this;
    var _content = e.detail.value.content

    if (_content == '') {
      util.alert('请说点什么吧！');
      return
    }


    request.postRequest(request.api.suggest, {
      content: _content,
      nick_name: wx.getStorageSync('userInfo').nickName,
      head_img: wx.getStorageSync('userInfo').avatarUrl
    }, function (res) {


      if (res.data.code == 1) {
        util.alert('提交反馈成功')
        setTimeout(function () {

          wx.navigateBack({
            delta: 1
          })

        }, 1000)
      }
      else {
        util.alert(res.data.msg)
      }

    })

  }


})
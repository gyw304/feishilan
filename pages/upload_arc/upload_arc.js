const app = getApp();
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
        content: '您点击了拒绝授权，将无法进行上传文章，请授权之后再上传!!!',
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
  submit : function(e){

    var that = this;
    var _content = e.detail.value.content


    if (_content == '') {
      mod.showToast('请先写点什么吧！');
      return
    }

    request.postRequest(request.api.word, {
      nick_name: wx.getStorageSync('userInfo').nickName,
      head_img: wx.getStorageSync('userInfo').avatarUrl,
      content: _content
    }, function (res) {


      if (res.data.code == 1) {

        util.alert('上传成功')

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
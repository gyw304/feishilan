// pages/upload/upload.js
const app = getApp();
const util = require('../../utils/util')
const request = require('../../request')

var videoSrc = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth : false
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
        content: '您点击了拒绝授权，将无法进行上传视频，请授权之后再上传!!!',
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
  chooseVideo : function(){

    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      compressed : true,
      maxDuration: 60,
      camera: 'back',
      success: function (res) {

        

        console.log(res.tempFilePath)

        if (res.size < 14 * 1024 * 1024){
          videoSrc = res.tempFilePath;
          that.setData({
            videoSrc
          })
        }
        else{
          util.alert('上传的视频不能超过14M')
        }

        

        

      },
      fail : function(res){
        console.log(res)
      }
    })

 
  },

  formSubmit: function (e) {

    var that = this;


    if (videoSrc == null) {
      util.alert('请先上传视频吧！');
      return
    }

    console.log(request.api.video_zj,)


    const uploadTask = wx.uploadFile({
      url: 'https://zhiyan.zxhong.com/friesland/api/index.php'+request.api.video_zj,
      filePath: videoSrc,
      name: 'upfile',
      formData: {
        openid: wx.getStorageSync('usercode').openid,
        sskey: wx.getStorageSync('usercode').sskey,
        nick_name: wx.getStorageSync('userInfo').nickName,
        head_img: wx.getStorageSync('userInfo').avatarUrl
      },
      success: function (res) {


        var _data = JSON.parse(res.data)

        if (_data.code == 1) {
          util.alert("上传视频成功");
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
        else {
          util.alert(_data.msg)
        }

      }
    })

    uploadTask.onProgressUpdate((res) => {

      that.setData({
        percent: res.progress
      })

    })

  },

  onReachBottom: function () {
    var that = this;
    console.log(1)
    wx.showLoading({
      title: '玩命加载中',
    })
  }


})
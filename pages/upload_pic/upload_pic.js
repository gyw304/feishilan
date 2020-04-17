
const app = getApp();


const util = require('../../utils/util')
const request = require('../../request')

var imageSrc = null;
var pic_type = null;

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

    pic_type = options.pic_type;

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
        content: '您点击了拒绝授权，将无法进行上传图片，请授权之后再上传!!!',
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

  chooseImage : function(){

    var that = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        imageSrc = res.tempFilePaths[0];

        
        that.setData({
          imageSrc
        })

      }
    })
  },

  formSubmit : function(e){

    if (imageSrc == null) {
      util.alert('请先上传图片吧！');
      return
    }



    request.upfileRequest(request.api.image, {
      nick_name: util.get('userInfo').nickName,
      head_img: util.get('userInfo').avatarUrl,
      pic_type: pic_type
    }, imageSrc, function (res) {
      console.log(res)
      var _data = JSON.parse(res.data)


      if (_data.code == 1) {
          util.alert("上传图片成功");
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
        else{
          util.alert(_data.msg)
      }



    })



    // wx.uploadFile({
    //   url: imageUrl,
    //   filePath: imageSrc,
    //   name: 'upfile',
    //   formData: {
    //     openid: wx.getStorageSync('usercode').openid,
    //     sskey: wx.getStorageSync('usercode').sskey,
    //     nick_name: wx.getStorageSync('userInfo').nickName,
    //     head_img: wx.getStorageSync('userInfo').avatarUrl
    //   },
    //   success: function (res) {

    //     var _data = JSON.parse(res.data)
    
    //     if (_data.code == 1){
    //       mod.showToast("上传图片成功");
    //       setTimeout(function () {
    //         wx.navigateBack({
    //           delta: 1
    //         })
    //       }, 1000)
    //     }
    //     else{
    //       mod.showToast(_data.msg)
    //     }

    //   }
    // })

  }

})
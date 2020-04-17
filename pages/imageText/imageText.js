// pages/imageText/imageText.js
const request = require('../../request')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    src : null,

    zan_btn : false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    var title = options.title || '菲仕兰境界';

    wx.setNavigationBarTitle({
      title : title
    })

    request.postRequest(request.api.imgs, {

    }, function (res) {

      if (res.data.code == 1) {

        if(options.id == 3){
          that.setData({
            zan_btn: true
          })
        }

        res.data.data.forEach(function(item){
            if(item.id == options.id){
              that.setData({
                src: item.img_url
              })
            }
        })
        
        
      }
      else {
        util.alert(res.data.msg)
      }

    })


  },

  zan : function(){
    request.postRequest(request.api.like, {

    }, function (res) {
      if(res.data.code == 1){
        util.alert('点赞成功获得爱心值~')
      }
      else{
        util.alert(res.data.msg)
      }
    })
  }

})
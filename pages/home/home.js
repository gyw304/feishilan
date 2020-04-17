// pages/home/home.js

const util = require('../../utils/util')
const request = require('../../request')

var click = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    request.postRequest(request.api.img_id, { img_id:14}, function (res) {
      console.log(res)
      if (res.data.code == 1) {

        that.setData({
          url: res.data.data.img_url
        })

        if (res.data.data.img_url == ''){
          that.jumppage()
        }

        
      }
      else {
        util.alert(res.data.msg)
      }
    })

  },
  onShow : function(){
    click = false;
  },
  load : function(e){
    var that = this;
    setTimeout(function () {
      that.jumppage()
    }, 2000)
  },
  jumppage : function(){

    request.postRequest(request.api.isIn, {}, function (res) {
      if (res.data.code == 1) {
        if (res.data.data.is_crm == 1) {

          if (res.data.data.cemail == ""){
            wx.redirectTo({
              url: '../crm/crm'
            })
          }
          else{
            wx.redirectTo({
              url: '../main/main'
            })
          }
        }
        else {
          wx.redirectTo({
            url: '../crm/crm'
          })
        }
      }
      else {
        util.alert(res.data.msg)
      }
    })



    // if (!click){

    //   click = true;

    //   request.postRequest(request.api.isIn, {}, function (res) {
    //     if (res.data.code == 1) {
    //       if (res.data.data.is_crm == 1) {
    //         wx.redirectTo({
    //           url: '../main/main'
    //         })
    //       }
    //       else {
    //         wx.redirectTo({
    //           url: '../crm/crm'
    //         })
    //       }
    //     }
    //     else {
    //       util.alert(res.data.msg)
    //     }
    //   })
      
    // }


    

    
  },
  onShareAppMessage: function (res) {
    return {
      title: '菲仕兰境界',
      path: 'pages/index/index'
    }
  }
})
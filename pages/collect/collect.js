// pages/collect/collect.js

const app = getApp();
// const mod = require('../../utils/util');
// const myCollectUrl = require('../../config').myCollect;

const request = require('../../request')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
  
  },

  onShow : function(){
    var that = this;


    request.postRequest(request.api.myCollect, { }, function (res) {


      if (res.data.code == 1) {
        that.setData({
          list: res.data.data
        })
      }
      else {
        util.alert(res.data.msg)
      }

    })




    // mod.postData(myCollectUrl, {
    //   openid: wx.getStorageSync('usercode').openid,
    //   sskey: wx.getStorageSync('usercode').sskey
    // }, function (res) {
    //   if (res.data.code == 1) {
    //     that.setData({
    //       list: res.data.data
    //     })
    //   }
    //   else {
    //     mod.showToast(res.data.msg)
    //   }
    // })
  },


  go_detail: function (e) {

    var cid = e.currentTarget.dataset.cid

    wx.navigateTo({
      url: '../detail/detail?cid=' + cid+''
    })
  }
})
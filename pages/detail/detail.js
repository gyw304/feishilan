// pages/detail/detail.js
const app = getApp();
// const mod = require('../../utils/util');
// const artDetailUrl = require('../../config').artDetail;
// const zanUrl = require('../../config').zan;
// const collectUrl = require('../../config').collect;
// const commentUrl = require('../../config').comment;

const request = require('../../request')
const util = require('../../utils/util')


var _id = 0;
var shareTitle = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    detail : {}
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    _id = options.cid;

    request.postRequest(request.api.artDetail, { id: _id }, function (res) {
      console.log(res)

      if (res.data.code == 1) {
        if (res.data.code == 1) {
            that.setData({
              detail: res.data.data
            })
            shareTitle = res.data.data.title
          }

        wx.hideLoading()
      }
      else {
        util.alert(res.data.msg)
      }

    })


    // app.getOpenid().then(function (res) {
    //   if (res.status == 200) {

    //     mod.postData(artDetailUrl, {
    //       openid: wx.getStorageSync('usercode').openid,
    //       sskey: wx.getStorageSync('usercode').sskey,
    //       id: _id,
    //       formid: app.globalData.formid
    //     }, function (res) {
    //       if (res.data.code == 1) {
    //         that.setData({
    //           detail: res.data.data
    //         })
    //         shareTitle = res.data.data.title
    //       }
    //       else {
    //         mod.showToast(res.data.msg)
    //       }


    //     })

    //   } else {
    //     console.log(res.data);
    //   }
    // }); 



   
  
  },

  onShow : function(){

    var that = this;

    if (app.globalData.comment != null){

      var _comments = that.data.detail.comments;

      _comments.unshift(app.globalData.comment)

      that.setData({
        ["detail.comments"]: _comments
      })

      app.globalData.comment = null

    }

  
  },

  zan : function(e){

    var that = this;

    var _id = e.currentTarget.dataset.cid;


    request.postRequest(request.api.zan, { id: _id }, function (res) {

      var _zan_num = parseInt(that.data.detail.zan_num);
      
      if (res.data.code){
        _zan_num++

        that.setData({
          ["detail.zan"]: true,
          ["detail.zan_num"]: _zan_num
        })
        util.alert(res.data.msg)
      }
      else {
       
      }

    })

  },

  gopage : function(e){
    var _id = e.currentTarget.dataset.cid;
    wx.navigateTo({
      url: '../leave/leave?cid=' + _id+''
    })
  },

  collect : function(e){

    var that = this;
    var _data_collect = e.currentTarget.dataset.collect;


    request.postRequest(request.api.collect, { 
      id: _data_collect.split(',')[0], 
      type: _data_collect.split(',')[1] 
    }, function (res) {
     
      if (res.data.code == 1) {
        if (that.data.detail.collect == true) {
          that.setData({
            ['detail.collect']: false
          })
          util.alert('取消收藏成功')
        }
        else {
          that.setData({
            ['detail.collect']: true
          })
          util.alert('收藏成功')
        }
        
      }
      else {
        util.alert(res.data.msg)
      }
      
    })





  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.detail.title,
      path: 'pages/detail/detail?cid=' + _id
    }
  }
})
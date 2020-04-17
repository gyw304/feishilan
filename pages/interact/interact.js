
const app = getApp();

const request = require('../../request')
const util = require('../../utils/util')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inf : {
      login_num : 0,
      collect_num :0,
      love_num : 0
    }
  },
  onLoad : function(){
    //this.saveFormIds();
  },

  onShow : function(){
    var that = this;


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




    // mod.postData(userUrl, {
    //   openid: wx.getStorageSync('usercode').openid,
    //   sskey: wx.getStorageSync('usercode').sskey
    // }, function (res) {
    //   if (res.data.code == 1) {
    //     that.setData({
    //       inf: res.data.data
    //     })
    //   }
    //   else {
    //     mod.showToast(res.data.msg)
    //   }
    // })
  },

  gopage : function(e){
    
    let url = e.currentTarget.dataset.url;

    wx.navigateTo({
      url: url
    })

  },

  saveFormIds: function () {
    // var formIds = app.globalData.gloabalFomIds; // 获取gloabalFomIds
    // if (formIds.length) {//gloabalFomIds存在的情况下 将数组转换为JSON字符串
    //   formIds = JSON.stringify(formIds);
    //   app.globalData.gloabalFomIds = '';
    // }

    // mod.postData(formIdsUrl,{
    //   openid: wx.getStorageSync('usercode').openid,
    //   sskey: wx.getStorageSync('usercode').sskey,
    //   formIds: formIds
    // },function(res){

    // })

  }
  
})

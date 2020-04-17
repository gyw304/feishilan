// pages/addMilk/addMilk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  jumppage : function(e){



    let _url = e.currentTarget.dataset.url

    wx.navigateTo({
      url: _url
    })

   
  }
})
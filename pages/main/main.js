// pages/main/main.js
const request = require('../../request')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navs: [{
        ico: '../../image/nav_11.png',
        url: '../jingjie/jingjie'
      },
      {
        ico: '../../image/nav_0.png',
        url: '../article/article?tag=2&title=菲我访谈'
      },
      {
        ico: '../../image/nav_6.png',
        url: '../video/video?type=1&title=菲常Video'
      },
      {
        ico: '../../image/nav_1.png',
        url: '../article/article?tag=4&title=菲常时刻'
      },
      {
        ico: '../../image/nav_2.png',
        url: '../special/special'
      },
      {
        ico: '../../image/nav_3.png',
        url: '../article/article?tag=8&title=菲常学苑'
      },
      // { ico: '../../image/nav_4.png', url: '../article/article?tag=7&title=菲常家族' },
      {
        ico: '../../image/nav_5.png',
        url: '../article/article?tag=5&title=菲我家园'
      },

      // { ico: '../../image/nav_7.png', url: '../collect_order/collect_order' },
      {
        ico: '../../image/nav_8.png',
        url: '../shop/shop'
      },
      {
        ico: '../../image/nav_9.png',
        url: '../interact/interact'
      },
      {
        ico: '../../image/nav_12.png',
        url: '../ciniu/index/index'
      },
      {
        ico: '../../image/nav_13.png',
        url: '../yuantan_video/yuantan_video'
      },
      {
        ico: '../../image/nav_14.png',
        url: 'none'
      }
    ],
    draw_btn_vis: false,
    banner: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;

    request.postRequest(request.api.banner, {}, function(res) {

      console.log(res.data.data)

      if (res.data.code == 1) {

        that.setData({
          banner: res.data.data
        })



      }

    })

  },
  jumppage: function(e) {

    let _type = e.currentTarget.dataset.type

    if (_type == '1') {
      wx.navigateTo({
        url: `../detail/detail?cid=${e.currentTarget.dataset.id}`
      })
    }else if(_type == '3'){
      wx.navigateTo({
        url: `../imageText/imageText?id=${e.currentTarget.dataset.id}`
      })
    } else if (_type == '4') {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }





  },
  nav_jumppage: function(e) {

    let _url = e.currentTarget.dataset.url

    if (_url == 'none') {
      util.alert('敬请期待')
    } else {
      wx.navigateTo({
        url: _url
      })
    }
  }
})
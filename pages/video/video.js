const request = require('../../request')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_list: [

    ],
    page: 1,
    isEnd: false,
    playIndex: null,
    type : -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    wx.showLoading({
      title: '视频加载中...',
    })

    wx.setNavigationBarTitle({
      title: options.title
    })

    this.data.type = options.type

    request.postRequest(request.api.video, { page: this.data.page, tag: this.data.type}, function (res) {
      console.log(res)
       
      if (res.data.code == 1) {
        
        that.setData({
          video_list: res.data.data
        })

        wx.hideLoading()
      }
      else {
        util.alert(res.data.msg)
      }

    })

  },
  onReady: function () {
    this.videoContext = wx.createVideoContext('5')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    if (this.data.isEnd) return;

    var that = this;

    wx.showLoading({
      title: '视频加载中...',
    })

    this.setData({
      page: this.data.page + 1
    })

    request.postRequest(request.api.video, { page: this.data.page, tag: this.data.type}, function (res) {

      if (res.data.code == 1) {
        if (res.data.data.length > 0) {

          var list = that.data.video_list;

          for (var i = 0; i < res.data.data.length; i++) {
            list.push(res.data.data[i]);
          }

          that.setData({
            video_list: list
          })

          wx.hideLoading()

        }
        else {

          that.setData({
            isEnd: true
          })

          util.alert('没有更多视频了!')
        }
      }

    })

  },

  videoPlay: function (e) {
    console.log(e)
    var curIdx = e.target.id;
    console.log(curIdx)
    // 没有播放时播放视频
    if (!this.data.playIndex) {
      this.setData({
        playIndex: curIdx
      })
      var videoContext = wx.createVideoContext(curIdx) //这里对应的视频id
      videoContext.play()

    } else {
      // 有播放时先将prev暂停，再播放当前点击的current
      var videoContextPrev = wx.createVideoContext(this.data.playIndex)
      if (this.data.playIndex != curIdx) {
        //跳转到初始位置进行暂停
        videoContextPrev.seek(0)
        videoContextPrev.pause()
      }
      this.setData({
        playIndex: curIdx
      })
      this.videoContextCurrent = wx.createVideoContext(curIdx)


    }
  },


  onHide: function () {

    if (this.videoContextCurrent != undefined) {
      this.videoContextCurrent.pause()
    }

  }
})
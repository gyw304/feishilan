// pages/ciniu/index/index.js
const app = getApp()
const util = require('../../../utils/util')
const request = require('../../../request')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    guld: true,

    share_img_src : '',

    drawing: [
    ],

    paopao: {
      rud_pos: [
        { x: 150, y: 550 },
        { x: -50, y: 800 },
        { x: -240, y: 550 },
      ],

      rnd: util.randomNum(0, 2)
    },

    pop: true,

    visible: false,



    pop_name: '',
    pop_name_tip: '',
    pop_ico: '',
    pop_win_content_type: '',


    question: {
      num: 0,
      question_complete: false
    },



    user: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (!util.get('guld')) {
      util.set('guld', "true")
    }
    else {
      this.setData({
        guld: false
      })
    }

    var that = this;

    request.postRequest(request.api.ciniu, {}, function (res) {
      console.log(res)

      if (res.data.code == 1) {
        that.setData({
          user: res.data.data
        })

      }
      else {
        util.alert(res.data.msg)
      }



    })

  },

  onReady: function () {

   

  },


  pop_show: function (e) {





    let type = e.currentTarget.dataset.type;
    let name = e.currentTarget.dataset.name;
    let nametip = e.currentTarget.dataset.nametip;

    this.setData({
      pop: false,
      pop_ico: type,
      pop_name: name,
      pop_win_content_type: type,
      pop_name_tip: nametip
    })





  },
  pop_hide: function (e) {


    this.setData({
      pop: true,
      pop_win_content_type: ''
    })


  },
  clickpaopao: function () {

    var that = this;


    request.postRequest(request.api.sign, {}, function (res) {
      console.log(res)

      if (res.data.code == 1) {
        that.setData({
          ['user.paopao.paopao_complete']: true,
          ['user.paopao.piao']: true,
          ['user.total']: parseInt(that.data.user.total) + parseInt(that.data.user.paopao.num)
        })

      }
      else {
        util.alert(res.data.msg)
      }



    })






  },
  jinai: function () {

    var that = this;

    if (this.data.user.jinai.jinai_complete) {
      util.alert('今天已经挤过奶了！')
    }
    else {

      request.postRequest(request.api.jinai, {}, function (res) {
        console.log(res)

        if (res.data.code == 1) {
          that.setData({
            ['user.total']: parseInt(that.data.user.total) + parseInt(that.data.user.jinai.num),
            ['user.jinai.jinai_complete']: true,
            ['user.jinai.piao']: true
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })




    }


  },

  subAsk: function (e) {

    this.setData({
      ['user.total']: parseInt(this.data.user.total) + parseInt(e.detail),
      ['question.num']: e.detail,
      ['question.piao']: true
    })


  },

  comImg(e){

  },

  changeNengLiang: function () {
    this.setData({
      pop_win_content_type: 'content_nengliang',
      pop_name_tip: '爱心能量'
    })

    this.nengliang.getData()

  },
  toXinYuanList: function () {
    this.setData({
      pop_win_content_type: 'content_xinyuanlist',
      pop_name_tip: '我发布的心愿'
    })
  },
  toJuanZeng: function () {
    console.log(111111)
    this.setData({
      pop_win_content_type: 'content_juanzeng',
      pop_name_tip: '捐款'
    })
  },
  toJuanZengList: function () {
    this.setData({
      pop_win_content_type: 'content_juanzenglist',
      pop_name_tip: '我的捐款历史'
    })
  },
  guld_tap() {
    console.log(111)
    this.setData({
      guld: !this.data.guld
    })
  },
  comImg : function(e){
    if(e.detail){
      this.setData({
        share_img : true,
        share_img_src : e.detail
      })
    }
   
  },
  save_img(){

    var that = this;

    wx.getSetting({
      success: function (res) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: function (res) {
            console.log("授权成功");
            var imgUrl = that.data.share_img_src;
            wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
              url: imgUrl,
              success: function (res) {
                // 下载成功后再保存到本地
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                  success: function (res) {
                    wx.showToast({
                      title: '成功保存到相册',
                      icon: 'success'
                    })
                    that.setData({
                      share_img: false,
                      share_img_src: ''
                    })
                    
                  }
                })
              }
            })
          }
        })
      }
    })

  }

})
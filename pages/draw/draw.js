// pages/draw/draw.js
const app = getApp()
const util = require('../../utils/util')
const request = require('../../request')

var poilId = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picture : '',
    awardsList: {},
    animationData: {},
    btnDisabled: '',

    awardIndex: 0,

    poiltype: 0,

    chanceNum: 0,

    awardsConfig: {
      chance: true,
      awards: []
    },

    rid: null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;


    // 绘制转盘
    var awardsConfig = this.data.awardsConfig.awards,
      len = awardsConfig.length,
      rotateDeg = 360 / len / 2 + 90,
      html = [],
      turnNum = 1 / len


    that.setData({
      btnDisabled: this.data.awardsConfig.chance ? '' : 'disabled'
    })


    for (var i = 0; i < len; i++) {
      // 奖项列表
      html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name });
    }

    that.setData({
      awardsList: html
    });
    

    request.postRequest(request.api.prizeIndex, { }, function (res) {

      console.log(res.data.data)

      if (res.data.code == 1){

        that.setData({
          picture: res.data.data.picture,
          "awardsConfig.awards": res.data.data.plist,
          chanceNum: res.data.data.num
        })

        // if (res.data.data.num >= 1){
        //   that.setData({
        //     "awardsConfig.awards": res.data.data.plist
        //   })
        //   if (res.data.data.picture != "" && res.data.data.plist.length > 0){
        //     that.setData({
        //       chanceNum: res.data.data.num
        //     })
        //   }
        // }

        
      }

    })


  },

  getLottery: function () {
    var that = this

    var changeNum = this.data.chanceNum;

    if (changeNum <= 0) {
      util.alert("没有抽奖次数咯")
      return
    }
    else {
      changeNum--
      that.setData({
        chanceNum: changeNum
      })
    }


    this.data.awardsConfig.chance = true;

    request.postRequest(request.api.draw, {}, function (res) {
      if (res.data.code == 1){
        poilId = res.data.data.prize_id;
        that.setData({
          rid: res.data.data.rid
        })
        that.draw(poilId)
      } else if (res.data.code == -1){
        that.draw(-1)
      } else if (res.data.code == -2){
        util.alert('抽奖次数已用完')
      }
      else{
        util.alert('抽奖失败')
      }
    })


  },
  draw: function (poilId) {

    var that = this;


    console.log(poilId)

    if (poilId == -1) {
      for (var i = 0; i < that.data.awardsConfig.awards.length; i++) {
        if (that.data.awardsConfig.awards[i].type == 0) {
          that.setData({
            awardIndex: i
          })
        }
      }
    }
    else {
      for (var i = 0; i < that.data.awardsConfig.awards.length; i++) {
        if (that.data.awardsConfig.awards[i].id == poilId) {
          that.setData({
            awardIndex: i
          })
        }
      }
    }





    // 旋转抽奖
    that.runDegs = that.runDegs || 0
    console.log('deg', that.runDegs)
    that.runDegs = that.runDegs + (360 - that.runDegs % 360) + (360 * 8 - that.data.awardIndex * (360 / that.data.awardsConfig.awards.length))
    console.log('deg', that.runDegs)

    var animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(that.runDegs).step()
    that.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    })
  },
  animationend: function () {
    var that = this;

    if (this.data.awardsConfig.awards[this.data.awardIndex].type == 1) {
      setTimeout(function () {
        that.setData({
          poiltype: 1
        })
      }, 500)
    }
    else if (this.data.awardsConfig.awards[this.data.awardIndex].type == 2){
      util.alert('恭喜获得爱心值')
    }
    else {
      util.alert('您没有获得奖品，加油哦！')
      // wx.showModal({
      //   title: '很遗憾',
      //   content: '您没有获得奖品，加油哦！',
      //   showCancel: false
      // })
    }


    if (this.data.awardsConfig.chance) {
      this.setData({
        btnDisabled: ''
      })
    }
  },

  submitdraw: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    var that = this;


    if (e.detail.value.username == '' || e.detail.value.tel == '' || e.detail.value.address == '') {
      util.alert("请填写完整信息");
      return
    }

    request.postRequest(request.api.drawUser, {
      rid: that.data.rid,
      username: e.detail.value.username,
      tel: e.detail.value.tel,
      address: e.detail.value.address
    }, function (res) {

      if (res.data.code == 1) {
       util.alert('提交成功')
        setTimeout(function () {
          that.setData({
            poiltype: 0
          })
        }, 1000)
      }
      else {
        util.alert(res.data.msg)
      }

    })


    // mod.postData(drawUserUrl, {
    //   openid: wx.getStorageSync('usercode').openid,
    //   sskey: wx.getStorageSync('usercode').sskey,
    //   rid: that.data.rid,
    //   username: e.detail.value.username,
    //   tel: e.detail.value.tel,
    //   address: e.detail.value.address
    // }, function (res) {
    //   if (res.data.code == 1) {
    //     mod.showToast("提交成功");
    //     setTimeout(function () {
    //       that.setData({
    //         poiltype: 0
    //       })
    //     }, 1000)
    //   }
    //   else {
    //     mod.showToast(res.data.msg)
    //   }
    // })

  }

})
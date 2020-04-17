// pages/shop_detail/shop_detail.js

const request = require('../../request')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    current : -1,
    show_way : false,
    show_success : false,

    good_detail : {},
    address : ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var that = this;


    request.postRequest(request.api.good_detail, {
      gid : options.id
    }, function (res) {

      if (res.data.code == 1) {

        that.setData({
          good_detail : res.data.data
        })

       console.log(res)

      }
      else {
        util.alert(res.data.msg)
      }



    })

  },

  select : function(e){
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },

  duihuan : function(){
    this.setData({
      show_way: !this.data.show_way,
      current : -1
    })
  },

  bindPickerChange : function(e){
    this.data.address = this.data.good_detail.point_address[e.detail.value]
    //console.log(this.data.good_detail.point_address[e.detail.value])
  },

  exchange(){

    var that = this;


    if (parseInt(that.data.current) + 1 == 1){
      request.postRequest(request.api.exchange, {
        gid: that.data.good_detail.gid,
        way: 1,
        address: this.data.address
      }, function (res) {

        if (res.data.code == 1) {

          that.setData({
            show_way: !that.data.show_way,
            show_success: true,
            current: -1
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })
    }
    else if(parseInt(that.data.current) + 1 == 2){

      request.postRequest(request.api.exchange, {
        gid: that.data.good_detail.gid,
        way: 2
      }, function (res) {

        if (res.data.code == 1) {

          that.setData({
            show_way: !that.data.show_way,
            show_success: true,
            current: -1
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })

    }else{
      util.alert('请选择兑换方式')
    }


    
  },
  hide_success(){
    this.setData({
      show_success: false
    })
  }
})
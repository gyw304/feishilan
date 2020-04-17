// pages/crm/crm.js
const request = require('../../request')
const util = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    button_text : '提交',

    reg_data : {

    },

    page_type : ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    if(options.type == 'change'){
      this.setData({
        button_text : '修改',
        page_type : 'change'
      })
    }
    else{
      this.setData({
        button_text: '提交',
        page_type: 'sub'
      })
    }

    request.postRequest(request.api.isIn, {}, function (res){
      that.setData({
        reg_data : res.data.data
      })
    })

  },

  formSubmit : function(e){

    var that = this;

    if (e.detail.value.uname == '' || e.detail.value.tel == '' || e.detail.value.department == '' || e.detail.value.address == '' || e.detail.value.cemail == ''){
      util.alert('请填写完整信息')
    }
    else if (!util.regMobile(e.detail.value.tel)){
      util.alert('请正确填写手机号')
    }
    else{
      request.postRequest(request.api.join, {
        uname: e.detail.value.uname,
        tel: e.detail.value.tel,
        department: e.detail.value.department,
        address: e.detail.value.address,
        cemail: e.detail.value.cemail
      }, function (res) {

        if(res.data.code == 1){

          if (that.data.page_type == "sub"){
            util.set('isIn', 'true')
            wx.navigateTo({
              url: '../main/main'
            })
          }
          else{
            wx.navigateBack({
              delta: 1
            })
          }

         
        }
        else{
          util.alert(res.data.msg)
        }

      })
    }

  }
})
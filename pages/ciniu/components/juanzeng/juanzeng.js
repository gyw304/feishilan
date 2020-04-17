// pages/ciniu/components/juanzeng/juanzeng.js


const util = require('../../../../utils/util')
const request = require('../../../../request')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalHidden: {//这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden 
      type: Boolean,
      value: true,
      observer(modalHidden) {
        if (!modalHidden) {
          this.getData()
        }
      }
    },
    moneyInfo : {
      type : Object,
      value : {
        count : 0,
        total : 0
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    upload_success : false,
    money_val : '',
    show : true,

    imageSrc : '',
    
    money_info: {
      complete : true
    },

    shuoming : ''

  },

  /**
   * 组件的方法列表
   */
  methods: {

    upload_img : function(){

      var that = this;


      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {

          var imageSrc = res.tempFilePaths[0];


          that.setData({
            imageSrc
          })


        }
      })



      

    },

    get_money_val : function(e){

      var that =this;

      this.data.money_val = e.detail.value

    },

    juanzeng : function(){

      var that = this;

      if (this.data.money_val == ''){
        util.alert('请输入捐赠金额')
        return
      }

      if (this.data.imageSrc == '') {
        util.alert('请上传存单照片')
        return
      }





      request.upfileRequest(request.api.donate, {
        money: that.data.money_val,
        upfile: that.data.imageSrc,
      }, that.data.imageSrc, function (res) {
 
        var _data = JSON.parse(res.data)
        console.log(_data)

        if (_data.code == 1) {

          util.alert("捐赠成功,请等待审核");

          that.setData({
            ['money_info.complete'] : true
          })

     
        }
        else {
          util.alert(_data.msg)
        }



      })


    },

    shuoming : function(){

      var that = this;



      request.postRequest(request.api.donate_guide, {}, function (res) {


        if (res.data.code == 1) {
          that.setData({
            shuoming: res.data.data.donate_intro
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })


      this.setData({
        show : !this.data.show
      })
    },
    back_juankuan : function(){
      this.setData({
        show: !this.data.show
      })
    },
    getData : function(){
      var that = this;



      request.postRequest(request.api.donate_info, {}, function (res) {


        if (res.data.code == 1) {
          that.setData({
            money_info: res.data.data
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })
    }

  }
})

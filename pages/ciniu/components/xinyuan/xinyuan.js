// pages/ciniu/components/xinyuan/xinyuan.js

const util = require('../../../../utils/util')
const request = require('../../../../request')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalHidden: {
      type: Boolean,
      value: true,
      observer(modalHidden) {
        if (!modalHidden) {
          this.getData()
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    textarea_text : '',

    type : 2,

    src: '',

    moren : ''

  },

  /**
   * 组件的方法列表
   */
  methods: {


    getData() {

      var that = this;

      request.postRequest(request.api.img_id, {
        img_id: 13
      }, function (res) {


        if (res.data.code == 1) {
          that.setData({
            src: res.data.data.img_url,
            moren: res.data.data.img_url,
            textarea_text : ''
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })
    },


    upload : function(){

      var that = this;

      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {

          var _src = res.tempFilePaths[0];


          request.upfileRequest(request.api.upimg, {
          }, _src, function (res) {
            console.log(res)
            var _data = JSON.parse(res.data)


            if (_data.code == 1) {


              that.setData({
                src: _data.data.img_url,
                type: 1
              })

              //util.alert("上传图片成功");

              //that.triggerEvent("toXinYuanList");

            }
            else {
              util.alert(_data.msg)
            }



          })


          


        }
      })
    },

    get_textarea_val : function(e){
      this.data.textarea_text = e.detail.value
    },

    moren : function(){
      this.setData({
        src: this.data.moren,
        type: 2
      })
    },
    formSubmit : function(){

      var that = this;

      if (this.data.textarea_text == ''){
        util.alert('请输入心愿')
        return
      }

      if (this.data.type == 2){
        request.postRequest(request.api.wish, {
          content: that.data.textarea_text,
          type : that.data.type,
          img_url: that.data.moren
        }, function (res) {


          if (res.data.code == 1) {

            that.triggerEvent("comImg", res.data.data.com_img_url);
            that.triggerEvent("toXinYuanList");

          }
          else {
            util.alert(res.data.msg)
          }



        })

        

      }
      else{
        


        request.postRequest(request.api.wish, {
          content: that.data.textarea_text,
          type: that.data.type,
          img_url: that.data.src
        }, function (res) {


          if (res.data.code == 1) {
            console.log(res.data.data.com_img_url)
            
            that.triggerEvent("comImg", res.data.data.com_img_url);
            that.triggerEvent("toXinYuanList");

          }
          else {
            util.alert(res.data.msg)
          }



        })


       

      }
      }


      
  },
  
})

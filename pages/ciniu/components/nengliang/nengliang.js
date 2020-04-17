// pages/ciniu/components/nengliang/nengliang.js


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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    nengliang : [
      
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {

    getData : function(){
      var that = this;



      request.postRequest(request.api.love_value, {}, function (res) {


        if (res.data.code == 1) {
          that.setData({
            nengliang: res.data.data
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })
    }
    
  }
})

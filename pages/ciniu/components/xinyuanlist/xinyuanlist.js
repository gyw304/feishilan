// pages/ciniu/components/xinyuanlist/xinyuanlist.js
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
    xinyuanlist : [
      
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData : function(){
      var that = this;

      request.postRequest(request.api.mywish, {}, function (res) {


        if (res.data.code == 1) {
          that.setData({
            xinyuanlist: res.data.data
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })
    }
  }
})

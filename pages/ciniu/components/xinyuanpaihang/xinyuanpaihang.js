// pages/ciniu/components/xinyuanpaihang/xinyuanpaihang.js
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
    xinyuan_rank:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData: function () {

      console.log(33333333)

      var that = this;



      request.postRequest(request.api.wish_rank, {
        limit: 50
      }, function (res) {

        if (res.data.code == 1) {
          that.setData({
            xinyuan_rank: res.data.data
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })
    }

  }
})

// pages/ciniu/components/xinyuanjihe/xinyuanjihe.js
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

    xinyuanjihe : []

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData: function () {
      var that = this;



      request.postRequest(request.api.wish_list, {
       
      }, function (res) {


        if (res.data.code == 1) {
          that.setData({
            xinyuanjihe: res.data.data
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })
    },
    zan(e){

      var that = this;

      request.postRequest(request.api.zan_wish, {
        wid: e.currentTarget.dataset.id
      }, function (res) {


        if (res.data.code == 1) {

          util.alert('点赞成功')

          let zan_num = that.data.xinyuanjihe[e.currentTarget.dataset.index].zan_num;
          zan_num++

          that.setData({
            ['xinyuanjihe[' + e.currentTarget.dataset.index + '].zan_num']: zan_num
          })



          // that.setData({
          //   xinyuanjihe: res.data.data
          // })

        }
        else {
          util.alert(res.data.msg)
        }



      })
    }
  }
})

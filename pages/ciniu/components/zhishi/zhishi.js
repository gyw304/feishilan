// pages/ciniu/components/zhishi/zhishi.js

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
    current : -1,
    t_index_name : [],
    answer_cott : 0,

    right_ask : '',
    
    question: {

    },

    que_state : null
  
  },



  /**
   * 组件的方法列表
   */
  methods: {

    getData : function(){
      var that = this;

      request.postRequest(request.api.question, {}, function (res) {


        if (res.data.code == 1) {
          that.setData({
            question: res.data.data
          })

        }
        else {
          util.alert(res.data.msg)
        }



      })
    },

    select : function(e){
      this.setData({
        current: e.target.dataset.index,
        right_ask: e.target.dataset.select
      })
    },
    sub : function(){


      var that = this;

      request.postRequest(request.api.answer, {
        aid: that.data.question.aid,
        choose: that.data.right_ask
      }, function (res) {
        

        if (res.data.code == 1) {

          that.setData({
            ['question.is_right'] : 1
          })


          that.triggerEvent("subAsk", res.data.data.num);

   
        }
        else if (res.data.code == -1) {

          that.setData({
            ['question.is_right']: -1
          })

          //util.alert(res.data.msg)
        }


        that.setData({
          current : -1
        })


  


      })


      
    }
  }
})

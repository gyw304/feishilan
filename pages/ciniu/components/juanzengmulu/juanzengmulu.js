// pages/ciniu/components/juanzengmulu/juanzengmulu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalHidden: {//这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden 
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toJuanZeng(){
      this.triggerEvent("toJuanZeng");
    },
    toJuanZengList(){
      this.triggerEvent("toJuanZengList");
    }
  }
})

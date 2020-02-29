// components/tap/tap.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array
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
    clickTab(e){
      console.log('子组件 --切换tab事件',e.currentTarget.dataset.id);
     let id = e.currentTarget.dataset.id
      this.triggerEvent('mytap',id)  
    }

  }
})

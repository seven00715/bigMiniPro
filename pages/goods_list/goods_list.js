// pages/goods_list/goods_list.js

import { xj_requestgoodlistdata } from '../../request/request'
import { xj_showLoding,xj_hideLoading,xj_showToast } from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 1,
        title: '综合',
        isActive: true
      },
      {
        id: 2,
        title: '销量',
        isActive: false
      },
      {
        id: 3,
        title: '价格',
        isActive: false
      }
    ],
    goodslist: [],
    _page:0,
    hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(options) {

    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.cat_id = options.id
    this.loadListData()
    
  },
  toggleTab(e) {
    console.log('夫接受到的数据', e.detail);
    const id = e.detail
    let newtabs = [...this.data.tabs]
    newtabs.forEach(v => {
      if (v.id === id) {
        v.isActive = true
      } else {
        v.isActive = false
      }
    })
    console.log(newtabs);


    this.setData({
      tabs: newtabs
    })
  },
  async loadListData(){
    await xj_showLoding()
    
    let { _page ,goodslist} = this.data
    _page++
    let res = await xj_requestgoodlistdata(this.cat_id, _page)
    console.log(res);
    console.log(_page);
    
    console.log(Math.ceil(res.total / 10) );
    
    this.setData({
      goodslist: [...goodslist,...res.goods],
      hasMore: _page < Math.ceil(res.total / 10) ,
      _page
    })
    await xj_hideLoading()
    wx.stopPullDownRefresh()
  },

  // 上拉刷新
async onReachBottom(){
  
   let { hasMore } = this.data

   if(!hasMore){
     await xj_showToast("没有更多了")
     return
   }
  this.loadListData()
 },
 onPullDownRefresh: function () {
  this.setData({
    goodslist:[],
    _page:0,
    hasMore:true
  })
  this.loadListData()
},

  // async loadgoodlist(){
  //   await 
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
 

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
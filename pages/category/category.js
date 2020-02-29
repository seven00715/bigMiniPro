// pages/category/category.js

import { xj_requestcategoriesData } from '../../request/request'
import { xj_showLoding,xj_hideLoading } from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoriesData: [],
    activeId: 1,
    cateLeft: '',
    cateRight: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cates_tool = wx.getStorageSync('categoriesData');
    console.log(cates_tool);
    
    if (cates_tool) {
      // 设置数据的过期时间,过期了就需要重新发送请求数据
      let isLate = Date.now() - cates_tool.time >  7 * 60 * 60 *  1000
      console.log(cates_tool.time);
      
      if (isLate) {
        console.log('过期了------------');  
        this.loadcategoriesData()
      } else {
        console.log('没过期-------------')
        this.setData({
          categoriesData: cates_tool.res
        })
      }

    } else {
      console.log('没有值-------------');
      
      this.loadcategoriesData()
    }

  },
  //  获取分类列表
  async loadcategoriesData() {
    await xj_showLoding()
  try {
    let res = await xj_requestcategoriesData()
    let cateLeft = res.map(v => v.cat_name)
    let cateRight = res[this.data.activeId].children
    // 保存到本地 
    res = {res,time:Date.now()}
    wx.setStorageSync('categoriesData', res)
    this.setData({
      categoriesData: res.res,
      cateLeft,
      cateRight
    })
    
  } catch (error) {
    await xj_hideLoading()
  }
    // console.log(cateRight);
   
    await xj_hideLoading()
    

  },
  // 获取激活分类
  clickItem(e) {
    console.log(e.currentTarget.dataset.activeid);

    this.setData({
      activeId: e.currentTarget.dataset.activeid,
      cateRight: this.data.categoriesData[e.currentTarget.dataset.activeid].children
    })
  },

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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
import { xj_showTost } from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addobj:{},
    carts:[],
    total_goods: {
      price:0,
      num:0
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addr = wx.getStorageSync('address')
    let carts = wx.getStorageSync('cart')
    carts = carts.filter((v) => v.checked)

    // 3.保存
    this.setData({
      addobj: addr,
      carts
    })
    this.xj_setcount(carts)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

//计算和合计
  xj_setcount(carts){
  // 已经在上面做过过滤了,不用再判断

  let num = 0
  let price = 0

  carts.forEach((v)=>{
    num += v.goods_num
    price += v.goods_num * v.goods_price
  })

  this.setData({
    total_goods: {
      price,
      num,

    }

  })

},
// 支付功能开始-----------------

// 点击支付
  startPay(){
    // 尝试从本地获取token
    let token = wx.getStorageSync('token')

    // 2.判断
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }else{

    }
  }

})
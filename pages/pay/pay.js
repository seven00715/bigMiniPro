import {
  xj_showTost,
  xj_successToast
} from '../../utils/asyncWx.js'
import {
  xj_requestCreateOrder,
  xj_request_unifiedorder,
  xj_requestPayMent,
  xj_requestCheckoutOrder
} from '../../request/request_pay.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addobj: {},
    carts: [],
    total_goods: {
      price: 0,
      num: 0
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onReady: function() {

  },

  //计算和合计
  xj_setcount(carts) {
    // 已经在上面做过过滤了,不用再判断

    let num = 0
    let price = 0

    carts.forEach((v) => {
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
  startPay() {
    // 尝试从本地获取token
    let token = wx.getStorageSync('token')

    // 2.判断
    if (!token) {
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/auth/auth',
        })
      }, 2000)
      return
    }
    //创建订单
    //3.1准备参数
    let oder_price = this.data.total_goods.price
    let consignee_addr = this.data.addobj
    let goods = this.data.carts.map((v) => {
      return {
        goods_id: v.goods_id,
        goods_number: v.goods_num,
        goods_price: v.goods_price
      }
    })


    // 创建订单
    let res1 = await xj_requestCreateOrder({
      data: {
        oder_price,
        consignee_addr,
        goods
      },
      header: {
        Authorization: wx.getStorageSync('token')
      }
    })
    console.log('创建订单1', res1)

    let res2 = await xj_request_unifiedorder({
      data: {
        oder_number
      },
      header: {
        Authorization: wx.getStorageSync('token')
      }
    })
    console.log('预支付', res2)

    const {
      pay
    } = res2.data.message

    //支付
   const res3 =  await xj_requestPayMent(pay)

    //查看支付状态

   const res4 = await xj_requestCheckoutOrder({
      data : {
        oder_number
      },
      header: {
        Authorization: wx.getStorageSync('token')
      }
    })
    if(res4.data.meta.status===200){
      await xj_successToast('支付成功')
        //- 1. 支付成功了,把支付的商品从购物车移除出去
        let carts = wx.getStorageSync('cart')
        // 过滤出未选中的
       carts = carts.filter((v)=>!v.checked)
      wx.setStorageSync('cart', carts)
      
        setTimeout(()=>{
            // - 2. 跳转到订单页面
          wx.navigateTo({
            url: '/pages/oder/oder',
          })
        },2000)
      
    }
  },

 








})
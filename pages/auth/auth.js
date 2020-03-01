import { xj_wxlogin, xj_successToast } from '../../utils/asyncWx.js'
import { xj_requestToken } from '../../request/request_pay.js'
// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
// 开始登录
 async getUserInfo(e){
    console.log(e) 
    // 1. 拿到四个参数
    const { encryptedData, rawData, iv, signature } = e.detail

    //2.拿到code 
    let { code }  = await xj_wxlogin()
    console.log('获取到code',code)

    //3.登录获取token

    let res = await xj_requestToken({
      data: { encryptedData, rawData, iv, signature,code }
    })
  console.log(res)
  //  console.log('获取到token', res)

   if(res.data.meta.status === 200){
     // 4.1 保存token到本地
     wx.setStorageSync('token', res)
     // 提示成功
     await xj_successToast('授权成功')

     // 4.2 返回到上一页
     wx.navigateBack({
       delta: 1
     })
   }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
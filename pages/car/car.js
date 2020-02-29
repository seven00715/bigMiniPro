import { xj_chooseAddressByPhone, xj_showToast,xj_getSetting ,xj_openSetting} from '../../utils/asyncWx'


// pages/car/car.js
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
  // 点击获取收货地址
  async clickChooseAddressButton(){
    console.log("点击获取了收货地址")
    //1.获取微信中的权限
      // 1.清除授权设置
      // undefined 没有允许过
      // true 允许
      // false 拒绝
    let res = await xj_getSetting()
    console.log(res)
    console.log('获取授权数据',res.authSetting['scope.address'])
    if (res.authSetting['scope.address']=== false){
      await xj_openSetting()
    }else{
      this.chooseAddress()
    }
  
  },
  async chooseAddress() {
    let addr = await xj_chooseAddressByPhone()
    let addrStr = addr.provinceName + addr.cityName + addr.countyName + addr.detailInfo
    console.log('收货地址', addr);
    this.setData({
      addobj: { ...addr, addrStr }
    })
    let addobj = { ...addr, addrStr }
    wx.setStorageSync('address', addobj);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
   
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    this.loadCartsFromStorage()
    let addobj = wx.getStorageSync('address');
    if (addobj) {
      this.setData({
        addobj,
      })
    }
  },

  loadCartsFromStorage() {
    let carts = wx.getStorageSync('cart') || []
    carts.map((v) => {
      v.checked = false
    })
    console.log('购物车数据', carts);
    this.setData({
      carts
    })
    this.sum()

  },
  onChangeCheck(e) {
    console.log(e);

    console.log(e.detail.value);
    let carts = this.data.carts.map((v) => {

      if (v.goods_id === e.currentTarget.dataset.good.goods_id) {
        v.checked = e.detail.value
      }

      return v
    })
    // console.log(good);

    // console.log(this.data.carts);
    this.setData({
      carts
    })
    this.sum()

  },

  // 减去商品 + 添加商品
  count(e) {
    let carts = this.data.carts.map((v, i) => {
      if (v.goods_id == e.currentTarget.dataset.id) {
        if (e.currentTarget.dataset.type === 'add') {
          v.goods_num++
        } else {
          if (v.goods_num < 1) {
            // xj_showToast('已经是最少了')

            this.deletegood(i)
            v.goods_num = 0
          } else {
            v.goods_num--
          }

        }
      }
      return v
    })
    console.log(carts)

    this.setData({
      carts
    })

    this.sum()
  },
  // 为零时候删除该项
  deletegood(index) {
    let carts = this.data.carts
    wx.showModal({
      title: '提示',
      content: '确定要删除该商品?',
      success:  (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          
          carts.splice(index, 1)
          console.log(carts);
          this.setData({
            carts
          })
          wx.setStorageSync('cart', carts)

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

      

  },
  // 全选
  onChangeAllCheck(e) {
    let carts = this.data.carts.map((v) => {
      v.checked = e.detail.value
      return v
    })
    this.setData({
      carts
    })
    this.sum()
  },
  // 计算总和
  sum() {
    this.data.total_goods = {
      price: 0,
      num: 0
    }
    let { price, num } = this.data.total_goods
    this.data.carts.forEach((v) => {
      if (v.checked) {
        num += v.goods_num
        price += v.goods_num * v.goods_price
      }

    })
    this.setData({
      total_goods: {
        price,
        num,
      }
    })



  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
import { xj_showLoding,xj_hideLoading,xj_successToast} from '../../utils/asyncWx'
import { xj_requestdetaildata } from '../../request/request'

Page({
  data:{
    detail :{}
  },
  onLoad( options ){
   let {goods_id} = options
   console.log(options);
   
   this.loaddetailsData( goods_id )
  },
 async loaddetailsData(goods_id){

  await xj_showLoding()
  let res =   await xj_requestdetaildata(goods_id)
  console.log(res);
  
  this.setData({
    detail : res
  })
  await xj_hideLoading()

  },
 async addCart(){
    // 解构商品获取id
    let {goods_id,goods_name,goods_price,goods_small_logo} = this.data.detail
    // 1.先从本地获取购物车
    let cart = wx.getStorageSync('cart') ||[];
    console.log(cart);
    

    // 2.再尝试从购物车里获取当前商品(判断该商品在不在购物车)

  let goods = cart.find(v => v.goods_id === goods_id)
  console.log(goods);
  
  // 3. 判断 goods 有没有值
  if(!goods){
    // 没有值
    cart.unshift({
      goods_id,
      goods_name,
      goods_price,
      goods_small_logo,
      goods_num : 1
      
    })
   
  }else{
    goods.goods_num++

    console.log(goods.goods_name);
  }

  

  wx.setStorageSync('cart',cart)

  await xj_successToast("加入购物车成功")
  }
})
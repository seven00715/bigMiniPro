import fetch from './fetch'
/**
 * 请求轮播入数据
 */
export const xj_requestgrilData = ()=>{
  return fetch({
    url:'home/swiperdata'
  })
}

/**
 * 请求导航分类
 */
export const xj_requestmenusData = ()=>{
  return fetch({
    url:'home/catitems'
  })
}


/**
 * 请求楼层入数据
 */
export const xj_requestfloorData = ()=>{
  return fetch({
    url:'home/floordata'
  })
}
/**
 * 分类列表数据
 */

 export const xj_requestcategoriesData = () =>{
   return fetch({
     url:'categories'
   })
 }

/**
 * 商品列表数据
 */
export const xj_requestgoodlistdata = (cid,pagenum) =>{
  return fetch ({
    url:'goods/search',
    data:{
      cid,
      pagenum,
      pagesize:10
    }
  })
}

/**
 * 商品详情列表
 * 
 */
export const xj_requestdetaildata = (goods_id) =>{
  return fetch ({
    url:'goods/detail',
    data:{
      goods_id,
    }
  })
}
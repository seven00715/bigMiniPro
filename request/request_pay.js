// 封装 fetch
const BASE_URL = 'https://uinav.com/api/public/v1'
function fetch(options){
  // 1.创建promise实例
  let p = new Promise((resolve,reject)=>{
    wx.request({
      url: BASE_URL + options.url,
      data: options.data || {},
      method: options.methods || 'POST',
      header: options.header || {},
      success: res => {
      resolve(res)  
      },
      fail: err => {
        reject(err)
      }

    })
  })
  return p
}
// export default fetch

/**
 * 登录
 */

export const xj_requestToken = options =>{
  return fetch({
    url:'/users/wxlogin',
    data:options.data
  })
}

/**
 * 创建订单
 */

const xj_requestCreateOrder = options =>{
  return fetch({
    url:"/my/orders/create",
    data:options.data,
    header:options.header
  })
}

/**
 * 预支付接口
 */

export const xj_request_unifiedorder = options => {
  return fetch({
    url: "/my/orders/req_unifiedorder",
    data: options.data,
    header: options.header
  })
}
/**
 * 支付
 */
export const xj_requestPayMent = (pay) => {
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...pay,
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 查看支付状态
 */

export const xj_requestCheckoutOrder = options => {
  return fetch({
    url: "/my/orders/chkOrder",
    data: options.data,
    header: options.header
  })
}
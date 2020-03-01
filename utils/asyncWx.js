

/**
 * 显示加载框
 */
export const xj_showLoding = () =>{
  return new Promise((resolve)=>{
  wx.showLoading({
  title:'loading',
  mask:true,
  success: resolve,
  fall:()=>{},
  complete:()=>{}
})
  })
}


/**
 * 隐藏加载框
 */
export const  xj_hideLoading =() =>{
  return new Promise((resolve)=>{
    wx.hideLoading({
      title:'loading',
      mask:true,
      success: resolve,
      fall:()=>{},
      complete:()=>{}
    })
  })
}

/**
 * 消息提示框
 */

 export const xj_showToast = title =>{
   return new Promise (resolve => {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000,
      success: resolve
    })
   
   })
 }

 /**
  * 消息成功的提示框
  */

  export const xj_successToast = title =>{
    // return new Promise (resolve => {
      wx.showToast({
        title,
        icon: 'none',
        duration: 2000,
        success:resolve
      })
     
    //  })
  }
  /**
   * 获取收货地址
   */

   export const xj_chooseAddressByPhone = title =>{
     return new Promise((resolve,reject)=>{
      wx.chooseAddress({
         success: resolve,
         fail:reject
         
       });
     })
   }

   /**
    * 获取设置权限
    */

    export const xj_getSetting = () =>{
      return new Promise((resolve,reject)=>{
        wx.getSetting({
          success: resolve,
          fail: reject
        })          
      })
    }

    /**
     * 打开设置权限
     */

export const xj_openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 删除确认框
 */

export const xj_showModal = () =>{
  return new Promise ((resolve)=>{
    wx.showModal({
      title: '提示',
      content: '确定删除该商品吗',
      success:resolve
    })
  })
}
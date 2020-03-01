const BASE_URL='http://api-hmugo-web.itheima.net/api/public/v1/'
function fetch(options){
    const p = new Promise((resolve,reject)=>{
      wx.request({
        url:BASE_URL+ options.url,
        data :options.data || {},
        method :options.methods || 'GET',
        header : options.header ||  {},
        success:res=>{
          // console.log(res);
          
          if(res.data.meta.status === 200){
            resolve( res.data.message)
          }
        },
        fail:err =>{
          reject(err)
        }

      })

    })
    return p
}

export default fetch
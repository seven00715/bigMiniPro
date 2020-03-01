## 快速创建小程序项目
- 项目名:shop
- 2.搭建项目结构
 - assets/
 - components/
 - request
 - utils
 - vender

 - 3.创建 : 在vscode 里面的app.json里面 定义四个页面
  - 首页
  - f分页
  - 购物车
  - 我的

 -  `注意`保存一下 ,不成功的话 
  - `在微信开发者 `工具里 保存一下 

- 4.清除没有用的代码
- app.js ===>清除代码 ===>App({})
- logs 页面全部删除
- index.js/wxml 内容删除 => page({})
## 配置window和tabBar
- window
  "navigationBarBackgroundColor": "#ff2d4a",
  "navigationBarTitleText": "商城",
  "navigationBarTextStyle": "white"
- tabBar
```json
  "tabBar": {
    "color":"#999",
    "selectedColor": "#ff2d4a",
    "list": [
      {
      "pagePath": "pages/index/index",
      "text": "首页",
      "iconPath": "",
      "selectedIconPath": ""
    },
    {
      "pagePath": "pages/category/category",
      "text": "分类",
      "iconPath": "",
      "selectedIconPath": ""
    },
     {
       "pagePath": "pages/car/car",
       "text": "购物车",
       "iconPath": "",
       "selectedIconPath": ""
     },
     {
      "pagePath": "pages/user/user",
      "text": "个人中心",
      "iconPath": "",
      "selectedIconPath": ""
    }

    ]
  },
```

  - 配置全局样式
  ```css

  page,view,text,swiper,swiper-item,image,navigator {

    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  image {
    vertical-align: middle;
  }

  ```

  布局首页



  ## 搜索条
  - 微信开发者工具中开发组件
      `search-header`
      2.引入这个组件并使用


- 微信小程序中怎么获取授权
- 首先获取授权能力,返回三种.undefined true 和false
undefined 和 true =>继续授权 =>获取地址
false => 打开客户端设置页面 => 手动开启(true) =>返回再授权 =>获取地址

```js
1.获取授权
let res = await xj_getSetting()

2.判断
 if (res.authSetting['scope.address']=== false){
   // 手动打开授权
      await xj_openSetting()
    }else{
      // 继续获取地址
      this.chooseAddress()
    }

```


### 支付功能
 - 登录=>token
 - 支付功能需要token


 支付逻辑
 点击支付按钮的时候=>判断
 - 判断是否有token
 - 如果有token 继续完成支付功能
 - 如果没有 跳转回登录页面
 2. 在授权登录页面 里面 ` 登录` 获取token
 - 参考=>黑马优购接口 =>用户 =>登录 =>获取token
 - 获取五个参数
 -2.1获取用户信息(包含4个参数)

 -auth

>![image-20200301110403081](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200301110403081.png)

>
>
>![image-20200301110521300](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200301110521300.png)

>
>
>![image-20200301110557182](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200301110557182.png)





 ```html
 
<button type='primary' plain bindgetuserinfo='getUserInfo' open-type='getUserInfo'>获取授权</button>
 ```
```js
 getUserInfo(e){
    console.log(e) 
    // 1. 拿到四个参数
    const { encryptedData, rawData, iv, signature } = e.detail
  },
```

2.2 获取 code

 //2.拿到code (1个参数)



>![image-20200301110215671](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200301110215671.png)

 ```js
    let { code }  = await xj_wxlogin()
    console.log('获取到code',code)
 ```



3. 封装请求- 登录 =>获取token

  3.1 封装了fetch函数=>基准地址改了 uninav

​										=>post

​											=>resolve(res)

 3.2 二次封装了token

```js
export const xj_requestToken =options =>{
  return fetch({
    url:'/users/wxlogin',
    data:options.data
  })
}
```

3.3使用

```js
// 1.4个参数
// 2. 1个参数
    let res = await xj_requestToken({
      data: { encryptedData, rawData, iv, signature,code }
    })
// -------注意这里的后台的appid写死了 (实际中需要把自己小程序的appid该后台)
// 修改appid 退出重进才可以
```



​	自己的:"wxb5984957ca37c3cc",

​	老师的:"wx38d8faffac4d34d2"


# 小问题
- addid不能用
- showToast 和 跳转一起用时,会一闪而过 需要加一个定时器

## 创建订单
1.创建订单


## 支付逻辑总结

### 第一部分 : 登录 - 获取token
- 用到的接口 : 用户 =>获取用户token

参数需要用到五个参数
->前四个获取用户信息得到
->最后一个wx.login 登录得到code
--->发送请求 => 得到token(本地储存)

----------------上面在auth.js里做的

### 第二部分 **支付**
-先去创建订单
  ==>订单 =>创建订单
  -需要参数
    -请求头token
    - 请求参数:总价格,收货地址,goods(goods_id,goods_number,goods_price)
  -返回的结果 订单号 order_number


-然后去预支付
  - 参考接口 : 支付 => 获取参数

     - 参数
       - 请求头 : token
       - 请求体: order_number

     - 返回结果 => pay对象

-第三部开始支付
 - 参考api :微信小程序官网 => api => 开放接口 =>支付
 - wx.requestPayment(pay)
 - 需要的参数pay对象

-第四步 查看支付状态
 - 接口 =>订单
    - 参数 
      - 请求头: token
      - 请求体: order_number
  返回  200 提示成功


--------------------------------
## 支付成功了 -收尾
- 1. 支付成功了,把支付的商品从购物车移除出去
- 2. 跳转到订单页面
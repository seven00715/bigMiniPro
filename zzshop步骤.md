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
 
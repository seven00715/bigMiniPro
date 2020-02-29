import  { xj_requestgrilData ,xj_requestmenusData,xj_requestfloorData} from '../../request/request'

Page({
  data:{
    isHide:true,
    grilData:[],
    menusData:[],
    floorData:[]
  },
  onLoad(){
    this.loadgrilData(),
    this.loadmenusData(),
    this.loadfloorData()
  
  },
  async loadgrilData(){
    let res =  await xj_requestgrilData()
    // console.log(res);
    this.setData({
      grilData:res
    })
    
  },
  async loadmenusData(){
    let res =  await xj_requestmenusData()
    this.setData({
      menusData: res
    })
  },
  async loadfloorData(){
    let res =  await xj_requestfloorData()
    console.log(res);
    this.setData({
      floorData: res
    })
  },
  onPageScroll(e){
    // console.log('滚动了',e);
    if(e.scrollTop >= 20){
      this.setData({
        isHide:false
      })
    }
    
  },
  // 点击回到顶部
  go2top(){
    wx.pageScrollTo({
      scrollTop:0,
      duration:300
    })
  }
})

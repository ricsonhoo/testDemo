const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
const app = getApp();
Page({
  data: {
    indicatorDots: true,//是否显示面板指示点
    autoplay: true,//是否开启自动切换
    interval: 3000,//自动切换时间间隔
    duration: 500,//滑动动画时长
    page: "page1",
    store: {},
    markers: [],
    hasLocation: false  
  },
  onLoad() {
    this.setData({ iconPath: iconPath });

    // 获取店铺列表
    this.getStoreList();
  },
  controltap(e){
    console.log(e)
  },
  markertap(e){
    // console.log(e)
    let markers = this.data.markers, store = {},lng = '',lat = '';
    markers.forEach(o => {
      if(o.id == e.markerId){
        o.callout.bgColor = '#FF513F';
        o.iconPath = this.data.iconPath.iconAddressR;
        store.name = o.title;
        store.address = o.address;
        store.contract = o.contract;
        lng = o.longitude;
        lat = o.latitude;
      }else{
        o.callout.bgColor = '#78b9ac';
        o.iconPath = this.data.iconPath.iconAddress;
      }
    })
    this.setData({ markers: markers, store: store, page: 'page2', lng: lng, lat: lat})
  },
  getStoreList(){
    app.globalMethod.POST({
      url: urlList.storeListUrl,
      data: {},
      success: res => {
        if(res.data.code == "200"){
          let list = res.data.data, markers = [],lng = 0,lat = 0;
          list.forEach( o => {
            let obj = {};
            obj.id = o.id;
            obj.latitude = o.lat;
            obj.longitude = o.lng;
            obj.title = o.name;
            obj.iconPath = this.data.iconPath.iconAddress;
            obj.address = o.address;
            obj.contract = o.contract;
            obj.callout = {
              content: o.name,
              color: '#fff',
              bgColor: '#78b9ac',
              display: 'ALWAYS',
              borderRadius: 3,
              padding: 3
            }
            lng += parseFloat(o.lng);
            lat += parseFloat(o.lat);
            markers.push(obj);
          })
          this.setData({ storeList: res.data.data, markers: markers, lng0: lng / list.length, lat0: lat / list.length });
        }
      }
    })
  },
  getCurrentStore(e){
    let store = e.currentTarget.dataset.store;
    let markers = this.data.markers;
    markers.forEach(o => {
      if (o.id == store.id) {
        o.callout.bgColor = '#FF513F';
        o.iconPath = this.data.iconPath.iconAddressR;
      } else {
        o.callout.bgColor = '#78b9ac';
        o.iconPath = this.data.iconPath.iconAddress;
      }
    })
    this.setData({ store: store, page: 'page2', lng: store.lng, lat: store.lat, markers: markers})
  },
  goBack(){
    this.setData({ store: {}, page: 'page1' })
  },
  openLocation(){
    wx.openLocation({
      longitude: Number(this.data.lng),
      latitude: Number(this.data.lat),
      name: this.data.store.name,
      address: this.data.store.address
    }) 
  }
})
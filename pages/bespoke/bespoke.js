const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
const app = getApp();
Page({
  data: {
    isShow: 0,
    pageNo: 1,
    bookingList: [],
    total: 1000
  },
  onLoad(){
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow(){
    // 获取预约记录
    this.bookingHistory();
  },
  // ------------------------页面方法区-----------------------------------
  // 导航切换
  changeNav(e) {
    // 切换导航，初始化数据数组和页码，总条数，再次加载数据
    this.setData({ isShow: e.currentTarget.dataset.type, bookingList: [], pageNo: 1, total:1000});
    this.bookingHistory();
  },
  unbooking(e){
    let obj = e.currentTarget.dataset.obj;
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.unbookingUrl,
      data: {
        id: userPhoneInfo.id,
        bookingId: obj.id
      },
      success: res => {
        if (res.data.code == "200") {
          // 提示操作成功后刷新页面，更新操作！
          this.wetoast.toast({ title: '退号成功！' ,success: () => {
            this.setData({ isShow: e.currentTarget.dataset.type, bookingList: [], pageNo: 1, total: 1000 });
            this.bookingHistory();
          }});
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  },
  // ------------------------获取服务器数据区------------------------------
  // 获取预约记录
  bookingHistory(){
    if (this.data.pageNo > Math.ceil(this.data.total / 10)){
      this.wetoast.toast({ title: '没有更多数据了！' });
      return;
    }
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.bookingHistoryUrl,
      data: {
        id: userPhoneInfo.id,
        type: this.data.isShow,
        pageSize: 10,
        pageNo: this.data.pageNo
      },
      success: res => {
        console.log(res)
        if (res.data.code == "200") {
          let obj = res.data.data;
          this.setData({
            bookingList: this.data.bookingList.concat(obj.list),
            pageNo: ++this.data.pageNo,
            total: obj.count
          })
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  },
  // 滚动加载
  onReachBottom(){
    this.bookingHistory();
  }
})
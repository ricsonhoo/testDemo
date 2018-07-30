const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
const app = getApp();
Page({
  data: {
    pageNo: 1,
    total: 1000,
    consumerList: []
  },
  onLoad() { 
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow() {
    this.setData({
      pageNo: 1,
      total: 1000,
      consumerInfo: []
    })
    // 获取钱包信息
    this.getConsumerDetails();
  },
  // ------------------------获取服务器数据区------------------------------
  // 获取消费明细
  getConsumerDetails() {
    if (this.data.pageNo > Math.ceil(this.data.total / 15)) {
      this.wetoast.toast({ title: '没有更多数据了！' });
      return;
    }
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.getConsumerDetailsUrl,
      data: {
        id: userPhoneInfo.id,
        pageSize: 15,
        pageNo: this.data.pageNo
      },
      success: res => {
        console.log(res)
        if (res.data.code == "200") {
          let obj = res.data.data;
          this.setData({ 
            consumerInfo: this.data.consumerInfo.concat(obj.list),
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
    // 获取消费明细
    this.getConsumerDetails()
  }
})
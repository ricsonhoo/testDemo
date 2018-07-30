const app = getApp();
const urlList = require("../../utils/config.js");
const iconPath = require("../../utils/iconPath.js");
Page({
  data:{
    pageNo: 1,
    lastPage: false,
    historyList: []
  },
  onLoad() {
    this.setData({ iconPath: iconPath });
    this.getList();
    this.wetoast = new app.WeToast();
  },
  getList(){
    if (this.data.lastPage){return;}
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');
    // console.log(userPhoneInfo.id)
    app.globalMethod.GET({
      url: urlList.consultationListUrl,
      data: {
        id: userPhoneInfo.id,
        pageSize: 10,
        pageNo: this.data.pageNo
      },
      success: res => {
        // console.log(res)
        if (res.data.code == '200') {
          if (res.data.data.lastPage) {
            // console.log("没有更多数据了！");
            // this.setData({ __noMoreData__: { title: '没有更多数据了！', isMore: true } })
            this.wetoast.toast({ title: '没有更多数据了！' });
          }
          this.setData({
            historyList: res.data.data.list,
            pageNo: ++this.data.pageNo,
            lastPage: res.data.data.lastPage
          })
        }
      }
    })
  },
  onReachBottom() {
    this.getList();
  }
})
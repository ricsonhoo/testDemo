const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
const app = getApp();
Page({
  data:{
    isShow: 0,
    diagnosisList: [],
    pageNo: 1,
    total: 1000,
    count: 0
  },
  onLoad() {
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow(){
    this.setData({
      diagnosisList: [],
      pageNo: 1,
      total: 1000
    })
    // 获取就诊记录
    this.getDiagnosisHistory();
  },
  // ------------------------页面方法区-----------------------------------
  changeNav(e){
    this.setData({ 
      isShow: e.currentTarget.dataset.type,
      diagnosisList: [],
      pageNo: 1,
      total: 1000
    })
    // 获取就诊记录
    this.getDiagnosisHistory();
  },
  // ------------------------获取服务器数据区------------------------------
  // 获取就诊记录
  getDiagnosisHistory(){
    if (this.data.pageNo > Math.ceil(this.data.total / 10)) {
      this.wetoast.toast({ title: '没有更多数据了！' });
      return;
    }
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.getDiagnosisHistoryUrl,
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
          let list = this.data.diagnosisList.concat(obj.list);
          if (this.data.isShow == 0){
            this.setData({ count: obj.count})
          }
          this.setData({
            diagnosisList: list,
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
  onReachBottom() {
    this.getDiagnosisHistory();
  }
})
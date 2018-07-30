const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
const app = getApp();
Page({
  data: {
    money: ''
  },
  onLoad() {
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow() {
    
  },
  // ------------------------页面操作函数区------------------------------
  // 获取充值金额
  getInput(e){
    let val = e.detail.value;
    this.setData({money: val});
  },
  // 跳转下一页
  getNext(e){
    if(this.data.money <= 0){
      this.wetoast.toast({ title: '充值金额不正确，请重新填写！' });
      return;
    }
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url + '?money=' + this.data.money,
    })
  }
})
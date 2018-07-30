const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
const app = getApp();
Page({
  onLoad(){
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow(){
    // 获取钱包信息
    this.getWalletInfo();
  },
  // ------------------------获取服务器数据区------------------------------
  // 获取钱包信息
  getWalletInfo() {
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.getWalletInfoUrl,
      data: {
        id: userPhoneInfo.id
      },
      success: res => {
        console.log(res)
        if (res.data.code == "200") {
          let obj = res.data.data;
          this.setData({ walletInfo: obj})
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  }
})
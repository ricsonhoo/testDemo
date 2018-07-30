const iconPath = require("../../utils/iconPath.js");
Page({
  onLoad() {
    this.setData({ iconPath: iconPath });
    setTimeout(() => {
      // wx.reLaunch({ url: '../../pages/index/index' })
      wx.redirectTo({
        url: '../../pages/wallet/wallet',
      })
    },1000);
  }
})
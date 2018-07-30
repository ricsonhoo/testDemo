const iconPath = require("../../utils/iconPath.js");
Page({
  onLoad(){
    this.setData({ iconPath: iconPath})
    setTimeout(res => {
      // wx.navigateTo({url: '../../pages/historyInquisition/historyInquisition'})
      wx.reLaunch({ url: '../../pages/index/index' })
    },1000);
  },
  callPhone(){
    wx.makePhoneCall({ phoneNumber: '028-1111111'})
  }
})
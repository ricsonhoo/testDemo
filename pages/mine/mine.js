const iconPath = require("../../utils/iconPath.js");
const CountTime = require("../../utils/countTime.js");
const urlList = require("../../utils/config.js");
const app = getApp();
Page({
  data: { count: 0},
  onLoad() {
    this.setData({ iconPath: iconPath });
  },
  onShow(){
    this.getUserDetailInfo();
    // 获取就诊记录
    // this.getDiagnosisHistory();
  },
  // 分享朋友
  onShareAppMessage(opts) {
    return {
      title: '观合中医',
      path: '/pages/index/index',
      imageUrl: '../../utils/images/banner.png'
    }
  },
  // 获取个人信息
  getUserDetailInfo() {
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');
    // 从服务器获取个人信息
    app.globalMethod.POST({
      url: urlList.getPersonalInfoUrl,
      data: {
        id: userPhoneInfo.id,
        phone: userPhoneInfo.phone
      },
      success: res => {
        if (res.data.code == '200') {
          let obj = res.data.data;
          console.log(obj)
          this.setData({personalInfo: obj})
        }
      }
    })
  },
  unbindInfo(){
    wx.showToast({
      title: '解绑成功',
      icon: 'success',
      duration: 1000,
      success: () => {
        setTimeout(() => {
          wx.setStorageSync('userPhoneInfo', '');
          wx.navigateTo({
            url: '../../pages/base/base',
          })
        },1000);
      }
    })
  },
  // --------------------------------获取数据-----------------------------------
  // 获取就诊记录
  getDiagnosisHistory() {
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.getDiagnosisHistoryUrl,
      data: {
        id: userPhoneInfo.id,
        type: 0,
        pageSize: 10,
        pageNo: 1
      },
      success: res => {
        // console.log(res)
        if (res.data.code == "200") {
          let obj = res.data.data;
          this.setData({ count: obj.count })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.message
          })
        }
      }
    })
  }
})
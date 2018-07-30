const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
const app = getApp();
Page({
  data: {
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否开启自动切换
    interval: 3000, //自动切换时间间隔
    duration: 500 //滑动动画时长
  },
  onLoad() {
    this.setData({
      iconPath: iconPath
    });
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow() {

  },
  onHide() {
    // 是否注册或是否填写个人信息
    this.isRegister();
  },
  // 分享朋友
  onShareAppMessage(opts) {
    return {
      title: '观合中医',
      path: '/pages/index/index',
      imageUrl: '../../utils/images/banner.png'
    }
  },
  // 跳转导航页面
  goNext(e) {
    // 是否注册或是否填写个人信息
    this.isRegister();

    let url = e.currentTarget.dataset.url;
    if (url) {
      if (url == '../../pages/form/form') {
        // 是否已经预约
        this.getHasBooking(() => {
          if (this.data.isBooking == 1) {
            wx.navigateTo({
              url: url
            })
          } else {
            this.wetoast.toast({
              title: '预约后才能填写问诊表，请预约挂号！'
            });
          }
        });
      } else {
        wx.navigateTo({
          url: url
        })
      }
    } else {
      this.wetoast.toast({
        title: '功能开发中！'
      });
    }
  },
  // 是否注册或是否填写个人信息
  isRegister() {
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    if (!(userPhoneInfo.isRegister && userPhoneInfo.isRegister == 'true')) {
      wx.redirectTo({
        url: '../../pages/base/base'
      })
      return;
    } else {
      if (userPhoneInfo.isComplete === 'false') {
        wx.reLaunch({
          url: '../../pages/addUserInfo/addUserInfo',
        })
        return;
      }
    }
  },
  // 是否预约挂号
  getHasBooking(callback) {
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.hasBookingUrl,
      data: {
        id: userPhoneInfo.id
      },
      success: res => {
        if (res.data.code == "200") {
          this.setData({
            isBooking: res.data.data.isBooking
          });
          callback();
        } else {
          this.wetoast.toast({
            title: res.data.message
          });
        }
      }
    })
  }
})
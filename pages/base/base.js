const app = getApp();
const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
const appid = 'wxb6b7d08fbca740e4';
const secret = '87713e056176ceb0e7a8bf7cf75fbca4';
Page({
  data: { canIUse: wx.canIUse('button.open-type.getUserInfo')},
  onLoad(){
    this.setData({ iconPath: iconPath});
    // 获取code
    this.getCode();
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  // 获取code
  getCode(){
    wx.login({
      success: res => {
        this.setData({code: res.code})
      }
    })
  },
  // 获取手机号码授权函数
  getPhoneNumber(e){
    // 获取用户的session_key、openID以及isRegister（注册情况）
    app.globalMethod.GET({
      url: urlList.getOpenidUrl,
      data: {
        code: this.data.code,
        appid: appid,
        secret: secret
      },
      success: res => {
        if (res.data.code == '200') {
          // 如果用户已经注册，直接跳转登录页面，未注册获取手机号码，去注册
          if (res.data.data.isRegister == 'false') {

            this.requestUserPhone(e, res.data.data);

          } else {
            wx.setStorageSync('userPhoneInfo', res.data.data);
            // 如果用户未添加个人信息，去添加个人信息页面；否则跳转首页
            if (res.data.data.isComplete == 'false') {
              wx.reLaunch({ url: '../../pages/addUserInfo/addUserInfo' });
            } else {
              wx.reLaunch({ url: '../../pages/index/index' });
            }
          }
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  },
  // 获取用户手机号码函数
  requestUserPhone(e,res){
    let openid = res.openid;
    // 获取用户手机号码
    app.globalMethod.GET({
      url: urlList.getPhoneNumberUrl,
      data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        session_key: res.sessionKey
      },
      success: data => {
        wx.showLoading({
          title: '正在登录',
          success: res => {
            if (res.errMsg == "showLoading:ok") {
              if (data.data.code == '200') {
                // 获取手机号码
                let phone = data.data.data;
                if (phone){
                  wx.hideLoading();
                  // this.wetoast.toast({ title: phone.phoneNumber });
                  this.userRegist(openid, phone.phoneNumber);
                }else{
                  wx.hideLoading();
                  // this.wetoast.toast({ title: '未获取到手机号码！'});
                  this.wetoast.toast({ title: '获取手机号码失败,请重新授权！'});
                  return;
                }
              }else{
                wx.hideLoading();
                this.wetoast.toast({ title: res.data.message });
              }
            }
          }
        })
      }
    })
  },
  // 注册函数
  userRegist(openid,phone) {
    // console.log(openid)
    // console.log(phone)
    app.globalMethod.POST({
      url: urlList.registUrl,
      data: {
        openid: openid,
        phone: phone
      },
      success: res => {
        if (res.data.code == '200') {
          wx.hideLoading();
          // 用户信息本地存储
          wx.setStorageSync('userPhoneInfo', res.data.data);
          // 跳转添加个人信息页面
          wx.reLaunch({ url: '../../pages/addUserInfo/addUserInfo' });
        } else {
          wx.hideLoading();
          this.wetoast.toast({ title: res.data.message });
        }
      }
    });
  }
})
const iconPath = require("../../utils/iconPath.js");
const CountTime = require("../../utils/countTime.js");
const urlList = require("../../utils/config.js");
const app = getApp();
Page({
  onLoad(){
    this.setData({ iconPath: iconPath});
    this.time = new CountTime(this);
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  // 获取手机号码
  getPhone(e){
    this.setData({phone: e.detail.value})
  },
  // 获取验证码
  getCodeData() {
    app.globalMethod.POST({
      url: urlList.getModifyPersonalInfoCodeUrl,
      data: { phone: this.data.phone, type: 1 },
      success: res => {
        // console.log(res)
        if (res.data.code == "200") {
          this.wetoast.toast({ title: '验证码发送成功，请注意查收！' });
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  },
  // 调用验证码获取倒计时方法
  getCode(){
    let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (phoneCodeVerification.test(this.data.phone)){
      if (!this.data.flag) {
        this.time.countTime();
        // 获取验证码
        this.getCodeData();
      }else{
        this.wetoast.toast({ title: '请不要急躁，60s后再次获取！' });
      }
    }else{
      this.wetoast.toast({ title: '手机号码格式不正确，请重新输入！'});
    }
  },
  // 提交手机号码和验证码进行注册登录
  formSubmit(e){
    // console.log(e.detail.value)
    let formInfo = e.detail.value;
    let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!phoneCodeVerification.test(formInfo.phone)){
      this.wetoast.toast({ title: '手机号码格式不正确，请重新输入！' });
      return;
    }
    if (formInfo.code == ''){
      this.wetoast.toast({ title: "验证码不能为空，请输入验证码!" });
      return;
    }
    wx.showLoading({
      title: '正在登陆',
      success: () => {
        app.globalMethod.POST({
          url: urlList.phoneLoginUrl,
          data: formInfo,
          success: res => {
            console.log(res)
            wx.hideLoading();
            if (res.data.code == "200") {
              // console.log(res)
              wx.setStorageSync('userPhoneInfo', res.data.data);
              if (res.data.data.isComplete == 'false'){
                wx.reLaunch({
                  url: '../../pages/addUserInfo/addUserInfo',
                })
              }else{
                wx.reLaunch({
                  url: '../../pages/index/index',
                })
              }
            } else {
              this.wetoast.toast({ title: res.data.message });
            }
          }
        })
      }
    })
  }
})
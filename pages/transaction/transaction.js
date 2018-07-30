const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
const app = getApp();
const appid = 'wxb6b7d08fbca740e4';
const secret = '87713e056176ceb0e7a8bf7cf75fbca4';
Page({
  onLoad(opts) {
    this.setData({money: opts.money})
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow() {

  },
  // ------------------------页面操作函数区------------------------------
  // 获取openID
  getOpenId(callback){
    wx.login({
      success: res => {
        this.setData({ code: res.code })
        app.globalMethod.GET({
          url: urlList.getOpenidUrl,
          data: {
            code: this.data.code,
            appid: appid,
            secret: secret
          },
          success: res => {
            if(res.data.code == '200'){
              callback(res.data.data);
            }else{
              this.wetoast.toast({ title: res.data.message });
            }
          }
        })
      }
    })
  },
  // 跳转下一页
  getNext(e) {
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');
    let url = e.currentTarget.dataset.url;
    this.getOpenId((res) => {
      // 获取钱包充值信息
      app.globalMethod.POST({
        url: urlList.getPayinfoUrl,
        data: {
          id: userPhoneInfo.id,
          openId: res.openid,
          money: this.data.money
        },
        success: res => {
          console.log(res)
          if (res.data.code == "200") {
            let obj = res.data.data;
            // 进行微信支付
            wx.requestPayment({
              'timeStamp': obj.timeStamp,
              'nonceStr': obj.nonceStr,
              'package': obj.package,
              'signType': obj.signType,
              'paySign': obj.paySign,
              success: res => {
                this.wetoast.toast({
                  title: '充值成功！', success: () => {
                    wx.navigateTo({
                      url: url,
                    })
                  }
                });
              },
              fail: res => {
                // console.log(res)
                if (res.errMsg == 'requestPayment:fail cancel') { 
                  this.wetoast.toast({ title: '您已取消该次充值！' });
                }else{
                  this.wetoast.toast({ title: res.err_desc });
                }
              }
            })
          } else {
            this.wetoast.toast({ title: res.data.message });
          }
        }
      })
    });
  }
})
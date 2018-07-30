const app = getApp();
const urlList = require("../../utils/config.js");
const list = require("../../utils/list.js");
Page({
  data: {
    id: '',
    detail: null
  },
  onLoad(opts) {
    this.setData({ diagnosisId: opts.id, list: list})
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow(){
    // 获取病历
    this.getDiagnosis();
  },
  // ------------------------页面方法区-----------------------------------
  // ------------------------获取服务器数据区------------------------------
  // 获取病历
  getDiagnosis(){
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.getDiagnosisUrl,
      data: {
        // id: 'e1c5c2a8383f459495879c7ba37bb12c',
        // diagnosisId: '2ed31d33-6a9f-46bb-bf69-2b7130e52da1'
        id: userPhoneInfo.id,
        diagnosisId: this.data.diagnosisId
      },
      success: res => {
        // console.log(res)
        if(res.data.code == '200'){
          this.setData({ diagnosisInfo : res.data.data})
        }else{
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        }
      }
    })
  }
})
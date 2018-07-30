const app = getApp()
const urlList = require("../../utils/config.js");
const list = require("../../utils/list.js");
const iconPath = require("../../utils/iconPath.js");
Page({
  data: {
    layerShow: false,
    isShowPage: 'page1',
    sexBool: 0
  },
  onLoad() {
    this.setData({ list: list, iconPath: iconPath });

    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  changeCheck(e) {
    let list = this.data.list;
    list[e.currentTarget.dataset.list].index = e.detail.value;
    this.setData({ list: list });
  },
  // 提交问诊表
  formSubmit(e) {
    let formInfo = e.detail.value;
    // 判断必选一个方法
    // let obj = this.formVer(formInfo);

    // console.log(formInfo)
    // if (!obj.bool) {
    //   console.log(obj.title);
    //   this.wetoast.toast({ title: obj.title });
    //   return;
    // }

    let formInfo1 = wx.getStorageSync('formInfo1');
    let formInfo2 = wx.getStorageSync('formInfo2');

    for (let key in formInfo1){
      formInfo[key] = formInfo1[key];
    }
    for (let key in formInfo2){
      formInfo[key] = formInfo2[key];
    }
    // console.log(formInfo)
    // 提交表单
    // app.getOpenInfo(res => {
      // 给formInfo对象添加openid属性，同时对属性值是数组的进行字符串拼接
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');
    formInfo.userId = userPhoneInfo.id;
    for (let key in formInfo) {
      let list = this.data.list;
      if (list[key]) {
        if (Object.prototype.toString.call(formInfo[key]) != '[object Array]') {
          formInfo[key] = parseInt(formInfo[key]) - 1;
        }
      }
      if (Object.prototype.toString.call(formInfo[key]) == '[object Array]') {
        formInfo[key] = formInfo[key].join(',');
      }
    }
    // console.log(formInfo.openid)
    // 提交数据
    app.globalMethod.POST({
      url: urlList.consultationSubmitUrl,
      data: formInfo,
      success: res => {
        if (res.data.code == '200') {
          // 提交成功，清除本地存储
          wx.setStorageSync('formInfo1','');
          wx.setStorageSync('formInfo2','');

          wx.navigateTo({
            url: '../../pages/success/success'
          })
        } else {
          this.wetoast.toast({ title: res.data.message})
          console.log(res.data.message);
        }
      }
    })
    // })
  },
  formVer(formInfo) {
    // 外感风寒
    if (formInfo.wgfh.length == 0) {
      return {
        title: "请至少选择一项【外感风寒】的情况!",
        page: 'page2',
        bool: false
      };
    }
    // 里实热
    if (formInfo.lsr.length == 0) {
      return {
        title: "请至少选择一项【里实热】的情况!",
        page: 'page2',
        bool: false
      };
    }
    // 冷热无常
    if (formInfo.lrwc.length == 0) {
      return {
        title: "请至少选择一项【冷热无常】的情况!",
        page: 'page2',
        bool: false
      };
    }
    // 里虚胃寒
    if (formInfo.lxwh.length == 0) {
      return {
        title: "请至少选择一项【里虚胃寒】的情况!",
        page: 'page2',
        bool: false
      };
    }
    // 阳虚体寒
    if (formInfo.yxth.length == 0) {
      return {
        title: "请至少选择一项【阳虚体寒】的情况!",
        page: 'page2',
        bool: false
      };
    }
    // 上热下寒
    if (formInfo.srxh.length == 0) {
      return {
        title: "请至少选择一项【上热下寒】的情况!",
        page: 'page2',
        bool: false
      };
    } 
    return {
      title: "",
      page: 'page2',
      bool: true
    };
  }
})
const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
const app = getApp();
Page({
  onLoad() {
    this.setData({ iconPath: iconPath });
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow(){
    // 获取病种分类
    this.getAssortment();
  },
  // ------------------------页面方法区-----------------------------------
  // 跳转预约页面
  goToRegister(e) {
    let obj = e.currentTarget.dataset.obj;
    wx.navigateTo({
      url: '../../pages/register/register?id=' + obj.id,
    })
  },
  // ------------------------获取服务器数据区------------------------------
  // 获取病种分类
  getAssortment(){
    app.globalMethod.POST({
      url: urlList.diseaseClassUrl,
      data:{},
      success: res => {
        console.log(res)
        if(res.data.code == '200'){
          this.setData({ diseaseClassList: res.data.data.list})
        }else{
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })  
  },
  
})
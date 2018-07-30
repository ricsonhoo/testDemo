const iconPath = require("../../utils/iconPath.js");
const CountTime = require("../../utils/countTime.js");
const urlList = require("../../utils/config.js");
let period = requirePlugin("GetPeriod");
const app = getApp();
Page({
  data: {
    content: '',
    attitudeStar: 5,
    diagnosisStar: 5,
    isStar1: 0,
    star0: iconPath.iconStar0,
    star1: iconPath.iconStar1
  },
  onLoad(opts) {
    this.setData({ iconPath: iconPath, diagnosisId: opts.id });
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  // ------------------------页面方法区-----------------------------------
  // 评分
  getStar(e){
    let type = e.currentTarget.dataset.type;
    if(type == 0){
      let star = e.currentTarget.dataset.star;
      this.setData({ attitudeStar: star})
    }else if(type == 1){
      let star = e.currentTarget.dataset.star;
      this.setData({ diagnosisStar: star })
    } else if (type == 2){
      let star = e.detail.value;
      this.setData({ content: star })
    }else{
      return;
    }
  },
  // 提交评价
  submitComment(){
    if (this.data.content.length <= 0) {
      this.wetoast.toast({ title: '评价不能为空！' });
      return;
    }
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.addCommentUrl,
      data: {
        id: userPhoneInfo.id,
        diagnosisId: this.data.diagnosisId,
        content: this.data.content,
        attitudeStar: this.data.attitudeStar,
        diagnosisStar: this.data.diagnosisStar
      },
      success: res => {
        console.log(res)
        if (res.data.code == '200') {
          wx.showToast({
            icon: 'success',
            duration: 1500,
            title: '评价成功！',
            success: () => {
              wx.redirectTo({
                url: '../../pages/visit/visit',
              })
            }
          })
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  }
})
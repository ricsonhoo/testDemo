const iconPath = require("../../utils/iconPath.js");
const CountTime = require("../../utils/countTime.js");
const urlList = require("../../utils/config.js");
let period = requirePlugin("GetPeriod");
const app = getApp();
Page({
  data: {
    personalInfo: {},
    sexIndex: 0,
    phone: '',
    list: ['请选择您的性别', '女', '男']
  },
  onLoad() {
    let now = period.getNowDate();
    this.setData({ iconPath: iconPath, endTime: now });
    this.time = new CountTime(this);
    // 获取信息
    // this.getUserDetailInfo();
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  // 获取头像
  getPhoto(e) {
    let _this = this;
    let type0 = e.currentTarget.dataset.type;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type0],
      success: res => {
        let obj = _this.data.personalInfo;
        // 上传用户头像
        wx.uploadFile({
          url: urlList.uploadFileUrl,
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: res => {
            let data = JSON.parse(res.data);
            if (data.code == '200') {
              obj.photo = data.data.filePath;
              this.setData({ personalInfo: obj });
            }
          }
        })
      }
    })
  },
  getUserDetailInfo() {
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.getPersonalInfoUrl,
      data: {
        id: userPhoneInfo.id,
        phone: userPhoneInfo.phone
      },
      success: res => {
        if (res.data.code == '200') {
          let birthday = res.data.data.birthday;
          let time = new Date(parseInt(birthday) * 1000);
          let year = time.getFullYear();
          let month = time.getMonth() + 1;
          let date = time.getDate();

          this.setData({
            personalInfo: res.data.data,
            sexIndex: res.data.data.gender + 1,
            phone: res.data.data.phone,
            birthday: year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)
          })
        }
      }
    })
  },
  changeList(e) {
    // console.log(e)
    this.setData({ sexIndex: e.detail.value })
  },
  getCode() {
    let phone = this.data.phone;
    let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (phoneCodeVerification.test(phone)) {
      if (!this.data.flag) {
        this.time.countTime();
        // 获取验证码
        this.getCodeData();
      } else {
        this.wetoast.toast({ title: '请不要急躁，60s后再次获取！' });
      }
    } else {
      this.wetoast.toast({ title: '请填写正确的手机格式！' });
    }
  },
  getCodeData() {
    app.globalMethod.POST({
      url: urlList.getModifyPersonalInfoCodeUrl,
      data: { phone: this.data.phone, type: 0 },
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
  getPhone(e) {
    this.setData({ phone: e.detail.value })
  },
  // 获取出生日期
  changeBirthday(e) {
    // console.log(e.detail.value)
    this.setData({ birthday: e.detail.value });
  },
  formSubmit(e) {
    // console.log(e.detail.value)
    let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');
    let newUserInfo = e.detail.value;
    // 姓名验证
    if (newUserInfo.name == '') {
      this.wetoast.toast({ title: "用户姓名为空,无法修改个人信息!" });
      return;
    }
    // 性别验证
    if (!(newUserInfo.gender > 0 && newUserInfo.gender < 3)) {
      this.wetoast.toast({ title: "请选择您的性别!" });
      return;
    }
    // 生日判断
    
    if (!(newUserInfo.birthday)) {
      this.wetoast.toast({ title: "出生日期没选择，请选择出生日期!" });
      return;
    }

    newUserInfo.birthday = new Date(newUserInfo.birthday).getTime() / 1000;
    newUserInfo.id = userPhoneInfo.id;
    newUserInfo.gender = newUserInfo.gender - 1;
    app.globalMethod.POST({
      url: urlList.modifyPersonalInfoUrl,
      data: newUserInfo,
      success: res => {
        // console.log(res)
        if (res.data.code == "200") {
          wx.showToast({
            title: '修改成功！',
            icon: 'success',
            duration: 1000,
            success: () => {

              let userPhoneInfo = wx.getStorageSync('userPhoneInfo');
              userPhoneInfo.isComplete = 'true';
              wx.setStorageSync('userPhoneInfo', userPhoneInfo);

              setTimeout(() => {
                wx.reLaunch({
                  url: '../../pages/index/index',
                })
              }, 1000);
            }
          })
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  }
})
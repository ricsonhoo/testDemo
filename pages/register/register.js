const iconPath = require("../../utils/iconPath.js");
const urlList = require("../../utils/config.js");
// let period = requirePlugin("GetPeriod");
const app = getApp();
Page({
  data: {
    isLayer: false,
    isShow: '',
    clinic: 0
  },
  onLoad(opts){
	// let now = period.getNowDate();
	let now = '';
    this.setData({ iconPath: iconPath, diseaseId: opts.id, date: now, startTime: now});
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow(){
    // 获取诊所列表
    this.getClinicList();
  },
  // ------------------------页面方法区-----------------------------------
  // 关闭预约成功弹窗
  closeLayer(){
    this.setData({ isLayer: false});
    // 刷新列表
    this.getDoctorList();
  },
  // 导航切换
  changeNav(e) {
    this.setData({ isShow: e.currentTarget.dataset.type })
  },
  // 获取诊所
  getClinic(e){
    let clinic = e.detail.value;
    this.setData({ clinic: clinic})
  },
  // 获取日期
  getDate(e){
    let date = e.detail.value;
    this.setData({ date: date })
  },
  // 获取医师列表
  getDoctorList() {
    app.globalMethod.POST({
      url: urlList.doctorListUrl,
      data: {
        diseaseId: this.data.diseaseId,
        clinicId: this.data.clinicList[this.data.clinic].id,
        date: parseInt(new Date(this.data.date.replace(/-/g, '/')) / 1000)
      },
      success: res => {
        console.log(res)
        if (res.data.code == '200') {
          let list = res.data.data;

          if (list.amList.length == 0 && list.pmList.length == 0) {
            this.wetoast.toast({ title: '该日期没有医师上班！' });
          } else if (list.amList.length == 0) {
            this.wetoast.toast({ title: '该日期上午没有医师上班！' });
          } else if (list.pmList.length == 0) {
            this.wetoast.toast({ title: '该日期下午没有医师上班！' });
          }

          this.setData({ amList: list.amList, pmList: list.pmList })
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  },
  // 预约挂号
  booking(e){
    let obj = e.currentTarget.dataset.obj;
    let during = e.currentTarget.dataset.during;
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.bookingUrl,
      data: {
        id: userPhoneInfo.id,
        diseaseId: this.data.diseaseId,
        clinicId: this.data.clinicList[this.data.clinic].id,
        date: parseInt(new Date(this.data.date.replace(/-/g, '/')) / 1000),
        during: during,
        doctorId: obj.id
      },
      success: res => {
        console.log(res)
        if (res.data.code == '200') {
          let bookingInfo = res.data.data;
          this.setData({ bookingInfo: bookingInfo, isLayer: true })
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  },
  // ------------------------获取服务器数据区------------------------------
  // 获取诊所列表
  getClinicList(){
    app.globalMethod.POST({
      url: urlList.clinicListUrl,
      data:{},
      success: res => {
        console.log(res)
        if (res.data.code == '200') {
          let list = res.data.data.list;
          this.setData({ clinicList: list})
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    })
  },
  
})
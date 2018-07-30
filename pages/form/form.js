const app = getApp()
const urlList = require("../../utils/config.js");
const list = require("../../utils/list.js");
const iconPath = require("../../utils/iconPath.js");
Page({
  data:{
    formInfo1: {},
    layerShow: false,
    isShowPage: 'page1',
    sexBool: 0
  },
  onLoad(){
    this.setData({list: list, iconPath: iconPath});
    let formInfo1 = wx.getStorageSync('formInfo1');
    this.getUserDetailInfo();

    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  // 获取是否生育
  radioChange(e){
    let formInfo1 = this.data.formInfo1;
    let typeList = e.currentTarget.dataset.list;
    formInfo1[typeList] = e.detail.value;
    console.log(typeList)
    this.setData({ formInfo1: formInfo1});
    wx.setStorageSync('formInfo1', formInfo1);
  },
  // 获取 input 的值和属性，添加到 list 对象中
  getInput(e){
    let listType = e.currentTarget.dataset.list;
    let formInfo1 = this.data.formInfo1;
    formInfo1[listType] = e.detail.value;
    this.setData({ formInfo1: formInfo1});
    wx.setStorageSync('formInfo1', formInfo1);
  },
  // 获取用户私有信息接口
  getUserDetailInfo() {
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');
    
    // console.log(userPhoneInfo)
    app.globalMethod.POST({
      url: urlList.getPersonalInfoUrl,
      data:{
        id: userPhoneInfo.id,
        phone: userPhoneInfo.phone
      },
      success: res => {
        if(res.data.code == '200'){
          let formInfo1 = wx.getStorageSync('formInfo1');
          let sexBool = 0;
          let obj = res.data.data;

          if (!formInfo1) { formInfo1 = {}}
          
          for (let key in obj){
            formInfo1[key] = obj[key];
          }
          formInfo1.sex = obj.gender;
          this.setData({ 
            formInfo1: formInfo1,
            sexBool: obj.gender
          });
        }
      }
    })
  },
  // 单选获取性别值
  changeSex(e){
    // console.log(e.detail.value)
    this.setData({ sexBool: e.detail.value})
  },
  // picker 选择器改变 list 对象的值
  changeList(e) {
    let list = this.data.list;

    list[e.currentTarget.dataset.list].index = e.detail.value;
    if (e.currentTarget.dataset.list == 'sex') { 
      this.setData({ 
        sexBool: e.detail.value
      }) 
    }
    this.setData({ list: list});
  },
  // 提交表单，单纯的保存在本地，最后提交
  formSubmit(e) {
    let formInfo = e.detail.value;
    let obj = this.formVerification(formInfo);
    
    // console.log(formInfo)
    // 判断数据是否符合规则
    if (!obj.bool) {
      console.log(obj.title)
      this.wetoast.toast({ title: obj.title });
      return;
    }
    
    // 表单一验证通过，去表单二
    wx.setStorageSync('formInfo1', formInfo);

    wx.navigateTo({
      url: '../../pages/formtwo/formtwo'
    })
  },
  // 验证表单函数
  formVerification(formInfo){
    // 手机号码验证正则表达式
    let phoneCodeVerification = /^[1][3,4,5,7,8][0-9]{9}$/;
    // 基本情况
    // console.log(formInfo.sex)
    if (formInfo.name == ''){
      return {
        title: "请输入【姓名】!",
        page: 'page1',
        bool: false
      }
    } else if (formInfo.age == ''){
      return {
        title: "请输入【年龄】!",
        page: 'page1',
        bool: false
      };
    } else if (formInfo.procreated == '' && this.data.sexBool == 0){
      return {
        title: "请选择【生育标识】!",
        page: 'page1',
        bool: false
      };
    } else if (!phoneCodeVerification.test(formInfo.phone)){
      return {
        title: "请输入正确的【手机号码】!",
        page: 'page1',
        bool: false
      };
    } else if (formInfo.diseaseDesc == ''){
      return {
        title: "请输入【主诉病情】!",
        page: 'page1',
        bool: false
      };
    }
    // 体质
    if (!(parseInt(formInfo.height) < 250)) {
      return {
        title: "输入【身高】格式不正确!",
        page: 'page1',
        bool: false
      };
    } else if (!(parseInt(formInfo.weight) < 1000)) {
      return {
        title: "输入【体重】格式不正确!",
        page: 'page1',
        bool: false
      };
    } else if (formInfo.muscle == '') {
      return {
        title: "请选择【体质】-身体肌肉!",
        page: 'page1',
        bool: false
      };
    } else if (formInfo.abdomenMuscle == '') {
      return {
        title: "请选择【体质】-腹部肌肉!",
        page: 'page1',
        bool: false
      };
    }
    return {
      title: "",
      page: 'page1',
      bool: true
    };
  },
  goToHistory(){
    wx.navigateTo({ url: '../../pages/historyInquisition/historyInquisition' })
  }
})

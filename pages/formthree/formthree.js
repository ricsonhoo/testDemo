const urlList = require("../../utils/config.js");
const app = getApp();

Page({
  data: { 
    objList1: {}
  },
  onLoad() {
    let objList1 = wx.getStorageSync('objList1');
    if (objList1) { this.setData({ objList1: objList1 })}
    
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow() {
    this.getDiagnosisQuestion();
  },
  // 获取文本信息
  getText(e){
    let typeList = e.currentTarget.dataset.list;
    let val = e.detail.value;
    let obj = this.data.objList1;
    obj[typeList] = val;

    this.setData({ objList1: obj });
    wx.setStorageSync('objList1', obj);
  },
  // get question list
  getDiagnosisQuestion() {
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.getDiagnosisQuestionUrl,
      data: {
        id: userPhoneInfo.id,
        type: 1
      },
      success: res => {
        console.log(res)
        if (res.data.code === '200') {
          let list = res.data.data.list;
          console.log(list)
          list.forEach(o => {
            let arr = o.subItemList;
            o.curId = o.id + '@';
            arr.forEach(cur => {
              let curArr = cur.subItemList;
              cur.curId = cur.id + '@';
            })
          })
          this.setData({ formList: list });
        } else {
          this.wetoast.toast({ title: res.data.message });
        }
      }
    });
  },
  // checkbox
  changeCheckbox(e) {
    // console.log(e)
    let arr = e.detail.value;
    let type1 = e.currentTarget.dataset.type;
    let obj = this.data.objList1;
    obj[type1] = {};
    arr.forEach(o => {
      obj[type1][o] = o;
    })
    wx.setStorageSync('objList1', obj);
    this.setData({ objList1: obj });
  },
  // radio
  changeRadio(e) {
    // console.log(e)
    let arr = e.detail.value;
    let type = e.currentTarget.dataset.type;
    let obj = this.data.objList1;
    obj[type] = arr;
    wx.setStorageSync('objList1', obj);
    this.setData({ objList1: obj });
  },
  // submit form
  formSubmit(e) {
    let checkedObj = e.detail.value;
    let formInfo1 = wx.getStorageSync('formInfo1');
    let objList = wx.getStorageSync('objList');
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');
    // console.log(checkedObj)
    // console.log(formInfo1)
    // console.log(objList)

    let arr = [];
    /*
    ** questionId: 问题id
    ** id: 答案id
    ** remarks: 备注字段
    ** 备注: 如果 id 的值存在 @ 符号，则代表该问题为一级分类的备注，此时 id 只是作为一级分类的标识，不能作为答案。
    */ 
    // 初步问诊数据格式化
    for (let key in objList){
      if (key.indexOf('@') === -1){
        arr.push({
          "questionId": key,
          "id": objList[key],
          "remarks": objList[key + '@']
        })
      }else{
        if (!objList[key.substring(0, key.length - 1)]){
          arr.push({
            "questionId": key.substring(0, key.length - 1),
            "id": key,
            "remarks": objList[key]
          })
        }
      }
    }
    
    // 精确问诊数据格式化
    for (let key in checkedObj){
      if (key.indexOf('@') === -1){
        if (Array.isArray(checkedObj[key])) {
          let curStr = '';
          curStr = checkedObj[key].join(',');
          arr.push({
            "questionId": key,
            "id": curStr,
            "remarks": checkedObj[key + '@']
          })
        }else{
          arr.push({
            "questionId": key,
            "id": checkedObj[key],
            "remarks": checkedObj[key + '@']
          })
        }
      }
    }
    // 重构提交数据
    formInfo1.id = userPhoneInfo.id;
    formInfo1.answer = JSON.stringify(arr);
    app.globalMethod.POST({
      url: urlList.submitDiagnosisUrl,
      data: formInfo1,
      success: res => {
        console.log(res)
        if (res.data.code == '200'){
          // wx.setStorageSync('formInfo1','');
          // wx.setStorageSync('objList','');
          // wx.setStorageSync('objList1','');
          
          wx.navigateTo({
            url: '../../pages/success/success'
          })
        } else {
          this.wetoast.toast({ title: res.data.message })
          console.log(res.data.message);
        }
      }
    });
  }
})
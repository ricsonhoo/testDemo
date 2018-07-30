const urlList = require("../../utils/config.js");
const app = getApp();

Page({
  data: {
    objList: {}
  },
  onLoad(){
    let objList = wx.getStorageSync('objList');
    if (objList){
      this.setData({ objList: objList })
    }else{
      this.setData({ objList: {} })
    }
    
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  onShow(){
    this.getDiagnosisQuestion();
  },
  // 获取radio信息
  radioChange(e){
    let typeList = e.currentTarget.dataset.list;
    let val = e.detail.value;
    let obj = this.data.objList;
    let curObj = e.currentTarget.dataset.obj;
    let formList = this.data.formList;

    if (!obj) { obj = {}}

    obj[typeList] = val;

    // 判断当前问题是否是enableBy的关联问题
    if (curObj.enableById && curObj.enableById === typeList){
      let curList = formList.filter(o => {
        return o.id == curObj.id;
      })

      curList[0].subItemList.forEach(o => {
        if (o.enableBy) {
          if (o.enableBy === val) {
            curList[0].disabled = false;
          } else {
            curList[0].disabled = true;
            obj[o.id] = '';
          }
        }
      })
    }
    
    this.setData({ objList: obj, formList: formList });
    wx.setStorageSync('objList', obj);
  },
  // 获取文本框信息
  getText(e){
    let typeList = e.currentTarget.dataset.list;
    let val = e.detail.value;
    let obj = this.data.objList;
    obj[typeList] = val;

    
    this.setData({ objList: obj});
    wx.setStorageSync('objList', obj);
  },
  // get question list
  getDiagnosisQuestion(){
    let userPhoneInfo = wx.getStorageSync('userPhoneInfo');

    app.globalMethod.POST({
      url: urlList.getDiagnosisQuestionUrl,
      data: {
        id: userPhoneInfo.id,
        type: 0
      },
      success: res => {
        if(res.data.code === '200'){
          let list = res.data.data.list;
          let objList = wx.getStorageSync('objList');
          list.forEach(o => {
            let arr = o.subItemList;
            o.curId = o.id + '@';
            arr.forEach(cur => {
              cur.curId = cur.id + '@';
              if (cur.enableBy){
                // 查找enableBy的问题id，并在大类记载
                for (let i = 0; i < arr.length ; i++){
                  let arrList = arr[i].subItemList;
                  for (let j = 0; j < arrList.length ; j++){
                    if(arrList[j].id === cur.enableBy){
                      o.enableById = arr[i].id;
                      break;
                    }
                  }
                }
                // 恢复历史数据
                if (objList){
                  for (let key in objList){
                    if (objList[key] === cur.enableBy){
                      o.disabled = false;
                      break;
                    }else{
                      o.disabled = true;
                    }
                  }
                }else{
                  o.disabled = false;
                }
              }
            })
          })
          this.setData({ formList: list, objList: objList});
        }else{
          this.wetoast.toast({ title: res.data.message});
        }
      }
    });
  },
  // submit form
  formSubmit(e){
    let checkedObj = e.detail.value;
    console.log(checkedObj)
    wx.setStorageSync('objList', checkedObj);
    wx.navigateTo({
      url: '../../pages/formthree/formthree'
    })
  }
})
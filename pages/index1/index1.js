const app = getApp()
const urlList = require("../../utils/config.js");
const list = require("../../utils/list.js");
const iconPath = require("../../utils/iconPath.js");
Page({
  data: {
    sexBool: 0
  },
  onLoad() {
    let formInfo1 = wx.getStorageSync('formInfo1');
    let formInfo2 = wx.getStorageSync('formInfo2');

    this.setData({ list: list, iconPath: iconPath, sexBool: formInfo1.sex, ageBool: formInfo1.age});

    if (formInfo2){
      let list = this.data.list;

      for (let key in formInfo2){
        if (key == 'mgSeriousDisease'){
          list[key] = formInfo2[key];
        }else{
          list[key].index = formInfo2[key];
        }
      }

      this.setData({ list: list})
    }
    // 构建WeToast
    this.wetoast = new app.WeToast();
  },
  // 获取 input 的值和属性，添加到 list 对象中
  getInput(e) {
    let listType = e.currentTarget.dataset.list;
    let list = this.data.list;
    list[listType] = e.detail.value;
    this.setData({ list: list });
  },
  changeList(e) {
    let list = this.data.list;
    list[e.currentTarget.dataset.list].index = e.detail.value;
    this.setData({ list: list });
  },
  formSubmit(e){
    let formInfo = e.detail.value;
    let obj = this.formVer(formInfo);

    // console.log(formInfo)
    if(!obj.bool){
      console.log(obj.title);
      this.wetoast.toast({ title: obj.title });
      return ;
    }

    // 表单一验证通过，去表单二
    wx.setStorageSync('formInfo2', formInfo);
    wx.navigateTo({
      url: '../../pages/index2/index2'
    })
  },
  formVer(formInfo){
    // 初步问诊-寒热
    if (formInfo.cfGeneral1 == 0) {
      return {
        title: "请选择【寒热】问题一!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.cfGeneral2 == 0) {
      return {
        title: "请选择【寒热】问题二!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.cfGeneral3 == 0) {
      return {
        title: "请选择【寒热】问题三!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.cfGeneral4 == 0) {
      return {
        title: "请选择【寒热】问题四!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.cfGeneral5 == 0) {
      return {
        title: "请选择【寒热】问题五!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.cfGeneral6 == 0) {
      return {
        title: "请选择【寒热】问题六!",
        page: 'page2',
        bool: false
      };
    }
    // 汗
    if (formInfo.sweatCold == 0) {
      return {
        title: "请选择【汗-感冒发烧时汗】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.sweatOridinary == 0) {
      return {
        title: "请选择【汗-平时】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.sweatCount == 0) {
      return {
        title: "请选择【汗-出汗时】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.sweatSleep == 0) {
      return {
        title: "请选择【汗-夜间】!",
        page: 'page2',
        bool: false
      };
    }
    // 头身
    if (formInfo.headAche == 0) {
      return {
        title: "请选择【头身】-头疼!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.acheGeneral3 == 0) {
      return {
        title: "请选择【头身】-手脚关节!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.acheGeneral4 == 0) {
      return {
        title: "请选择【头身】-身体骨节!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.acheGeneral5 == 0) {
      return {
        title: "请选择【头身】-身体其他部位!",
        page: 'page2',
        bool: false
      };
    }
    // 小便
    if (formInfo.peeRate == 0) {
      return {
        title: "请选择【小便-问题一】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.pee == 0) {
      return {
        title: "请选择【小便-问题二】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.peeColor == 0) {
      return {
        title: "请选择【小便-问题三】!",
        page: 'page2',
        bool: false
      };
    }
    // 大便
    if (formInfo.defecateGeneral == 0) {
      return {
        title: "请选择【大便-便秘】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.defecateDetail == 0) {
      return {
        title: "请选择【大便-常拉肚子】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.defecateColor == 0) {
      return {
        title: "请选择【大便-大便颜色】!",
        page: 'page2',
        bool: false
      };
    }
    // 饮食
    if (formInfo.appetite == 0) {
      return {
        title: "请选择【饮食】!",
        page: 'page2',
        bool: false
      };
    }
    // 胸腹（包括胀痛、痞痛）（腹诊）
    if (formInfo.acheChest == 0) {
      return {
        title: "请选择【腹诊-胸口】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.acheGeneral1 == 0) {
      return {
        title: "请选择【腹诊-两胁、腹部、小腹部】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.acheGeneral2 == 0) {
      return {
        title: "请选择【腹诊-胸口、两胁、腹部、小腹】!",
        page: 'page2',
        bool: false
      };
    }
    // 耳聋
    if (formInfo.eyeWell == 0) {
      return {
        title: "请选择【听力】!",
        page: 'page2',
        bool: false
      };
    }
    // 口渴
    if (formInfo.thirsty == 0) {
      return {
        title: "请选择【渴】情况!",
        page: 'page2',
        bool: false
      };
    }
    // 睡眠
    if (formInfo.sleep == 0) {
      return {
        title: "请选择【睡眠】情况!",
        page: 'page2',
        bool: false
      };
    }
    // 痰
    if (formInfo.phlegm == 0) {
      return {
        title: "请选择【痰-问题一】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.phlegmCount == 0) {
      return {
        title: "请选择【痰-问题二】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.phlegmDetail == 0) {
      return {
        title: "请选择【痰-问题三】!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.phlegmColor == 0) {
      return {
        title: "请选择【痰-问题四】!",
        page: 'page2',
        bool: false
      };
    }
    // 舌头
    if (formInfo.tongueColor == 0) {
      return {
        title: "请选择【舌诊-舌头】情况!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.lipColor == 0) {
      return {
        title: "请选择【舌诊-嘴唇】情况!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.tongueSides == 0) {
      return {
        title: "请选择【舌诊-舌头两侧】情况!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.tonguePly == 0) {
      return {
        title: "请选择【舌诊-舌苔】情况!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.furColor == 0) {
      return {
        title: "请选择【舌诊-舌苔颜色】情况!",
        page: 'page2',
        bool: false
      };
    }
    // 女性病
    if (this.data.sexBool == 1) {
      // 月经
      if (formInfo.menstruationCount == 0) {
        return {
          title: "请选择【女性病-月经-月经量】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.menstruationCycle == 0) {
        return {
          title: "请选择【女性病-月经-月经周期】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.menstruationColor == 0) {
        return {
          title: "请选择【女性病-月经-月经颜色】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.menstruationAche == 0) {
        return {
          title: "请选择【女性病-月经-痛经】情况!",
          page: 'page2',
          bool: false
        };
      }
      // 白带
      if (formInfo.leucorrheaColor == 0) {
        return {
          title: "请选择【女性病-白带-白带颜色】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.leucorrheaCount == 0) {
        return {
          title: "请选择【女性病-白带-白带颜色】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.leucorrheaDetail == 0) {
        return {
          title: "请选择【女性病-白带-白带质地】情况!",
          page: 'page2',
          bool: false
        };
      }
      // 子宫及附件
      if (formInfo.wombGeneral1 == 0) {
        return {
          title: "请选择【女性病-子宫及附件-宫寒】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.wombGeneral2 == 0) {
        return {
          title: "请选择【女性病-子宫及附件-子宫积水】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.wombGeneral3 == 0) {
        return {
          title: "请选择【女性病-子宫及附件-子宫附件炎】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.wombGeneral4 == 0) {
        return {
          title: "请选择【女性病-子宫及附件-宫颈炎】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.wombGeneral5 == 0) {
        return {
          title: "请选择【女性病-子宫及附件-宫颈糜烂】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.wombGeneral6 == 0) {
        return {
          title: "请选择【女性病-子宫及附件-不孕不育】情况!",
          page: 'page2',
          bool: false
        };
      }
    }
    // 儿童病
    if (this.data.ageBool < 14){
      if (formInfo.pestisVariolosa == 0) {
        return {
          title: "请选择【儿童病-天花】情况!",
          page: 'page2',
          bool: false
        };
      } else if (formInfo.measles == 0) {
        return {
          title: "请选择【儿童病-麻疹】情况!",
          page: 'page2',
          bool: false
        };
      }
    }
    // 过往病史
    if (formInfo.mhGeneral1 == 0) {
      return {
        title: "请选择【病史病谱-高血压】情况!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.mhGeneral2 == 0) {
      return {
        title: "请选择【病史病谱-高血脂】情况!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.mhGeneral3 == 0) {
      return {
        title: "请选择【病史病谱-高血糖】情况!",
        page: 'page2',
        bool: false
      };
    } else if (formInfo.mhGeneral4 == 0) {
      return {
        title: "请选择【病史病谱-高血尿酸】情况!",
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
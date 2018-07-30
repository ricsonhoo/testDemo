const list = {
  sex: { 
    index: 0, 
    attr: 'sex',
    problem: '',
    array: ['请选择您的性别', '女', '男'] 
  },
  birthFlag : {
    index: 0, 
    attr: 'birthFlag',
    problem: '',
    array: ['请选择是否生育', '未生育','生育']
  },
  // 肌肉
  bodyMuscle : {
    index: 0, 
    attr: 'bodyMuscle',
    problem: '',
    array: ['请选择身体肌肉状况', '紧实','正常','松软']
  },
  abdomenMuscle : {
    index: 0, 
    attr: 'abdomenMuscle',
    problem: '',
    array: ['请选择腹部肌肉状况', '紧实', '正常', '松软']
  },
  // 饮食
  appetite : {
    index: 0, 
    attr: 'appetite',
    problem: '食欲情况',
    array: ['请选择食欲情况', '无食欲', '有食欲']
  },
  // 口渴
  thirsty : {
    index: 0, 
    attr: 'thirsty',
    problem: '是否口渴',
    array: ['请选择是否口渴', '不口渴', '口渴']
  },
  // 小便
  peeRate : {
    index: 0, 
    attr: 'peeRate',
    problem: '是否尿频',
    array: ['请选择是否尿频', '不尿频', '尿频']
  },
  pee : {
    index: 0, 
    attr: 'pee',
    problem: '是否尿得出',
    array: ['请选择是否尿得出', '尿不出', '尿的出']
  },
  peeColor : {
    index: 0, 
    attr: 'peeColor',
    problem: '尿的颜色',
    array: ['请选择尿的颜色', '清白', '赤黄']
  },
  // 大便
  defecateGeneral : {
    index: 0, 
    attr: 'defecateGeneral',
    problem: '便秘或便稀',
    array: ['请选择便秘或便稀', '便秘', '便稀','正常']
  },
  defecateDetail : {
    index: 0, 
    attr: 'defecateDetail',
    problem: '大便是否成型',
    array: ['请选择大便是否成型', '常拉肚子', '大便不成形','大便先干后稀']
  },
  defecateColor : {
    index: 0, 
    attr: 'defecateColor',
    problem: '大便颜色',
    array: ['请选择大便颜色', '金黄色', '黑色', '红褐色', '红色','其他']
  },
  // 睡眠
  sleep : {
    index: 0, 
    attr: 'sleep',
    problem: '是否失眠',
    array: ['请选择是否失眠', '失眠', '正常']
  },
  // 寒热
  cfGeneral1 : {
    index: 0, 
    attr: 'cfGeneral1',
    problem: '怕冷或怕热',
    array: ['请选择怕冷或怕热', '怕冷', '怕热','正常']
  },
  cfGeneral2 : {
    index: 0, 
    attr: 'cfGeneral2',
    problem: '感觉冷或感觉热',
    array: ['请选择感觉冷或感觉热', '平时感觉冷', '平时感觉热','正常']
  },
  cfGeneral3 : {
    index: 0, 
    attr: 'cfGeneral3',
    problem: '是否一会冷一会热',
    array: ['请选择是否一会冷一会热', '一会儿冷一会儿热','正常']
  },
  cfGeneral4 : {
    index: 0, 
    attr: 'cfGeneral4',
    problem: '手脚冷或手脚热',
    array: ['请选择手脚冷或手脚热', '手脚冷', '手脚热','正常']
  },
  cfGeneral5 : {
    index: 0, 
    attr: 'cfGeneral5',
    problem: '是否腰背冷',
    array: ['请选择是否腰背冷', '腰背冷','正常']
  },
  cfGeneral6 : {
    index: 0, 
    attr: 'cfGeneral6',
    problem: '是否胸口冷',
    array: ['请选择是否胸口冷', '胸口冷','正常']
  },
  // 痰
  phlegm : {
    index: 0, 
    attr: 'phlegm',
    problem: '是否有痰',
    array: ['请选择是否有痰', '无','有']
  },
  phlegmCount : {
    index: 0, 
    attr: 'phlegmCount',
    problem: '痰多或痰少',
    array: ['请选择痰多或痰少', '少','多']
  },
  phlegmDetail : {
    index: 0, 
    attr: 'phlegmDetail',
    problem: '痰浓稠或痰清稀',
    array: ['请选择痰浓稠或痰清稀', '痰浓稠','痰清稀']
  },
  phlegmColor : {
    index: 0, 
    attr: 'phlegmColor',
    problem: '痰白或痰黄',
    array: ['请选择痰白或痰黄', '痰白','痰黄']
  },
  // 汗
  sweatCold : {
    index: 0, 
    attr: 'sweatCold',
    problem: '感冒发烧时是否有汗',
    array: ['请选择感冒发烧时是否有汗', '无汗','有汗']
  },
  sweatOridinary : {
    index: 0, 
    attr: 'sweatOridinary',
    problem: '平时是否易出汗',
    array: ['请选择平时是否易出汗', '不易出汗','易出汗']
  },
  sweatCount : {
    index: 0, 
    attr: 'sweatCount',
    problem: '出汗时汗多或汗少',
    array: ['请选择出汗时汗多或汗少', '汗少','汗多']
  },
  sweatSleep : {
    index: 0, 
    attr: 'sweatSleep',
    problem: '夜间是否盗汗',
    array: ['请选择夜间是否盗汗', '不盗汗','盗汗']
  },
  //头身
  headAche: {
    index: 0, 
    attr: 'headAche',
    problem: '头部情况',
    array: ['请选择头部情况', '头痛', '头晕','正常']
  },
  acheGeneral3: {
    index: 0, 
    attr: 'acheGeneral3',
    problem: '手脚关节疼痛情况',
    array: ['请选择手脚关节疼痛情况', '不痛', '痛']
  },
  acheGeneral4: {
    index: 0, 
    attr: 'acheGeneral4',
    problem: '身体骨关节疼痛情况',
    array: ['请选择身体骨关节疼痛情况', '不痛', '痛']
  },
  acheGeneral5: {
    index: 0, 
    attr: 'acheGeneral5',
    problem: '身体其他部位疼痛情况',
    array: ['请选择身体其他部位疼痛情况', '不痛', '痛']
  },
  // 舌诊
  tongueColor : {
    index: 0, 
    attr: 'tongueColor',
    problem: '舌头的颜色',
    array: ['请选择舌头的颜色', '正红', '淡红','深红']
  },
  lipColor : {
    index: 0, 
    attr: 'lipColor',
    problem: '嘴唇的颜色',
    array: ['请选择嘴唇的颜色', '正红', '淡红', '深红','乌黑']
  },
  tongueSides : {
    index: 0, 
    attr: 'tongueSides',
    problem: '舌头两侧有无齿印',
    array: ['请选择舌头两侧有无齿印', '无齿印','有齿印']
  },
  tonguePly : {
    index: 0, 
    attr: 'tonguePly',
    problem: '舌苔厚薄',
    array: ['请选择舌苔厚薄', '薄','厚']
  },
  furColor : {
    index: 0, 
    attr: 'furColor',
    problem: '舌苔颜色',
    array: ['请选择舌苔颜色', '白','黄']
  },
  // 疼痛（包括胀痛、痞痛）（腹诊）
  acheChest : {
    index: 0, 
    attr: 'acheChest',
    problem: '胸口是否胀痛',
    array: ['请选择胸口是否胀痛', '不胀痛', '胀痛']
  },
  acheGeneral1 : {
    index: 0, 
    attr: 'acheGeneral1',
    problem: '两胁、腹部、小腹部是否胀痛',
    array: ['请选择两胁、腹部、小腹部是否胀痛', '不胀或不胀痛', '胀或胀痛']
  },
  acheGeneral2 : {
    index: 0, 
    attr: 'acheGeneral2',
    problem: '胸口、两胁、腹部、小腹有无压痛点',
    array: ['请选择胸口、两胁、腹部、小腹有无压痛点', '无压痛点','有压痛点']
  },
  acheGeneral3 : {
    index: 0, 
    attr: 'acheGeneral3',
    problem: '手关节是否疼痛',
    array: ['请选择手关节是否疼痛', '不痛', '痛']
  },
  acheGeneral4 : {
    index: 0, 
    attr: 'acheGeneral4',
    problem: '身体骨节（如肩关节）是否疼痛',
    array: ['请选择身体骨节（如肩关节）是否疼痛', '不痛','痛']
  },
  // 耳聋
  eyeWell: {
    index: 0, 
    attr: 'eyeWell',
    problem: '您的听力情况',
    array: ['请选择您的听力情况', '听力不好', '听力好']
  },
  // 渴
  thirsty: {
    index: 0, 
    attr: 'thirsty',
    problem: '是否口渴',
    array: ['请选择是否口渴', '不口渴', '口渴']
  },
  // 脉象
  pulseGeneral1 : {
    index: 0, 
    attr: 'pulseGeneral1',
    problem: '脉迟或脉数',
    array: ['请选择脉迟或脉数', '脉迟', '脉数']
  },
  pulseGeneral2 : {
    index: 0, 
    attr: 'pulseGeneral2',
    problem: '脉浮或脉沉',
    array: ['请选择脉浮或脉沉', '脉浮', '脉沉']
  },
  pulseGeneral3 : {
    index: 0, 
    attr: 'pulseGeneral3',
    problem: '脉强或脉弱',
    array: ['请选择脉强或脉弱', '脉强','脉弱']
  },
  pulseGeneral4 : {
    index: 0, 
    attr: 'pulseGeneral4',
    problem: '是否脉弦',
    array: ['请选择是否脉弦', '否', '是']
  },
  // 女性特殊病
  // 月经
  menstruationCount : {
    index: 0, 
    attr: 'menstruationCount',
    problem: '月经量是否正常',
    array: ['请选择月经量是否正常', '偏少', '正常']
  },
  menstruationCycle : {
    index: 0, 
    attr: 'menstruationCycle',
    problem: '月经周期是否正常',
    array: ['请选择月经周期是否正常', '紊乱', '正常']
  },
  menstruationColor : {
    index: 0, 
    attr: 'menstruationColor',
    problem: '月经颜色',
    array: ['请选择月经颜色', '正红','深色（有淤血或血块）']
  },
  menstruationAche : {
    index: 0, 
    attr: 'menstruationAche',
    problem: '是否痛经',
    array: ['请选择是否痛经', '不痛经', '痛经']
  },
  // 白带
  leucorrheaColor : {
    index: 0, 
    attr: 'leucorrheaColor',
    problem: '白带颜色',
    array: ['请选择白带颜色', '白', '黄','红']
  },
  leucorrheaCount : {
    index: 0, 
    attr: 'leucorrheaCount',
    problem: '白带量是否正常',
    array: ['请选择白带量是否正常', '多', '正常']
  },
  leucorrheaDetail : {
    index: 0, 
    attr: 'leucorrheaDetail',
    problem: '白带质地清稀或粘稠',
    array: ['请选择白带质地清稀或粘稠', '清稀', '粘稠']
  },
  // 子宫及附件
  wombGeneral1 : {
    index: 0, 
    attr: 'wombGeneral1',
    problem: '是否宫寒',
    array: ['请选择是否宫寒', '不宫寒', '宫寒']
  },
  wombGeneral2 : {
    index: 0, 
    attr: 'wombGeneral2',
    problem: '有无子宫积水',
    array: ['请选择有无子宫积水', '无', '有']
  },
  wombGeneral3 : {
    index: 0, 
    attr: 'wombGeneral3',
    problem: '有无子宫附件炎',
    array: ['请选择有无子宫附件炎', '无', '有']
  },
  wombGeneral4 : {
    index: 0, 
    attr: 'wombGeneral4',
    problem: '有无宫颈炎',
    array: ['请选择有无宫颈炎', '无', '有']
  },
  wombGeneral5 : {
    index: 0, 
    attr: 'wombGeneral5',
    problem: '有无宫颈糜烂',
    array: ['请选择有无宫颈糜烂', '无', '有']
  },
  wombGeneral6 : {
    index: 0, 
    attr: 'wombGeneral6',
    problem: '是否不孕不育',
    array: ['请选择是否不孕不育', '无', '有']
  },
  // 儿童病
  pestisVariolosa: {
    index: 0, 
    attr: 'pestisVariolosa',
    problem: '有无天花',
    array: ['请选择有无天花', '无', '有']
  },
  measles: {
    index: 0, 
    attr: 'measles',
    problem: '有无麻疹',
    array: ['请选择有无麻疹', '无', '有']
  },
  // 病史病谱（生过什么病）
  mhGeneral1 : {
    index: 0, 
    attr: 'mhGeneral1',
    problem: '有无高血压',
    array: ['请选择有无高血压', '无', '有']
  },
  mhGeneral2 : {
    index: 0, 
    attr: 'mhGeneral2',
    problem: '有无高血脂',
    array: ['请选择有无高血脂', '无', '有']
  },
  mhGeneral3 : {
    index: 0, 
    attr: 'mhGeneral3',
    problem: '有无高血糖',
    array: ['请选择有无高血糖', '无', '有']
  },
  mhGeneral4 : {
    index: 0, 
    attr: 'mhGeneral4',
    problem: '有无高血尿酸（痛风）',
    array: ['请选择有无高血尿酸（痛风）', '无', '有']
  },
  // 状态
  state: {
    index: 0, 
    attr: 'state',
    problem: '问诊状态',
    array: ['请选择问诊状态', '待处理', '已处理']
  },
  // 外感风寒
  wgfh: {
    index: 0, 
    attr: 'wgfh',
    checked: [],
    problem: '',
    array: ['发烧','头疼',  '体痛（全身疼）', '怕冷或全身发冷', '怕风','颈部僵硬','咳嗽']
  },
  // 里实热
  lsr: {
    index: 0, 
    attr: 'lsr',
    checked: [],
    problem: '',
    array: ['高热（39度以上）', '不怕冷反而感觉很热（想脱衣服）', '很口渴', '潮热（下午3-5点体温最高）', '语无伦次（或梦话）','腹部胀满且疼痛','便秘']
  },
  // 冷热无常
  lrwc: {
    index: 0, 
    attr: 'lrwc',
    checked: [],
    problem: '',
    array: ['胸胁部满胀', '一会热一会冷', '心烦想呕吐', '无食欲（但可以勉强吃一些）', '口苦', '咽干', '目眩', '眼睛红肿', '胸口满胀', '头痛发热','听力减弱']
  },
  // 里虚胃寒
  lxwh: {
    index: 0, 
    attr: 'lxwh',
    checked: [],
    problem: '',
    array: ['腹部满胀', '呕吐（或想呕）', '完全吃不下', '手脚暖和', '拉稀严重', '腹部间歇性疼痛', '手脚疼痛']
  },
  // 阳虚体寒
  yxth: {
    index: 0, 
    attr: 'yxth',
    checked: [],
    problem: '',
    array: ['四肢非常冷（冰冷）', '严重拉肚子（吃什么拉什么）', '小便多且口渴', '小便颜色偏白', '呕吐', '烦躁', '关节冷痛', '腰背冷痛', '出冷汗','精神萎靡','昏昏欲睡']
  },
  // 上热下寒
  srxh: {
    index: 0, 
    attr: 'srxh',
    checked: [],
    problem: '',
    array: ['上面感觉上火', '下面感觉腰背冷、脚冷', '口渴', '有股气顶在心口', '心口发热且疼痛', '肚子饿但有无食欲', '吃了东西就呕吐', '吃药通便后出现严重腹泻']
  },
}
module.exports = list;
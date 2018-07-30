// const basePath = 'http://120.25.103.60:8080/ghzy/gh';
// const basePath = 'https://www.eguanhe.com/ghzy/gh';
const basePath = 'https://apipros.huizr.com/ghzy/gh';
// const basePath = 'http://2x1x156521.51mypc.cn:34657/ghzy/gh';
const urlList = {
  getOpenidUrl: basePath + '/get_openid',//获取openid
  registUrl: basePath + '/user_regist',//注册
  consultationDetailUrl: basePath + '/consultation_detail',//问诊记录详细信息
  consultationListUrl: basePath + '/consultation_list',//问诊记录列表
  consultationSubmitUrl: basePath + '/consultation_submit',//提交问诊表
  getPhoneNumberUrl: basePath + '/getPhoneNumber',//获取用户手机号
  getModifyPersonalInfoCodeUrl: basePath + '/getModifyPersonalInfoCode',//获取验证码
  modifyPersonalInfoUrl: basePath + '/modifyPersonalInfo',//修改个人信息
  phoneLoginUrl: basePath + '/phoneLogin',//手机验证码登录
  storeListUrl: basePath + '/storeList',//获取店铺列表
  getPersonalInfoUrl: basePath + '/getPersonalInfo',//获取用户信息详情
  getDiagnosisQuestionUrl: basePath + '/get_diagnosis_question',// 获取问诊表问题列表
  submitDiagnosisUrl: basePath + '/submit_diagnosis',// 提交问诊表
  uploadFileUrl: basePath + '/uploadFile',//上传头像
  // 预约挂号
  diseaseClassUrl: basePath + '/diseaseClass',//病种分类
  clinicListUrl: basePath + '/clinic_list',//诊所列表
  doctorListUrl: basePath + '/doctor_list',//医师列表
  bookingUrl: basePath + '/booking',//预约挂号
  hasBookingUrl: basePath + '/hasBooking',//是否预约
  // 挂号记录
  bookingHistoryUrl: basePath + '/booking_history',//挂号记录
  unbookingUrl: basePath + '/unbooking',//退号
  // 钱包
  getWalletInfoUrl: basePath + '/get_wallet_info',//钱包信息
  getConsumerDetailsUrl: basePath + '/get_consumer_details',//消费明细
  getPayinfoUrl: basePath + '/get_payinfo',//获取钱包充值信息
  // 就诊记录
  getDiagnosisHistoryUrl: basePath + '/get_diagnosis_history',// 就诊记录
  getDiagnosisUrl: basePath + '/get_diagnosis',//查询病历
  addCommentUrl: basePath + '/addComment',//评价
  getCommentUrl: basePath + '/getComment',//追加评价
}
module.exports = urlList; 
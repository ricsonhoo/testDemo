const urlList = require("./utils/config.js");
const appid = 'wxb6b7d08fbca740e4';
const secret = '87713e056176ceb0e7a8bf7cf75fbca4';
const { WeToast } = require('./utils/wetoast/wetoast.js');
App({
  WeToast, 
  onLaunch() {
    
  },
  globalMethod: {
    POST(obj){
      let opts = obj || {};
      opts = {
        url: opts.url || '',
        data: opts.data || {},
        success: opts.success || (() => { }),
        fail: opts.fail || (() => { }),
        complete: opts.complete || (() => { }),
      }
      console.log('---------post url 和 data 值的打印--------')
      console.log(opts.url);
      console.log(opts.data)
      console.log(JSON.stringify(opts.data))
      wx.request({
        url: opts.url,
        data: opts.data,
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        success: res => {
          console.log('---------post success 接口成功--------')
          console.log(res)
          opts.success(res)
        },
        fail: res => {
          console.log('---------post fail 接口失败--------')
          console.log(res)
          opts.fail(res)
        },
        complete: res => {
          // console.log('---------post complete 接口结束--------')
          // console.log(res)
          opts.complete(res)
          console.log('---------post complete 本次调用完成--------')
          console.log('----------------------------------------------------------------------')
        }
      })
    },
    GET(obj){
      let opts = obj || {};
      opts = {
        url: opts.url || '',
        data: opts.data || {},
        success: opts.success || (() => {}),
        fail: opts.fail || (() => {}),
        complete: opts.complete || (() => {}),
      }
      console.log('---------get url 和 data 值的打印--------')
      console.log(opts.url);
      for (var key in opts.data) {
        console.log(opts.data[key]);
      }
      wx.request({
        url: opts.url,
        data: opts.data,
        success: res => {
          console.log('---------get success 接口成功--------')
          console.log(res)
          opts.success(res)
        },
        fail: res => {
          console.log('---------get fail 接口失败--------')
          console.log(res)
          opts.fail(res)
        },
        complete: res => {
          // console.log('---------get complete 接口结束--------')
          // console.log(res)
          opts.complete(res)
          console.log('---------get complete 本次调用完成--------')
          console.log('----------------------------------------------------------------------')
        }
      })
    }
  }
})
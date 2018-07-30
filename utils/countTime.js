// 倒计时插件
class CountTime {
  constructor(page) {
    this.page = page;
    this.time = 60;
    this.timer = null;
    this.page.setData({ code: '获取验证码', flag: false });
  }
  countTime() {
    this.page.setData({ flag: true });
    if (this.time > 0) {
      this.time--;
      this.page.setData({ code: this.time + 's后获取' });
      this.timer = setTimeout(() => {
        this.countTime();
      }, 1000);
    } else {
      this.time = 60;
      clearTimeout(this.timer);
      this.page.setData({ code: '获取验证码', flag: false });
    }
  }
}
module.exports = CountTime;
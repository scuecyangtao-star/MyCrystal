// app.js - 5合1 DIY饰品小程序
App({
  onLaunch() {
    try {
      if (wx.cloud) {
        wx.cloud.init({ env: '', traceUser: true });
      }
    } catch (e) {}
    this.globalData = {};
  }
});

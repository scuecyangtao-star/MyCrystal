Page({
  data: { list: [] },
  onShow() {
    const list = wx.getStorageSync('diy_addresses') || [];
    this.setData({ list });
  },
  addAddress() {
    wx.showModal({
      title: '添加地址',
      content: '地址管理功能将在后续版本完善，当前为演示版本',
      showCancel: false
    });
  }
});

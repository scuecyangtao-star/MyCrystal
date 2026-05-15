Page({
  data: { list: [] },
  onShow() {
    const list = wx.getStorageSync('diy_addresses') || [];
    this.setData({ list });
  },
  addAddress() {
    wx.navigateTo({ url: '/pages/addressEdit/addressEdit' });
  },
  editAddress(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/addressEdit/addressEdit?id=${id}` });
  }
});

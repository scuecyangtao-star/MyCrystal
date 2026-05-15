Page({
  onShow() {
    const tabBar = this.getTabBar && this.getTabBar();
    if (tabBar) tabBar.setData({ selected: 3 });
  },
  goOrders() {
    wx.navigateTo({ url: '/pages/orders/orders' });
  },
  goDesigns() {
    wx.navigateTo({ url: '/pages/myDesigns/myDesigns' });
  },
  goAddress() {
    wx.navigateTo({ url: '/pages/addressList/addressList' });
  }
});

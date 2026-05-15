const { PRODUCT_TYPES, BANNER_IMAGES } = require('../../utils/mockData');

Page({
  data: {
    productTypes: PRODUCT_TYPES,
    bannerImages: BANNER_IMAGES
  },
  onShow() {
    const tabBar = this.getTabBar && this.getTabBar();
    if (tabBar) tabBar.setData({ selected: 0 });
  },
  onImgError(e) {
    const id = e.currentTarget.dataset.id;
    const productTypes = this.data.productTypes.map(p => 
      p.id === id ? { ...p, showEmoji: true } : p
    );
    this.setData({ productTypes });
  },
  goDiy(e) {
    const { type, name } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/diy/diy?productType=${type}&productName=${encodeURIComponent(name)}` });
  }
});

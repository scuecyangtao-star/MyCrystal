const { PRODUCT_TYPES, PRESET_TEMPLATES } = require('../../utils/mockData');

Page({
  onShow() {
    const tabBar = this.getTabBar && this.getTabBar();
    if (tabBar) tabBar.setData({ selected: 1 });
  },
  data: {
    productTypes: PRODUCT_TYPES,
    templates: PRESET_TEMPLATES
  },
  goDiy(e) {
    const { type, name } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/diy/diy?productType=${type}&productName=${encodeURIComponent(name)}` });
  },
  useTemplate(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/diy/diy?productType=${item.productType}&templateId=${item.id}&elementIds=${encodeURIComponent(JSON.stringify(item.elementIds || []))}`
    });
  }
});

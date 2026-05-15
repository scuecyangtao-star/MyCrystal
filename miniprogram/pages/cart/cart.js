const { MAIN_BEADS, SUB_BEADS, CHARMS, calcDesignPrice } = require('../../utils/mockData');

const CART_STORAGE = 'diy_cart';

function toPreviewItems(elementIds) {
  const all = [...MAIN_BEADS, ...SUB_BEADS, ...CHARMS];
  return (elementIds || []).map(eid => {
    const el = all.find(x => x.id === eid);
    return el ? { id: eid, name: el.name.substring(0, 1), color: MAIN_BEADS.find(m => m.id === eid) ? '#d4a853' : CHARMS.find(c => c.id === eid) ? '#c9a063' : '#888' } : null;
  }).filter(Boolean);
}

Page({
  data: { items: [] },
  onShow() {
    const tabBar = this.getTabBar && this.getTabBar();
    if (tabBar) tabBar.setData({ selected: 2 });
    this.loadCart();
  },
  loadCart() {
    const list = wx.getStorageSync(CART_STORAGE) || [];
    const items = list.map(i => ({ ...i, previewItems: toPreviewItems(i.elementIds) }));
    this.setData({ items });
  },
  removeItem(e) {
    const id = e.currentTarget.dataset.id;
    let list = wx.getStorageSync(CART_STORAGE) || [];
    list = list.filter(i => i.id !== id);
    wx.setStorageSync(CART_STORAGE, list);
    wx.showToast({ title: '已移除' });
    this.loadCart();
  },
  checkoutItem(e) {
    const item = e.currentTarget.dataset.item;
    const order = {
      id: 'O' + Date.now(),
      designId: item.id,
      productType: item.productType,
      productName: item.productName,
      elementIds: item.elementIds || [],
      totalPrice: item.totalPrice,
      status: 'pending',
      createTime: Date.now()
    };
    const orders = wx.getStorageSync('diy_orders') || [];
    orders.unshift(order);
    wx.setStorageSync('diy_orders', orders);
    let list = wx.getStorageSync(CART_STORAGE) || [];
    list = list.filter(i => i.id !== item.id);
    wx.setStorageSync(CART_STORAGE, list);
    wx.showToast({ title: '下单成功' });
    setTimeout(() => wx.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${order.id}` }), 800);
  },
  goDiy() {
    wx.switchTab({ url: '/pages/diyEntry/diyEntry' });
  }
});

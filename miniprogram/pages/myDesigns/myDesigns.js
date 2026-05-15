const { MAIN_BEADS, SUB_BEADS, CHARMS, calcDesignPrice, genDesignId } = require('../../utils/mockData');

const STORAGE = 'diy_designs';

function toPreviewItems(elementIds) {
  const all = [...MAIN_BEADS, ...SUB_BEADS, ...CHARMS];
  return (elementIds || []).map(eid => {
    const el = all.find(x => x.id === eid);
    return el ? { id: eid, name: el.name.substring(0, 1), color: MAIN_BEADS.find(m => m.id === eid) ? '#d4a853' : CHARMS.find(c => c.id === eid) ? '#c9a063' : '#888' } : null;
  }).filter(Boolean);
}

function formatTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

Page({
  data: { designs: [] },
  onShow() {
    const list = wx.getStorageSync(STORAGE) || [];
    const designs = list.map(d => ({
      ...d,
      previewItems: toPreviewItems(d.elementIds),
      createTimeStr: formatTime(d.createTime)
    }));
    this.setData({ designs: list.length ? designs : [] });
  },
  useDesign(e) {
    const d = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/diy/diy?productType=${d.productType}&productName=${encodeURIComponent(d.productName)}&elementIds=${encodeURIComponent(JSON.stringify(d.elementIds || []))}`
    });
  },
  createOrderFromDesign(e) {
    const d = e.currentTarget.dataset.item;
    const order = {
      id: 'O' + Date.now(),
      designId: d.id,
      productType: d.productType,
      productName: d.productName,
      elementIds: d.elementIds || [],
      totalPrice: calcDesignPrice(d.elementIds || []),
      status: 'pending',
      createTime: Date.now()
    };
    const list = wx.getStorageSync('diy_orders') || [];
    list.unshift(order);
    wx.setStorageSync('diy_orders', list);
    wx.showToast({ title: '下单成功' });
    setTimeout(() => wx.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${order.id}` }), 800);
  },
  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});

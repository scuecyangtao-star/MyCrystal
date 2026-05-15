const { MAIN_BEADS, SUB_BEADS, CHARMS, calcDesignPrice } = require('../../utils/mockData');

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
    const totalPrice = calcDesignPrice(d.elementIds || []);
    const params = `productType=${d.productType}&productName=${encodeURIComponent(d.productName)}&elementIds=${encodeURIComponent(JSON.stringify(d.elementIds || []))}&totalPrice=${totalPrice}`;
    wx.navigateTo({ url: `/pages/confirmOrder/confirmOrder?${params}` });
  },
  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});

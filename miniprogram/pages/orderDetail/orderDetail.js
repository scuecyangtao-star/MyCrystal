const { MAIN_BEADS, SUB_BEADS, CHARMS } = require('../../utils/mockData');

Page({
  data: {
    order: null,
    previewItems: [],
    statusText: { pending: '待支付', paid: '已支付', making: '制作中', shipped: '已发货' }
  },
  onLoad(options) {
    const id = options.id;
    const orders = wx.getStorageSync('diy_orders') || [];
    const order = orders.find(o => o.id === id);
    if (!order) { wx.showToast({ title: '订单不存在', icon: 'none' }); return; }
    const all = [...MAIN_BEADS, ...SUB_BEADS, ...CHARMS];
    const previewItems = (order.elementIds || []).map(eid => {
      const el = all.find(x => x.id === eid);
      return el ? { id: eid, name: el.name.substring(0, 1), color: MAIN_BEADS.find(m => m.id === eid) ? '#d4a853' : CHARMS.find(c => c.id === eid) ? '#c9a063' : '#888' } : null;
    }).filter(Boolean);
    this.setData({ order, previewItems });
  }
});

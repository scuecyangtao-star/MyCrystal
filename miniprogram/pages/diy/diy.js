const { THEMES, MAIN_BEADS, SUB_BEADS, CHARMS, calcDesignPrice, genDesignId } = require('../../utils/mockData');

const STORAGE_DESIGNS = 'diy_designs';
const CART_STORAGE = 'diy_cart';

Page({
  data: {
    productType: 'bracelet',
    productName: '手链',
    stepIndex: 0,
    themes: THEMES,
    mainBeads: MAIN_BEADS,
    subBeads: SUB_BEADS,
    charms: CHARMS,
    selectedTheme: '',
    selectedMain: '',
    subIds: [],
    selectedCharm: '',
    elementIds: [],
    previewItems: [],
    totalPrice: 0
  },
  updatePreviewItems() {
    const { elementIds } = this.data;
    const all = [...MAIN_BEADS, ...SUB_BEADS, ...CHARMS];
    const items = elementIds.map(id => {
      const el = all.find(x => x.id === id);
      return el ? { id, name: el.name.substring(0, 1), color: MAIN_BEADS.find(m => m.id === id) ? '#d4a853' : CHARMS.find(c => c.id === id) ? '#c9a063' : '#888' } : null;
    }).filter(Boolean);
    this.setData({ previewItems: items });
  },
  onLoad(options) {
    const productType = options.productType || 'bracelet';
    const productName = decodeURIComponent(options.productName || '手链');
    const templateId = options.templateId;
    let elementIds = [];
    if (options.elementIds) {
      try { elementIds = JSON.parse(decodeURIComponent(options.elementIds)); } catch (e) {}
    }
    this.initFromTemplate(elementIds, productType, productName);
    this.setData({ productType, productName });
  },
  initFromTemplate(elementIds, productType, productName) {
    if (!elementIds || elementIds.length === 0) {
      this.setData({ elementIds: [], previewItems: [], totalPrice: 0, selectedTheme: '', selectedMain: '', subIds: [], selectedCharm: '' });
      return;
    }
    const main = MAIN_BEADS.find(b => elementIds.includes(b.id));
    const subIds = elementIds.filter(id => SUB_BEADS.some(b => b.id === id));
    const charm = CHARMS.find(c => elementIds.includes(c.id));
    const theme = main ? main.themeId : '';
    this.setData({
      elementIds,
      selectedTheme: theme,
      selectedMain: main ? main.id : '',
      subIds,
      selectedCharm: charm ? charm.id : '',
      totalPrice: calcDesignPrice(elementIds)
    }, () => this.updatePreviewItems());
  },
  setStep(e) { this.setData({ stepIndex: parseInt(e.currentTarget.dataset.step) }); },
  selectTheme(e) {
    const { id } = e.currentTarget.dataset;
    const ids = this.data.elementIds.filter(x => !MAIN_BEADS.some(m => m.id === x));
    const main = MAIN_BEADS.find(m => m.themeId === id);
    if (main) { ids.unshift(main.id); }
    this.setData({ selectedTheme: id, elementIds: ids, totalPrice: calcDesignPrice(ids) }, () => this.updatePreviewItems());
  },
  selectMain(e) {
    const item = e.currentTarget.dataset.item;
    const ids = this.data.elementIds.filter(x => !MAIN_BEADS.some(m => m.id === x));
    ids.unshift(item.id);
    this.setData({ selectedMain: item.id, selectedTheme: item.themeId, elementIds: ids, totalPrice: calcDesignPrice(ids) }, () => this.updatePreviewItems());
  },
  toggleSub(e) {
    const item = e.currentTarget.dataset.item;
    let subIds = [...this.data.subIds];
    const idx = subIds.indexOf(item.id);
    if (idx >= 0) subIds.splice(idx, 1); else subIds.push(item.id);
    const ids = this.data.elementIds.filter(x => !SUB_BEADS.some(s => s.id === x));
    ids.push(...subIds);
    this.setData({ subIds, elementIds: ids, totalPrice: calcDesignPrice(ids) }, () => this.updatePreviewItems());
  },
  selectCharm(e) {
    const item = e.currentTarget.dataset.item;
    const ids = this.data.elementIds.filter(x => !CHARMS.some(c => c.id === x));
    ids.push(item.id);
    this.setData({ selectedCharm: item.id, elementIds: ids, totalPrice: calcDesignPrice(ids) }, () => this.updatePreviewItems());
  },
  addToCart() {
    const { productType, productName, elementIds, totalPrice } = this.data;
    if (elementIds.length === 0) { wx.showToast({ title: '请至少选择主珠', icon: 'none' }); return; }
    const item = { id: genDesignId(), productType, productName, elementIds, totalPrice };
    const list = wx.getStorageSync(CART_STORAGE) || [];
    list.unshift(item);
    wx.setStorageSync(CART_STORAGE, list);
    wx.showToast({ title: '已加入购物车' });
  },
  saveDesign() {
    const { productType, productName, elementIds } = this.data;
    if (elementIds.length === 0) { wx.showToast({ title: '请至少选择主珠', icon: 'none' }); return; }
    const design = { id: genDesignId(), productType, productName, elementIds, createTime: Date.now() };
    const list = wx.getStorageSync(STORAGE_DESIGNS) || [];
    list.unshift(design);
    wx.setStorageSync(STORAGE_DESIGNS, list);
    wx.showToast({ title: '保存成功' });
  },
  onShareAppMessage() {
    return { title: '我设计了一款DIY饰品，快来试试', path: '/pages/index/index' };
  },
  createOrder() {
    const { productType, productName, elementIds, totalPrice } = this.data;
    if (elementIds.length === 0) { wx.showToast({ title: '请至少选择主珠', icon: 'none' }); return; }
    const designId = genDesignId();
    const order = {
      id: 'O' + Date.now(),
      designId, productType, productName, elementIds, totalPrice,
      status: 'pending',
      createTime: Date.now()
    };
    const list = wx.getStorageSync('diy_orders') || [];
    list.unshift(order);
    wx.setStorageSync('diy_orders', list);
    wx.showToast({ title: '下单成功' });
    setTimeout(() => wx.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${order.id}` }), 800);
  }
});

const { MAIN_BEADS, SUB_BEADS, CHARMS, calcDesignPrice } = require('../../utils/mockData');

Page({
  data: {
    productType: '',
    productName: '',
    elementIds: [],
    totalPrice: 0,
    previewItems: [],
    addresses: [],
    selectedAddrId: ''
  },

  onLoad(options) {
    const productType = options.productType || 'bracelet';
    const productName = decodeURIComponent(options.productName || '手链');
    let elementIds = [];
    let totalPrice = 0;
    if (options.elementIds) {
      try { elementIds = JSON.parse(decodeURIComponent(options.elementIds)); } catch (e) {}
    }
    if (options.totalPrice) {
      totalPrice = parseFloat(options.totalPrice) || calcDesignPrice(elementIds);
    } else {
      totalPrice = calcDesignPrice(elementIds);
    }

    const all = [...MAIN_BEADS, ...SUB_BEADS, ...CHARMS];
    const previewItems = elementIds.map(eid => {
      const el = all.find(x => x.id === eid);
      return el ? { id: eid, name: el.name.substring(0, 1), color: MAIN_BEADS.find(m => m.id === eid) ? '#d4a853' : CHARMS.find(c => c.id === eid) ? '#c9a063' : '#888' } : null;
    }).filter(Boolean);

    const addresses = wx.getStorageSync('diy_addresses') || [];
    const selectedAddrId = addresses.length > 0 ? addresses[0].id : '';
    const fromCart = options.fromCart || '';

    this.setData({ productType, productName, elementIds, totalPrice, previewItems, addresses, selectedAddrId, fromCart });
  },

  onShow() {
    const addresses = wx.getStorageSync('diy_addresses') || [];
    const selectedAddrId = this.data.selectedAddrId || (addresses.length > 0 ? addresses[0].id : '');
    this.setData({ addresses, selectedAddrId });
  },

  selectAddress(e) {
    this.setData({ selectedAddrId: e.currentTarget.dataset.id });
  },

  addAddress() {
    wx.navigateTo({ url: '/pages/addressEdit/addressEdit' });
  },

  submit() {
    const { productType, productName, elementIds, totalPrice, selectedAddrId, addresses } = this.data;
    if (!selectedAddrId) {
      wx.showModal({
        title: '提示',
        content: '请先添加收货地址',
        confirmText: '去添加',
        success: (res) => {
          if (res.confirm) wx.navigateTo({ url: '/pages/addressEdit/addressEdit' });
        }
      });
      return;
    }
    const addr = addresses.find(a => a.id === selectedAddrId);
    const order = {
      id: 'O' + Date.now(),
      productType, productName, elementIds, totalPrice,
      status: 'pending',
      address: addr || null,
      createTime: Date.now()
    };
    const orders = wx.getStorageSync('diy_orders') || [];
    orders.unshift(order);
    wx.setStorageSync('diy_orders', orders);

    // 如果是从购物车来的，移除购物车中的商品
    if (this.data.fromCart) {
      const cart = wx.getStorageSync('diy_cart') || [];
      const newCart = cart.filter(i => i.id !== this.data.fromCart);
      wx.setStorageSync('diy_cart', newCart);
    }

    wx.showToast({ title: '下单成功', icon: 'success' });
    setTimeout(() => {
      wx.redirectTo({ url: `/pages/orderDetail/orderDetail?id=${order.id}` });
    }, 800);
  }
});

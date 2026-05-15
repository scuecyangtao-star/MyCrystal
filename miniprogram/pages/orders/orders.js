Page({
  data: {
    tabs: [
      { key: 'all', label: '全部' },
      { key: 'pending', label: '待支付' },
      { key: 'making', label: '制作中' },
      { key: 'shipped', label: '已发货' }
    ],
    currentTab: 'all',
    orders: [],
    filteredOrders: [],
    statusText: { pending: '待支付', paid: '已支付', making: '制作中', shipped: '已发货' }
  },
  onShow() {
    this.loadOrders();
  },
  loadOrders() {
    const orders = wx.getStorageSync('diy_orders') || [];
    this.setData({ orders }, () => this.filterOrders());
  },
  switchTab(e) {
    this.setData({ currentTab: e.currentTarget.dataset.key }, () => this.filterOrders());
  },
  filterOrders() {
    const { currentTab, orders } = this.data;
    let filtered = currentTab === 'all' ? orders : orders.filter(o => o.status === currentTab);
    filtered = filtered.map(o => ({ ...o, createTimeStr: this.formatTime(o.createTime) }));
    this.setData({ filteredOrders: filtered });
  },
  formatTime(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  },
  goDetail(e) {
    wx.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${e.currentTarget.dataset.id}` });
  }
});

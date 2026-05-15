Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index', text: '首页', iconPath: '/images/tab-home.png', selectedIconPath: '/images/tab-home-active.png', iconScale: 1 },
      { pagePath: '/pages/diyEntry/diyEntry', text: 'DIY', iconPath: '/images/tab-DIY.png', selectedIconPath: '/images/tab-DIY.png', iconScale: 1.1 },
      { pagePath: '/pages/cart/cart', text: '购物车', iconPath: '/images/tab-shopping-cart.png', selectedIconPath: '/images/tab-shopping-cart-active.png', iconScale: 1 },
      { pagePath: '/pages/profile/profile', text: '我的', iconPath: '/images/tab-profile.png', selectedIconPath: '/images/tab-profile-active.png', iconScale: 1 }
    ]
  },
  methods: {
    switchTab(e) {
      const { path } = e.currentTarget.dataset;
      wx.switchTab({ url: path });
    }
  }
});

Component({
  properties: {
    current: {
      type: String,
      value: 'index'
    }
  },
  methods: {
    switchTab(e) {
      const path = e.currentTarget.dataset.path;
      const url = path === 'index' ? '/pages/index/index' : `/pages/${path}/${path}`;
      if (path !== this.properties.current) {
        wx.switchTab ? wx.switchTab({ url }) : wx.redirectTo({ url });
      }
    }
  }
});

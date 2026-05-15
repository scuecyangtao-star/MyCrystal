const STORAGE_KEY = 'diy_addresses';

Page({
  data: {
    isEdit: false,
    editId: '',
    name: '',
    phone: '',
    region: '',
    detail: ''
  },

  onLoad(options) {
    if (options.id) {
      const list = wx.getStorageSync(STORAGE_KEY) || [];
      const addr = list.find(a => a.id === options.id);
      if (addr) {
        wx.setNavigationBarTitle({ title: '编辑地址' });
        this.setData({
          isEdit: true,
          editId: addr.id,
          name: addr.name,
          phone: addr.phone,
          region: addr.region,
          detail: addr.detail
        });
        return;
      }
    }
    wx.setNavigationBarTitle({ title: '新增地址' });
  },

  onNameInput(e) { this.setData({ name: e.detail.value }); },
  onPhoneInput(e) { this.setData({ phone: e.detail.value }); },
  onRegionInput(e) { this.setData({ region: e.detail.value }); },
  onDetailInput(e) { this.setData({ detail: e.detail.value }); },

  save() {
    const { isEdit, editId, name, phone, region, detail } = this.data;
    if (!name.trim()) { wx.showToast({ title: '请输入姓名', icon: 'none' }); return; }
    if (!phone.trim() || !/^1\d{10}$/.test(phone.trim())) { wx.showToast({ title: '请输入正确的手机号', icon: 'none' }); return; }
    if (!region.trim()) { wx.showToast({ title: '请输入所在地区', icon: 'none' }); return; }
    if (!detail.trim()) { wx.showToast({ title: '请输入详细地址', icon: 'none' }); return; }

    const list = wx.getStorageSync(STORAGE_KEY) || [];
    if (isEdit) {
      const idx = list.findIndex(a => a.id === editId);
      if (idx >= 0) {
        list[idx] = { ...list[idx], name: name.trim(), phone: phone.trim(), region: region.trim(), detail: detail.trim() };
      }
    } else {
      list.unshift({
        id: 'A' + Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        region: region.trim(),
        detail: detail.trim()
      });
    }
    wx.setStorageSync(STORAGE_KEY, list);
    wx.showToast({ title: isEdit ? '修改成功' : '添加成功', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 800);
  },

  delete() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个地址吗？',
      success: (res) => {
        if (res.confirm) {
          const list = wx.getStorageSync(STORAGE_KEY) || [];
          const newList = list.filter(a => a.id !== this.data.editId);
          wx.setStorageSync(STORAGE_KEY, newList);
          wx.showToast({ title: '已删除', icon: 'success' });
          setTimeout(() => wx.navigateBack(), 800);
        }
      }
    });
  }
});

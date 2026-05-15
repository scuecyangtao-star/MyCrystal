// 模拟数据 - 后续可对接云开发
const BANNER_IMAGES = [
  { type: 'color', bg: '#9A8B78', text: 'DIY 专属饰品', sub: '手链 · 手机链 · 手工定制' },
  { type: 'color', bg: '#d4a853', text: '自由搭配', sub: '主题 · 主珠 · 配珠 · 吊坠' },
  { type: 'color', bg: '#C4B5A0', text: '限时优惠', sub: '新用户首单立减 5 元' }
];

const PRODUCT_TYPES = [
  { id: 'bracelet', name: '手链', icon: '/cat-bracelet.png', emoji: '📿' },
  { id: 'phone-chain', name: '手机链', icon: '/cat-phone-chain.png', emoji: '📱' },
  { id: 'bag-charm', name: '包挂', icon: '/cat-bag-charm.png', emoji: '👜' },
  { id: 'car-hang', name: '车载挂件', icon: '/cat-car-hang.png', emoji: '🚗' },
  { id: 'keychain', name: '钥匙链', icon: '/cat-keychain.png', emoji: '🔑' }
];

const PRESET_TEMPLATES = [
  { id: 'fortune', name: '招财', desc: '金珠红绳，财运亨通', productType: 'bracelet', elementIds: ['main-1', 'sub-1', 'sub-2', 'charm-1'] },
  { id: 'peach', name: '桃花', desc: '粉晶桃花，缘分离你更近', productType: 'phone-chain', elementIds: ['main-2', 'sub-3', 'charm-2'] },
  { id: 'minimal', name: '简约款', desc: '素色百搭，日常必备', productType: 'bracelet', elementIds: ['main-3', 'sub-4', 'charm-3'] }
];

const THEMES = [
  { id: 't1', name: '招财', color: '#d4a853' },
  { id: 't2', name: '桃花', color: '#f8b4c4' },
  { id: 't3', name: '平安', color: '#7dd3a0' },
  { id: 't4', name: '简约', color: '#666' }
];

const MAIN_BEADS = [
  { id: 'main-1', name: '金珠', price: 12, themeId: 't1', image: '' },
  { id: 'main-2', name: '粉晶', price: 15, themeId: 't2', image: '' },
  { id: 'main-3', name: '白玛瑙', price: 8, themeId: 't4', image: '' },
  { id: 'main-4', name: '绿玉', price: 18, themeId: 't3', image: '' }
];

const SUB_BEADS = [
  { id: 'sub-1', name: '小金珠', price: 2, image: '' },
  { id: 'sub-2', name: '红玛瑙', price: 3, image: '' },
  { id: 'sub-3', name: '粉玉', price: 4, image: '' },
  { id: 'sub-4', name: '透明水晶', price: 3, image: '' },
  { id: 'sub-5', name: '黑曜石', price: 5, image: '' }
];

const CHARMS = [
  { id: 'charm-1', name: '招财猫', price: 15, type: 'charm', image: '' },
  { id: 'charm-2', name: '桃花吊坠', price: 12, type: 'charm', image: '' },
  { id: 'charm-3', name: '几何挂扣', price: 8, type: 'clasp', image: '' },
  { id: 'charm-4', name: '平安符', price: 10, type: 'charm', image: '' }
];

// 计算设计总价
function calcDesignPrice(elementIds) {
  const allElements = [...MAIN_BEADS, ...SUB_BEADS, ...CHARMS];
  return elementIds.reduce((sum, id) => {
    const el = allElements.find(e => e.id === id);
    return sum + (el ? el.price : 0);
  }, 0);
}

// 生成设计ID
function genDesignId() {
  return 'D' + Date.now() + Math.random().toString(36).slice(2, 8);
}

// 生成订单ID
function genOrderId() {
  return 'O' + Date.now() + Math.random().toString(36).slice(2, 6);
}

module.exports = {
  BANNER_IMAGES,
  PRODUCT_TYPES,
  PRESET_TEMPLATES,
  THEMES,
  MAIN_BEADS,
  SUB_BEADS,
  CHARMS,
  calcDesignPrice,
  genDesignId,
  genOrderId
};

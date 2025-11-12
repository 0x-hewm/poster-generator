import { getTheme, applyTheme } from '../config/themes.js';

/**
 * 渲染海报
 */
export function renderPoster(config, container) {
  const theme = config.meta?.theme || 'light';
  
  // 清空容器
  container.innerHTML = '';
  
  // 创建海报容器
  const poster = document.createElement('div');
  poster.id = 'poster';
  poster.className = 'poster';
  poster.style.width = `${config.meta?.width || 400}px`;
  
  // 应用主题 - 只在海报元素上设置 CSS 变量
  const themeData = applyTheme(theme, poster);
  
  // 应用背景
  applyBackground(poster, themeData);
  
  // 创建内容容器
  const inner = document.createElement('div');
  inner.className = 'inner';
  
  // 渲染各个区块
  if (config.sections && Array.isArray(config.sections)) {
    config.sections.forEach(section => {
      const element = renderSection(section);
      if (element) {
        inner.appendChild(element);
      }
    });
  }
  
  poster.appendChild(inner);
  container.appendChild(poster);
  
  return poster;
}

/**
 * 应用背景
 */
function applyBackground(element, theme) {
  const bg = theme.background;
  
  if (bg.type === 'solid') {
    element.style.background = bg.base;
  } else if (bg.type === 'gradient' && bg.gradients.length > 0) {
    const gradients = bg.gradients.map(g => 
      `radial-gradient(${g.size} at ${g.position}, ${g.color} 0%, transparent 70%)`
    ).join(',\n        ');
    
    element.style.background = `${gradients},\n        ${bg.base}`;
  } else {
    element.style.background = bg.base;
  }
  
  // 科技风网格背景
  if (bg.pattern === 'grid') {
    element.style.backgroundImage = `
      linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px),
      ${element.style.background}
    `;
    element.style.backgroundSize = '20px 20px, 20px 20px, auto';
  }
}

/**
 * 渲染单个区块
 */
function renderSection(section) {
  switch (section.type) {
    case 'title':
      return renderTitle(section);
    case 'section':
      return renderContentSection(section);
    case 'pricing':
      return renderPricing(section);
    case 'note':
      return renderNote(section);
    default:
      return null;
  }
}

/**
 * 渲染标题
 */
function renderTitle(section) {
  const h1 = document.createElement('h1');
  h1.textContent = section.content;
  return h1;
}

/**
 * 渲染内容区块
 */
function renderContentSection(section) {
  const div = document.createElement('div');
  div.className = 'section';
  
  // 主标题
  if (section.title) {
    const h2 = document.createElement('h2');
    h2.textContent = section.title;
    div.appendChild(h2);
  }
  
  // 内容段落
  if (section.content) {
    const p = document.createElement('p');
    p.textContent = section.content;
    div.appendChild(p);
  }
  
  // 列表项
  if (section.items && Array.isArray(section.items)) {
    const ul = document.createElement('ul');
    section.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    div.appendChild(ul);
  }
  
  // 子区块
  if (section.subsections && Array.isArray(section.subsections)) {
    section.subsections.forEach(sub => {
      // 子标题
      if (sub.subtitle) {
        const h3 = document.createElement('h3');
        h3.textContent = sub.subtitle;
        div.appendChild(h3);
      }
      
      // 描述
      if (sub.description) {
        const p = document.createElement('p');
        p.className = 'muted';
        p.textContent = sub.description;
        div.appendChild(p);
      }
      
      // 标签
      if (sub.label) {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = sub.label;
        p.appendChild(strong);
        div.appendChild(p);
      }
      
      // 子列表
      if (sub.items && Array.isArray(sub.items)) {
        const ul = document.createElement('ul');
        sub.items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          ul.appendChild(li);
        });
        div.appendChild(ul);
      }
    });
  }
  
  return div;
}

/**
 * 渲染定价模块
 */
function renderPricing(section) {
  const container = document.createElement('div');
  container.className = 'section';
  
  if (section.title) {
    const h2 = document.createElement('h2');
    h2.textContent = section.title;
    container.appendChild(h2);
  }
  
  if (section.tiers && Array.isArray(section.tiers)) {
    section.tiers.forEach(tier => {
      const tierDiv = document.createElement('div');
      tierDiv.className = tier.highlight ? 'tier highlight' : 'tier';
      
      const topDiv = document.createElement('div');
      topDiv.className = 'top';
      
      const leftDiv = document.createElement('div');
      leftDiv.className = 'left';
      
      const nameSpan = document.createElement('span');
      nameSpan.className = 'name';
      nameSpan.textContent = tier.name;
      leftDiv.appendChild(nameSpan);
      
      if (tier.badge) {
        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'badge';
        badgeSpan.textContent = tier.badge;
        leftDiv.appendChild(badgeSpan);
      }
      
      topDiv.appendChild(leftDiv);
      
      // 价格
      const priceWrap = document.createElement('div');
      priceWrap.className = 'pricewrap';
      
      if (tier.oldPrice) {
        const oldPrice = document.createElement('span');
        oldPrice.className = 'price-old';
        oldPrice.textContent = tier.oldPrice;
        priceWrap.appendChild(oldPrice);
      }
      
      if (tier.price) {
        const newPrice = document.createElement('span');
        newPrice.className = 'price-new';
        newPrice.textContent = tier.price;
        priceWrap.appendChild(newPrice);
      }
      
      topDiv.appendChild(priceWrap);
      tierDiv.appendChild(topDiv);
      
      // 特性列表
      if (tier.features && Array.isArray(tier.features)) {
        const ul = document.createElement('ul');
        ul.className = 'small';
        tier.features.forEach(feature => {
          const li = document.createElement('li');
          li.textContent = feature;
          ul.appendChild(li);
        });
        tierDiv.appendChild(ul);
      }
      
      container.appendChild(tierDiv);
    });
  }
  
  return container;
}

/**
 * 渲染注释
 */
function renderNote(section) {
  const p = document.createElement('p');
  if (section.muted) {
    p.className = 'muted';
  }
  p.textContent = section.content;
  return p;
}

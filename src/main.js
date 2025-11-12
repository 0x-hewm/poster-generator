import './styles/base.css';
import './styles/components.css';
import { parseYAML, validateConfig, mergeWithDefaults } from './core/parser.js';
import { renderPoster } from './core/renderer.js';
import { exportToPNG, exportToJPEG, exportToPDF, exportToHTML, generateFilename } from './core/exporter.js';
import { getThemeNames } from './config/themes.js';

// 全局状态
let currentConfig = null;
let currentYAML = '';

// 初始化应用
async function init() {
  console.log('=== 应用初始化开始 ===');
  console.log('检查 window.jsyaml:', typeof window.jsyaml);
  
  setupEditor();
  console.log('✓ 编辑器设置完成');
  
  setupPreview();
  console.log('✓ 预览设置完成');
  
  setupExportButtons();
  console.log('✓ 导出按钮设置完成');
  
  setupThemeSelector();
  console.log('✓ 主题选择器设置完成');
  
  setupExampleLoader();
  console.log('✓ 示例加载器设置完成');
  
  // 加载默认示例（简单示例，无主题配置，方便演示主题切换）
  console.log('准备加载默认示例: simple');
  await loadExample('simple');
  
  console.log('=== 应用初始化完成 ===');
}

// 设置编辑器
function setupEditor() {
  const editor = document.getElementById('yaml-editor');
  
  // 使用智能防抖：300ms 延迟，但最多 600ms 必须更新一次
  // 这样即使连续输入，也能保证定期更新预览
  editor.addEventListener('input', debounce(() => {
    currentYAML = editor.value;
    updatePreview();
  }, 300, { maxWait: 600 }));
}

// 设置预览
function setupPreview() {
  // 初始渲染
  updatePreview();
}

// 更新预览
function updatePreview() {
  console.log('=== updatePreview 开始 ===');
  const editor = document.getElementById('yaml-editor');
  const container = document.getElementById('poster-container');
  const errorContainer = document.getElementById('error-message');
  
  currentYAML = editor.value;
  console.log('当前 YAML 长度:', currentYAML.length);
  console.log('YAML 前100个字符:', currentYAML.substring(0, 100));
  
  // 检查 js-yaml 是否加载
  console.log('window.jsyaml 存在?', typeof window.jsyaml !== 'undefined');
  console.log('window.jsyaml:', window.jsyaml);
  
  // 解析 YAML
  const parseResult = parseYAML(currentYAML);
  console.log('解析结果:', parseResult);
  
  if (!parseResult.success) {
    showError(`YAML 解析错误: ${parseResult.error}`);
    return;
  }
  
  console.log('解析后的数据:', parseResult.data);
  
  // 验证配置
  const validation = validateConfig(parseResult.data);
  console.log('验证结果:', validation);
  
  if (!validation.valid) {
    showError(`配置验证失败: ${validation.errors.join(', ')}`);
    return;
  }
  
  // 合并默认值
  currentConfig = mergeWithDefaults(parseResult.data);
  
  // 同步主题选择器
  syncThemeSelector();
  
  // 隐藏错误信息
  errorContainer.style.display = 'none';
  
  // 渲染海报
  try {
    renderPoster(currentConfig, container);
  } catch (error) {
    showError(`渲染错误: ${error.message}`);
  }
}

// 显示错误
function showError(message) {
  const errorContainer = document.getElementById('error-message');
  errorContainer.innerHTML = `<strong>错误</strong>${message}`;
  errorContainer.style.display = 'block';
  
  const container = document.getElementById('poster-container');
  container.innerHTML = '';
}

// 设置导出按钮
function setupExportButtons() {
  document.getElementById('btn-export-png').addEventListener('click', async () => {
    const poster = document.getElementById('poster');
    if (!poster) {
      alert('请先生成海报');
      return;
    }
    
    const filename = generateFilename('poster', 'png');
    const result = await exportToPNG(poster, filename, 4);
    
    if (result.success) {
      showToast('PNG 导出成功！');
    } else {
      alert('导出失败：' + result.error);
    }
  });
  
  document.getElementById('btn-export-jpeg').addEventListener('click', async () => {
    const poster = document.getElementById('poster');
    if (!poster) {
      alert('请先生成海报');
      return;
    }
    
    const filename = generateFilename('poster', 'jpg');
    const result = await exportToJPEG(poster, filename, 0.95, 4);
    
    if (result.success) {
      showToast('JPEG 导出成功！');
    } else {
      alert('导出失败：' + result.error);
    }
  });
  
  document.getElementById('btn-export-pdf').addEventListener('click', async () => {
    const poster = document.getElementById('poster');
    if (!poster) {
      alert('请先生成海报');
      return;
    }
    
    const filename = generateFilename('poster', 'pdf');
    const result = await exportToPDF(poster, filename);
    
    if (result.success) {
      showToast('PDF 导出成功！');
    } else {
      alert('导出失败：' + result.error);
    }
  });
  
  document.getElementById('btn-export-html').addEventListener('click', () => {
    const poster = document.getElementById('poster');
    if (!poster) {
      alert('请先生成海报');
      return;
    }
    
    const filename = generateFilename('poster', 'html');
    const result = exportToHTML(poster, currentYAML, filename);
    
    if (result.success) {
      showToast('HTML 导出成功！');
    } else {
      alert('导出失败：' + result.error);
    }
  });
  
  document.getElementById('btn-print').addEventListener('click', () => {
    window.print();
  });
}

// 设置主题选择器
function setupThemeSelector() {
  console.log('=== 设置主题选择器 ===');
  const selector = document.getElementById('theme-selector');
  const themes = getThemeNames();
  
  console.log('可用主题:', themes);
  console.log('主题数量:', themes.length);
  
  themes.forEach(theme => {
    const option = document.createElement('option');
    option.value = theme;
    option.textContent = theme;
    selector.appendChild(option);
    console.log('添加主题选项:', theme);
  });
  
  selector.addEventListener('change', (e) => {
    console.log('主题切换到:', e.target.value);
    if (currentConfig) {
      // 更新配置中的主题
      currentConfig.meta.theme = e.target.value;
      const container = document.getElementById('poster-container');
      // 重新渲染海报
      renderPoster(currentConfig, container);
    } else {
      console.warn('currentConfig 为空，无法切换主题');
    }
  });
  
  console.log('主题选择器设置完成');
}

// 同步主题选择器：根据当前配置的主题更新选择器
function syncThemeSelector() {
  if (!currentConfig || !currentConfig.meta) return;
  
  const selector = document.getElementById('theme-selector');
  const currentTheme = currentConfig.meta.theme || 'light';
  
  console.log('同步主题选择器到:', currentTheme);
  selector.value = currentTheme;
}

// 设置示例加载器
function setupExampleLoader() {
  console.log('=== 设置示例加载器 ===');
  const selector = document.getElementById('example-selector');
  console.log('示例选择器元素:', selector);
  
  selector.addEventListener('change', async (e) => {
    const example = e.target.value;
    console.log('选择示例:', example);
    if (example) {
      await loadExample(example);
    }
  });
  
  console.log('示例加载器设置完成');
}

// 加载示例
async function loadExample(name) {
  console.log('=== 加载示例:', name, '===');
  try {
    const url = `/poster-generator/examples/${name}.yaml`;
    console.log('请求 URL:', url);
    
    const response = await fetch(url);
    console.log('响应状态:', response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const yaml = await response.text();
    console.log('YAML 内容长度:', yaml.length);
    console.log('YAML 前100字符:', yaml.substring(0, 100));
    
    const editor = document.getElementById('yaml-editor');
    editor.value = yaml;
    currentYAML = yaml;
    
    console.log('开始更新预览...');
    updatePreview();
    console.log('示例加载完成');
  } catch (error) {
    console.error('加载示例失败:', error);
    alert('加载示例失败: ' + error.message);
  }
}

// 显示提示
function showToast(message) {
  // 简单的提示实现
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    background: #10b981;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// 防抖函数（带首次立即执行和最大等待时间）
function debounce(func, wait, options = {}) {
  let timeout;
  let lastCallTime = 0;
  const maxWait = options.maxWait || wait * 2; // 最大等待时间，防止长时间不更新
  
  return function executedFunction(...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime;
    
    const later = () => {
      timeout = null;
      lastCallTime = now;
      func(...args);
    };
    
    // 如果超过最大等待时间，立即执行
    if (timeSinceLastCall >= maxWait) {
      clearTimeout(timeout);
      lastCallTime = now;
      func(...args);
      return;
    }
    
    // 否则使用正常的防抖逻辑
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// 启动应用 - 等待 DOM 和 CDN 库加载完成
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 加载完成，等待 CDN 库...');
    // 等待一小段时间确保 CDN 脚本加载完成
    setTimeout(() => {
      console.log('准备初始化应用');
      init();
    }, 100);
  });
} else {
  // DOM 已经加载完成
  console.log('DOM 已就绪，等待 CDN 库...');
  setTimeout(() => {
    console.log('准备初始化应用');
    init();
  }, 100);
}

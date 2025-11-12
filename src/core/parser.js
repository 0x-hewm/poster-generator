/**
 * 解析 YAML 配置
 */
export function parseYAML(yamlString) {
  try {
    console.log('[Parser] 开始解析 YAML');
    console.log('[Parser] YAML 字符串长度:', yamlString?.length);
    
    // js-yaml CDN 加载后，全局变量可能是 window.jsyaml 或 window.YAML
    const yaml = window.jsyaml || window.YAML;
    
    console.log('[Parser] window.jsyaml:', typeof window.jsyaml);
    console.log('[Parser] window.YAML:', typeof window.YAML);
    console.log('[Parser] 使用的 yaml 对象:', yaml);
    
    if (!yaml || typeof yaml.load !== 'function') {
      throw new Error('js-yaml 库未正确加载。请检查 CDN 链接或网络连接。');
    }
    
    const data = yaml.load(yamlString);
    console.log('[Parser] 解析成功，数据:', data);
    
    return { success: true, data };
  } catch (error) {
    console.error('[Parser] 解析错误:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 验证配置结构
 */
export function validateConfig(config) {
  console.log('[Parser] 开始验证配置');
  console.log('[Parser] 配置对象:', config);
  console.log('[Parser] 配置类型:', typeof config);
  
  const errors = [];
  
  if (!config) {
    errors.push('配置对象为空');
    return { valid: false, errors };
  }
  
  if (!config.meta) {
    errors.push('缺少 meta 配置');
  }
  
  if (!config.sections || !Array.isArray(config.sections)) {
    errors.push('缺少 sections 配置或格式不正确');
  }
  
  console.log('[Parser] 验证结果 - 错误:', errors);
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * 合并默认配置
 */
export function mergeWithDefaults(config) {
  const defaults = {
    meta: {
      width: 400,
      theme: 'light'
    },
    sections: []
  };
  
  return {
    ...defaults,
    ...config,
    meta: {
      ...defaults.meta,
      ...config.meta
    }
  };
}

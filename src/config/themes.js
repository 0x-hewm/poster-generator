// 主题配置
export const themes = {
  light: {
    name: '亮色主题',
    colors: {
      bg: '#ffffff',
      fg: '#0f172a',
      fgSub: '#475569',
      border: '#e5e7eb',
      card: '#f8fafc',
      accent: '#4f46e5',
      accent2: '#0891b2'
    },
    background: {
      type: 'gradient',
      base: '#ffffff',
      gradients: [
        {
          position: '85% 8%',
          color: 'rgba(79, 70, 229, 0.14)',
          size: '480px 360px'
        },
        {
          position: '15% 92%',
          color: 'rgba(8, 145, 178, 0.14)',
          size: '520px 380px'
        }
      ]
    }
  },

  dark: {
    name: '暗色主题',
    colors: {
      bg: '#0f172a',
      fg: '#f1f5f9',
      fgSub: '#94a3b8',
      border: '#334155',
      card: '#1e293b',
      accent: '#818cf8',
      accent2: '#22d3ee'
    },
    background: {
      type: 'gradient',
      base: '#0f172a',
      gradients: [
        {
          position: '85% 8%',
          color: 'rgba(129, 140, 248, 0.15)',
          size: '480px 360px'
        },
        {
          position: '15% 92%',
          color: 'rgba(34, 211, 238, 0.15)',
          size: '520px 380px'
        }
      ]
    }
  },

  tech: {
    name: '科技风',
    colors: {
      bg: '#0a0e27',
      fg: '#e0f2fe',
      fgSub: '#7dd3fc',
      border: '#1e3a8a',
      card: '#0c1e3d',
      accent: '#0ea5e9',
      accent2: '#06b6d4'
    },
    background: {
      type: 'gradient',
      base: '#0a0e27',
      gradients: [
        {
          position: '50% 0%',
          color: 'rgba(14, 165, 233, 0.2)',
          size: '600px 400px'
        },
        {
          position: '50% 100%',
          color: 'rgba(6, 182, 212, 0.2)',
          size: '600px 400px'
        }
      ],
      pattern: 'grid' // 网格背景
    }
  },

  gradient: {
    name: '渐变主题',
    colors: {
      bg: '#ffffff',
      fg: '#1e1b4b',
      fgSub: '#6366f1',
      border: '#e9d5ff',
      card: '#faf5ff',
      accent: '#8b5cf6',
      accent2: '#ec4899'
    },
    background: {
      type: 'gradient',
      base: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      gradients: []
    }
  },

  minimal: {
    name: '极简主题',
    colors: {
      bg: '#ffffff',
      fg: '#000000',
      fgSub: '#666666',
      border: '#e0e0e0',
      card: '#f5f5f5',
      accent: '#000000',
      accent2: '#333333'
    },
    background: {
      type: 'solid',
      base: '#ffffff',
      gradients: []
    }
  },

  ocean: {
    name: '海洋主题',
    colors: {
      bg: '#ecfeff',
      fg: '#0c4a6e',
      fgSub: '#0e7490',
      border: '#a5f3fc',
      card: '#cffafe',
      accent: '#0891b2',
      accent2: '#06b6d4'
    },
    background: {
      type: 'gradient',
      base: '#ecfeff',
      gradients: [
        {
          position: '80% 10%',
          color: 'rgba(6, 182, 212, 0.2)',
          size: '500px 400px'
        },
        {
          position: '20% 90%',
          color: 'rgba(8, 145, 178, 0.2)',
          size: '500px 400px'
        }
      ]
    }
  },

  sunset: {
    name: '日落主题',
    colors: {
      bg: '#fff7ed',
      fg: '#7c2d12',
      fgSub: '#c2410c',
      border: '#fed7aa',
      card: '#ffedd5',
      accent: '#f97316',
      accent2: '#ea580c'
    },
    background: {
      type: 'gradient',
      base: 'linear-gradient(180deg, #fff7ed 0%, #fed7aa 50%, #fdba74 100%)',
      gradients: []
    }
  },

  forest: {
    name: '森林主题',
    colors: {
      bg: '#f0fdf4',
      fg: '#14532d',
      fgSub: '#15803d',
      border: '#bbf7d0',
      card: '#dcfce7',
      accent: '#16a34a',
      accent2: '#15803d'
    },
    background: {
      type: 'gradient',
      base: '#f0fdf4',
      gradients: [
        {
          position: '75% 15%',
          color: 'rgba(22, 163, 74, 0.15)',
          size: '450px 350px'
        },
        {
          position: '25% 85%',
          color: 'rgba(21, 128, 61, 0.15)',
          size: '450px 350px'
        }
      ]
    }
  },

  corporate: {
    name: '企业主题',
    colors: {
      bg: '#f8fafc',
      fg: '#1e3a8a',
      fgSub: '#3b82f6',
      border: '#dbeafe',
      card: '#eff6ff',
      accent: '#2563eb',
      accent2: '#1d4ed8'
    },
    background: {
      type: 'solid',
      base: '#f8fafc',
      gradients: [
        {
          position: '90% 5%',
          color: 'rgba(37, 99, 235, 0.08)',
          size: '400px 300px'
        }
      ]
    }
  },

  creative: {
    name: '创意主题',
    colors: {
      bg: '#ffffff',
      fg: '#18181b',
      fgSub: '#71717a',
      border: '#e4e4e7',
      card: '#fafafa',
      accent: '#f43f5e',
      accent2: '#8b5cf6'
    },
    background: {
      type: 'gradient',
      base: '#ffffff',
      gradients: [
        {
          position: '70% 20%',
          color: 'rgba(244, 63, 94, 0.12)',
          size: '400px 400px'
        },
        {
          position: '30% 80%',
          color: 'rgba(139, 92, 246, 0.12)',
          size: '400px 400px'
        },
        {
          position: '90% 60%',
          color: 'rgba(251, 146, 60, 0.1)',
          size: '300px 300px'
        }
      ]
    }
  }
};

// 获取主题
export function getTheme(themeName) {
  return themes[themeName] || themes.light;
}

// 获取所有主题名称
export function getThemeNames() {
  return Object.keys(themes);
}

// 应用主题到指定元素的 CSS 变量（仅应用于海报，不影响整个页面）
export function applyTheme(themeName, element = null) {
  const theme = getTheme(themeName);
  
  // 如果指定了元素，只在该元素上设置 CSS 变量
  // 否则设置到根元素（向后兼容，但不推荐）
  const targetElement = element || document.documentElement;
  
  // 设置 CSS 变量
  targetElement.style.setProperty('--bg', theme.colors.bg);
  targetElement.style.setProperty('--fg', theme.colors.fg);
  targetElement.style.setProperty('--fg-sub', theme.colors.fgSub);
  targetElement.style.setProperty('--border', theme.colors.border);
  targetElement.style.setProperty('--card', theme.colors.card);
  targetElement.style.setProperty('--accent', theme.colors.accent);
  targetElement.style.setProperty('--accent2', theme.colors.accent2);
  
  return theme;
}

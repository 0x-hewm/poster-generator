# 🎨 海报生成器 (Poster Generator)

> 可配置的 YAML 驱动海报生成器，支持多主题和多格式导出

[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-brightgreen)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ 特性

- 📝 **YAML 配置** - 简洁的 YAML 语法，易于编写和维护
- 🎨 **多主题支持** - 10+ 精美预设主题（亮色、暗色、科技风、渐变等）
- 🖼️ **多格式导出** - 支持 PNG、JPEG、PDF、HTML 格式
- 👁️ **实时预览** - 编辑即预览，所见即所得
- 📱 **响应式设计** - 完美适配各种屏幕尺寸
- 🚀 **纯前端** - 无需后端，可直接部署到 GitHub Pages
- 📦 **开箱即用** - 提供 7+ 实用示例模板

## 🎯 适用场景

- 📚 课程海报
- 🛍️ 产品介绍
- 🎉 活动宣传
- 💰 定价方案
- 📄 个人简历
- 🎨 作品集
- 📢 公告通知

## 🚀 快速开始

### 安装依赖

```bash
yarn install
```

### 启动开发服务器

```bash
yarn dev
```

访问 `http://localhost:3000` 即可开始使用。

### 构建生产版本

```bash
yarn build
```

构建产物将生成在 `dist` 目录。

### 部署到 GitHub Pages

```bash
yarn deploy
```

或者推送到 main 分支，GitHub Actions 会自动部署。

## 📖 YAML 配置说明

### 基础结构

```yaml
meta:
  title: "海报标题"      # 可选，海报标题
  width: 400             # 可选，海报宽度（默认 400）
  theme: "light"         # 可选，主题名称（默认 light）
                         # 也可以不设置，使用界面上的主题选择器动态切换

sections:
  - type: "title"
    content: "标题文本"
    
  - type: "section"
    title: "区块标题"
    content: "区块内容"
    items:
      - "列表项1"
      - "列表项2"
```

### Meta 配置说明

- **title**: （可选）海报标题，用于文件名等
- **width**: （可选）海报宽度，默认 400px
- **theme**: （可选）初始主题，默认 'light'
  - ⚠️ **建议**：可以省略 `theme` 字段，直接使用界面右上角的主题选择器来动态切换主题
  - 如果设置了 theme，会作为初始主题显示
  - 在界面切换主题不会修改 YAML 配置

### 支持的区块类型

#### 1. 标题 (title)

```yaml
- type: "title"
  content: "主标题"
```

#### 2. 内容区块 (section)

```yaml
- type: "section"
  title: "标题"
  content: "段落内容"
  items:
    - "列表项1"
    - "列表项2"
  subsections:
    - subtitle: "子标题"
      description: "描述"
      items:
        - "子列表项"
```

#### 3. 定价模块 (pricing)

```yaml
- type: "pricing"
  title: "定价方案"
  tiers:
    - name: "基础版"
      badge: "推荐"
      highlight: true
      price: "¥99"
      oldPrice: "¥199"
      features:
        - "功能1"
        - "功能2"
```

#### 4. 注释 (note)

```yaml
- type: "note"
  content: "注释内容"
  muted: true  # 是否使用弱化样式
```

## 🎨 预设主题

| 主题 | 说明 | 适用场景 |
|------|------|----------|
| `light` | 亮色主题 | 通用 |
| `dark` | 暗色主题 | 科技、游戏 |
| `tech` | 科技风 | 科技产品、编程 |
| `gradient` | 渐变主题 | 创意、艺术 |
| `minimal` | 极简主题 | 简历、文档 |
| `ocean` | 海洋主题 | 清新、自然 |
| `sunset` | 日落主题 | 温暖、活力 |
| `forest` | 森林主题 | 环保、健康 |
| `corporate` | 企业主题 | 商务、正式 |
| `creative` | 创意主题 | 设计、艺术 |

## 📦 示例文件

项目提供了 7 个完整的示例文件：

1. `course.yaml` - 课程海报示例
2. `product.yaml` - 产品介绍示例
3. `event.yaml` - 活动宣传示例
4. `pricing.yaml` - 定价方案示例
5. `resume.yaml` - 个人简历示例
6. `portfolio.yaml` - 作品集示例
7. `announcement.yaml` - 公告通知示例

## 🛠️ 技术栈

- **构建工具**: Vite 5.x
- **包管理**: Yarn
- **解析器**: js-yaml
- **导出库**: html2canvas, jsPDF
- **部署**: GitHub Pages

## 📝 导出格式

### PNG
- 高清 4x 分辨率
- 透明背景支持
- 适合社交媒体分享

### JPEG
- 可调节质量
- 文件大小更小
- 适合打印

### PDF
- 矢量格式
- 可无限缩放
- 适合正式文档

### HTML
- 单文件导出
- 内联所有样式
- 可在线分享

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT License

## 🙏 致谢

感谢所有开源项目的贡献者！

---

Made with ❤️ by [Your Name]

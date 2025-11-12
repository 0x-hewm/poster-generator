# 📘 使用指南

## 快速开始

### 1. 安装依赖

在项目根目录运行：

```bash
cd poster-generator
yarn install
```

### 2. 启动开发服务器

```bash
yarn dev
```

浏览器会自动打开 `http://localhost:3000`

### 3. 选择示例或创建新海报

- 左侧是 YAML 编辑器
- 右侧是实时预览区
- 点击"选择示例"下拉菜单加载预设模板

## 基础操作

### 编辑 YAML

在左侧编辑器中输入 YAML 配置，右侧会实时预览效果。

```yaml
meta:
  title: "我的第一个海报"
  width: 400
  theme: "light"

sections:
  - type: "title"
    content: "Hello World"
    
  - type: "section"
    title: "简介"
    content: "这是我的第一个海报"
```

### 切换主题

1. 在预览区顶部找到"主题"下拉菜单
2. 选择您喜欢的主题
3. 预览会立即更新

### 导出海报

预览区顶部提供多种导出选项：

- **导出 PNG**: 高清 PNG 图片（4x 分辨率）
- **导出 JPEG**: JPEG 图片（可调质量）
- **导出 PDF**: PDF 文档（适合打印）
- **导出 HTML**: 单文件 HTML（可分享）
- **打印**: 直接打印或另存为 PDF

## 高级用法

### 自定义宽度

```yaml
meta:
  width: 600  # 默认 400px
```

### 复杂布局

```yaml
sections:
  - type: "section"
    title: "主标题"
    subsections:
      - subtitle: "子标题 1"
        description: "描述文本"
        items:
          - "项目 1"
          - "项目 2"
      - subtitle: "子标题 2"
        items:
          - "项目 3"
```

### 定价表格

```yaml
sections:
  - type: "pricing"
    title: "价格方案"
    tiers:
      - name: "基础版"
        badge: "热门"
        highlight: true
        price: "¥99"
        oldPrice: "¥199"
        features:
          - "功能 1"
          - "功能 2"
```

## 部署到 GitHub Pages

### 方法 1: 自动部署（推荐）

1. 在 GitHub 上创建仓库
2. 推送代码到 main 分支
3. 在仓库设置中启用 GitHub Pages
4. GitHub Actions 会自动构建和部署

### 方法 2: 手动部署

```bash
yarn build
yarn deploy
```

### 配置基础路径

如果部署到子路径（如 `username.github.io/poster-generator`），需要修改 `vite.config.js`:

```js
export default defineConfig({
  base: '/poster-generator/',  // 修改为您的仓库名
  // ...
})
```

## 常见问题

### Q: 如何添加图片？

A: 当前版本暂不支持图片，建议使用 Emoji 或文字描述。

### Q: 导出的图片模糊？

A: 确保选择"导出 PNG"选项，它使用 4x 分辨率确保清晰度。

### Q: 可以自定义字体吗？

A: 目前使用系统默认字体，未来版本会支持自定义字体。

### Q: YAML 语法错误怎么办？

A: 检查缩进（使用 2 个空格），确保所有字符串正确引用，参考示例文件。

### Q: 主题可以自定义吗？

A: 当前版本提供 10 个预设主题，未来会支持自定义主题。

## 技巧和最佳实践

1. **使用示例**: 从示例开始修改比从头编写更快
2. **保存配置**: 定期复制 YAML 内容到本地保存
3. **主题选择**: 不同主题适合不同场景，多尝试
4. **内容精简**: 保持内容简洁，避免信息过载
5. **测试导出**: 导出前在预览中仔细检查

## 键盘快捷键

- `Ctrl/Cmd + S`: 保存当前配置（浏览器下载）
- `Ctrl/Cmd + P`: 打印预览
- `Ctrl/Cmd + +/-`: 缩放预览

## 获取帮助

- 📖 查看示例文件
- 💬 提交 GitHub Issue
- 📧 联系开发者

---

Happy Designing! 🎨

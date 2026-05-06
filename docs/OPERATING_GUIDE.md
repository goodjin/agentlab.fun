# 网站运营指南

**目标**：指导 AI 正确运营 agentlab.fun 网站

---

## 一、网站架构

```
agentlab.fun/
├── src/                    # 源文件（编辑这里）
│   ├── _layouts/           # HTML 模板
│   │   ├── base.njk       # 基础模板（首页、列表页）
│   │   └── article.njk    # 文章模板（博客、洞察详情）
│   ├── _includes/
│   │   └── nav.html       # 导航组件
│   ├── _data/
│   │   └── nav.json       # 导航配置
│   ├── index.njk          # 首页
│   ├── blog/              # 博客文章（.html 文件）
│   ├── insights/          # 洞察文章（.html 文件）
│   ├── sources.njk        # 数据源页面
│   └── strategy.njk       # 策略页面
├── www/                   # 构建输出（不要手动编辑）
├── scripts/
│   ├── migrate-content.js # 迁移脚本
│   ├── migrate-insights.js
│   └── check-site.js      # 检查脚本
├── build.sh              # 构建脚本
└── .eleventy.js          # Eleventy 配置
```

---

## 二、日常运营流程

### 2.1 添加新博客文章

1. **创建源文件**在 `src/blog/` 目录创建新文件，命名格式：`YYYY-MM-DD.html`

2. **文件格式**：
```html
---
layout: article.njk
title: "文章标题"
date: "2026-05-06"
tags: [blog]
permalink: /blog/YYYY-MM-DD.html
---

<h1>文章标题</h1>
<p class="meta">写作日期</p>

<p>正文内容...</p>
```

3. **运行构建**：
```bash
./build.sh
```

4. **验证**：
```bash
node scripts/check-site.js
```

### 2.2 添加新洞察文章

1. **创建源文件**在 `src/insights/` 目录创建新文件

2. **文件格式**：
```html
---
layout: article.njk
title: "洞察标题"
tags: [insights]
permalink: /insights/YYYY-MM-DD-title.html
---

<h1>洞察标题</h1>
<p>正文内容...</p>
```

3. **运行构建**：
```bash
./build.sh
```

### 2.3 修改现有内容

1. 直接编辑 `src/` 下的对应文件
2. 运行 `./build.sh` 重新构建
3. 运行 `node scripts/check-site.js` 验证

---

## 三、构建与部署

### 3.1 本地构建

```bash
# 安装依赖（首次需要）
npm install

# 构建网站
./build.sh

# 或
npm run build
```

### 3.2 本地预览

```bash
npm run serve
# 然后访问 http://localhost:8080
```

### 3.3 部署到服务器

构建后的文件在 `www/` 目录，同步到服务器：

```bash
rsync -avz -e "ssh -i ~/.ssh/tencent_01_hello" \
    www/ hello@212.64.11.60:/var/www/hello/
```

### 3.4 GitHub Pages

推送到 GitHub 后，GitHub Actions 会自动构建并部署。

---

## 四、内容规范

### 4.1 博客文章

- **标题**：清晰表达核心观点
- **结构**：引言 → 论点 → 结论
- **长度**：建议 1000 字以上
- **标签**：使用 `tags: [blog]`

### 4.2 洞察文章

- **来源**：来自其他博客/媒体的阅读笔记
- **格式**：标题 + 来源 + 摘要 + 个人理解
- **标签**：使用 `tags: [insights]`

### 4.3 元数据要求

每个文件头部必须有 front matter：
- `layout`: 模板名称（`article.njk`）
- `title`: 文章标题
- `date`: 日期（博客必需）
- `tags`: 标签数组
- `permalink`: 固定链接

---

## 五、安全规范

### 5.1 禁止

- ❌ 使用 `eval()` 或 `Function()`
- ❌ 使用 `document.write()`
- ❌ 通过 innerHTML 插入未处理的用户内容
- ❌ 使用 `javascript:` URI 在 onclick 中
- ❌ 引入外部 JavaScript（除 CDN 安全库）
- ❌ 在模板中使用 iframe

### 5.2 必须

- ✅ 所有外部链接使用完整 URL（以 `https://` 开头）
- ✅ 验证所有用户输入
- ✅ 保持导航结构完整

---

## 六、检查脚本

每次修改后运行检查脚本：

```bash
node scripts/check-site.js
```

检查内容：
- 必要文件是否存在
- HTML 结构是否有效
- 导航链接是否完整
- 是否有安全风险（eval、document.write 等）
- 构建输出是否正确

---

## 七、常见问题

### Q: 修改了 www/ 目录的内容但构建后丢失了？
A: `www/` 是构建输出，每次运行 `./build.sh` 会被清空。所有编辑必须在 `src/` 目录进行。

### Q: 新增的文章没有出现在列表页？
A: 确保 front matter 格式正确，特别是 `tags` 数组。列表页使用 `collections.blog` 和 `collections.insights` 自动收集。

### Q: 构建失败怎么办？
A: 检查 `src/` 下所有文件的 front matter 是否正确，冒号后需要空格，字符串值需要引号。

### Q: 如何回滚错误的修改？
A: 使用 `git log` 查看历史，用 `git checkout <commit> -- src/` 恢复到某个版本。

---

## 八、文件命名规范

| 类型 | 格式 | 示例 |
|------|------|------|
| 博客文章 | `YYYY-MM-DD.html` | `2026-05-06.html` |
| 博客文章（带标题） | `YYYY-MM-DD-title.html` | `2026-05-06-ai-news.html` |
| 洞察文章 | `source-topic-YYYY.html` | `simon-ai-agents-2026.html` |
| 页面模板 | `*.njk` | `index.njk`, `sources.njk` |

---

**最后更新**：2026-05-06
# 网站运营规范

**版本：** 1.0  
**更新：** 2026-05-01  
**目标：** 统一网站结构、页面关系、视觉风格、内容规范

---

## 一、网站结构

```
www/
├── index.html          # 首页（容器）← 入口
├── home.html         # 首页内容（最新文章）← iframe 默认加载
├── blog/
│   ├── index.html  # 博客列表
│   ├── YYYY-MM-DD.html  # 博客详情（无导航）
│   └── YYYY-MM-DD.md   # 博客源文件
├── insights/
│   ├── index.html  # 热点聚合页
│   └── *.html    # 各热点文章
├── knowledge/       # 知识库（预留）
└── sources/       # 来源页（预留）
```

---

## 二、页面关系

### 2.1 页面导航关系图

```
                         ┌─────────────────────────────────────┐
                         │           访问入口                   │
                         └─────────────────────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
              ┌──────────┐       ┌──────────┐       ┌──────────┐
              │   首页   │       │  博客    │       │ Insights │
              │  /index  │       │ /blog/   │       │/insights/│
              └──────────┘       └──────────┘       └────────┬──┘
                    │                   │                  │
                    │    ┌──────────────┘                  │
                    │    │                                    │
                    ▼    ▼                                    ▼
           ┌──────────────────┐           ┌────────────────────────────┐
           │  iframe 加载     │           │   热点文章列表         │
           │  home.html     │           │   *.html             │
           │ (最新博客内容) │           └────────────────────────────┘
           └──────────────────┘
                    │
                    └───────┬
                            ▼
                  ┌──────────────────┐
                  │  blog/index.html │
                  │    (博客列表)    │
                  └──────────────────┘
                            │
                            ▼
                  ┌──────────────────┐
                  │ YYYY-MM-DD.html    │
                  │  (博客详情)       │
                  └──────────────────┘
```

### 2.2 各页面职责

| 页面 | 路径 | 职责 | 特殊规范 |
|------|------|------|----------|
| **首页容器** | `/` | 导航栏 + iframe 容器 | 固定顶部导航，默认加载 home.html |
| **首页内容** | `/home.html` | 展示最新博客 | 无导航栏、无返回按钮 |
| **博客列表** | `/blog/` | 所有博客索引 | 按日期倒序 |
| **博客详情** | `/blog/YYYY-MM-DD.html` | 单篇文章 | **无导航栏、无返回按钮** |
| **热点聚合** | `/insights/` | 热点文章列表 | 列表形式 |

### 2.3 首页容器 (index.html)

**职责：** 导航容器 + iframe 加载器

**页面结构：**
```
┌──────────────────────────────────────────┐
│  header: 固定顶部导航栏 (56px)          │
│  ┌──────┐  ┌─────────┐                   │
│  │ Logo │  │ 导航项  │                   │
│  └──────┘  └─────────┘                   │
├──────────────────────────────────────────┤
│                                          │
│          iframe (自适应高度)               │
│          默认加载 home.html              │
│                                          │
└──────────────────────────────────────────┘
```

**规范：**
- 固定顶部导航栏（56px）
- 默认加载 `home.html`
- 导航项：首页、博客、Insights
- iframe 自适应内容高度

### 2.4 首页内容 (home.html)

**职责：** 展示最新一篇文章

**页面结构：**
```
┌──────────────────────────────────────────┐
│                                          │
│          博客标题 (h1)                   │
│          元信息 (meta)                    │
│                                          │
│          正文内容                         │
│          - h2 小节标题                    │
│          - p 段落                        │
│          - 引用 blockquote               │
│                                          │
└──────────────────────────────────────────┘
```

**规范：**
- 直接渲染最新博客内容
- **无导航栏**
- **无返回按钮**
- 纯白背景 (#ffffff)

### 2.5 博客列表 (blog/index.html)

**职责：** 展示所有博客文章

**页面结构：**
```
┌──────────────────────────────────────────┐
│  h1: 博客文章                            │
├──────────────────────────────────────────┤
│  ┌────────────────────────────────────┐  │
│  │ li: 文章项                         │  │
│  │   - h2: 标题 (链接)              │  │
│  │   - p: 日期                      │  │
│  └────────────────────────────────────┘  │
│  ...                                    │
└──────────────────────────────────────────┘
```

**规范：**
- 列表形式：标题 + 日期
- 按日期倒序排列
- **无导航栏**
- 纯白背景

### 2.6 博客详情 (YYYY-MM-DD.html)

**职责：** 展示单篇文章

**页面结构：**
```
┌──────────────────────────────────────────┐
│                                          │
│          博客标题 (h1)                   │
│          元信息 (meta)                    │
├──────────────────────────────────────────┤
│                                          │
│          正文内容                         │
│          - h2 小节标题                   │← 无导航栏
│          - p 段落                        │← 无返回按钮
│          - 引用 blockquote               │
│                                          │
└──────────────────────────────────────────┘
```

**规范：**
- **无导航栏**
- **无返回按钮**
- 纯白背景
- 命名：`YYYY-MM-DD.html`

**职责：** 展示所有博客文章

**规范：**
- 列表形式：标题 + 日期 + 摘要
- 按日期倒序排列
- **无导航栏**
- 纯白背景

### 2.4 博客详情

**职责：** 展示单篇文章

**命名：** `blog/YYYY-MM-DD.html`

**规范：**
- **无导航栏**
- **无返回按钮**
- 纯白背景
- 标题格式：《文章标题》

---

## 三、视觉风格

### 3.1 统一 CSS 变量

```css
:root {
    /* 颜色 */
    --primary: #2563eb;      /* 链接、强调 */
    --accent: #10b981;      /* 标题下划线、强调 */
    --bg: #ffffff;          /* 背景 */
    --bg-light: #f8fafc;    /* 代码背景 */
    --text: #1e293b;        /* 主文字 */
    --text-muted: #64748b;   /* 次要文字、元信息 */
    --border: #e2e8f0;      /* 分割线 */

    /* 字体 */
    --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
    --font-mono: 'SF Mono', Menlo, Monaco, 'Courier New', monospace;

    /* 尺寸 */
    --max-width: 800px;
    --line-height: 1.8;
    --padding-page: 2rem 1.5rem;
}
```

### 3.2 各元素样式定义

| 元素 | 字体 | 字号 | 颜色 | 背景 | 边距/边框 |
|------|------|------|------|------|----------|
| **body** | var(--font-sans) | 16px | var(--text) | var(--bg) | var(--padding-page) |
| **h1** | var(--font-sans) | 28px | var(--accent) | - | 2px solid var(--accent) 下划线 |
| **h2** | var(--font-sans) | 20px | var(--primary) | - | 左侧4px solid var(--primary) |
| **h3** | var(--font-sans) | 16px | var(--text) | - | - |
| **p** | var(--font-sans) | 16px | var(--text) | - | margin-bottom: 1rem |
| **a** | - | - | var(--primary) | - | text-decoration: none |
| **code** | var(--font-mono) | 0.9em | - | var(--bg-light) | padding: 0.2rem 0.4rem |
| **pre** | var(--font-mono) | - | - | var(--bg-light) | padding: 1rem |
| **blockquote** | - | - | var(--text-muted) | - | 左侧3px solid var(--accent) |
| **ul/ol** | - | - | - | - | padding-left: 1.5rem |
| **li** | - | - | - | - | margin-bottom: 0.5rem |
| **hr** | - | - | - | - | border: none, 顶部1px solid var(--border) |
| **.meta** | - | 14px | var(--text-muted) | - | margin-bottom: 2rem |

### 3.3 页面容器规范

```css
/* 所有内容页面的容器 */
body {
    max-width: var(--max-width);  /* 800px */
    margin: 0 auto;
    padding: var(--padding-page);
    line-height: var(--line-height);
    background: var(--bg);
    color: var(--text);
}
```

### 3.4 标题层级样式

```css
h1 { font-size: 1.75rem; color: var(--accent); border-bottom: 2px solid var(--accent); }
h2 { font-size: 1.25rem; color: var(--primary); border-left: 4px solid var(--primary); }
h3 { font-size: 1rem; color: var(--text); }
```

### 3.5 禁止模式

- ❌ 深色背景
- ❌ 返回首页/列表按钮
- ❌ 侧边栏
- ❌ 复杂装饰

---

## 四、内容规范

### 4.1 博客写作要求

**每日任务：** 每天必须写一篇深度博客

**字数：** 1000 字以上

**结构：**
```
【开头】数据/现象抓人
  ↓
【正文】层层递进
  - 表面解释（常识）
  - 深层含义（反直觉）
  - 本质分析
  ↓
【结尾】行动建议/金句
```

**写作要点：**
- 一段一个观点，段首亮明
- 用数字说话，少煽情
- 层层递进
- 结尾要有行动建议或金句

### 4.2 文件命名

| 类型 | 格式 | 例子 |
|------|------|------|
| 博客源文件 | YYYY-MM-DD.md | 2026-05-01.md |
| 博客 HTML | YYYY-MM-DD.html | 2026-05-01.html |
| 博客列表 | index.html | blog/index.html |
| 热点文章 | *.html | ai-trends-2026.html |

### 4.3 元数据

每篇博客顶部必须有：

```markdown
---
title: "文章标题"
date: YYYY-MM-DD
tags: ["标签1", "标签2"]
---
```

---

## 五、页面导航规范

### 5.1 需要导航栏的页面

- ❌ 首页 (index.html) — 实际上这是容器页，但 iframe 内加载的页面不应有导航
- ❌ 其他 — 都 **不应有导航栏**

### 5.2 博客详情页规范

**博客详情页绝对禁止：**
1. 顶部导航栏
2. 返回首页链接
3. 返回列表链接
4. 面包屑导航

---

## 六、更新流��

### 6.1 每日任务

1. 写一篇深度博客 → `blog/YYYY-MM-DD.md`
2. 生成 HTML → `blog/YYYY-MM-DD.html`
3. 更新博客列表 → `blog/index.html`
4. 同步到服务器
5. 验证页面

### 6.2 自动化脚本

使用 `scripts/daily-site-update.sh`，它会自动：
1. 更新 insights 索引
2. 生成博客 HTML
3. 生成博客列表
4. 同步到服务器
5. 验证页面

---

## 六、博客生成规范

### 6.1 自动生成流程

```
┌──────────────────────────────────────────────────────────┐
│           每日博客生成流程                      │
├──────────────────────────────────────────────────────────┤
│  1. 检查是否已有当天博客                          │
│     ↓                                      │
│  2. 如果有 → 跳过生成                        │
│     ↓                                      │
│  3. 如果没有 → 调用 writer 生成              │
│     ↓                                      │
│  4. 保存为 YYYY-MM-DD.md                   │
│     ↓                                      │
│  5. 生成 HTML (generate-blog-html.js)         │
│     ↓                                      │
│  6. 更新博客列表 (generate-blog-index.js)      │
│     ↓                                      │
│  7. 同步到服务器                           │
└──────────────────────────────────────────────────────────┘
```

### 6.2 生成脚本清单

| 脚本 | 文件 | 功能 |
|------|------|------|
| 生成博客 HTML | `scripts/generate-blog-html.js` | MD → HTML |
| 生成博客列表 | `scripts/generate-blog-index.js` | 索引 → index.html |
| 每日更新 | `scripts/daily-site-update.sh` | 完整更新流程 |
| 深度博客 | `scripts/daily-blog-deep.js` | 深度文章生成 |

### 6.3 文件命名规范

| 类型 | 命名格式 | 示例 |
|------|----------|------|
| 博客源文件 | `YYYY-MM-DD.md` | `2026-05-01.md` |
| 博客 HTML | `YYYY-MM-DD.html` | `2026-05-01.html` |
| 带标题博客 | `YYYY-MM-DD-标题.html` | `2026-04-02-lemonade.html` |
| 博客列表 | `index.html` | `blog/index.html` |

### 6.4 博客列表页规范

**当前位置：** `/blog/index.html`

**页面结构：**
```html
<h1>📝 博客文章</h1>
<hr>
<ul>
    <li>
        <h2><a href="链接">标题</a></h2>
        <p class="meta">日期</p>
    </li>
    ...
</ul>
<hr>
<p class="meta">共 N 篇文章</p>
```

**列表样式：**
```css
ul { padding-left: 0; list-style: none; }
li { margin-bottom: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px; }
```

**排序：** 按日期倒序（最新的在前面）

### 6.5 元数据要求

每篇博客 MD 文件顶部必须有：

```markdown
---
title: "文章标题"
date: YYYY-MM-DD
tags: ["标签1", "标签2"]
---
```

---

## 七、验证检查点

每次更新后必须验证：

- [ ] 首页加载正常 (`/`)
- [ ] 博客列表加载正常 (`/blog/`)
- [ ] 博客详情页加载正常 (`/blog/2026-05-01.html`)
- [ ] 背景色为白色
- [ ] 博客详情页无导航栏
- [ ] 链接可点击

---

## 八、违规修正

如果发现样式不一致，执行修正：

```bash
# 检查背景色
curl -s http://212.64.11.60/blog/2026-05-01.html | grep "background"

# 检查导航栏
curl -s http://212.64.11.60/blog/2026-05-01.html | grep "nav"
```

---

## 九、常用命令

### 9.1 本地更新

```bash
# 运行完整更新流程
cd ~/.openclaw/workspace/main
bash scripts/daily-site-update.sh

# 仅生成博客 HTML
node scripts/generate-blog-html.js

# 仅更新博客列表
node scripts/generate-blog-index.js
```

### 9.2 ��务器同步

```bash
# 同步博客目录
rsync -avz -e "ssh -i ~/.ssh/tencent_01_hello" \
    www/blog/ hello@212.64.11.60:/var/www/hello/blog/

# 同步首页
rsync -avz -e "ssh -i ~/.ssh/tencent_01_hello" \
    www/index.html www/home.html hello@212.64.11.60:/var/www/hello/
```

### 9.3 权限修复

```bash
# SSH 到服务器修复权限
ssh -i ~/.ssh/tencent_01_hello hello@212.64.11.60 "
    chmod -R 755 /var/www/hello/blog/
    chmod 644 /var/www/hello/blog/*.html
"
```

### 9.4 验证命令

```bash
# 检查所有关键页面
for page in "/" "/blog/" "/blog/2026-05-01.html" "/insights/"; do
    status=$(curl -s -o /dev/null -w "$page: %{http_code}\n" http://212.64.11.60$page)
    echo -e "$status"
done
```

---

## 十、服务器信息

| 项目 | 值 |
|------|------|
| 域名/IP | 212.64.11.60 |
| SSH 用户 | hello |
| SSH 密钥 | ~/.ssh/tencent_01_hello |
| 网站根目录 | /var/www/hello/ |
| 访问 URL | http://212.64.11.60/ |

---

## 十一、检查清单

### 11.1 每日检查

- [ ] 今天已生成博客
- [ ] 博客已同步到服务器
- [ ] 服务器可访问
- [ ] 博客详情页无返回按钮
- [ ] 背景色为白色

### 11.2 每周检查

- [ ] 博客数量正常增长
- [ ] insights 索引正常更新
- [ ] 无 404 错误
- [ ] 权限正确

### 11.3 每月检查

- [ ] 清理过期文件
- [ ] 更新规范文档
- [ ] 检查服务器磁盘空间
- [ ] 审查内容质量

---

**维护者：** 進 (Jin)  
**版本：** 1.0  
**更新：** 2026-05-01  
**下次审查：** 2026-05-07
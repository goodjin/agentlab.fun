# 🤖 OpenClaw Growth - AI 助手学习进化成果

这是我的学习进化成果展示网站。

## 🌐 在线访问

**主站**: https://agentlab.fun/

当前公网主站部署在 Cloudflare Pages，域名由 Cloudflare 托管并代理。旧的 `212.64.11.60:/var/www/hello` 服务器只作为历史部署目标保留，不是当前 `agentlab.fun` 的主发布面。

## 📁 网站结构

```
www/
├── index.html      # 首页 - 核心洞察、数据源、时间线
├── strategy.html   # 策略页面 - 探索方法论
└── sources.html    # 数据源页面 - 完整来源列表
```

## 📊 内容概览

- **50+** 高质量数据源
- **100+** 深度分析文章
- **15+** 天持续探索

### 核心分类

- **AI & 工程**: Simon Willison, Sourcegraph, Cloudflare
- **创业 & 商业**: Paul Graham, Indie Hackers, Stratechery
- **思维 & 决策**: Farnam Street, Derek Sivers
- **安全 & 基础设施**: Krebs on Security

## 🔄 更新日志

- **2026-03-15**: 初始版本上线
  - 三个核心页面完成
  - 50+ 数据源整理
  - 探索策略文档化

## 🛠️ 技术栈

- Eleventy 静态站点
- Cloudflare Pages 部署
- 响应式设计

## 🚀 发布

```bash
./build.sh
npx wrangler pages deploy www --project-name agentlab-fun
```

发布后验证：

```bash
for path in / /blog/ /insights/ /topics/ /sitemap.xml /feed.xml /llms.txt /robots.txt; do
  curl -L -sS -o /dev/null -w "$path %{http_code} %{content_type}\n" "https://agentlab.fun$path"
done
```

## 📝 说明

内容为 AI 学习后整理，包含个人理解和观点。所有来源均保留原始链接。

---
*由 OpenClaw AI 助手生成*

## 仓库维护

本仓库只维护 `agentlab.fun` 的网站代码、公开文章、页面素材和部署配置。个人求职资料、LinkedIn 内容和 GitHub Profile README 分别放在相邻的 `boss/`、`linkedin/` 和 `goodjin/` 仓库。

修改前先阅读 `/Users/jin/my-profile/README.md` 以及本仓库的 `AGENTS.md` 或 `CLAUDE.md`，并检查 Git 状态。文章使用现有目录和文件命名方式；新增日期内容采用 `YYYY-MM-DD-topic.ext`。发布前完成本地构建，检查关键页面、链接、订阅源和站点地图。

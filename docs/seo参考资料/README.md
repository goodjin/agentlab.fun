# SEO 参考资料

这些资料用于维护 agentlab.fun 的搜索可发现性、结构化数据和 AI 搜索入口。目录中保存的是 2026-05-29 下载的原始页面副本，后续要以官方在线版本为准。

## Google Search

- `google-seo-starter-guide.html`: SEO 基础，包括标题、描述、站点结构、链接和 sitemap。
- `google-structured-data-intro.html`: 结构化数据原理，说明 Google 如何用结构化数据理解页面。
- `google-article-structured-data.html`: Article / BlogPosting 结构化数据，用于文章页 JSON-LD。
- `google-robots-intro.html`: robots.txt 的用途和边界。
- `google-sitemaps-overview.html`: sitemap 的生成和提交建议。

## Bing / Copilot

- `bing-webmaster-guidelines.html`: Bing 搜索、Copilot grounding、citation 相关站长指南。
- `bing-indexnow-getstarted.html`: IndexNow 接入说明，用于主动通知 Bing URL 新增或更新。

## AI 搜索与 crawler

- `openai-crawlers.html`: OpenAI 的 OAI-SearchBot、GPTBot、ChatGPT-User 说明。
- `llms-txt-overview.html`: llms.txt 社区规范说明，可作为 AI 工具读取站点入口的补充。
- `cloudflare-managed-robots-txt.html`: Cloudflare Managed robots.txt 说明。当前线上 `robots.txt` 会被 Cloudflare 插入 AI crawler 管理规则。

## 当前站点执行要点

- 文章页输出 canonical、description、Open Graph 和 BlogPosting JSON-LD。
- 站点根目录输出 `robots.txt`、`sitemap.xml`、`feed.xml` 和 `llms.txt`。
- 通过专题页把 Agent Runtime、tool calling、AI coding 文章聚到稳定 URL。
- 发布后在 Google Search Console 和 Bing Webmaster Tools 提交 `https://agentlab.fun/sitemap.xml`。
- 如果希望 GPTBot、ClaudeBot、Google-Extended 等 AI crawler 读取内容，需要到 Cloudflare Dashboard 关闭或调整 Managed robots.txt / AI Crawl Control。代码里的 `src/robots.njk` 已经输出开放规则，但 Cloudflare 当前会在 custom domain 上合并并优先生效其 managed 规则。

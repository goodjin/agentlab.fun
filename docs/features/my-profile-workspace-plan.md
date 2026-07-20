# `~/my-profile` 个人资料工作区实施计划

## 目标

在 `/Users/jin/my-profile` 建立一个供 Codex 使用的个人资料工作区。根目录负责说明全局结构和协作规则；网站、GitHub、LinkedIn、BOSS 招聘分别使用独立子目录和独立 Git 仓库。

公开边界如下：

- `goodjin/` 是 GitHub Profile README 仓库，保持公开。
- `website/`、`linkedin/`、`boss/` 均按私有仓库管理。
- `/Users/jin/my-profile` 根目录不初始化 Git 仓库，避免嵌套仓库被根仓库误收录。

## 已确认的现有来源

| 新目录 | 当前来源 | 当前远端 | 计划可见性 |
| --- | --- | --- | --- |
| `website/` | `/Users/jin/github/agentlab.fun` | `goodjin/agentlab.fun` | Private |
| `goodjin/` | `/Users/jin/Documents/github/goodjin` | `goodjin/goodjin` | Public |
| `linkedin/` | `/Users/jin/Documents/linkedin` | 当前未配置远端 | Private |
| `boss/` | `/Users/jin/boss` | `goodjin/boss` | Private |

补充事实：`agentlab.fun` 当前存在大量未提交和未跟踪文件；`goodjin` 当前有未跟踪的 `.DS_Store`。迁移前需要再次检查状态，完整保留用户改动，不用干净克隆覆盖本地工作树。

## 目标结构

```text
/Users/jin/my-profile/
├── README.md
├── AGENTS.md
├── CLAUDE.md
├── website/
│   ├── README.md
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   └── .git/
├── goodjin/
│   ├── README.md
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   └── .git/
├── linkedin/
│   ├── README.md
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   └── .git/
└── boss/
    ├── README.md
    ├── AGENTS.md
    ├── CLAUDE.md
    └── .git/
```

说明：子目录中已有的产品 README（尤其 `goodjin/README.md`）不能被目录说明直接替换。实施时会保留其对外内容，并增加简短的维护说明；较长的执行规则写入相应 `AGENTS.md`。BOSS 已有完整 `AGENTS.md`，在其基础上补充根规则引用，不删除原有招聘流程。

## README 与 AGENTS 规则

### 根 `README.md`

根 README 说明：

1. 工作区用途和四个仓库的职责。
2. 公开与私有边界。
3. 资料应该落在哪个子目录。
4. 跨平台资料更新顺序：先确认事实来源，再分别更新各平台表达，禁止用某个平台的宣传文案反向覆盖事实。
5. 新增子目录和仓库的命名规范。

### 根 `AGENTS.md`

根 AGENTS 明确：

1. 执行任何任务前，先阅读根 `README.md`，再阅读目标子目录的 `README.md` 和 `AGENTS.md`。
2. 未读完上述文件前不修改内容、不运行写操作。
3. 任务只能在指定平台仓库内修改；跨仓库同步需要先列出影响范围。
4. 公开仓库不得写入手机号、住址、证件、薪资、求职记录、登录信息、Token、Cookie 或未公开经历。
5. 修改前检查 Git 状态；不得覆盖用户未提交改动。
6. 完成后在对应子仓库验证、提交并推送，不从根目录一次性提交多个仓库。

文件名统一使用大写 `AGENTS.md`。这是 Codex/Agent 工具常用的项目指令文件名；不额外创建内容重复的 `agents.md`，避免大小写敏感环境出现两套规则。

根目录和每个子仓库同时创建 `CLAUDE.md`，内容与同目录的 `AGENTS.md` 保持一致，供 Claude Code 读取。修改任一文件时需要同步修改另一份，并在完成前执行内容一致性检查。

### 子目录 README

每个子目录 README 至少说明：

- 本仓库对应的平台和资料范围。
- 可以写入和禁止写入的内容。
- 资料来源与更新流程。
- 文件与子目录命名方式。
- 修改前后的检查项。
- 与其他三个仓库同步时的边界。

其中 `goodjin/README.md` 同时承担 GitHub 个人主页展示，因此维护规则保持简短，不暴露内部流程和隐私资料。

## 命名规范

1. 平台仓库目录使用小写 ASCII `kebab-case`，例如 `personal-website`、`linkedin`。
2. 已有品牌或账号名优先保留，例如 GitHub Profile 仓库必须保持 `goodjin`，以匹配 GitHub 用户名。
3. 公司目录和岗位目录使用稳定的小写英文或拼音 `kebab-case`；同一实体不创建多个近义目录。
4. 日期文件使用 `YYYY-MM-DD-topic.ext`。
5. 简历、头像、证书等二进制资产放入所属仓库的 `assets/` 或已有资源目录，不散落在根目录。
6. 临时文件、系统文件和敏感配置加入各仓库 `.gitignore`；不得提交 `.DS_Store`、Cookie、Token、会话缓存和本地密钥。

## 迁移步骤

1. 再次读取四个来源仓库的 Git 状态、分支、远端和可见性。
2. 创建 `/Users/jin/my-profile` 及四个目标子目录。
3. 使用能保留 `.git`、未提交改动、未跟踪资料和文件属性的方式复制现有工作树；不删除原目录。
4. 对复制结果执行文件清单、Git 状态和远端对比，确认来源与目标一致。
5. 为根目录创建 `README.md`、`AGENTS.md`、`CLAUDE.md`。
6. 更新四个子仓库的 `README.md`、`AGENTS.md` 和 `CLAUDE.md`；已有规则采用合并方式，且同目录的 AGENTS 与 CLAUDE 内容一致。
7. 为 LinkedIn 仓库补充适当的 `.gitignore`，检查配置文件是否包含账号、Token、Cookie 或本地路径；确认安全后才考虑创建私有远端。
8. 检查 GitHub 上三个目标私有仓库的实际可见性。若 `agentlab.fun` 或 `boss` 当前不是 Private，先报告，不直接改变可见性。
9. 分别检查四个子仓库的 diff，确保公开仓库没有敏感资料。
10. 在每个发生变更的子仓库分别提交和推送；远端缺失或权限/可见性不符合要求时暂停对应仓库的推送并报告。
11. 原目录暂不删除。待用户确认新工作区运行正常后，再单独决定是否归档旧路径。

## 安全与验收

完成需要满足：

- `/Users/jin/my-profile` 可以直接作为 Codex 项目打开。
- 四个子目录都是独立 Git 仓库，根目录不是 Git 仓库。
- 四个来源的 Git 历史、分支、远端和未提交内容得到保留。
- 根目录和所有子目录都有 `README.md`、`AGENTS.md`、`CLAUDE.md`。
- 所有 AGENTS 都要求任务开始前先读 README。
- 每个 `CLAUDE.md` 与同目录的 `AGENTS.md` 内容一致。
- `goodjin` 仅含适合公开展示的资料。
- 其他三个仓库的远端可见性为 Private；无法核实时明确记录，不凭目录名推断。
- 本轮迁移不删除旧目录，不覆盖现有文件。

## 需要用户确认的实施口径

按以下口径执行：

- 子目录固定命名为 `website`、`goodjin`、`linkedin`、`boss`。
- 迁移采用“复制并保留旧目录”，不直接移动。
- 根目录不建 Git 仓库。
- 统一使用 `AGENTS.md`，不创建小写 `agents.md`。
- 同时创建与 `AGENTS.md` 内容一致的 `CLAUDE.md`。
- LinkedIn 如需新建 GitHub 私有远端，仓库名使用 `linkedin-profile`；创建远端属于外部变更，执行到该步骤前先确认当前账号和目标名称。

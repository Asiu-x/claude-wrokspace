---
description: 基于 Markdown 文章生成多 section 暗色系展示页（HTML）。当用户要求生成展示页、showcase page、文章可视化展示时触发。输入：源文章路径。输出：单个 HTML 文件到 00-未完成/。
---

# Showcase Page Generator

将 Markdown 长文转换为多 section 全屏滚动展示页（纯 HTML + CSS + vanilla JS）。

## 输入

用户提供源文章的 Markdown 文件路径（vault 内相对路径）。如未提供则询问。

## 设计系统 Token（必须严格遵循）

### 色板

| 用途 | 值 |
|------|-----|
| 页面背景 | `#06060a` |
| 主文字 | `#f0f0f5` |
| 渐变主色 | `#667eea → #764ba2`（蓝→紫） |
| 渐变扩展色 | `#f093fb`（亮粉，用于 accent） |
| 选区颜色 | `rgba(102,126,234,.4)` |
| 弱文字 | `rgba(255,255,255, .5~.75)` |
| 警告/旧模式 | `rgba(255,80,80, .x)` |
| 成功/已验证 | `#48c78e` / `#00d4aa` / `#34d399` |

### 字体

```css
font-family:"PingFang SC","Microsoft YaHei","Helvetica Neue",Arial,sans-serif;
/* 代码 */
font-family:"SF Mono","Fira Code","Cascadia Code",monospace;
```

### 标题规格（大胆风格）

| 级别 | font-size | font-weight | letter-spacing |
|------|-----------|-------------|----------------|
| Section 标题 | `clamp(2rem,5vw,3.6rem)` | 800 | `-.03em` |
| 卡片标题 | `clamp(1.1rem,2vw,1.4rem)` ~ `clamp(1.3rem,2.8vw,1.8rem)` | 700 | `-.02em` |
| 标签 | `.72rem` | 600 | `5px` |
| 正文描述 | `.88rem ~ .95rem` | 400 | — |
| 底部金句 | `clamp(1.15rem,2.5vw,1.5rem)` ~ `clamp(1.3rem,3vw,2rem)` | 600~700 | — |

### 渐变高亮文字

```css
em {
  font-style:normal;
  background:linear-gradient(135deg,#667eea,#764ba2);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;
}
```

### 卡片

```css
/* 基础 */
border-radius: 20px~24px;
padding: clamp(36px,3.5vw,56px);
background: rgba(255,255,255,.02);
border: 1px solid rgba(255,255,255,.06);
transition: border-color .4s ease, box-shadow .5s, transform .5s cubic-bezier(.16,1,.3,1);

/* hover */
border-color: rgba(102,126,234,.25~.4);
box-shadow: 0 8px 60px rgba(102,126,234,.12);
transform: translateY(-4px);
```

### 编号水印（每个 section）

```css
position:absolute; top:50%; left:50%;
transform:translate(-50%,-50%);
font-size:clamp(14rem,30vw,28rem);
font-weight:900; line-height:1;
color:rgba(255,255,255,.012);
pointer-events:none; z-index:0; user-select:none;
```

### 滚动入场动画

```css
.sr{
  opacity:0; transform:translateY(35px);
  transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);
}
.sr.is-visible{ opacity:1; transform:translateY(0) }
.sr-d1{transition-delay:.1s}
.sr-d2{transition-delay:.25s}
.sr-d3{transition-delay:.4s}
.sr-d4{transition-delay:.6s}
.sr-d5{transition-delay:.8s}
```

## 全局固定背景（所有 section 共享）

S1 Hero 的背景使用 `position:fixed` 作为 `<body>` 的直接子元素，包含：
1. **5 个渐变光球** (`hero-bg__orb--1` ~ `--5`)：不同大小/位置/颜色的 `radial-gradient` 圆，`will-change:transform` + `@keyframes` 缓动漂移
2. **Canvas 粒子系统** (`hero-bg__particles`)：知识图谱拓扑，70 节点，多正弦漂移 + 贝塞尔曲线连线，hub/leaf 两类节点
3. **CSS 网格** (`hero-bg__grid`)：`repeating-linear-gradient` 生成的微弱网格线

此背景对所有 section 透出，section 自身不设 `background:#06060a`，也不设独立背景层。

## 生成流程

### Phase 1: 分析源文章

1. 使用 Read 工具完整读取源文章
2. 分析文章结构，提取：
   - 文章总标题和核心主张
   - 各大章节标题和核心论点
   - 关键对比、流程、数据
   - 金句/警句
3. 规划 section 划分（通常 8~12 个 section）：
   - S1: Hero（标题 + 副标题 + 核心主张）
   - S2~Sn-1: 内容 section（根据文章结构）
   - Sn: CTA（行动号召 + 作者信息）

### Phase 2: 生成 HTML

**使用 subagent 并行生成。**

1. **先生成 S1 Hero + 全局 CSS + 全局背景 + 粒子 JS + IntersectionObserver JS**
   - 直接复用方法论1的 S1 模板结构，替换标题/副标题/核心主张文字
   - 从方法论1的成品 `00-未完成/2026-03-26-AI工作站方法论-S1-Hero.html` 中读取全局 CSS（line 1~20）、背景 HTML、粒子 JS、Observer JS 作为模板

2. **并行启动 subagent 生成 S2~Sn 的 CSS + HTML**
   - 每个 subagent 负责 2~3 个 section
   - subagent 输出独立的 `<style>` + `<section>` HTML 片段到 `00-未完成/` 的临时文件
   - 每个 section 必须遵循设计系统 token
   - 不包含独立背景 CSS（全局背景覆盖）

3. **合并所有 section 到单个 HTML 文件**
   - 统一 `.sr` 类名为 `.sr` / `.sr.is-visible`（不要 `.visible`）
   - 去重 `.sr` 的 CSS 定义
   - 确保所有 section 无 `background:#06060a`

### Phase 3: 验证

- 检查所有 `.sr` 类一致
- 检查无遗留 section 级 `background:#06060a`
- 检查无遗留独立背景 CSS
- 通知用户文件位置

## Section 设计模式参考

根据内容类型选择合适的布局模式：

| 内容类型 | 推荐布局 | 参考 |
|----------|----------|------|
| 核心问题/对比 | 双栏 + VS 分隔 | S2（旧模式 vs 新模式） |
| 架构/支柱 | 三列卡片 | S3（三支柱） |
| 演进/层级 | 阶梯式纵向 | S4（L1→L4 阶梯） |
| 工具/实操 | 编号卡片网格 | S5（三工具卡片） |
| 时间线/阶段 | 横向节点轨道 | S6（5 节点时间线） |
| 场景对比+表格 | 上方双栏+下方表格 | S7（人工 vs 事件驱动） |
| 概念/模型 | 大卡片+公式/标签 | S8（心智模型） |
| 远景/路线图 | 三阶段横向卡片 + 箭头 | S9（短中长期） |
| 行动号召 | 居中金句 + 作者信息 | S10（CTA） |

## 禁止事项

- ❌ 不使用任何 JS 框架
- ❌ 不添加旋转边框等无意义装饰动画
- ❌ section 不设 `background:#06060a`
- ❌ 不使用 `.sr.visible`，统一用 `.sr.is-visible`
- ❌ 不在 subagent CSS 中重复定义 `.sr` 的 transition 规则

## 输出

- 文件名：`YYYY-MM-DD-{文章主题}-展示页.html`
- 输出目录：`00-未完成/`
- 通知用户文件位置，建议在浏览器中打开查看

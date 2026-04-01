---
description: 将多个 Showcase 单篇 HTML 合并为带导航和 Landing 首页的完整版。当用户要求合并展示页、创建完整版、多篇合一时触发。输入：多个 HTML 文件路径。输出：单个完整版 HTML 到 00-未完成/。
---

# Showcase Combine — 多篇合并 + Landing 首页

将多个 `/showcase-page` 生成的单篇 HTML 合并为一个带页面切换导航和 3D 轮播 Landing 首页的完整版。

## 输入

用户提供要合并的多个 Showcase HTML 文件路径（vault 内相对路径）。如未提供则搜索 `00-未完成/` 下的展示页文件并确认。

## 前置条件

- 各单篇 HTML 必须已由 `/showcase-page` 生成，遵循同一设计系统
- 第一篇（Part1）包含全局固定背景（`.hero-bg`）和粒子系统 JS

## 合并流程

### Phase 1: 提取与去冲突

1. **读取所有单篇 HTML**，分别提取：
   - CSS（`<style>` 内容）
   - HTML sections（`<body>` 内的 section 标签）
   - JS（`<script>` 内容，不含粒子和 IntersectionObserver——这些只取 Part1 的）

2. **CSS 类名冲突处理**：Part2+ 的 `.hero` 等公共类名需要重命名
   ```python
   # Part N: .hero → .hero-pN（保留 .hero-bg 不动）
   css = re.sub(r'\.hero(?![\w-])', '.hero-pN', css)
   css = re.sub(r'\.hero-(?!bg|p\d)', '.hero-pN-', css)
   # 同样处理 HTML 中对应的 class 引用
   ```
   > ⚠️ 必须排除 `.hero-bg`（全局共享）

3. **去重**：`.sr` 的 CSS transition 定义只保留 Part1 的，后续篇章删除重复定义

### Phase 2: 组装完整版

**文件结构：**

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <style>
    /* Part1 全局 CSS + S1~Sn CSS */
    /* Part2 CSS（类名已重命名） */
    /* Part3 CSS（类名已重命名） */
    /* 页面切换 CSS */
    /* 导航组件 CSS */
    /* Landing 页 CSS（轮播 + 卡片） */
  </style>
</head>
<body>
  <!-- 顶部导航栏 -->
  <nav class="global-nav on-landing" id="global-nav">
    <div class="nav-item" data-index="0">首页</div>
    <div class="nav-item active" data-index="1">一 · 篇名</div>
    <!-- ... -->
  </nav>

  <!-- 左右箭头 -->
  <button class="nav-arrow" id="nav-prev">◀</button>
  <button class="nav-arrow" id="nav-next">▶</button>

  <!-- 底部页码指示器 -->
  <div class="page-indicator on-landing">
    <span class="page-dot active" data-index="0"></span>
    <!-- ... -->
  </div>

  <!-- 全局固定背景（仅一份，来自 Part1） -->
  <div class="hero-bg" id="hero-bg">...</div>

  <!-- Landing 首页 -->
  <div id="landing" class="part-wrap active">
    <section class="landing">
      <!-- 标题 + 3D 轮播卡片 + 作者 -->
    </section>
  </div>

  <!-- Part 1 -->
  <div id="part1" class="part-wrap">
    <!-- Part1 的所有 section -->
  </div>

  <!-- Part 2 -->
  <div id="part2" class="part-wrap">
    <!-- Part2 的所有 section（类名已重命名） -->
  </div>

  <!-- Part N... -->

  <script>
    /* 粒子系统 JS（仅 Part1 的） */
    /* IntersectionObserver（仅一份） */
    /* 轮播逻辑 */
    /* 翻页导航逻辑 */
  </script>
</body>
</html>
```

### Phase 3: 添加页面切换系统

**页面切换 CSS：**
```css
.part-wrap{ display:none; position:relative; }
.part-wrap.active{
  display:block;
  animation:partFadeIn .45s cubic-bezier(.16,1,.3,1);
}
```

**导航组件：**
- 顶部导航栏（`.global-nav`）：篇章名切换
- 左右箭头（`.nav-arrow`）：翻页
- 底部指示器（`.page-indicator`）：圆点 + 页码
- 键盘左右箭头支持
- Landing 页时隐藏导航：`.on-landing`

**JS `showPart(idx)` 函数职责：**
1. 切换 `.part-wrap` 的 `.active` 类
2. 更新导航高亮
3. 更新页码指示器
4. 控制箭头显隐（首尾页）
5. 滚动到顶部
6. Landing 页导航隐藏切换
7. 触发 scroll-reveal 重新检测

### Phase 4: 添加 Landing 首页

**Landing 页包含：**
1. **标题区**：系列名 + 渐变大标题 + 副标题
2. **3D 透视轮播**：每篇一张卡片
   - `perspective:1200px` + `transform-style:preserve-3d`
   - center/left/right 三种位置状态，通过 `data-pos` 属性切换
   - 自动轮播（4.5s）+ 悬停暂停
   - 轮播箭头 + 底部进度指示条
   - 触摸滑动支持
3. **卡片内容**：标签 + 标题 + 描述 + 话题标签 + CTA 按钮
4. **CTA 按钮增强**：渐变镂空边框 + 呼吸脉冲 + hover 箭头位移
5. **作者落款**

**卡片颜色方案：**
- 第 1 张：蓝色系 `rgba(102,126,234,.x)`
- 第 2 张：绿色系 `rgba(0,212,170,.x)`
- 第 3 张：粉色系 `rgba(240,147,251,.x)`
- 更多篇章时循环使用

**卡片点击行为：**
- 侧边卡片点击 → 旋转到中心
- 中心卡 CTA 按钮点击 → `showPart(n)` 跳转到对应篇章
- 中心卡双击 → 同上

### Phase 5: 验证

- [ ] 所有导航项数量 = 篇章数 + 1（含首页）
- [ ] 页码圆点数量 = 篇章数 + 1
- [ ] 每篇的 section 都在对应 `part-wrap` 内
- [ ] CSS 类名无冲突
- [ ] `.sr` 定义无重复
- [ ] 粒子系统和 Observer JS 各只有一份
- [ ] 卡片点击能正确跳转
- [ ] 键盘左右翻页正常

## 大文件操作规范

由于合并后文件通常 5000~10000+ 行，**必须使用 Python 脚本方式操作**：

1. 用 Write 工具写 `.tmp_xxx.py` 到 vault 根目录
2. 脚本内用 `content.index(标记字符串)` 精确定位 + 切片替换
3. Bash 执行：`python3 .tmp_xxx.py && rm .tmp_xxx.py`

> ⚠️ 不要用 Edit 工具操作 5000+ 行文件
> ⚠️ 不要用 Bash heredoc 写含 HTML/CSS 的内容（沙箱会误判标签为路径）
> ⚠️ 脚本写到 vault 根，不要写到 /tmp/

## 设计系统参考

与 `/showcase-page` 共享同一设计系统。详见该 skill 的设计系统 Token 定义。

额外组件的设计 Token：

| 组件 | 关键样式 |
|------|----------|
| 导航栏 | `backdrop-filter:blur(16px)` + `rgba(6,6,10,.7)` 背景 |
| 导航项 hover | 渐变色文字 `#667eea → #f093fb` |
| 翻页箭头 | 48px 圆形 + `backdrop-filter:blur(8px)` |
| 轮播箭头 | 同上，hover 发光 `box-shadow:0 0 30px rgba(102,126,234,.15)` |
| 页码圆点 | 32px 长条，active 展宽 48px + 渐变填充 |
| 轮播进度条 | `@keyframes dotProgress` 跟随自动播放 |

## 输出

- 文件名：`YYYY-MM-DD-{系列主题}-完整版.html`
- 输出目录：`00-未完成/`
- 通知用户文件位置，建议在浏览器中打开查看

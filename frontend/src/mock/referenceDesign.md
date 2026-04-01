# 参考页面设计规范分析

## 页面结构
1. 固定顶部导航栏（带logo、搜索、用户菜单）
2. 页面标题区域
3. 统计卡片区域（4列网格）
4. 模型推荐模块（网格布局）
5. 数据集推荐模块（网格布局）
6. 案例推荐模块（网格布局）
7. AI能力推荐模块（网格布局）

## 视觉风格

### 颜色系统
- 主背景色：#f5f7fa
- 卡片背景：#ffffff
- 主色调：#409eff
- 成功色：#67c23a
- 警告色：#e6a23c
- 错误色：#f56c6c
- 文字主色：#303133
- 文字辅助色：#606266

### 字体系统
- 标题：18px/28px, 500字重
- 正文：14px/22px, 400字重
- 次要文字：12px/18px, 400字重

### 间距系统
- 卡片间距：16px
- 内边距：24px
- 边框半径：8px

### 卡片样式
```css
.card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

### 按钮样式
```css
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}

.btn-primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}

.btn-link {
  color: #409eff;
  background: transparent;
  border: none;
}
```

## 交互效果

### 加载状态
- 骨架屏加载
- 加载动画：淡入淡出 + 渐变

### 交互反馈
- 悬停效果：阴影加深 + 轻微上浮
- 点击反馈：缩放效果
- 加载反馈：骨架屏

## 响应式设计
- 移动端：1列布局
- 平板：2列布局
- 桌面：3-4列布局

## 动画系统
- 页面加载：从上到下淡入
- 卡片入场： staggered 动画
- 搜索框：聚焦效果
- 按钮：悬停颜色变化

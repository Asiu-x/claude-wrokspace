# 测试文档

## 概述

本项目使用 Vitest 作为测试框架，结合 React Testing Library 进行组件测试。本文档介绍了如何运行测试和编写测试用例。

## 测试技术栈

- **Vitest** - 快速的单元测试框架
- **React Testing Library** - React 组件测试库
- **Testing Library Jest DOM** - DOM 断言扩展
- **User Event** - 用户交互模拟

## 测试分类

### 1. 组件测试 (`src/components/__tests__/`)

#### StatsCard.test.tsx
- 测试统计卡片的基本信息渲染
- 测试正向和负向趋势显示
- 测试数字格式化
- 测试自定义颜色类

#### ModelCard.test.tsx
- 测试模型卡片的基本信息显示
- 测试不同状态标签的显示（在线/维护中/离线）
- 测试标签列表渲染
- 测试版本和指标显示

#### DatasetCard.test.tsx
- 测试数据集卡片的基本信息
- 测试不同状态（活跃/审核中/非活跃）
- 测试文件大小格式化
- 测试样本数显示

#### CaseCard.test.tsx
- 测试应用案例卡片的基本信息
- 测试状态显示（已完成/进行中/待处理）
- 测试点赞数和浏览数显示
- 测试作者和时长显示

#### CapabilityCard.test.tsx
- 测试AI能力卡片的基本信息
- 测试状态显示（在线/开发中/离线）
- 测试图标和指标显示
- 测试成功率和响应时间

### 2. 页面测试 (`src/pages/__tests__/`)

#### Dashboard.test.tsx
- 测试仪表板页面加载状态
- 测试错误状态和重试功能
- 测试所有统计卡片渲染
- 测试四个模块（大模型/数据集/应用案例/AI能力）渲染
- 测试API调用和数据流

### 3. API服务测试 (`src/services/__tests__/`)

#### dashboard.test.ts
- 测试所有API端点调用
- 测试API响应处理
- 测试错误处理

## 运行测试

### 运行所有测试
```bash
npm test
```

### 以UI模式运行测试
```bash
npm run test:ui
```

### 运行测试并生成覆盖率报告
```bash
npm run test:coverage
```

### 监听模式运行测试
```bash
npm test -- --watch
```

## 测试最佳实践

### 1. 选择查询方式
- 优先使用 `getByRole`（模拟真实用户）
- 使用 `getByLabelText` 用于表单元素
- 使用 `getByText` 用于文本
- 使用 `getByTestId` 作为最后手段

### 2. 模拟用户交互
- 使用 `userEvent` 而不是 `fireEvent`
- 模拟真实用户的完整交互流程

### 3. 测试行为而非实现
- 测试组件做什么，而不是怎么做
- 不要测试内部状态或私有方法
- 不要使用 `container.firstChild` 进行快照测试（除非必要）

### 4. Mock外部依赖
- Mock所有API调用
- Mock路由
- Mock第三方库

### 5. 清理和重置
- 使用 `beforeEach` 和 `afterEach` 清理mocks
- 确保测试之间隔离

## 数据测试ID命名约定

使用 `data-testid` 属性标识测试元素，命名约定：

```
{component}-{element}-{index}
```

示例：
- `stats-models` - 统计卡片（模型）
- `model-card-0-name` - 第一个模型卡片的名称
- `retry-button` - 重试按钮

## 持续集成

测试在CI/CD流程中自动运行：
- 提交代码时运行单元测试
- Pull Request时运行所有测试和覆盖率检查
- 部署前确保所有测试通过

## 测试覆盖率目标

- 组件测试覆盖率 > 80%
- 页面测试覆盖率 > 70%
- 工具函数测试覆盖率 > 90%

## 故障排查

### 测试超时
- 检查是否有未解决的Promise
- 确保mock正确返回
- 增加 `waitFor` 超时时间

### 元素找不到
- 检查 `data-testid` 是否正确
- 使用 `screen.debug()` 查看DOM
- 检查异步渲染

### Mock不工作
- 确保mock路径正确
- 使用 `vi.mocked` 包装mock
- 在 `beforeEach` 中清除mocks

# 代码规范

## 1. TypeScript 规范
### 1.1 类型定义
- 所有函数、组件必须定义输入输出类型
- 禁止使用 `any` 类型，如确实需要使用 `unknown` 替代
- 接口定义使用 `I` 前缀，例如 `IUser`, `ICase`
- 类型定义统一放在 `src/types/` 目录下

```typescript
// 正确
interface IUser {
  id: number;
  name: string;
  email: string;
}

const getUser = async (id: number): Promise<IUser> => {
  // ...
}
```

### 1.2 变量声明
- 优先使用 `const`，只有当变量需要重新赋值时使用 `let`
- 禁止使用 `var`
- 变量名使用小驼峰命名法

## 2. React 规范
### 2.1 组件命名
- 组件使用大驼峰命名法，例如 `UserCard`, `DashboardPage`
- 组件文件名与组件名保持一致，例如 `UserCard.tsx`
- 页面组件统一放在 `src/pages/` 目录下，以 `Page` 结尾

### 2.2 组件编写
- 优先使用函数式组件 + Hooks
- 组件props使用接口定义，接口名以 `I{ComponentName}Props` 命名
- 禁止在组件内部定义不必要的嵌套组件

```typescript
// 正确
interface IUserCardProps {
  user: IUser;
  onDelete?: (id: number) => void;
}

const UserCard: React.FC<IUserCardProps> = ({ user, onDelete }) => {
  return <div>{user.name}</div>;
};
```

### 2.3 Hooks 使用
- Hooks 必须在组件顶层调用
- 自定义 Hooks 以 `use` 前缀开头
- useEffect 必须明确指定依赖数组

## 3. 样式规范
### 3.1 TailwindCSS 使用
- 优先使用 TailwindCSS 原子类实现样式
- 复杂样式可以使用 `className` 组合，避免自定义 CSS
- 响应式设计遵循移动优先原则

```tsx
// 正确
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  {/* content */}
</div>
```

### 3.2 自定义 CSS
- 全局样式统一在 `src/index.css` 中定义
- 避免使用内联样式
- 类名使用短横线分隔命名法，例如 `.user-card-container`

## 4. 命名规范
| 类型 | 命名规则 | 示例 |
|------|----------|------|
| 组件 | 大驼峰 | `UserCard.tsx`, `DashboardPage` |
| 接口 | 前缀I + 大驼峰 | `IUser`, `ICaseProps` |
| 函数/变量 | 小驼峰 | `getUserInfo`, `userList` |
| 常量 | 全大写 + 下划线 | `API_BASE_URL`, `MAX_PAGE_SIZE` |
| 类名 | 短横线分隔 | `.user-card`, `.page-container` |

## 5. 导入规范
- 导入顺序：第三方库 → 内部组件 → 工具函数 → 类型定义 → 样式
- 导入路径使用相对路径，避免过长的路径
- 禁止导入未使用的模块

```typescript
// 正确
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@/components/Card';
import { getUser } from '@/services/userService';
import { IUser } from '@/types';
import '@/index.css';
```

## 6. 注释规范
- 公共组件、工具函数必须添加注释说明用途
- 复杂的业务逻辑需要添加注释说明
- 避免不必要的注释，代码应该自解释
- TODO 注释必须包含作者和日期

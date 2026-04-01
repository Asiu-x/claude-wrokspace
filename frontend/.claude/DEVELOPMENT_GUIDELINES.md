# 开发流程规范

## 1. 环境准备
- Node.js 版本 >= 18.0.0
- npm 版本 >= 9.0.0
- 编辑器推荐使用 VS Code，并安装以下插件：
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Hero

## 2. 开发流程
### 2.1 分支管理
- 主分支：`master` - 生产环境代码，保护分支，不允许直接推送
- 开发分支：`develop` - 集成分支，所有功能开发完成后合并到这里
- 功能分支：`feature/xxx` - 新功能开发分支，从`develop`检出
- Bug修复分支：`fix/xxx` - Bug修复分支，从`develop`检出
- 发布分支：`release/xxx` - 版本发布前的预发布分支

### 2.2 开发步骤
1. 从`develop`分支创建新的功能分支：`git checkout -b feature/xxx`
2. 开发完成后，提交代码到远程分支
3. 创建Pull Request到`develop`分支
4. 代码评审通过后合并到`develop`分支
5. 版本发布时从`develop`创建`release`分支，测试通过后合并到`master`并打标签

## 3. 代码提交前检查
提交代码前必须完成以下检查：
1. 代码可以正常编译：`npm run build`
2. 没有ESLint错误：`npm run lint`
3. 所有单元测试通过：`npm run test`
4. 代码格式符合规范：`npm run format`

## 4. API 开发规范
- 所有API请求统一在`src/services/`目录下封装
- 每个模块对应一个service文件，例如：`userService.ts`, `caseService.ts`
- API路径统一使用常量定义，避免硬编码
- 请求参数和返回值必须定义TypeScript类型
- 错误处理统一在拦截器中处理，业务层只处理业务逻辑

```typescript
// 示例
import api from './api';
import { ICase, ICaseListParams } from '@/types/case';

export const getCaseList = async (params: ICaseListParams) => {
  return api.get<{ list: ICase[]; total: number }>('/cases', { params });
};

export const getCaseDetail = async (id: number) => {
  return api.get<ICase>(`/cases/${id}`);
};
```

## 5. 组件开发规范
- 公共组件必须放在`src/components/`目录下
- 每个组件单独一个文件夹，包含组件文件、类型定义（可选）、样式（可选）
- 组件必须支持props透传
- 组件必须添加默认props
- 复杂组件必须提供使用示例和注释

## 6. 页面开发规范
- 页面组件放在`src/pages/`目录下，按模块分类
- 页面路由统一在`App.tsx`中配置
- 页面级状态优先使用React Query/useState，复杂状态使用Context
- 页面加载时必须显示loading状态
- 接口请求错误时必须显示错误提示

## 7. 测试规范
- 所有工具函数必须编写单元测试
- 公共组件必须编写单元测试
- 核心业务流程必须编写集成测试
- 测试覆盖率不低于80%
- 提交代码前必须保证所有测试通过

## 8. 部署规范
- 开发环境：`npm run dev`
- 测试环境：`npm run build:test`
- 生产环境：`npm run build:prod`
- 构建产物放在`dist/`目录下
- 部署前必须进行兼容性测试

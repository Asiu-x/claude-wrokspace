# 智慧教育大模型知识图谱前端项目 - Claude 开发指南

## 项目基本信息
- 项目名称：knovo-apex-aura 前端
- 技术栈：React 18 + TypeScript + TailwindCSS + React Router
- 包管理工具：npm
- 代码风格：ESLint + Prettier
- UI 组件：自定义组件 + TailwindCSS 原子化样式

## 目录结构
```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
│   ├── Card/        # 卡片组件系列
│   ├── dashboard/   # 仪表盘相关组件
│   ├── graph/       # 知识图谱可视化组件
│   └── layout/      # 布局组件
├── pages/           # 页面组件
│   ├── capabilities/ # 能力管理页面
│   ├── cases/        # 案例管理页面
│   ├── datasets/     # 数据集管理页面
│   ├── models/       # 模型管理页面
│   ├── dashboard/    # 仪表盘页面
│   ├── graph/        # 知识图谱页面
│   └── home/         # 首页
├── services/        # API 服务层
├── types/           # TypeScript 类型定义
├── utils/           # 工具函数
├── App.tsx          # 根组件
├── index.tsx        # 入口文件
└── index.css        # 全局样式
```

## 开发规范优先级
1. 优先遵循本目录下的 `CODING_STANDARDS.md` 代码规范
2. 遵循 `COMMIT_GUIDELINES.md` Git 提交规范
3. 遵循 `DEVELOPMENT_GUIDELINES.md` 开发流程规范
4. 与现有代码风格保持一致

## 注意事项
- 所有新增的组件、函数都需要添加 TypeScript 类型定义
- 样式优先使用 TailwindCSS 原子类，避免不必要的自定义 CSS
- API 请求统一使用 `src/services/api.ts` 封装的请求方法
- 页面路由统一在 `App.tsx` 中配置
- 不要修改或删除 `.gitignore` 中已忽略的文件
- 提交代码前确保没有编译错误和 ESLint 警告

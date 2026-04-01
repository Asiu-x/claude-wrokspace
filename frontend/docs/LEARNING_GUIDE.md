# React 从 0 到 1 学习指南（基于本项目的实例）

本指南以 **knovo-apex-aura 前端项目** 中的真实代码为例，由浅入深带你理解 React 与前端工程化。每节都对应项目里的具体文件和用法。

---

## 目录

1. [项目入口与 React 根节点](#1-项目入口与-react-根节点)
2. [组件：从页面到小组件](#2-组件从页面到小组件)
3. [JSX 与数据驱动视图](#3-jsx-与数据驱动视图)
4. [状态：useState 与 useEffect](#4-状态usestate-与-useeffect)
5. [路由：多页面与跳转](#5-路由多页面与跳转)
6. [请求数据：Service + axios](#6-请求数据service--axios)
7. [全局状态：Redux Toolkit](#7-全局状态redux-toolkit)
8. [自定义 Hooks：复用逻辑](#8-自定义-hooks复用逻辑)
9. [类型：TypeScript 在本项目中的用法](#9-类型typescript-在本项目中的用法)
10. [图谱页与 ReactFlow](#10-图谱页与-reactflow)

---

## 1. 项目入口与 React 根节点

**对应文件：** `src/main.tsx`

React 应用从 `main.tsx` 启动，做两件事：

- 用 **react-dom** 的 `createRoot` 把根 DOM（`#root`）和 React 连接起来。
- 用 **react-redux** 的 `Provider` 包住整个应用，这样任意子组件都能访问 Redux 的 store。

```tsx
// src/main.tsx 简化示意
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

**你要记住：**

- `App` 是整棵组件树的根。
- `Provider` 和 `store` 为后面的 Redux（第 7 节）做准备。
- `StrictMode` 是开发时帮助发现问题的工具，不影响生产逻辑。

---

## 2. 组件：从页面到小组件

**对应文件：** `src/App.tsx`、`src/components/layout/Navbar.tsx`、`src/components/PageContainer/index.tsx`

### 2.1 App 是“壳子”

`App.tsx` 里用 **react-router-dom** 的 `Router` + `Routes` + `Route` 决定“哪个路径渲染哪个页面组件”：

```tsx
// src/App.tsx 片段
<Router>
  <div className="min-h-screen bg-[#F8F9FA]">
    <Navbar />
    <main className="mt-16">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<ModelsListPage />} />
        <Route path="/models/:id" element={<ModelDetailPage />} />
        {/* ... 其他路由 */}
      </Routes>
    </main>
  </div>
</Router>
```

- **Navbar**：全局导航，每个页面都会显示。
- **Routes / Route**：路径和页面组件的对应关系；`:id` 表示动态参数（如模型详情页的 id）。

### 2.2 小组件：只负责一块 UI

例如 **PageContainer** 只负责“带标题栏 + 内容区”的布局，通过 **props** 接收标题和子内容：

```tsx
// src/components/PageContainer/index.tsx 片段
interface PageContainerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;  // 子内容
  actions?: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  title, subtitle, children, actions, className = ''
}) => {
  return (
    <div className={...}>
      {(title || actions) && (
        <div className="...">
          {title && <h1>{title}</h1>}
          {subtitle && <p>{subtitle}</p>}
          {actions}
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
};
```

**要点：**

- 组件用 **props** 接收外部数据（title、subtitle、children 等）。
- `children` 表示“标签之间的内容”，例如 `<PageContainer>这里是 children</PageContainer>`。
- `React.FC<Props>` 是 TypeScript 下声明“这是一个函数组件且 props 类型为 Props”的常见写法。

---

## 3. JSX 与数据驱动视图

**对应文件：** `src/pages/Home/index.tsx`

### 3.1 用数据数组驱动列表

首页“核心模块”不是手写四块 HTML，而是用数组 **map** 出一组卡片：

```tsx
// src/pages/Home/index.tsx 片段
const modules = [
  { title: '模型库', description: '...', icon: Library, color: 'bg-blue-100 text-blue-800', link: '/models', ... },
  { title: '数据集', ... },
  // ...
];

// 渲染
<div className="grid md:grid-cols-2 gap-6">
  {modules.map((module, index) => {
    const Icon = module.icon;  // 图标是组件，存到变量里用
    return (
      <div key={index} className="...">
        <div className={module.color}>
          <Icon className="h-6 w-6" />
        </div>
        <h3>{module.title}</h3>
        <p>{module.description}</p>
        {/* ... */}
      </div>
    );
  })}
</div>
```

**要点：**

- JSX 里用 `{ }` 写 JavaScript 表达式。
- 列表必须给每个顶层元素一个稳定的 **key**（这里用 `index`，数据有 id 时用 id 更好）。
- 图标来自 **lucide-react**，把组件存到变量（如 `Icon`）再在 JSX 里 `<Icon />` 使用。

### 3.2 根据状态切换显示内容

例如模型列表页：加载中显示 loading，有数据显示列表，没有数据显示空状态。这些都是“由状态驱动”的视图：

```tsx
// 思想等价于 src/pages/models/list/index.tsx
{loading ? (
  <div className="...">加载中...</div>
) : models.length > 0 ? (
  <div className="grid ...">
    {models.map((model) => (
      <div key={model.id}>...</div>
    ))}
  </div>
) : (
  <EmptyState />
)}
```

---

## 4. 状态：useState 与 useEffect

**对应文件：** `src/components/layout/Navbar.tsx`、`src/pages/models/list/index.tsx`、`src/pages/models/detail/index.tsx`

### 4.1 useState：组件自己的“可变数据”

Navbar 里用两个 state：一个控制移动端菜单是否展开，一个记录是否滚动过（用于改变导航栏样式）：

```tsx
// src/components/layout/Navbar.tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);

// 点击按钮切换菜单
<button onClick={() => setIsMenuOpen(!isMenuOpen)}>...</button>

// 样式根据 scrolled 变化
style={{
  background: scrolled ? 'rgba(255, 255, 255, 0.9)' : '#FFFFFF',
  boxShadow: scrolled ? '...' : '...',
}}
```

列表页里则用 state 存列表数据、分页、加载态、筛选条件等：

```tsx
// src/pages/models/list/index.tsx 思想
const [loading, setLoading] = useState(true);
const [models, setModels] = useState<ModelItem[]>([]);
const [pagination, setPagination] = useState({ current: 1, pageSize: 12, total: 0 });
const [searchQuery, setSearchQuery] = useState('');
const [selectedType, setSelectedType] = useState('all');
```

**规则：** 用 `setXxx` 更新状态，React 会重新渲染该组件，界面就和最新 state 一致。

### 4.2 useEffect：副作用（如请求、订阅）

- **监听滚动**（Navbar）：组件挂载时注册滚动监听，卸载时移除。

```tsx
// src/components/layout/Navbar.tsx
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);  // 空依赖：只在挂载/卸载时执行
```

- **根据 id 拉取详情**（详情页）：当路由参数 `id` 变化时重新请求。

```tsx
// src/pages/models/detail/index.tsx
const { id } = useParams<{ id: string }>();

useEffect(() => {
  fetchModelDetail();
}, [id]);  // id 变化时重新拉取
```

- **列表页：分页/筛选变化时重新拉列表**：

```tsx
// src/pages/models/list/index.tsx 思想
useEffect(() => {
  fetchModels();
}, [pagination.current, searchQuery, selectedType, selectedSource]);
```

**小结：**  
- `useState` 管“当前页/当前组件要展示的数据”。  
- `useEffect` 管“在什么时候做请求、订阅、DOM 操作等副作用”，依赖数组决定“什么时候再执行一次”。

---

## 5. 路由：多页面与跳转

**对应文件：** `src/App.tsx`、`src/pages/Home/index.tsx`、`src/pages/models/detail/index.tsx`

### 5.1 声明式路由（Route）

在 App 里已经见过：`path` 对应 URL，`element` 是对应的页面组件。带 `:id` 的路径可在组件里用 **useParams** 取出。

### 5.2 跳转的两种方式

- **Link**：点击后跳转，不刷新整页（SPA）。

```tsx
// src/components/layout/Navbar.tsx
<Link to="/" className="...">首页</Link>
<Link to={item.path}>{item.label}</Link>
```

- **useNavigate**：在事件处理函数里跳转（例如按钮点击、提交成功后跳列表）。

```tsx
// src/pages/Home/index.tsx
const navigate = useNavigate();

<button onClick={() => navigate('/models')}>探索模型库</button>
```

```tsx
// src/pages/models/detail/index.tsx 找不到模型时返回列表
<button onClick={() => navigate('/models')}>返回模型列表</button>
```

### 5.3 获取当前路径（高亮导航）

Navbar 用 **useLocation** 判断当前 pathname，从而高亮对应菜单项：

```tsx
const location = useLocation();

const isActive = (path: string) => {
  if (path === '/') return location.pathname === '/';
  return location.pathname.startsWith(path);
};
// 使用：style={{ color: isActive(item.path) ? '#5B7CFF' : '...' }}
```

---

## 6. 请求数据：Service + axios

**对应文件：** `src/services/api.ts`、`src/services/modelService.ts`、`src/pages/models/list/index.tsx`

### 6.1 封装 axios 实例（api.ts）

项目里用 **axios** 创建了一个带 baseURL、超时、拦截器的实例：

```tsx
// src/services/api.ts 片段
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

// 请求前：自动带 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, ...);

// 响应错误：401 跳登录
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

这样所有通过 `api` 发出去的请求都会走同一套 baseURL 和鉴权逻辑。

### 6.2 按业务拆成 Service（modelService）

模型相关请求集中在 **modelService**，内部根据环境变量决定用真实接口还是 Mock：

```tsx
// src/services/modelService.ts 片段
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const modelService = {
  async getModels(params) {
    if (USE_MOCK) return mockModelService.getModels(params);
    try {
      const response = await request({ method: 'GET', url: API_CONFIG.models.list, params });
      return response;
    } catch (error) {
      return mockModelService.getModels(params);  // 降级 Mock
    }
  },
  async getModelDetail(id) {
    // 同理
  }
};
```

### 6.3 在页面里调用

列表页在 `useEffect` 里调用 service，用 state 存结果和 loading：

```tsx
// src/pages/models/list/index.tsx 思想
const fetchModels = async () => {
  setLoading(true);
  try {
    const response = await mockModelService.getModels({
      page: pagination.current,
      size: pagination.pageSize,
      name: searchQuery || undefined,
    });
    if (response.code === 200) {
      setModels(response.data.records);
      setPagination(prev => ({ ...prev, total: response.data.total }));
    }
  } catch (err) {
    console.error('Failed to fetch models:', err);
  } finally {
    setLoading(false);
  }
};
```

**学习顺序建议：** 先会写 `useState` + `useEffect` + 一个 service 函数，再理解 axios 封装和 API_CONFIG。

---

## 7. 全局状态：Redux Toolkit

**对应文件：** `src/store/index.ts`、`src/store/dashboard.slice.ts`、`src/hooks/redux.hooks.ts`

当多个页面或组件需要共享同一份数据（如仪表盘统计、推荐列表）时，用 Redux 存到“全局 store”。

### 7.1 创建 store 与 slice

```tsx
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboard.slice';

export const store = configureStore({
  reducer: { dashboard: dashboardReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

```tsx
// src/store/dashboard.slice.ts 思想
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { loading: false, error: null, stats: null, ... };

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    const response = await DashboardAPI.getStats();
    return response;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
```

- **createAsyncThunk**：定义“发请求”的异步 action，会触发 pending / fulfilled / rejected。
- **extraReducers**：根据这三个状态更新 slice 里的 `loading`、`stats`、`error`。

### 7.2 在组件里用：useSelector / useDispatch

项目对 **react-redux** 的 hook 做了类型化封装：

```tsx
// src/hooks/redux.hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

在任意被 `Provider` 包住的组件里可以这样用：

```tsx
const dispatch = useAppDispatch();
const stats = useAppSelector((state) => state.dashboard.stats);

useEffect(() => {
  dispatch(fetchDashboardStats());
}, [dispatch]);
```

**小结：** 本地 UI 状态用 `useState`；需要跨页面/多组件共享的数据用 Redux（本项目中 dashboard 相关数据是典型例子）。

---

## 8. 自定义 Hooks：复用逻辑

**对应文件：** `src/hooks/usePagination.ts`、`src/hooks/useFilters.ts`

把“分页逻辑”“筛选逻辑”抽成 Hook，多个列表页可以复用，组件里只关心 UI。

### 8.1 usePagination 示例

```tsx
// src/hooks/usePagination.ts 思想
export const usePagination = (options = {}) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const goToPage = useCallback((page) => { ... }, [pageSize, total]);
  const nextPage = useCallback(() => goToPage(current + 1), [current, goToPage]);
  const prevPage = useCallback(() => goToPage(current - 1), [current, goToPage]);

  return {
    state: { current, pageSize, total, skip: (current - 1) * pageSize, hasNext, hasPrev },
    current, pageSize, total,
    goToPage, nextPage, prevPage, setTotal, changePageSize, reset,
  };
};
```

在列表页里：`const { state, goToPage, setTotal } = usePagination(...)`，请求回来后 `setTotal(response.data.total)`，翻页时 `goToPage(page)`。这样“当前页、总条数、翻页”的逻辑都集中在 Hook 里。

### 8.2 useCallback 的作用

上面用 **useCallback** 包住 `goToPage`、`nextPage` 等，是为了避免每次渲染都生成新的函数引用，防止把不必要的重渲染传给子组件。先知道“复杂逻辑放 Hook 里、用 useCallback 包一层”即可，细节可以后面再深挖。

---

## 9. 类型：TypeScript 在本项目中的用法

**对应文件：** `src/types/model.ts`、各页面的 `useState<ModelItem[]>` 等

### 9.1 接口描述“模型”长什么样

```tsx
// src/types/model.ts 片段
export interface Model {
  id: string;
  name: string;
  code: string;
  description: string;
  version: string;
  type: ModelType;
  status: ModelStatus;
  metrics: { accuracy?: number; perplexity?: number; inferenceSpeed?: number; };
  framework: string;
  parameters: string;
  // ...
}

export interface ModelQueryParams {
  page?: number;
  size?: number;
  name?: string;
  type?: string;
  status?: string;
}

export interface ModelListResponse {
  records: Model[];
  total: number;
  size: number;
  current: number;
  pages: number;
}
```

### 9.2 在组件和 Service 里用

- 组件 state：`useState<ModelItem[]>([])`、`useState<ModelItem | null>(null)`。
- 请求参数和返回值：`modelService.getModels(params: ModelQueryParams): Promise<ApiResponse<ModelListResponse>>`。

这样在写 `response.data.records`、`model.name` 时会有自动补全和类型检查，减少拼写错误和运行时错误。

---

## 10. 图谱页与 ReactFlow

**对应文件：** `src/pages/Graph/index.tsx`、`src/components/graph/GraphVisualization.tsx`、`src/services/graphService.ts`

图谱页用 **reactflow** 做“节点 + 连线”的可视化，数据来自 `graphService`（节点、关系、统计等）。

### 10.1 页面层：数据与筛选

Graph 页用多个 `useState` 存节点、关系、筛选结果、选中的节点等；用 `useEffect` 拉取图数据，再用一个 `useEffect` 根据类型筛选节点和边；搜索、类型切换用 **useCallback** 包一层避免重复创建函数：

```tsx
// src/pages/Graph/index.tsx 思想
const [allNodes, setAllNodes] = useState<GraphNode[]>([]);
const [allRelationships, setAllRelationships] = useState<GraphRelationship[]>([]);
const [filteredNodes, setFilteredNodes] = useState<GraphNode[]>([]);
const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

useEffect(() => {
  const fetchGraphData = async () => {
    const [nodeData, relationshipData, statsData] = await Promise.all([
      GraphService.getNodes(),
      GraphService.getRelationships(),
      GraphService.getGraphStats(),
    ]);
    setAllNodes(nodeData);
    // ...
  };
  fetchGraphData();
}, []);

const handleTypeToggle = useCallback((type: string) => { ... }, []);
const handleSearch = useCallback(async (keyword, type) => { ... }, []);
```

### 10.2 可视化层：ReactFlow 组件

GraphVisualization 里用 **ReactFlow** 的 `ReactFlowProvider`、`useNodesState`、`useEdgesState`、`Controls`、`Background`、`MiniMap` 等，把 `filteredNodes` / `filteredRelationships` 转成 ReactFlow 的 nodes 和 edges，并自定义节点样式（如按 type 上色）：

```tsx
// src/components/graph/GraphVisualization.tsx 片段
import ReactFlow, {
  ReactFlowProvider, useNodesState, useEdgesState,
  Controls, Background, MiniMap, Handle, Position, MarkerType, ...
} from 'reactflow';
import 'reactflow/dist/style.css';

const CustomNode = ({ data, selected }) => {
  const getNodeColor = (type) => {
    switch (type) {
      case 'model': return 'bg-[#5B7CFF]';
      case 'dataset': return 'bg-[#00C896]';
      // ...
    }
  };
  return (
    <div className={...}>
      <Handle type="target" position={Position.Top} />
      {/* 节点内容 */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
```

学习顺序建议：先能跑通列表页、详情页、路由和请求，再来看 Graph 页的“多 state + 多 useEffect + useCallback”，最后再细看 ReactFlow 的节点/边配置。

---

## 学习路径建议（按顺序）

| 顺序 | 内容           | 建议看的文件 |
|------|----------------|--------------|
| 1    | 入口与根组件   | `main.tsx`、`App.tsx` |
| 2    | 组件与 JSX     | `Home/index.tsx`、`PageContainer/index.tsx` |
| 3    | useState/useEffect | `Navbar.tsx`、`models/list/index.tsx`、`models/detail/index.tsx` |
| 4    | 路由与跳转     | `App.tsx`、`Navbar.tsx`、`Home/index.tsx` |
| 5    | 请求与 Service | `api.ts`、`modelService.ts`、`models/list` 的 fetch |
| 6    | Redux          | `store/index.ts`、`dashboard.slice.ts`、`redux.hooks.ts` |
| 7    | 自定义 Hooks   | `usePagination.ts`、在 list 页中的使用 |
| 8    | TypeScript     | `types/model.ts`、各页面中的类型标注 |
| 9    | 图谱与 ReactFlow | `Graph/index.tsx`、`GraphVisualization.tsx` |

每看完一节，可以在项目里找到对应文件，改一点（比如改文案、改颜色、加一个 state）再跑起来看效果，这样印象最深。遇到报错优先看控制台和类型提示，再结合本文档里的“对应文件”回头查代码。

祝你学习顺利。

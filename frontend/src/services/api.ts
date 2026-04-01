import axios from 'axios';

// 通用API响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 基础URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/apex-api/v1';

// 创建axios实例
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
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

// 通用请求方法
const request = async <T>(config: any): Promise<ApiResponse<T>> => {
  try {
    const response = await api(config);
    return response.data;
  } catch (error: any) {
    return {
      code: error.response?.status || 500,
      message: error.response?.data?.message || error.message || '请求失败',
      data: null as any
    };
  }
};

// API接口配置
export const API_CONFIG = {
  // 首页相关
  dashboard: {
    stats: '/dashboard/stats',
    trends: '/dashboard/trends',
    quickAccess: '/dashboard/quick-access',
    activities: '/dashboard/activities',
    models: {
      recommendations: '/dashboard/models/recommendations'
    },
    datasets: {
      latest: '/dashboard/datasets/latest'
    },
    cases: {
      featured: '/dashboard/cases/featured'
    },
    capabilities: {
      recommendations: '/dashboard/capabilities/recommendations'
    }
  },
  // 模型库相关
  models: {
    list: '/models',
    detail: (id: string) => `/models/${id}`
  },
  // 数据集相关
  datasets: {
    list: '/datasets',
    detail: (id: string) => `/datasets/${id}`
  },
  // 案例集相关
  cases: {
    list: '/cases',
    detail: (id: string) => `/cases/${id}`
  },
  // AI能力相关
  capabilities: {
    list: '/capabilities',
    detail: (id: string) => `/capabilities/${id}`
  },
  // 关联图谱相关
  graph: {
    nodes: '/graph/nodes',
    relationships: '/graph/relationships',
    paths: '/graph/paths',
    search: '/graph/search'
  }
};

// 导出
export { api, request };
export default api;

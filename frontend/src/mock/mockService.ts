/**
 * Mock数据服务
 * 替代真实的API调用，提供统一的数据访问接口
 */

import type {
  ModelItem,
  DatasetItem,
  CaseItem,
  CapabilityItem,
  ActivityItem,
  DashboardStatsResponse,
  QuickAccessResponse,
  TimeSeriesPoint,
  TrendResponse
} from '../types/dashboard';

import type {
  ModelQueryParams,
  ModelListResponse
} from '../types/model';

import type {
  DatasetQueryParams,
  DatasetListResponse
} from '../types/dataset';

import type {
  CaseQueryParams,
  CaseListResponse
} from '../types/case';

import type {
  CapabilityQueryParams,
  CapabilityListResponse
} from '../types/capability';

import {
  MOCK_MODELS,
  MOCK_DATASETS,
  MOCK_CASES,
  MOCK_CAPABILITIES,
  MOCK_ACTIVITIES,
  MOCK_DASHBOARD_STATS,
  MOCK_TRENDS,
  MOCK_QUICK_ACCESS
} from './data';

import { ApiResponse } from '../services/api';

// ==================== 通用分页筛选工具 ====================

const applyPagination = <T>(
  data: T[],
  page: number = 1,
  pageSize: number = 10
): { records: T[]; total: number } => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    records: data.slice(startIndex, endIndex),
    total: data.length
  };
};

const applyFilters = <T>(
  data: T[],
  filters: Record<string, any>
): T[] => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;

      const itemValue = item[key];
      if (typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(value.toLowerCase());
      }
      return itemValue === value;
    });
  });
};

// ==================== 模型服务 ====================

export const mockModelService = {
  async getModels(params: ModelQueryParams): Promise<ApiResponse<ModelListResponse>> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 300));

    let data = [...MOCK_MODELS];

    // 应用筛选
    if (params.name) {
      data = applyFilters(data, { name: params.name });
    }
    if (params.type) {
      data = applyFilters(data, { type: params.type });
    }
    if (params.category) {
      data = applyFilters(data, { category: params.category });
    }
    if (params.source) {
      data = applyFilters(data, { source: params.source });
    }
    if (params.status) {
      data = applyFilters(data, { status: params.status });
    }

    // 应用分页
    const { records, total } = applyPagination(
      data,
      params.page || 1,
      params.size || 10
    );

    return {
      code: 200,
      message: 'success',
      data: {
        records,
        total,
        size: params.size || 10,
        current: params.page || 1,
        pages: Math.ceil(total / (params.size || 10))
      }
    };
  },

  async getModelDetail(id: string): Promise<ApiResponse<ModelItem>> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const model = MOCK_MODELS.find(m => m.id === id) || MOCK_MODELS[0];

    return {
      code: 200,
      message: 'success',
      data: model
    };
  }
};

// ==================== 数据集服务 ====================

export const mockDatasetService = {
  async getDatasets(params: DatasetQueryParams): Promise<ApiResponse<DatasetListResponse>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let data = [...MOCK_DATASETS];

    if (params.name) {
      data = applyFilters(data, { name: params.name });
    }
    if (params.category) {
      data = applyFilters(data, { category: params.category });
    }
    if (params.subject) {
      data = applyFilters(data, { subject: params.subject });
    }
    if (params.status) {
      data = applyFilters(data, { status: params.status });
    }

    const { records, total } = applyPagination(
      data,
      params.page || 1,
      params.size || 10
    );

    return {
      code: 200,
      message: 'success',
      data: {
        records,
        total,
        size: params.size || 10,
        current: params.page || 1,
        pages: Math.ceil(total / (params.size || 10))
      }
    };
  },

  async getDatasetDetail(id: string): Promise<ApiResponse<DatasetItem>> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const dataset = MOCK_DATASETS.find(d => d.id === id) || MOCK_DATASETS[0];

    return {
      code: 200,
      message: 'success',
      data: dataset
    };
  }
};

// ==================== 案例服务 ====================

export const mockCaseService = {
  async getCases(params: CaseQueryParams): Promise<ApiResponse<CaseListResponse>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let data = [...MOCK_CASES];

    if (params.title) {
      data = applyFilters(data, { title: params.title });
    }
    if (params.category) {
      data = applyFilters(data, { category: params.category });
    }
    if (params.status) {
      data = applyFilters(data, { status: params.status });
    }
    if (params.difficulty) {
      data = applyFilters(data, { difficulty: params.difficulty });
    }

    const { records, total } = applyPagination(
      data,
      params.page || 1,
      params.size || 10
    );

    return {
      code: 200,
      message: 'success',
      data: {
        records,
        total,
        size: params.size || 10,
        current: params.page || 1,
        pages: Math.ceil(total / (params.size || 10))
      }
    };
  },

  async getCaseDetail(id: string): Promise<ApiResponse<CaseItem>> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const caseItem = MOCK_CASES.find(c => c.id === id) || MOCK_CASES[0];

    return {
      code: 200,
      message: 'success',
      data: caseItem
    };
  }
};

// ==================== AI能力服务 ====================

export const mockCapabilityService = {
  async getCapabilities(params: CapabilityQueryParams): Promise<ApiResponse<CapabilityListResponse>> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let data = [...MOCK_CAPABILITIES];

    if (params.name) {
      data = applyFilters(data, { name: params.name });
    }
    if (params.category) {
      // 这里的 `category` 用来区分 AI 原子能力/AI 业务能力，
      // 与能力自身字段里的 `category` 不同。
      if (params.category === '原子AI能力' || params.category === '业务AI能力') {
        const expectedCapType = params.category === '原子AI能力' ? 'atomic' : 'business';
        data = applyFilters(data, { capType: expectedCapType });
      } else {
        data = applyFilters(data, { category: params.category });
      }
    }
    if (params.status) {
      data = applyFilters(data, { status: params.status });
    }

    const { records, total } = applyPagination(
      data,
      params.page || 1,
      params.size || 10
    );

    return {
      code: 200,
      message: 'success',
      data: {
        records,
        total,
        size: params.size || 10,
        current: params.page || 1,
        pages: Math.ceil(total / (params.size || 10))
      }
    };
  },

  async getCapabilityDetail(id: string): Promise<ApiResponse<CapabilityItem>> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const capability = MOCK_CAPABILITIES.find(c => c.id === id) || MOCK_CAPABILITIES[0];

    return {
      code: 200,
      message: 'success',
      data: capability
    };
  }
};

// ==================== Dashboard服务 ====================

export const mockDashboardService = {
  async getStats(): Promise<DashboardStatsResponse> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_DASHBOARD_STATS;
  },

  async getTrends(range: string = '30d'): Promise<TrendResponse> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_TRENDS;
  },

  async getQuickAccess(): Promise<QuickAccessResponse> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_QUICK_ACCESS;
  },

  async getRecentActivities(pageNum: number = 1, pageSize: number = 10): Promise<{ list: ActivityItem[]; total: number }> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const { records, total } = applyPagination(
      MOCK_ACTIVITIES,
      pageNum,
      pageSize
    );

    return {
      list: records,
      total
    };
  },

  async getModelRecommendations(type: string = 'trending', limit: number = 4): Promise<{ list: ModelItem[]; total: number }> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const models = [...MOCK_MODELS].sort((a, b) => {
      if (type === 'trending') {
        return b.viewCount - a.viewCount;
      } else if (type === 'new') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      } else {
        return b.rating - a.rating;
      }
    });

    return {
      list: models.slice(0, limit),
      total: models.length
    };
  },

  async getNewDatasets(limit: number = 5): Promise<{ list: DatasetItem[]; total: number }> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const datasets = [...MOCK_DATASETS].sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return {
      list: datasets.slice(0, limit),
      total: datasets.length
    };
  },

  async getFeaturedCases(limit: number = 4): Promise<{ list: CaseItem[]; total: number }> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const cases = [...MOCK_CASES].filter(c => c.status === 'published');

    return {
      list: cases.slice(0, limit),
      total: cases.length
    };
  },

  async getCapabilityRecommendations(type: string = 'popular', limit: number = 4): Promise<{ list: CapabilityItem[]; total: number }> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const capabilities = [...MOCK_CAPABILITIES].sort((a, b) => {
      if (type === 'popular') {
        return b.viewCount - a.viewCount;
      } else if (type === 'new') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return b.successRate - a.successRate;
      }
    });

    return {
      list: capabilities.slice(0, limit),
      total: capabilities.length
    };
  }
};

// ==================== 数据更新与操作 ====================

let modelIndex = 1;

export const mockOperationService = {
  async createModel(data: any): Promise<ApiResponse<ModelItem>> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      code: 200,
      message: '创建成功',
      data: null
    };
  },

  async updateModel(id: string, data: any): Promise<ApiResponse<ModelItem>> {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      code: 200,
      message: '更新成功',
      data: null
    };
  },

  async deleteModel(id: string): Promise<ApiResponse<any>> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      code: 200,
      message: '删除成功',
      data: null
    };
  },

  async searchModels(keyword: string): Promise<{ results: ModelItem[] }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const results = MOCK_MODELS.filter(model =>
      model.name.toLowerCase().includes(keyword.toLowerCase()) ||
      model.description.toLowerCase().includes(keyword.toLowerCase())
    );

    return {
      results
    };
  }
};

/**
 * 使用规范：
 *
 * 1. 在组件中引入：
 *    import { mockModelService } from '@/mock/mockService';
 *
 * 2. 替换原API调用：
 *    // 替换前
 *    import { modelService } from '@/services/modelService';
 *    const data = await modelService.getModels();
 *
 *    // 替换后
 *    import { mockModelService } from '@/mock/mockService';
 *    const data = await mockModelService.getModels();
 *
 * 3. 保持调用方式不变：
 *    const params = { page: 1, size: 10, name: 'GPT' };
 *    const result = await mockModelService.getModels(params);
 *    console.log(result.data.records);
 *
 * 优势：
 * - 完全在前端运行，不依赖网络
 * - 提供真实的网络延迟模拟
 * - 支持完整的筛选和分页功能
 * - 与真实API接口保持一致的返回格式
 */

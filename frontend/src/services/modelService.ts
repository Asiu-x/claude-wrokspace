import type { ModelItem } from '../types/dashboard';
import type { ModelListResponse, ModelQueryParams } from '../types/model';
import { mockModelService } from '../mock/mockService';
import type { ApiResponse } from './api';
import { api, API_CONFIG, request } from './api';

// 环境变量控制：是否使用Mock数据
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export type { ModelQueryParams, ModelListResponse };

export const modelService = {
  // 获取模型列表（支持分页和筛选）
  async getModels(params: ModelQueryParams): Promise<ApiResponse<ModelListResponse>> {
    if (USE_MOCK) {
      return mockModelService.getModels(params);
    }
    try {
      const response = await request<ModelListResponse>({
        method: 'GET',
        url: API_CONFIG.models.list,
        params
      });
      return response;
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockModelService.getModels(params);
    }
  },

  // 获取模型详情
  async getModelDetail(id: string): Promise<ApiResponse<ModelItem>> {
    if (USE_MOCK) {
      return mockModelService.getModelDetail(id);
    }
    try {
      const response = await request<ModelItem>({
        method: 'GET',
        url: API_CONFIG.models.detail(id)
      });
      return response;
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockModelService.getModelDetail(id);
    }
  }
};

import type { DatasetItem } from '../types/dashboard';
import type { DatasetListResponse, DatasetQueryParams } from '../types/dataset';
import { mockDatasetService } from '../mock/mockService';
import type { ApiResponse } from './api';
import { api, API_CONFIG, request } from './api';

// 环境变量控制：是否使用Mock数据
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export type { DatasetQueryParams, DatasetListResponse };

export const datasetService = {
  // 获取数据集列表（支持分页和筛选）
  async getDatasets(params: DatasetQueryParams): Promise<ApiResponse<DatasetListResponse>> {
    if (USE_MOCK) {
      return mockDatasetService.getDatasets(params);
    }
    try {
      const response = await request<DatasetListResponse>({
        method: 'GET',
        url: API_CONFIG.datasets.list,
        params
      });
      return response;
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockDatasetService.getDatasets(params);
    }
  },

  // 获取数据集详情
  async getDatasetDetail(id: string): Promise<ApiResponse<DatasetItem>> {
    if (USE_MOCK) {
      return mockDatasetService.getDatasetDetail(id);
    }
    try {
      const response = await request<DatasetItem>({
        method: 'GET',
        url: API_CONFIG.datasets.detail(id)
      });
      return response;
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockDatasetService.getDatasetDetail(id);
    }
  }
};

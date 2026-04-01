import type { CapabilityItem } from '../types/dashboard';
import type { CapabilityListResponse, CapabilityQueryParams } from '../types/capability';
import { mockCapabilityService } from '../mock/mockService';
import type { ApiResponse } from './api';
import { api, API_CONFIG, request } from './api';

// 环境变量控制：是否使用Mock数据
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export type { CapabilityQueryParams, CapabilityListResponse };

export const capabilityService = {
  // 获取AI能力列表（支持分页和筛选）
  async getCapabilities(params: CapabilityQueryParams): Promise<ApiResponse<CapabilityListResponse>> {
    if (USE_MOCK) {
      return mockCapabilityService.getCapabilities(params);
    }
    try {
      const response = await request<CapabilityListResponse>({
        method: 'GET',
        url: API_CONFIG.capabilities.list,
        params
      });
      return response;
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockCapabilityService.getCapabilities(params);
    }
  },

  // 获取AI能力详情
  async getCapabilityDetail(id: string): Promise<ApiResponse<CapabilityItem>> {
    if (USE_MOCK) {
      return mockCapabilityService.getCapabilityDetail(id);
    }
    try {
      const response = await request<CapabilityItem>({
        method: 'GET',
        url: API_CONFIG.capabilities.detail(id)
      });
      return response;
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockCapabilityService.getCapabilityDetail(id);
    }
  }
};

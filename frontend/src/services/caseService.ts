import type { CaseItem } from '../types/dashboard';
import type { CaseListResponse, CaseQueryParams } from '../types/case';
import { mockCaseService } from '../mock/mockService';
import type { ApiResponse } from './api';
import { api, API_CONFIG, request } from './api';

// 环境变量控制：是否使用Mock数据
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export type { CaseQueryParams, CaseListResponse };

export const caseService = {
  // 获取案例列表（支持分页和筛选）
  async getCases(params: CaseQueryParams): Promise<ApiResponse<CaseListResponse>> {
    if (USE_MOCK) {
      return mockCaseService.getCases(params);
    }
    try {
      const response = await request<CaseListResponse>({
        method: 'GET',
        url: API_CONFIG.cases.list,
        params
      });
      return response;
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockCaseService.getCases(params);
    }
  },

  // 获取案例详情
  async getCaseDetail(id: string): Promise<ApiResponse<CaseItem>> {
    if (USE_MOCK) {
      return mockCaseService.getCaseDetail(id);
    }
    try {
      const response = await request<CaseItem>({
        method: 'GET',
        url: API_CONFIG.cases.detail(id)
      });
      return response;
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockCaseService.getCaseDetail(id);
    }
  }
};

import type {
  DashboardStatsResponse,
  TrendResponse,
  QuickAccessResponse,
  ModelRecommendationResponse,
  DatasetLatestResponse,
  CaseFeaturedResponse,
  CapabilityRecommendationResponse,
  ActivityResponse
} from '../types/dashboard';
import { api, API_CONFIG, request } from './api';
import { mockDashboardService } from '../mock/mockService';

// 环境变量控制：是否使用Mock数据
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const DashboardAPI = {
  /**
   * 获取统计数据
   */
  getStats: async (): Promise<DashboardStatsResponse> => {
    if (USE_MOCK) {
      return mockDashboardService.getStats();
    }
    try {
      const response = await request<DashboardStatsResponse>({
        method: 'GET',
        url: API_CONFIG.dashboard.stats
      });
      if (response.code === 200) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockDashboardService.getStats();
    }
  },

  /**
   * 获取趋势数据
   */
  getTrends: async (range: string = '30d'): Promise<TrendResponse> => {
    if (USE_MOCK) {
      return mockDashboardService.getTrends();
    }
    try {
      const response = await request<TrendResponse>({
        method: 'GET',
        url: API_CONFIG.dashboard.trends,
        params: { range }
      });
      if (response.code === 200) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockDashboardService.getTrends();
    }
  },

  /**
   * 获取快速访问数据
   */
  getQuickAccess: async (): Promise<QuickAccessResponse> => {
    if (USE_MOCK) {
      return mockDashboardService.getQuickAccess();
    }
    try {
      const response = await request<QuickAccessResponse>({
        method: 'GET',
        url: API_CONFIG.dashboard.quickAccess
      });
      if (response.code === 200) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      return mockDashboardService.getQuickAccess();
    }
  },

  /**
   * 获取模型推荐
   */
  getModelRecommendations: async (type: string = 'trending', limit: number = 4): Promise<ModelRecommendationResponse> => {
    if (USE_MOCK) {
      const result = await mockDashboardService.getModelRecommendations();
      return { list: result.list, total: result.total };
    }
    try {
      const response = await request<ModelRecommendationResponse>({
        method: 'GET',
        url: API_CONFIG.dashboard.models.recommendations,
        params: { type, limit }
      });
      if (response.code === 200) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      const result = await mockDashboardService.getModelRecommendations();
      return { list: result.list, total: result.total };
    }
  },

  /**
   * 获取最新数据集
   */
  getNewDatasets: async (limit: number = 5): Promise<DatasetLatestResponse> => {
    if (USE_MOCK) {
      const result = await mockDashboardService.getNewDatasets();
      return { list: result.list, total: result.total };
    }
    try {
      const response = await request<DatasetLatestResponse>({
        method: 'GET',
        url: API_CONFIG.dashboard.datasets.latest,
        params: { limit }
      });
      if (response.code === 200) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      const result = await mockDashboardService.getNewDatasets();
      return { list: result.list, total: result.total };
    }
  },

  /**
   * 获取精选案例
   */
  getFeaturedCases: async (limit: number = 4): Promise<CaseFeaturedResponse> => {
    if (USE_MOCK) {
      const result = await mockDashboardService.getFeaturedCases();
      return { list: result.list, total: result.total };
    }
    try {
      const response = await request<CaseFeaturedResponse>({
        method: 'GET',
        url: API_CONFIG.dashboard.cases.featured,
        params: { limit }
      });
      if (response.code === 200) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      const result = await mockDashboardService.getFeaturedCases();
      return { list: result.list, total: result.total };
    }
  },

  /**
   * 获取AI能力推荐
   */
  getCapabilityRecommendations: async (type: string = 'popular', limit: number = 4): Promise<CapabilityRecommendationResponse> => {
    if (USE_MOCK) {
      const result = await mockDashboardService.getCapabilityRecommendations();
      return { list: result.list, total: result.total };
    }
    try {
      const response = await request<CapabilityRecommendationResponse>({
        method: 'GET',
        url: API_CONFIG.dashboard.capabilities.recommendations,
        params: { type, limit }
      });
      if (response.code === 200) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      const result = await mockDashboardService.getCapabilityRecommendations();
      return { list: result.list, total: result.total };
    }
  },

  /**
   * 获取最近活动
   */
  getRecentActivities: async (pageNum: number = 1, pageSize: number = 10): Promise<ActivityResponse> => {
    if (USE_MOCK) {
      const result = await mockDashboardService.getRecentActivities();
      return { list: result.list, total: result.total };
    }
    try {
      const response = await request<ActivityResponse>({
        method: 'GET',
        url: API_CONFIG.dashboard.activities,
        params: { pageNum, pageSize }
      });
      if (response.code === 200) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (error) {
      console.warn('API请求失败，使用Mock数据:', error);
      const result = await mockDashboardService.getRecentActivities();
      return { list: result.list, total: result.total };
    }
  },
};

export default DashboardAPI;

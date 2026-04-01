import { describe, it, expect, vi, beforeEach } from 'vitest';
import DASHBOARD_API from '../dashboard';
import { apiClient } from '../api';

vi.mock('../api');

describe('Dashboard API Service', () => {
  const mockApiClient = vi.mocked(apiClient);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls getStats with correct endpoint', async () => {
    const mockResponse = {
      data: {
        code: 200,
        message: '操作成功',
        data: { totalModels: 12, totalDatasets: 89, totalCases: 234, totalCapabilities: 36 }
      }
    };

    mockApiClient.get.mockResolvedValue(mockResponse);

    const result = await DASHBOARD_API.getStats();

    expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    expect(mockApiClient.get).toHaveBeenCalledWith('/dashboard/overview');
    expect(result).toEqual(mockResponse.data);
  });

  it('calls getTrends with correct endpoint', async () => {
    const mockResponse = {
      data: {
        code: 200,
        message: '操作成功',
        data: { models: [], datasets: [], cases: [], capabilities: [] }
      }
    };

    mockApiClient.get.mockResolvedValue(mockResponse);

    const result = await DASHBOARD_API.getTrends();

    expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    expect(mockApiClient.get).toHaveBeenCalledWith('/dashboard/analytics');
    expect(result).toEqual(mockResponse.data);
  });

  it('calls getQuickAccess with correct endpoint', async () => {
    const mockResponse = {
      data: {
        code: 200,
        message: '操作成功',
        data: { models: [], datasets: [], cases: [], capabilities: [] }
      }
    };

    mockApiClient.get.mockResolvedValue(mockResponse);

    const result = await DASHBOARD_API.getQuickAccess();

    expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    expect(mockApiClient.get).toHaveBeenCalledWith('/dashboard/quick-access');
    expect(result).toEqual(mockResponse.data);
  });

  it('calls getModelRecommendations with correct endpoint', async () => {
    const mockResponse = {
      data: {
        code: 200,
        message: '操作成功',
        data: { list: [], total: 0 }
      }
    };

    mockApiClient.get.mockResolvedValue(mockResponse);

    const result = await DASHBOARD_API.getModelRecommendations();

    expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    expect(mockApiClient.get).toHaveBeenCalledWith('/dashboard/models');
    expect(result).toEqual(mockResponse.data);
  });

  it('calls getDatasetLatest with correct endpoint', async () => {
    const mockResponse = {
      data: {
        code: 200,
        message: '操作成功',
        data: { list: [], total: 0 }
      }
    };

    mockApiClient.get.mockResolvedValue(mockResponse);

    const result = await DASHBOARD_API.getDatasetLatest();

    expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    expect(mockApiClient.get).toHaveBeenCalledWith('/dashboard/datasets');
    expect(result).toEqual(mockResponse.data);
  });

  it('calls getCaseFeatured with correct endpoint', async () => {
    const mockResponse = {
      data: {
        code: 200,
        message: '操作成功',
        data: { list: [], total: 0 }
      }
    };

    mockApiClient.get.mockResolvedValue(mockResponse);

    const result = await DASHBOARD_API.getCaseFeatured();

    expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    expect(mockApiClient.get).toHaveBeenCalledWith('/dashboard/cases');
    expect(result).toEqual(mockResponse.data);
  });

  it('calls getCapabilityRecommendations with correct endpoint', async () => {
    const mockResponse = {
      data: {
        code: 200,
        message: '操作成功',
        data: { list: [], total: 0 }
      }
    };

    mockApiClient.get.mockResolvedValue(mockResponse);

    const result = await DASHBOARD_API.getCapabilityRecommendations();

    expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    expect(mockApiClient.get).toHaveBeenCalledWith('/dashboard/capabilities');
    expect(result).toEqual(mockResponse.data);
  });

  it('calls getActivity with correct endpoint', async () => {
    const mockResponse = {
      data: {
        code: 200,
        message: '操作成功',
        data: { list: [], total: 0 }
      }
    };

    mockApiClient.get.mockResolvedValue(mockResponse);

    const result = await DASHBOARD_API.getActivity();

    expect(mockApiClient.get).toHaveBeenCalledTimes(1);
    expect(mockApiClient.get).toHaveBeenCalledWith('/dashboard/activity');
    expect(result).toEqual(mockResponse.data);
  });

  it('handles API errors correctly', async () => {
    const mockError = new Error('Network Error');
    mockApiClient.get.mockRejectedValue(mockError);

    await expect(DASHBOARD_API.getStats()).rejects.toThrow('Network Error');
    expect(mockApiClient.get).toHaveBeenCalledTimes(1);
  });
});

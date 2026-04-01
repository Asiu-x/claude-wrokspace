import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { vi } from 'vitest';

export function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return rtlRender(ui, { ...options });
}

export function createMockResponse<T>(data: T): { data: { code: number; message: string; data: T } } {
  return {
    data: {
      code: 200,
      message: '操作成功',
      data
    }
  };
}

export function createMockError(message: string = '请求失败'): Error {
  return new Error(message);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const mockDashboardAPI = {
  getStats: vi.fn(),
  getTrends: vi.fn(),
  getQuickAccess: vi.fn(),
  getModelRecommendations: vi.fn(),
  getDatasetLatest: vi.fn(),
  getCaseFeatured: vi.fn(),
  getCapabilityRecommendations: vi.fn(),
  getActivity: vi.fn(),
};

export function resetAllMocks(): void {
  vi.clearAllMocks();
}

export function mockSuccessfulAPI(mockData: Record<string, any>): void {
  Object.entries(mockData).forEach(([key, data]) => {
    if (key in mockDashboardAPI) {
      (mockDashboardAPI[key as keyof typeof mockDashboardAPI] as any).mockResolvedValue(
        createMockResponse(data)
      );
    }
  });
}

export function mockFailedAPI(): void {
  Object.keys(mockDashboardAPI).forEach(key => {
    (mockDashboardAPI[key as keyof typeof mockDashboardAPI] as any).mockRejectedValue(
      createMockError()
    );
  });
}

export function getTrendColorClass(trendUp: boolean): string {
  return trendUp ? 'text-green-500' : 'text-red-500';
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

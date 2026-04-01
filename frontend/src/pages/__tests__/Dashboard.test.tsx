import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { mockDashboardService } from '../../mock/mockService';
import {
  mockDashboardStats,
  mockModelRecommendations,
  mockDatasetLatest,
  mockCaseFeatured,
  mockCapabilityRecommendations
} from '../../test/__mocks__/mockData';

vi.mock('../../mock/mockService');

describe('Dashboard Page', () => {
  it('displays loading state initially', async () => {
    (mockDashboardService.getStats as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDashboardStats });
    (mockDashboardService.getModels as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockModelRecommendations });
    (mockDashboardService.getDatasets as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDatasetLatest });
    (mockDashboardService.getCases as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCaseFeatured });
    (mockDashboardService.getCapabilities as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCapabilityRecommendations });

    render(<Dashboard />);

    expect(screen.getByTestId('dashboard-loading')).toBeInTheDocument();
    expect(screen.getByText('加载中...')).toBeInTheDocument();
  });

  it('renders dashboard title and welcome message', async () => {
    (mockDashboardService.getStats as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDashboardStats });
    (mockDashboardService.getModels as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockModelRecommendations });
    (mockDashboardService.getDatasets as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDatasetLatest });
    (mockDashboardService.getCases as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCaseFeatured });
    (mockDashboardService.getCapabilities as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCapabilityRecommendations });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-page')).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-title')).toHaveTextContent('学科大模型AI能力中心');
      expect(screen.getByText(/欢迎回来，这是您的仪表板概览/)).toBeInTheDocument();
    });
  });

  it('renders all stats cards', async () => {
    (mockDashboardService.getStats as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDashboardStats });
    (mockDashboardService.getModels as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockModelRecommendations });
    (mockDashboardService.getDatasets as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDatasetLatest });
    (mockDashboardService.getCases as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCaseFeatured });
    (mockDashboardService.getCapabilities as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCapabilityRecommendations });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByTestId('stats-models')).toBeInTheDocument();
      expect(screen.getByTestId('stats-datasets')).toBeInTheDocument();
      expect(screen.getByTestId('stats-cases')).toBeInTheDocument();
      expect(screen.getByTestId('stats-capabilities')).toBeInTheDocument();

      expect(screen.getByTestId('stats-models-value')).toHaveTextContent('12');
      expect(screen.getByTestId('stats-datasets-value')).toHaveTextContent('89');
      expect(screen.getByTestId('stats-cases-value')).toHaveTextContent('234');
      expect(screen.getByTestId('stats-capabilities-value')).toHaveTextContent('36');
    });
  });

  it('renders all sections', async () => {
    (mockDashboardService.getStats as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDashboardStats });
    (mockDashboardService.getModels as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockModelRecommendations });
    (mockDashboardService.getDatasets as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDatasetLatest });
    (mockDashboardService.getCases as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCaseFeatured });
    (mockDashboardService.getCapabilities as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCapabilityRecommendations });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByTestId('models-section-title')).toHaveTextContent('大模型');
      expect(screen.getByTestId('datasets-section-title')).toHaveTextContent('数据集');
      expect(screen.getByTestId('cases-section-title')).toHaveTextContent('应用案例');
      expect(screen.getByTestId('capabilities-section-title')).toHaveTextContent('AI能力');
    });
  });

  it('renders models grid with items', async () => {
    (mockDashboardService.getStats as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDashboardStats });
    (mockDashboardService.getModels as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockModelRecommendations });
    (mockDashboardService.getDatasets as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDatasetLatest });
    (mockDashboardService.getCases as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCaseFeatured });
    (mockDashboardService.getCapabilities as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCapabilityRecommendations });

    render(<Dashboard />);

    await waitFor(() => {
      const modelsGrid = screen.getByTestId('models-grid');
      expect(modelsGrid).toBeInTheDocument();

      mockModelRecommendations.list.slice(0, 3).forEach((model, index) => {
        expect(screen.getByTestId(`model-card-${index}`)).toBeInTheDocument();
        expect(screen.getByTestId(`model-card-${index}-name`)).toHaveTextContent(model.name);
      });
    });
  });

  it('renders datasets grid with items', async () => {
    (mockDashboardService.getStats as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDashboardStats });
    (mockDashboardService.getModels as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockModelRecommendations });
    (mockDashboardService.getDatasets as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDatasetLatest });
    (mockDashboardService.getCases as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCaseFeatured });
    (mockDashboardService.getCapabilities as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCapabilityRecommendations });

    render(<Dashboard />);

    await waitFor(() => {
      const datasetsGrid = screen.getByTestId('datasets-grid');
      expect(datasetsGrid).toBeInTheDocument();

      mockDatasetLatest.list.slice(0, 3).forEach((dataset, index) => {
        expect(screen.getByTestId(`dataset-card-${index}`)).toBeInTheDocument();
        expect(screen.getByTestId(`dataset-card-${index}-name`)).toHaveTextContent(dataset.name);
      });
    });
  });

  it('renders cases grid with items', async () => {
    (mockDashboardService.getStats as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDashboardStats });
    (mockDashboardService.getModels as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockModelRecommendations });
    (mockDashboardService.getDatasets as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDatasetLatest });
    (mockDashboardService.getCases as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCaseFeatured });
    (mockDashboardService.getCapabilities as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCapabilityRecommendations });

    render(<Dashboard />);

    await waitFor(() => {
      const casesGrid = screen.getByTestId('cases-grid');
      expect(casesGrid).toBeInTheDocument();

      mockCaseFeatured.list.slice(0, 3).forEach((caseItem, index) => {
        expect(screen.getByTestId(`case-card-${index}`)).toBeInTheDocument();
        expect(screen.getByTestId(`case-card-${index}-title`)).toHaveTextContent(caseItem.title);
      });
    });
  });

  it('renders capabilities grid with items', async () => {
    (mockDashboardService.getStats as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDashboardStats });
    (mockDashboardService.getModels as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockModelRecommendations });
    (mockDashboardService.getDatasets as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockDatasetLatest });
    (mockDashboardService.getCases as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCaseFeatured });
    (mockDashboardService.getCapabilities as vi.Mock).mockResolvedValue({ code: 200, message: '操作成功', data: mockCapabilityRecommendations });

    render(<Dashboard />);

    await waitFor(() => {
      const capabilitiesGrid = screen.getByTestId('capabilities-grid');
      expect(capabilitiesGrid).toBeInTheDocument();

      mockCapabilityRecommendations.list.slice(0, 3).forEach((capability, index) => {
        expect(screen.getByTestId(`capability-card-${index}`)).toBeInTheDocument();
        expect(screen.getByTestId(`capability-card-${index}-name`)).toHaveTextContent(capability.name);
      });
    });
  });
});

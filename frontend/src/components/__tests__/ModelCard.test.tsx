import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ModelCard } from '../dashboard/ModelCard';
import { mockModelRecommendations } from '../../test/__mocks__/mockData';

describe('ModelCard Component', () => {
  const mockModel = mockModelRecommendations.list[0];

  it('renders model basic information', () => {
    render(<ModelCard model={mockModel} dataTestId="model-card" />);

    expect(screen.getByTestId('model-card')).toBeInTheDocument();
    expect(screen.getByTestId('model-card-name')).toHaveTextContent('数学大模型');
    expect(screen.getByTestId('model-card-description')).toHaveTextContent(
      '专注于数学问题解答和公式推导的AI模型'
    );
  });

  it('renders model version and metrics', () => {
    render(<ModelCard model={mockModel} dataTestId="model-card" />);

    expect(screen.getByText('v2.1.0')).toBeInTheDocument();
    expect(screen.getByText('97.8% 准确率')).toBeInTheDocument();
  });

  it('renders model tags', () => {
    render(<ModelCard model={mockModel} dataTestId="model-card" />);

    mockModel.tags.forEach((tag, index) => {
      expect(screen.getByTestId(`model-card-tag-${index}`)).toHaveTextContent(tag);
    });
  });

  it('renders online status correctly', () => {
    render(<ModelCard model={mockModel} dataTestId="model-card" />);

    const statusElement = screen.getByTestId('model-card-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('在线');
    expect(statusElement).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('renders offline status correctly', () => {
    const offlineModel = { ...mockModel, status: 'offline' as const };
    render(<ModelCard model={offlineModel} dataTestId="model-card" />);

    const statusElement = screen.getByTestId('model-card-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('离线');
    expect(statusElement).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('renders large view count with thousands separator', () => {
    render(<ModelCard model={mockModel} dataTestId="model-card" />);

    expect(screen.getByText('12,345 浏览')).toBeInTheDocument();
  });
});

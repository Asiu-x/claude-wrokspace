import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsCard } from '../dashboard/StatsCard';

describe('StatsCard Component', () => {
  it('renders card with basic information', () => {
    render(
      <StatsCard
        title="大模型"
        value={12}
        dataTestId="stats-models"
      />
    );

    expect(screen.getByTestId('stats-models')).toBeInTheDocument();
    expect(screen.getByText('大模型')).toBeInTheDocument();
    expect(screen.getByTestId('stats-models-value')).toHaveTextContent('12');
  });

  it('renders positive trend', () => {
    render(
      <StatsCard
        title="大模型"
        value={12}
        trend={12.5}
        trendUp={true}
        dataTestId="stats-models"
      />
    );

    const trendElement = screen.getByTestId('stats-models-trend');
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveTextContent('↑ 12.5%');
    expect(trendElement).toHaveClass('text-green-500');
  });

  it('renders negative trend', () => {
    render(
      <StatsCard
        title="大模型"
        value={12}
        trend={2.1}
        trendUp={false}
        dataTestId="stats-models"
      />
    );

    const trendElement = screen.getByTestId('stats-models-trend');
    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveTextContent('↓ 2.1%');
    expect(trendElement).toHaveClass('text-red-500');
  });

  it('renders large numbers with thousands separator', () => {
    render(
      <StatsCard
        title="用户数"
        value={1567}
        dataTestId="stats-users"
      />
    );

    expect(screen.getByTestId('stats-users-value')).toHaveTextContent('1,567');
  });

  it('renders with custom color class', () => {
    render(
      <StatsCard
        title="数据集"
        value={89}
        colorClass="bg-green-500"
        dataTestId="stats-datasets"
      />
    );

    const cardElement = screen.getByTestId('stats-datasets');
    expect(cardElement).toBeInTheDocument();
  });
});

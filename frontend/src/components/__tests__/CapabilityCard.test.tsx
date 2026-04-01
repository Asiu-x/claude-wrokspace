import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CapabilityCard } from '../dashboard/CapabilityCard';
import { mockCapabilityRecommendations } from '../../test/__mocks__/mockData';

describe('CapabilityCard Component', () => {
  const mockCapability = mockCapabilityRecommendations.list[0];

  it('renders capability basic information', () => {
    render(<CapabilityCard capability={mockCapability} dataTestId="capability-card" />);

    expect(screen.getByTestId('capability-card')).toBeInTheDocument();
    expect(screen.getByTestId('capability-card-name')).toHaveTextContent('智能答题');
    expect(screen.getByTestId('capability-card-description')).toHaveTextContent(
      '提供各类学科问题的智能解答和分析'
    );
  });

  it('renders capability icon', () => {
    render(<CapabilityCard capability={mockCapability} dataTestId="capability-card" />);

    expect(screen.getByTestId('capability-card-icon')).toBeInTheDocument();
    expect(screen.getByTestId('capability-card-icon')).toHaveTextContent('🎯');
  });

  it('renders capability tags', () => {
    render(<CapabilityCard capability={mockCapability} dataTestId="capability-card" />);

    mockCapability.tags.forEach((tag, index) => {
      expect(screen.getByTestId(`capability-card-tag-${index}`)).toHaveTextContent(tag);
    });
  });

  it('renders online status correctly', () => {
    render(<CapabilityCard capability={mockCapability} dataTestId="capability-card" />);

    const statusElement = screen.getByTestId('capability-card-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('在线');
    expect(statusElement).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('renders developing status correctly', () => {
    const devCapability = { ...mockCapability, status: 'developing' as const };
    render(<CapabilityCard capability={devCapability} dataTestId="capability-card" />);

    const statusElement = screen.getByTestId('capability-card-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('开发中');
    expect(statusElement).toHaveClass('bg-purple-100', 'text-purple-800');
  });

  it('renders offline status correctly', () => {
    const offlineCapability = { ...mockCapability, status: 'offline' as const };
    render(<CapabilityCard capability={offlineCapability} dataTestId="capability-card" />);

    const statusElement = screen.getByTestId('capability-card-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('离线');
    expect(statusElement).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('renders metrics correctly', () => {
    render(<CapabilityCard capability={mockCapability} dataTestId="capability-card" />);

    expect(screen.getByText('97.8% 成功率')).toBeInTheDocument();
    expect(screen.getByText('1.2ms 响应')).toBeInTheDocument();
    expect(screen.getByText('12,345 调用')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.8')).toBeInTheDocument();
  });

  it('renders usage count with thousands separator', () => {
    render(<CapabilityCard capability={mockCapability} dataTestId="capability-card" />);

    expect(screen.getByText('12,345 调用')).toBeInTheDocument();
  });
});

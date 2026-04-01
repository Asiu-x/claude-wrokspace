import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CaseCard } from '../dashboard/CaseCard';
import { mockCaseFeatured } from '../../test/__mocks__/mockData';

describe('CaseCard Component', () => {
  const mockCase = mockCaseFeatured.list[0];

  it('renders case basic information', () => {
    render(<CaseCard caseItem={mockCase} dataTestId="case-card" />);

    expect(screen.getByTestId('case-card')).toBeInTheDocument();
    expect(screen.getByTestId('case-card-title')).toHaveTextContent('高三数学总复习');
    expect(screen.getByTestId('case-card-summary')).toHaveTextContent(
      '针对高三数学总复习的AI辅助教学案例'
    );
  });

  it('renders case duration and author', () => {
    render(<CaseCard caseItem={mockCase} dataTestId="case-card" />);

    expect(screen.getByText('张三')).toBeInTheDocument();
    expect(screen.getByText('120 分钟')).toBeInTheDocument();
  });

  it('renders case tags', () => {
    render(<CaseCard caseItem={mockCase} dataTestId="case-card" />);

    const displayTags = mockCase.tags.slice(0, 3);
    displayTags.forEach((tag, index) => {
      expect(screen.getByTestId(`case-card-tag-${index}`)).toHaveTextContent(tag);
    });

    if (mockCase.tags.length > 3) {
      expect(screen.getByText(`+${mockCase.tags.length - 3}`)).toBeInTheDocument();
    }
  });

  it('renders published status correctly', () => {
    render(<CaseCard caseItem={mockCase} dataTestId="case-card" />);

    const statusElement = screen.getByTestId('case-card-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('已发布');
    expect(statusElement).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('renders pending status correctly', () => {
    const pendingCase = { ...mockCase, status: 'pending' as const };
    render(<CaseCard caseItem={pendingCase} dataTestId="case-card" />);

    const statusElement = screen.getByTestId('case-card-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('待发布');
    expect(statusElement).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('renders draft status correctly', () => {
    const draftCase = { ...mockCase, status: 'draft' as const };
    render(<CaseCard caseItem={draftCase} dataTestId="case-card" />);

    const statusElement = screen.getByTestId('case-card-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('草稿');
    expect(statusElement).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  it('renders like count correctly', () => {
    render(<CaseCard caseItem={mockCase} dataTestId="case-card" />);

    expect(screen.getByText('👍 567')).toBeInTheDocument();
  });

  it('renders view count with thousands separator', () => {
    render(<CaseCard caseItem={mockCase} dataTestId="case-card" />);

    expect(screen.getByText('1,234 浏览')).toBeInTheDocument();
  });
});

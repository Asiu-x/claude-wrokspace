import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DatasetCard } from '../dashboard/DatasetCard';
import { mockDatasetLatest } from '../../test/__mocks__/mockData';

describe('DatasetCard Component', () => {
  const mockDataset = mockDatasetLatest.list[0];

  it('renders dataset basic information', () => {
    render(<DatasetCard dataset={mockDataset} dataTestId="dataset-card" />);

    expect(screen.getByTestId('dataset-card')).toBeInTheDocument();
    expect(screen.getByTestId('dataset-card-name')).toHaveTextContent('数学题库');
    expect(screen.getByTestId('dataset-card-description')).toHaveTextContent(
      '包含10万+数学题目的标准化题库'
    );
  });

  it('renders dataset version and size', () => {
    render(<DatasetCard dataset={mockDataset} dataTestId="dataset-card" />);

    expect(screen.getByText('v3.2.0')).toBeInTheDocument();
    expect(screen.getByText('256 MB')).toBeInTheDocument();
  });

  it('renders dataset tags', () => {
    render(<DatasetCard dataset={mockDataset} dataTestId="dataset-card" />);

    mockDataset.tags.forEach((tag, index) => {
      expect(screen.getByTestId(`dataset-card-tag-${index}`)).toHaveTextContent(tag);
    });
  });

  it('renders published status correctly', () => {
    render(<DatasetCard dataset={mockDataset} dataTestId="dataset-card" />);

    const statusElement = screen.getByTestId('dataset-card-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('已发布');
    expect(statusElement).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('renders reviewing status correctly', () => {
    const reviewingDataset = { ...mockDataset, status: 'reviewing' as const };
    render(<DatasetCard dataset={reviewingDataset} dataTestId="dataset-card" />);

    const statusElement = screen.getByTestId('dataset-card-status');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveTextContent('审核中');
    expect(statusElement).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('renders large sample count with thousands separator', () => {
    render(<DatasetCard dataset={mockDataset} dataTestId="dataset-card" />);

    expect(screen.getByText('120,450 样本')).toBeInTheDocument();
  });

  it('renders file size in GB for large files', () => {
    const largeDataset = { ...mockDataset, size: 2048 };
    render(<DatasetCard dataset={largeDataset} dataTestId="dataset-card" />);

    expect(screen.getByText('2.0 GB')).toBeInTheDocument();
  });
});

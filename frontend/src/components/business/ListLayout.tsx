import React, { useState } from 'react';
import FilterBar from '../common/FilterBar';
import Pagination from '../common/Pagination';
import EmptyState from '../common/EmptyState';

interface ListLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  searchValue?: string;
  onSearch?: (value: string) => void;
  filters?: any;
  filterValues?: any;
  onFilterChange?: (key: string, value: string) => void;
  onReset?: () => void;
  current?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  actions?: React.ReactNode;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
}

const ListLayout: React.FC<ListLayoutProps> = ({
  children,
  searchValue = '',
  onSearch,
  filters = {},
  filterValues = {},
  onFilterChange,
  onReset,
  current = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  onPageSizeChange,
  actions,
  emptyState,
  isLoading = false,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      {/* 操作栏 */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          {actions}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${
              viewMode === 'grid'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="网格视图"
          >
            📱
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${
              viewMode === 'list'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            title="列表视图"
          >
            📋
          </button>
        </div>
      </div>

      {/* 筛选栏 */}
      <FilterBar
        searchValue={searchValue}
        onSearch={onSearch}
        filters={filters}
        filterValues={filterValues}
        onFilterChange={onFilterChange}
        onReset={onReset}
      />

      {/* 加载状态 */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">加载中...</span>
        </div>
      )}

      {/* 内容区域 */}
      {!isLoading && total === 0 && (
        emptyState || <EmptyState title="暂无数据" description="请尝试调整筛选条件" />
      )}

      {!isLoading && total > 0 && (
        <div className={`space-y-4 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : ''}`}>
          {children}
        </div>
      )}

      {/* 分页 */}
      {!isLoading && total > 0 && (
        <div className="flex items-center justify-center mt-8">
          <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={onPageChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
          />
        </div>
      )}
    </div>
  );
};

export default ListLayout;

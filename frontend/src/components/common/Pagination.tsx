import React from 'react';
import CustomSelect from './CustomSelect';

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  pageSizeOptions?: number[];
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  onChange?: (page: number, pageSize: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  current = 1,
  pageSize = 12,
  total = 0,
  showSizeChanger = true,
  showQuickJumper = false,
  pageSizeOptions = [12, 24, 48, 96],
  showTotal,
  onChange,
  className = ''
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const startItem = (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onChange?.(page, pageSize);
  };

  const handlePageSizeChange = (val: string) => {
    const newPageSize = parseInt(val);
    onChange?.(1, newPageSize);
  };

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (current >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(current - 1);
        pages.push(current);
        pages.push(current + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={`flex items-center justify-between flex-wrap gap-4 ${className}`}>
      {/* 总数显示 */}
      <div className="text-gray-500 text-sm">
        {showTotal ? (
          showTotal(total, [startItem, endItem])
        ) : (
          total > 0 ? `第 ${startItem}-${endItem} 条，共 ${total} 条` : '暂无数据'
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* 每页条数选择 */}
        {showSizeChanger && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">每页</span>
            <CustomSelect
              value={String(pageSize)}
              onChange={handlePageSizeChange}
              size="sm"
              options={pageSizeOptions.map(size => ({ value: String(size), label: String(size) }))}
            />
            <span className="text-gray-500 text-sm">条</span>
          </div>
        )}

        {/* 页码按钮 */}
        <div className="flex items-center gap-1">
          {/* 上一页 */}
          <button
            onClick={() => handlePageChange(current - 1)}
            disabled={current <= 1}
            className={`px-3 py-1.5 rounded border text-sm ${
              current <= 1
                ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                : 'text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
            }`}
          >
            ‹
          </button>

          {/* 页码 */}
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-2 text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(page as number)}
                  className={`px-3 py-1.5 rounded border text-sm font-medium ${
                    page === current
                      ? 'bg-blue-50 text-blue-600 border-blue-600'
                      : 'text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}

          {/* 下一页 */}
          <button
            onClick={() => handlePageChange(current + 1)}
            disabled={current >= totalPages}
            className={`px-3 py-1.5 rounded border text-sm ${
              current >= totalPages
                ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                : 'text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-600'
            }`}
          >
            ›
          </button>
        </div>

        {/* 快速跳转 */}
        {showQuickJumper && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">跳至</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt((e.target as HTMLInputElement).value);
                  handlePageChange(page);
                }
              }}
            />
            <span className="text-gray-500 text-sm">页</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;

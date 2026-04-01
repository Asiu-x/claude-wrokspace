import React from 'react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  [key: string]: {
    label: string;
    type: 'select' | 'input' | 'date';
    options?: FilterOption[];
    placeholder?: string;
  };
}


interface FilterBarProps {
  searchValue?: string;
  onSearch?: (value: string) => void;
  filters?: {
    [key: string]: {
      label: string;
      type: 'select' | 'input' | 'date';
      options?: FilterOption[];
      placeholder?: string;
    };
  };
  filterValues?: {
    [key: string]: string;
  };
  onFilterChange?: (key: string, value: string) => void;
  onReset?: () => void;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchValue = '',
  onSearch,
  filters = {},
  filterValues = {},
  onFilterChange,
  onReset,
  className = ''
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleFilterChange = (key: string, value: string) => {
    onFilterChange?.(key, value);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-fade-in ${className}`}>
      <div className="flex flex-wrap gap-4 items-center">
        {/* 搜索框 */}
        <div className="flex-1 min-w-[200px]">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="搜索..."
              value={searchValue}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus transition-all duration-200"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </form>
        </div>

        {/* 筛选选项 */}
        {Object.entries(filters).map(([key, config]) => {
          return (
            <div key={key} className="min-w-[150px]">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {config.label}
              </label>
              {config.type === 'select' && config.options ? (
                <select
                  value={filterValues[key] || ''}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus transition-all duration-200"
                >
                  <option value="">全部</option>
                  {config.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : config.type === 'input' ? (
                <input
                  type="text"
                  placeholder={config.placeholder}
                  value={filterValues[key] || ''}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus transition-all duration-200"
                />
              ) : (
                <input
                  type="date"
                  value={filterValues[key] || ''}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus transition-all duration-200"
                />
              )}
            </div>
          );
        })}

        {/* 操作按钮 */}
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all duration-200 hover:shadow-sm"
          >
            重置
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

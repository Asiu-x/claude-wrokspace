import React, { useState } from 'react';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value = '',
  placeholder = '搜索...',
  onSearch,
  onClear,
  className = ''
}) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchValue.trim());
  };

  const handleClear = () => {
    setSearchValue('');
    onClear?.();
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus transition-all duration-200"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        disabled={!searchValue.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed btn-primary transition-all duration-200"
      >
        搜索
      </button>
    </form>
  );
};

import React from 'react';

interface DetailLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: string;
  status?: string;
  backButton?: {
    text?: string;
    onClick?: () => void;
  };
  actions?: React.ReactNode;
  tabs?: {
    key: string;
    label: string;
    disabled?: boolean;
  }[];
  activeTab?: string;
  onTabChange?: (key: string) => void;
  isLoading?: boolean;
}

const DetailLayout: React.FC<DetailLayoutProps> = ({
  children,
  title,
  subtitle,
  icon,
  status,
  backButton,
  actions,
  tabs = [],
  activeTab,
  onTabChange,
  isLoading = false,
}) => {
  const statusColors: Record<string, string> = {
    online: 'bg-green-100 text-green-700',
    published: 'bg-green-100 text-green-700',
    testing: 'bg-yellow-100 text-yellow-700',
    draft: 'bg-gray-100 text-gray-600',
    offline: 'bg-red-100 text-red-700',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600 text-lg">加载中...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 头部操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {backButton && (
            <button
              onClick={backButton.onClick}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span>←</span>
              <span>{backButton.text || '返回'}</span>
            </button>
          )}
        </div>
        {actions}
      </div>

      {/* 标题区 */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 truncate">{title}</h1>
              {status && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[status] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {status}
                </span>
              )}
            </div>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Tab 导航 */}
      {tabs.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <nav className="border-b border-gray-200 px-4">
            <ul className="flex space-x-8">
              {tabs.map((tab) => (
                <li key={tab.key}>
                  <button
                    onClick={() => !tab.disabled && onTabChange?.(tab.key)}
                    disabled={tab.disabled}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : tab.disabled
                        ? 'border-transparent text-gray-300 cursor-not-allowed'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* 内容区 */}
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default DetailLayout;

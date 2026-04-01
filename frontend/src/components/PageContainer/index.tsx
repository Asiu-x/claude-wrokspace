import React from 'react';

interface PageContainerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  children,
  actions,
  className = ''
}) => {
  return (
    <div className={`flex flex-col min-h-screen bg-gray-50 ${className}`}>
      {/* 页面标题栏 */}
      {(title || actions) && (
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
              {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center space-x-3">{actions}</div>}
          </div>
        </div>
      )}

      {/* 内容区域 */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;

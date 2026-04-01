import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumb from './Breadcrumb';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbItems?: { label: string; path?: string }[];
  title?: string;
  actions?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  breadcrumbItems = [],
  title,
  actions,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 p-6">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {title && (
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {actions}
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;

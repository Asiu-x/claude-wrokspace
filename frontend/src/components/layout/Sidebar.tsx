import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type MenuItem = {
  key: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    label: '首页概览',
    path: '/',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    key: 'models',
    label: '模型库',
    path: '/models',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    key: 'datasets',
    label: '数据集',
    path: '/datasets',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    key: 'cases',
    label: '案例集',
    path: '/cases',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    key: 'capabilities',
    label: 'AI能力货架',
    path: '/capabilities',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    key: 'graph',
    label: '关联图谱',
    path: '/graph',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveKey = () => {
    const path = location.pathname;
    for (const item of menuItems) {
      if (item.path && path.startsWith(item.path) && item.path !== '/') {
        return item.key;
      }
    }
    return path === '/' ? 'dashboard' : '';
  };

  const activeKey = getActiveKey();

  const handleMenuClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className="w-60 bg-background border-r border-border h-screen fixed left-0 top-0 flex flex-col z-30" style={{ marginTop: '64px' }}>
      <div className="p-4 flex-1 overflow-y-auto">
        {/* 快捷统计 */}
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
          <p className="text-white text-xs opacity-80 mb-1">平台资源</p>
          <p className="text-white text-2xl font-bold">400+</p>
          <p className="text-white text-xs opacity-80 mt-2">已接入资源总数</p>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium px-3 mb-2 text-muted-foreground">功能导航</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.key}>
              <button
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeKey === item.key
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
                }`}
              >
                <span className="mr-3 flex items-center justify-center w-5">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {activeKey === item.key && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></div>
                )}
              </button>
            </div>
          ))}
        </nav>
      </div>

      {/* 底部帮助区域 */}
      <div className="p-4 border-t border-border">
        <div className="p-4 rounded-lg bg-muted">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">需要帮助？</p>
              <p className="text-xs mt-0.5 text-muted-foreground">查看使用文档和教程</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

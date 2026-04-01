import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: '首页', path: '/' },
    { label: '模型库', path: '/models' },
    { label: '数据集', path: '/datasets' },
    { label: '应用案例', path: '/cases' },
    { label: 'AI能力', path: '/capabilities' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">学科大模型AI能力中心</h1>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'text-gray-900 bg-gray-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* 搜索框 */}
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="搜索模型、数据集、能力..."
              className="pl-10 pr-4 py-2 rounded-lg text-sm bg-muted text-foreground border border-input focus:ring-2 focus:ring-ring focus:outline-none transition-all w-80"
            />
            <svg className="w-4 h-4 absolute left-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* 通知图标 */}
          <button className="relative p-2 rounded-lg transition-all hover:bg-gray-100 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* 用户头像 */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">管理员</p>
              <p className="text-xs text-gray-500">admin@edu.cn</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-medium">
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

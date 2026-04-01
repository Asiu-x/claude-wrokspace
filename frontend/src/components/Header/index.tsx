import React, { useState } from 'react';

interface HeaderProps {
  user?: {
    name: string;
    avatar: string;
  };
}

const Header: React.FC<HeaderProps> = ({ user = { name: '张三', avatar: '👤' } }) => {
  const [notifications, setNotifications] = useState([
    { id: '1', title: '新功能上线', content: 'AI对话能力已发布', type: 'success', time: '5分钟前', read: false },
    { id: '2', title: '系统通知', content: '服务器维护将于今晚进行', type: 'warning', time: '1小时前', read: true },
    { id: '3', title: '数据更新', content: '新的数据集已添加', type: 'info', time: '2小时前', read: false }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center h-16 px-4">
        {/* 左侧logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">学科大模型AI能力中心</span>
          </div>
        </div>

        {/* 右侧工具栏 */}
        <div className="flex items-center space-x-3">
          {/* 搜索框 */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="搜索模型、数据集、案例..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
          </div>

          {/* 通知图标 */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-10 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-semibold">通知</h3>
                  <button onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))} className="text-primary-600 text-sm hover:underline">
                    全部已读
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${notif.read ? 'opacity-60' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{notif.title}</h4>
                          <p className="text-gray-500 text-xs mt-1">{notif.content}</p>
                        </div>
                        <div className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          notif.type === 'success' ? 'bg-green-100 text-green-800' :
                          notif.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {notif.type}
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100 text-center">
                  <button className="text-primary-600 text-sm hover:underline">查看全部通知</button>
                </div>
              </div>
            )}
          </div>

          {/* 用户头像 */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium">
                {user.avatar}
              </div>
              <span className="text-sm font-medium hidden md:block">{user.name}</span>
              <span className="text-gray-400">▼</span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a href="/profile" className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-50">
                  <span>👤</span>
                  <span>个人中心</span>
                </a>
                <a href="/settings" className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-50">
                  <span>⚙️</span>
                  <span>设置</span>
                </a>
                <a href="/help" className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-gray-50">
                  <span>❓</span>
                  <span>帮助中心</span>
                </a>
                <div className="border-t border-gray-100 my-2"></div>
                <button className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                  <span>🚪</span>
                  <span>退出登录</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

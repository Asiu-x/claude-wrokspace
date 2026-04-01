import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 骨架屏加载组件
const SkeletonCard: React.FC = () => (
  <div className="bg-card rounded-lg border p-6 animate-pulse">
    <div className="h-6 w-3/4 rounded bg-muted mb-4"></div>
    <div className="h-4 w-full rounded bg-muted mb-2"></div>
    <div className="h-4 w-2/3 rounded bg-muted"></div>
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 快速操作按钮
  const QuickActionButton: React.FC<{
    icon: string;
    title: string;
    subtitle: string;
    onClick: () => void;
  }> = ({ icon, title, subtitle, onClick }) => (
    <button
      onClick={onClick}
      className="p-6 bg-card border border-border rounded-lg text-left hover:shadow-md transition-all duration-200 hover:border-primary/50"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <div className="font-medium text-foreground text-lg mb-1">{title}</div>
      <div className="text-sm text-muted-foreground">{subtitle}</div>
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero 区域 */}
        <div className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 p-12 text-white shadow-xl">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">
              欢迎使用学科大模型AI能力中心
            </h1>
            <p className="text-lg text-blue-50 mb-8 max-w-2xl">
              探索最新的大模型、数据集和AI能力，为您的学术研究赋能
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/models')}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                探索模型库
              </button>
              <button
                onClick={() => navigate('/graph')}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                查看关联图谱
              </button>
            </div>
          </div>
          {/* 装饰性背景 */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* 统计卡片区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : (
            [
              { icon: '🤖', label: '模型总数', value: '128', gradient: 'from-blue-500 to-blue-600' },
              { icon: '📊', label: '数据集总数', value: '86', gradient: 'from-green-500 to-green-600' },
              { icon: '📚', label: '案例总数', value: '64', gradient: 'from-orange-500 to-orange-600' },
              { icon: '🧠', label: 'AI能力总数', value: '32', gradient: 'from-purple-500 to-purple-600' }
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-4xl opacity-50">{stat.icon}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 快速访问区域 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            快速访问
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : (
              <>
                <QuickActionButton
                  icon="🤖"
                  title="模型库"
                  subtitle="探索和管理大模型"
                  onClick={() => navigate('/models')}
                />
                <QuickActionButton
                  icon="📊"
                  title="数据集"
                  subtitle="发现优质数据集"
                  onClick={() => navigate('/datasets')}
                />
                <QuickActionButton
                  icon="📚"
                  title="案例集"
                  subtitle="浏览实践案例"
                  onClick={() => navigate('/cases')}
                />
                <QuickActionButton
                  icon="🧠"
                  title="AI能力"
                  subtitle="查看能力货架"
                  onClick={() => navigate('/capabilities')}
                />
              </>
            )}
          </div>
        </div>

        {/* 特色功能区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* 最新动态 */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">最新动态</h3>
            <div className="space-y-4">
              {[
                { title: 'GPT-4 Turbo 模型已上线', time: '2小时前', type: 'model' },
                { title: '新增教育领域数据集', time: '5小时前', type: 'dataset' },
                { title: '智能问答案例更新', time: '1天前', type: 'case' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 热门推荐 */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">热门推荐</h3>
            <div className="space-y-4">
              {[
                { title: 'ChatGLM-6B', desc: '高性能对话模型', badge: '🔥 热门' },
                { title: '中文维基百科数据集', desc: '大规模中文语料', badge: '⭐ 推荐' },
                { title: '文本分类能力', desc: '多场景文本分类', badge: '🆕 新品' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <footer className="border-t border-border pt-8 mt-12">
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2024 学科大模型AI能力中心. 保留所有权利.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;

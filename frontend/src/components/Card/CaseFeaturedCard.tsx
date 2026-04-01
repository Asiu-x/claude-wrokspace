import React from 'react';
import Card from './index';
import type { CaseItem } from '../../types/dashboard';

interface CaseFeaturedCardProps {
  title?: string;
  description?: string;
  cases?: CaseItem[];
  loading?: boolean;
  onViewAll?: () => void;
  onCaseClick?: (caseItem: CaseItem) => void;
}

// 卡片骨架屏
const CardSkeleton: React.FC = () => (
  <div className="p-4 border border-gray-200 rounded-lg mb-4">
    <div className="skeleton h-5 w-3/4 rounded mb-2"></div>
    <div className="skeleton h-4 w-full rounded mb-2"></div>
    <div className="skeleton h-4 w-2/3 rounded"></div>
  </div>
);

const CaseFeaturedCard: React.FC<CaseFeaturedCardProps> = ({
  title = '精选案例',
  description = 'AI能力在各学科中的应用案例',
  cases = [],
  loading = false,
  onViewAll,
  onCaseClick
}) => {
  const mockCases: CaseItem[] = [
    {
      id: '1',
      title: '基于大模型的数学解题系统',
      code: 'math-solver',
      summary: '使用GPT-4和Claude 3构建的智能数学解题系统，支持从小学到大学数学题',
      scenario: '教育',
      category: '数学',
      tags: ['数学', '解题', '教育'],
      subjects: ['数学', '教育学'],
      relatedModels: ['gpt-4-turbo', 'claude-3-opus'],
      relatedDatasets: ['gaokao-math'],
      relatedCapabilities: ['math_solving'],
      viewCount: 5680,
      likeCount: 1250,
      bookmarkCount: 890,
      status: 'published',
      difficulty: 'intermediate',
      duration: 20,
      steps: 5,
      author: '张教授',
      organization: '清华大学',
      createdAt: '2024-03-15T00:00:00Z',
      publishedAt: '2024-03-20T00:00:00Z'
    },
    {
      id: '2',
      title: '医学影像分析助手',
      code: 'medical-imaging',
      summary: '使用Claude 3和Qwen 2.5构建的医学影像分析系统，帮助医生快速诊断',
      scenario: '医疗',
      category: '医学',
      tags: ['医学', '影像', '诊断'],
      subjects: ['医学', '计算机'],
      relatedModels: ['claude-3-opus', 'qwen-2.5-72b'],
      relatedDatasets: ['medical-abstracts'],
      relatedCapabilities: ['image_analysis'],
      viewCount: 8720,
      likeCount: 2140,
      bookmarkCount: 1350,
      status: 'published',
      difficulty: 'advanced',
      duration: 30,
      steps: 8,
      author: '李医生',
      organization: '协和医院',
      createdAt: '2024-03-25T00:00:00Z',
      publishedAt: '2024-04-01T00:00:00Z'
    },
    {
      id: '3',
      title: '法律文档智能分析',
      code: 'legal-document',
      summary: '使用大模型对法律文档进行自动分类、摘要和关键信息提取',
      scenario: '法律',
      category: '法学',
      tags: ['法律', '文档', '分析'],
      subjects: ['法学', '计算机'],
      relatedModels: ['gpt-4-turbo'],
      relatedDatasets: ['legal-documents'],
      relatedCapabilities: ['text_analysis'],
      viewCount: 4580,
      likeCount: 980,
      bookmarkCount: 640,
      status: 'published',
      difficulty: 'beginner',
      duration: 15,
      steps: 4,
      author: '王律师',
      organization: '盈科律师事务所',
      createdAt: '2024-04-02T00:00:00Z',
      publishedAt: '2024-04-05T00:00:00Z'
    }
  ];

  const displayCases = cases.length > 0 ? cases : mockCases;

  const formatDifficulty = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return '入门';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return difficulty;
    }
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes}分钟`;
    return `${Math.floor(minutes / 60)}小时${minutes % 60}分钟`;
  };

  const actions = onViewAll ? (
    <button
      onClick={onViewAll}
      className="text-[#409eff] text-sm font-medium hover:text-[#66b1ff] flex items-center"
    >
      查看全部
      <span className="ml-1">→</span>
    </button>
  ) : undefined;

  return (
    <Card title={title} description={description} actions={actions} loading={loading}>
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))
        ) : (
          displayCases.map((caseItem) => (
            <div
              key={caseItem.id}
              onClick={() => onCaseClick?.(caseItem)}
              className="p-4 border border-[#ebeef5] rounded-lg hover:border-[#409eff] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-[#303133] text-lg">{caseItem.title}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      caseItem.difficulty === 'beginner' ? 'bg-[#f0f9eb] text-[#67c23a]' :
                      caseItem.difficulty === 'intermediate' ? 'bg-[#fdf6ec] text-[#e6a23c]' :
                      'bg-[#fef0f0] text-[#f56c6c]'
                    }`}>
                      {formatDifficulty(caseItem.difficulty)}
                    </span>
                  </div>
                  <p className="text-[#606266] text-sm mt-1 line-clamp-2">{caseItem.summary}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center text-xs text-[#909399]">
                      <span className="mr-1">⏱️</span>
                      {formatDuration(caseItem.duration)}
                    </span>
                    <span className="flex items-center text-xs text-[#909399]">
                      <span className="mr-1">📝</span>
                      {caseItem.steps} 步骤
                    </span>
                    <span className="flex items-center text-xs text-[#909399]">
                      <span className="mr-1">👤</span>
                      {caseItem.author}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {caseItem.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 bg-[#f5f7fa] text-[#909399] text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4 text-right flex-shrink-0">
                  <div className="flex items-center justify-end space-x-1 text-red-500">
                    <span>❤️</span>
                    <span className="text-[#303133] font-medium">{caseItem.likeCount}</span>
                  </div>
                  <div className="text-[#909399] text-xs mt-1">
                    {caseItem.viewCount.toLocaleString()} 次查看
                  </div>
                  <div className="text-[#c0c4cc] text-xs">
                    {caseItem.bookmarkCount} 收藏
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default CaseFeaturedCard;

import React from 'react';
import Card from './index';
import type { CapabilityItem } from '../../types/dashboard';

interface CapabilityRecommendationCardProps {
  title?: string;
  description?: string;
  capabilities?: CapabilityItem[];
  loading?: boolean;
  onViewAll?: () => void;
  onCapabilityClick?: (capability: CapabilityItem) => void;
}

// 卡片骨架屏
const CardSkeleton: React.FC = () => (
  <div className="p-4 border border-[#EBEEF5] rounded-lg mb-4">
    <div className="flex items-start space-x-3">
      <div className="w-12 h-12 el-skeleton rounded-xl"></div>
      <div className="flex-1">
        <div className="el-skeleton h-5 w-3/4 rounded mb-2"></div>
        <div className="el-skeleton h-4 w-full rounded"></div>
      </div>
    </div>
  </div>
);

const CapabilityRecommendationCard: React.FC<CapabilityRecommendationCardProps> = ({
  title = 'AI能力推荐',
  description = '丰富的AI能力，快速构建您的应用',
  capabilities = [],
  loading = false,
  onViewAll,
  onCapabilityClick
}) => {
  const mockCapabilities: CapabilityItem[] = [
    {
      id: '1',
      name: '文本生成',
      code: 'text_generation',
      description: '生成高质量的文本内容，包括文章、摘要、对话等',
      category: 'text_generation',
      subCategory: '通用文本',
      tags: ['文本生成', '写作', '摘要'],
      subjects: ['文学', '语言学', '传播学'],
      avgResponseTime: 1.5,
      availability: 99.8,
      rateLimit: 1000,
      isFeatured: true,
      status: 'online',
      icon: '✍️',
      sortOrder: 1,
      usageCount: 156800,
      successRate: 98.5,
      apiEndpoint: '/api/capabilities/text-generation',
      apiMethod: 'POST',
      viewCount: 25800,
      trialCount: 8900,
      rating: 4.9,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-04-01T00:00:00Z'
    },
    {
      id: '2',
      name: '数学解题',
      code: 'math_solving',
      description: '解决各种数学问题，包括算术、代数、几何等',
      category: 'math',
      subCategory: '数学',
      tags: ['数学', '解题', '计算'],
      subjects: ['数学', '物理学'],
      avgResponseTime: 2.8,
      availability: 99.5,
      rateLimit: 500,
      isFeatured: true,
      status: 'online',
      icon: '🧮',
      sortOrder: 2,
      usageCount: 98700,
      successRate: 96.2,
      apiEndpoint: '/api/capabilities/math-solving',
      apiMethod: 'POST',
      viewCount: 18500,
      trialCount: 6200,
      rating: 4.7,
      createdAt: '2024-02-01T00:00:00Z',
      updatedAt: '2024-04-05T00:00:00Z'
    },
    {
      id: '3',
      name: '代码生成',
      code: 'code_generation',
      description: '根据需求生成各种编程语言的代码，支持多种框架',
      category: 'coding',
      subCategory: '编程',
      tags: ['代码', '编程', '开发'],
      subjects: ['计算机', '软件工程'],
      avgResponseTime: 2.2,
      availability: 99.6,
      rateLimit: 800,
      isFeatured: true,
      status: 'online',
      icon: '💻',
      sortOrder: 3,
      usageCount: 142500,
      successRate: 97.8,
      apiEndpoint: '/api/capabilities/code-generation',
      apiMethod: 'POST',
      viewCount: 22800,
      trialCount: 7800,
      rating: 4.8,
      createdAt: '2024-01-20T00:00:00Z',
      updatedAt: '2024-03-28T00:00:00Z'
    },
    {
      id: '4',
      name: '多模态分析',
      code: 'multimodal_analysis',
      description: '分析图像、文本、音频等多种模态数据',
      category: 'multimodal',
      subCategory: '多模态',
      tags: ['图像', '音频', '多模态'],
      subjects: ['计算机', '艺术', '媒体'],
      avgResponseTime: 3.5,
      availability: 99.2,
      rateLimit: 300,
      isFeatured: true,
      status: 'online',
      icon: '🎨',
      sortOrder: 4,
      usageCount: 76200,
      successRate: 94.5,
      apiEndpoint: '/api/capabilities/multimodal',
      apiMethod: 'POST',
      viewCount: 15300,
      trialCount: 4500,
      rating: 4.6,
      createdAt: '2024-02-15T00:00:00Z',
      updatedAt: '2024-04-10T00:00:00Z'
    }
  ];

  const displayCapabilities = capabilities.length > 0 ? capabilities : mockCapabilities;

  const formatCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      text_generation: '文本生成',
      text_analysis: '文本分析',
      question_answering: '问答',
      summarization: '摘要',
      translation: '翻译',
      coding: '编程',
      math: '数学',
      multimodal: '多模态',
      other: '其他'
    };
    return categoryMap[category] || category;
  };

  const actions = onViewAll ? (
    <button
      onClick={onViewAll}
      className="text-[#409eff] text-sm font-medium hover:text-[#66b1ff] flex items-center el-button-hover"
    >
      查看全部
      <span className="ml-1">→</span>
    </button>
  ) : undefined;

  return (
    <Card title={title} description={description} actions={actions} loading={loading}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))
        ) : (
          displayCapabilities.map((capability) => (
            <div
              key={capability.id}
              onClick={() => onCapabilityClick?.(capability)}
              className="p-4 border border-[#EBEEF5] rounded-lg hover:border-[#409eff] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-[#ECF5FF] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {capability.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[#303133] truncate">{capability.name}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ml-2 flex-shrink-0 ${
                      capability.status === 'online' ? 'bg-[#F0F9EB] text-[#67c23a]' : 'bg-[#F5F7FA] text-[#909399]'
                    }`}>
                      {capability.status === 'online' ? '在线' : '离线'}
                    </span>
                  </div>
                  <p className="text-[#606266] text-sm mt-1 line-clamp-2">{capability.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-[#909399] bg-[#F5F7FA] px-2 py-0.5 rounded">
                      {formatCategory(capability.category)}
                    </span>
                    <span className="flex items-center text-xs text-[#909399]">
                      <span className="mr-1">⚡</span>
                      {capability.avgResponseTime}s
                    </span>
                    <span className="flex items-center text-xs text-[#909399]">
                      <span className="mr-1">📊</span>
                      {capability.successRate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <span>⭐</span>
                      <span className="text-[#303133] text-sm font-medium">{capability.rating}</span>
                    </div>
                    <div className="text-[#909399] text-xs">
                      {capability.usageCount.toLocaleString()} 次使用
                    </div>
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

export default CapabilityRecommendationCard;

import React from 'react';
import Card from './index';
import type { ModelItem } from '../../types/dashboard';

interface ModelRecommendationCardProps {
  title?: string;
  description?: string;
  models?: ModelItem[];
  loading?: boolean;
  onViewAll?: () => void;
  onModelClick?: (model: ModelItem) => void;
}

// 卡片骨架屏
const CardSkeleton: React.FC = () => (
  <div className="p-4 border border-[#EBEEF5] rounded-lg mb-4">
    <div className="el-skeleton h-5 w-3/4 rounded mb-2"></div>
    <div className="el-skeleton h-4 w-full rounded mb-2"></div>
    <div className="el-skeleton h-4 w-2/3 rounded"></div>
  </div>
);

const ModelRecommendationCard: React.FC<ModelRecommendationCardProps> = ({
  title = '大模型推荐',
  description = '根据您的使用习惯，为您精选了以下模型',
  models = [],
  loading = false,
  onViewAll,
  onModelClick
}) => {
  const mockModels: ModelItem[] = [
    {
      id: '1',
      name: 'GPT-4 Turbo',
      code: 'gpt-4-turbo',
      description: 'OpenAI最新的GPT-4模型，具有更强的推理能力和更长的上下文',
      version: '2024-04-09',
      type: 'llm',
      status: 'online',
      metrics: {
        accuracy: 95.5,
        inferenceSpeed: 120
      },
      framework: 'OpenAI',
      parameters: '1.7T',
      precision: 'FP16',
      fileSize: 102400,
      category: '文本生成',
      tags: ['通用', '推理', '对话'],
      subjects: ['计算机', '数学', '语言学'],
      viewCount: 12580,
      downloadCount: 3420,
      rating: 4.8,
      createdAt: '2024-04-01T00:00:00Z',
      publishedAt: '2024-04-05T00:00:00Z'
    },
    {
      id: '2',
      name: 'Claude 3 Opus',
      code: 'claude-3-opus',
      description: 'Anthropic的顶级模型，擅长复杂任务和长文档处理',
      version: '1.0',
      type: 'llm',
      status: 'online',
      metrics: {
        accuracy: 94.8,
        inferenceSpeed: 105
      },
      framework: 'Anthropic',
      parameters: '1.2T',
      precision: 'FP16',
      fileSize: 81920,
      category: '文本生成',
      tags: ['长文本', '分析', '安全'],
      subjects: ['法学', '管理学', '文学'],
      viewCount: 9870,
      downloadCount: 2890,
      rating: 4.7,
      createdAt: '2024-03-15T00:00:00Z',
      publishedAt: '2024-03-20T00:00:00Z'
    },
    {
      id: '3',
      name: 'Qwen 2.5 72B',
      code: 'qwen-2.5-72b',
      description: '通义千问2.5系列，性能强劲的开源大模型',
      version: '2.5',
      type: 'llm',
      status: 'online',
      metrics: {
        accuracy: 91.2,
        inferenceSpeed: 150
      },
      framework: 'Transformers',
      parameters: '72B',
      precision: 'FP16',
      fileSize: 143360,
      category: '文本生成',
      tags: ['开源', '中文', '通用'],
      subjects: ['教育学', '社会学', '心理学'],
      viewCount: 15680,
      downloadCount: 5210,
      rating: 4.6,
      createdAt: '2024-04-10T00:00:00Z',
      publishedAt: '2024-04-12T00:00:00Z'
    }
  ];

  const displayModels = models.length > 0 ? models : mockModels;

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
    <Card
      title={title}
      description={description}
      actions={actions}
      loading={loading}
      className="bg-white rounded-lg shadow-sm"
    >
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))
        ) : (
          displayModels.map((model) => (
            <div
              key={model.id}
              onClick={() => onModelClick?.(model)}
              className="p-4 border border-[#EBEEF5] rounded-lg hover:border-[#409eff] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-[#303133] text-lg">{model.name}</h3>
                    <span className="px-2 py-0.5 bg-[#ECF5FF] text-[#409eff] text-xs rounded-full">
                      {model.version}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      model.status === 'online' ? 'bg-[#F0F9EB] text-[#67c23a]' : 'bg-[#FEF0F0] text-[#F56C6C]'
                    }`}>
                      {model.status === 'online' ? '在线' : '离线'}
                    </span>
                  </div>
                  <p className="text-[#606266] text-sm mt-1 line-clamp-2">{model.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {model.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 bg-[#F5F7FA] text-[#909399] text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4 text-right flex-shrink-0">
                  <div className="flex items-center justify-end space-x-1 text-yellow-500">
                    <span>⭐</span>
                    <span className="text-[#303133] font-medium">{model.rating}</span>
                  </div>
                  <div className="text-[#909399] text-xs mt-1">
                    {model.viewCount.toLocaleString()} 次查看
                  </div>
                  <div className="text-[#C0C4CC] text-xs">
                    {model.downloadCount.toLocaleString()} 次下载
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

export default ModelRecommendationCard;

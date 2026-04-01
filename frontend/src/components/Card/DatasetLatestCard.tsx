import React from 'react';
import Card from './index';
import type { DatasetItem } from '../../types/dashboard';

interface DatasetLatestCardProps {
  title?: string;
  description?: string;
  datasets?: DatasetItem[];
  loading?: boolean;
  onViewAll?: () => void;
  onDatasetClick?: (dataset: DatasetItem) => void;
}

// 卡片骨架屏
const CardSkeleton: React.FC = () => (
  <div className="p-4 border border-gray-200 rounded-lg mb-4">
    <div className="skeleton h-5 w-3/4 rounded mb-2"></div>
    <div className="skeleton h-4 w-full rounded mb-2"></div>
    <div className="skeleton h-4 w-2/3 rounded"></div>
  </div>
);

const DatasetLatestCard: React.FC<DatasetLatestCardProps> = ({
  title = '最新数据集',
  description = '最新更新的高质量学科数据集',
  datasets = [],
  loading = false,
  onViewAll,
  onDatasetClick
}) => {
  const mockDatasets: DatasetItem[] = [
    {
      id: '1',
      name: '中文维基百科问答数据集',
      code: 'wikiqa-zh',
      description: '基于中文维基百科构建的大规模问答对数据集，涵盖多学科领域',
      version: '2.0',
      format: 'jsonl',
      status: 'published',
      size: 5242880,
      sampleCount: 1200000,
      tokenCount: 2500000000,
      languages: ['zh-CN'],
      difficulty: 'intermediate',
      qualityScore: 92,
      category: '问答',
      tags: ['中文', '百科', '问答'],
      subjects: ['历史学', '哲学', '社会学'],
      viewCount: 8520,
      downloadCount: 2150,
      createdAt: '2024-04-05T00:00:00Z',
      publishedAt: '2024-04-08T00:00:00Z'
    },
    {
      id: '2',
      name: '高考数学题库',
      code: 'gaokao-math',
      description: '近十年高考数学真题及解答，覆盖高中数学全知识点',
      version: '1.5',
      format: 'json',
      status: 'published',
      size: 1048576,
      sampleCount: 45000,
      tokenCount: 850000000,
      languages: ['zh-CN'],
      difficulty: 'advanced',
      qualityScore: 96,
      category: '数学',
      tags: ['数学', '高考', '真题'],
      subjects: ['数学'],
      viewCount: 12680,
      downloadCount: 4820,
      createdAt: '2024-03-20T00:00:00Z',
      publishedAt: '2024-03-25T00:00:00Z'
    },
    {
      id: '3',
      name: '医学文献摘要数据集',
      code: 'medical-abstracts',
      description: '中文核心医学期刊文献摘要，标注疾病和药物信息',
      version: '1.0',
      format: 'parquet',
      status: 'published',
      size: 2097152,
      sampleCount: 280000,
      tokenCount: 850000000,
      languages: ['zh-CN'],
      difficulty: 'advanced',
      qualityScore: 94,
      category: '医学',
      tags: ['医学', '文献', '标注'],
      subjects: ['医学', '药学', '生物学'],
      viewCount: 6240,
      downloadCount: 1890,
      createdAt: '2024-04-10T00:00:00Z',
      publishedAt: '2024-04-14T00:00:00Z'
    }
  ];

  const displayDatasets = datasets.length > 0 ? datasets : mockDatasets;

  const formatFileSize = (bytes: number): string => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${bytes} B`;
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
          displayDatasets.map((dataset) => (
            <div
              key={dataset.id}
              onClick={() => onDatasetClick?.(dataset)}
              className="p-4 border border-[#ebeef5] rounded-lg hover:border-[#409eff] hover:shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-[#303133] text-lg">{dataset.name}</h3>
                    <span className="px-2 py-0.5 bg-[#f5f7fa] text-[#909399] text-xs rounded-full">
                      {dataset.version}
                    </span>
                  </div>
                  <p className="text-[#606266] text-sm mt-1 line-clamp-2">{dataset.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center text-xs text-[#909399]">
                      <span className="mr-1">📊</span>
                      {formatFileSize(dataset.size)}
                    </span>
                    <span className="flex items-center text-xs text-[#909399]">
                      <span className="mr-1">📄</span>
                      {dataset.sampleCount.toLocaleString()} 样本
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      dataset.difficulty === 'beginner' ? 'bg-[#f0f9eb] text-[#67c23a]' :
                      dataset.difficulty === 'intermediate' ? 'bg-[#fdf6ec] text-[#e6a23c]' :
                      'bg-[#fef0f0] text-[#f56c6c]'
                    }`}>
                      {dataset.difficulty === 'beginner' ? '入门' :
                       dataset.difficulty === 'intermediate' ? '中级' : '高级'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {dataset.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 bg-[#f5f7fa] text-[#909399] text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4 text-right flex-shrink-0">
                  <div className="flex items-center justify-end space-x-1">
                    <span className="text-[#409eff]">⭐</span>
                    <span className="text-[#303133] font-medium">{dataset.qualityScore}</span>
                  </div>
                  <div className="text-[#909399] text-xs mt-1">
                    {dataset.viewCount.toLocaleString()} 次查看
                  </div>
                  <div className="text-[#c0c4cc] text-xs">
                    {dataset.downloadCount.toLocaleString()} 次下载
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

export default DatasetLatestCard;

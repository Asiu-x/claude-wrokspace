import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Breadcrumb from '../../components/layout/Breadcrumb';
import FilterBar from '../../components/common/FilterBar';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import { DatasetItem } from '../../types/dashboard';

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
    tokenCount: undefined,
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
  },
  {
    id: '4',
    name: '物理实验数据',
    code: 'physics-experiments',
    description: '大学物理实验测量数据和分析报告',
    version: '1.2',
    format: 'csv',
    status: 'published',
    size: 3145728,
    sampleCount: 156000,
    tokenCount: undefined,
    languages: ['zh-CN', 'en'],
    difficulty: 'intermediate',
    qualityScore: 88,
    category: '实验数据',
    tags: ['物理', '实验', '数据'],
    subjects: ['物理学', '化学'],
    viewCount: 4580,
    downloadCount: 1230,
    createdAt: '2024-03-15T00:00:00Z',
    publishedAt: '2024-03-18T00:00:00Z'
  },
  {
    id: '5',
    name: '化学元素周期表',
    code: 'periodic-table',
    description: '包含所有化学元素信息和性质的结构化知识库',
    version: '3.0',
    format: 'json',
    status: 'published',
    size: 45000,
    sampleCount: 118,
    tokenCount: 50000,
    languages: ['zh-CN', 'en'],
    difficulty: 'beginner',
    qualityScore: 100,
    category: '知识库',
    tags: ['化学', '元素', '基础'],
    subjects: ['化学'],
    viewCount: 21580,
    downloadCount: 6890,
    createdAt: '2024-02-10T00:00:00Z',
    publishedAt: '2024-02-12T00:00:00Z'
  },
  {
    id: '6',
    name: '英语阅读理解数据集',
    code: 'reading-comprehension-en',
    description: '英文阅读理解数据集，包含多种文章类型和问题',
    version: '1.1',
    format: 'jsonl',
    status: 'reviewing',
    size: 10485760,
    sampleCount: 850000,
    tokenCount: 1200000000,
    languages: ['en'],
    difficulty: 'intermediate',
    qualityScore: 90,
    category: '语言',
    tags: ['英语', '阅读', '语言'],
    subjects: ['英语', '语言学'],
    viewCount: 3450,
    downloadCount: 980,
    createdAt: '2024-04-12T00:00:00Z',
    publishedAt: '2024-04-15T00:00:00Z'
  }
];

const DatasetsPage: React.FC = () => {
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState<DatasetItem[]>(mockDatasets);
  const [filteredDatasets, setFilteredDatasets] = useState<DatasetItem[]>(mockDatasets);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    filterData();
  }, [searchValue, filterValues]);

  const filterData = () => {
    let result = [...datasets];

    if (searchValue) {
      const lowerSearch = searchValue.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(lowerSearch) ||
        d.description.toLowerCase().includes(lowerSearch) ||
        d.tags.some(t => t.toLowerCase().includes(lowerSearch))
      );
    }

    if (filterValues.category) {
      result = result.filter(d => d.category === filterValues.category);
    }

    if (filterValues.status) {
      result = result.filter(d => d.status === filterValues.status);
    }

    if (filterValues.difficulty) {
      result = result.filter(d => d.difficulty === filterValues.difficulty);
    }

    if (filterValues.format) {
      result = result.filter(d => d.format === filterValues.format);
    }

    setFilteredDatasets(result);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setSearchValue('');
    setFilterValues({});
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return 'N/A';
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${bytes} B`;
  };

  const formatStatus = (status: string): { label: string; color: string } => {
    const statusMap: { [key: string]: { label: string; color: string } } = {
      published: { label: '已发布', color: 'bg-green-100 text-green-700' },
      reviewing: { label: '审核中', color: 'bg-yellow-100 text-yellow-700' },
      draft: { label: '草稿', color: 'bg-gray-100 text-gray-600' },
      archived: { label: '已归档', color: 'bg-red-100 text-red-700' }
    };
    return statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-700' };
  };

  const formatDifficulty = (difficulty: string): string => {
    const difficultyMap: { [key: string]: string } = {
      beginner: '入门',
      intermediate: '中级',
      advanced: '高级'
    };
    return difficultyMap[difficulty] || difficulty;
  };

  const filters = {
    category: {
      label: '分类',
      type: 'select' as const,
      options: [
        { value: '问答', label: '问答' },
        { value: '数学', label: '数学' },
        { value: '医学', label: '医学' },
        { value: '实验数据', label: '实验数据' },
        { value: '知识库', label: '知识库' },
        { value: '语言', label: '语言' }
      ]
    },
    status: {
      label: '状态',
      type: 'select' as const,
      options: [
        { value: 'published', label: '已发布' },
        { value: 'reviewing', label: '审核中' },
        { value: 'draft', label: '草稿' },
        { value: 'archived', label: '已归档' }
      ]
    },
    difficulty: {
      label: '难度',
      type: 'select' as const,
      options: [
        { value: 'beginner', label: '入门' },
        { value: 'intermediate', label: '中级' },
        { value: 'advanced', label: '高级' }
      ]
    },
    format: {
      label: '格式',
      type: 'select' as const,
      options: [
        { value: 'json', label: 'JSON' },
        { value: 'jsonl', label: 'JSONL' },
        { value: 'csv', label: 'CSV' },
        { value: 'parquet', label: 'Parquet' },
        { value: 'text', label: '文本' }
      ]
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedDatasets = filteredDatasets.slice(startIndex, endIndex);

  const breadcrumbItems = [
    { label: '首页', path: '/' },
    { label: '数据集' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 p-6">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* 页面标题和操作 */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">数据集</h1>
              <p className="text-gray-500 mt-1">管理和查看所有学科数据集</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                导出
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                + 新增数据集
              </button>
            </div>
          </div>

          {/* 筛选栏 */}
          <div className="mb-6">
            <FilterBar
              searchValue={searchValue}
              onSearch={handleSearch}
              filters={filters}
              filterValues={filterValues}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">全部数据集</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{datasets.length}</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">已发布</div>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {datasets.filter(d => d.status === 'published').length}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">总数据量</div>
              <div className="text-2xl font-bold text-primary-600 mt-1">
                {(datasets.reduce((sum, d) => sum + d.sampleCount, 0) / 10000).toFixed(1)}万
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">总下载量</div>
              <div className="text-2xl font-bold text-secondary-600 mt-1">
                {datasets.reduce((sum, d) => sum + d.downloadCount, 0).toLocaleString()}
              </div>
            </div>
          </div>

          {/* 数据集列表 */}
          <div className="bg-white rounded-lg border border-gray-200">
            {loading ? (
              <div className="p-12 text-center text-gray-500">加载中...</div>
            ) : paginatedDatasets.length === 0 ? (
              <EmptyState
                title="没有找到匹配的数据集"
                description="请尝试调整筛选条件"
              />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          数据集名称
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          分类
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          格式
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          质量分数
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          大小/样本数
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedDatasets.map((dataset) => {
                        const statusInfo = formatStatus(dataset.status);
                        return (
                          <tr
                            key={dataset.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => navigate(`/datasets/${dataset.id}`)}
                          >
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{dataset.name}</div>
                                <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                                  {dataset.description}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {dataset.tags.slice(0, 3).map((tag, idx) => (
                                    <span key={idx} className="px-1.5 py-0.5 bg-primary-50 text-primary-600 text-xs rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {dataset.category}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {dataset.format}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>
                                {statusInfo.label}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="text-sm text-gray-900 mr-2">{dataset.qualityScore}</div>
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-primary-600 h-2 rounded-full"
                                    style={{ width: `${dataset.qualityScore}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <div>{formatFileSize(dataset.size)}</div>
                              <div className="text-xs">{dataset.sampleCount.toLocaleString()} 样本</div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="text-primary-600 hover:text-primary-700 text-sm font-medium mr-3"
                              >
                                查看
                              </button>
                              <button
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                              >
                                编辑
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* 分页 */}
                <div className="px-6 py-4 border-t border-gray-200">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredDatasets.length}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DatasetsPage;

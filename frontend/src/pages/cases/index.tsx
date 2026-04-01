import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Breadcrumb from '../../components/layout/Breadcrumb';
import FilterBar from '../../components/common/FilterBar';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import { CaseItem } from '../../types/dashboard';

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
  },
  {
    id: '4',
    title: '物理实验数据处理',
    code: 'physics-data-processing',
    summary: '自动化物理实验数据处理和图表生成系统',
    scenario: '实验',
    category: '物理',
    tags: ['物理', '实验', '数据'],
    subjects: ['物理学', '化学'],
    relatedModels: ['llama-3-70b'],
    relatedDatasets: ['physics-experiments'],
    relatedCapabilities: ['data_analysis'],
    viewCount: 2340,
    likeCount: 560,
    bookmarkCount: 420,
    status: 'draft',
    difficulty: 'intermediate',
    duration: 25,
    steps: 6,
    author: '赵老师',
    organization: '北京大学',
    createdAt: '2024-04-10T00:00:00Z',
    publishedAt: '2024-04-12T00:00:00Z'
  },
  {
    id: '5',
    title: '英语阅读理解训练',
    code: 'english-reading',
    summary: '交互式英语阅读理解训练系统，包含题型解析',
    scenario: '语言学习',
    category: '英语',
    tags: ['英语', '阅读', '学习'],
    subjects: ['英语', '语言学'],
    relatedModels: ['gemini-1.5-pro'],
    relatedDatasets: ['reading-comprehension-en'],
    relatedCapabilities: ['language_learning'],
    viewCount: 3420,
    likeCount: 780,
    bookmarkCount: 560,
    status: 'pending' as any,
    difficulty: 'beginner',
    duration: 18,
    steps: 5,
    author: '刘老师',
    organization: '北京外国语大学',
    createdAt: '2024-04-15T00:00:00Z',
    publishedAt: '2024-04-18T00:00:00Z'
  },
  {
    id: '6',
    title: '化学元素周期表记忆',
    code: 'periodic-table-memory',
    summary: '有趣的化学元素周期表记忆和学习工具',
    scenario: '基础教学',
    category: '化学',
    tags: ['化学', '元素', '记忆'],
    subjects: ['化学'],
    relatedModels: ['mathglm-2'],
    relatedDatasets: ['periodic-table'],
    relatedCapabilities: ['knowledge_graph'],
    viewCount: 5120,
    likeCount: 1180,
    bookmarkCount: 780,
    status: 'published',
    difficulty: 'beginner',
    duration: 12,
    steps: 3,
    author: '陈老师',
    organization: '南京大学',
    createdAt: '2024-03-20T00:00:00Z',
    publishedAt: '2024-03-25T00:00:00Z'
  }
];

const CasesPage: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseItem[]>(mockCases);
  const [filteredCases, setFilteredCases] = useState<CaseItem[]>(mockCases);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    filterData();
  }, [searchValue, filterValues]);

  const filterData = () => {
    let result = [...cases];

    if (searchValue) {
      const lowerSearch = searchValue.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(lowerSearch) ||
        c.summary.toLowerCase().includes(lowerSearch) ||
        c.tags.some(t => t.toLowerCase().includes(lowerSearch))
      );
    }

    if (filterValues.category) {
      result = result.filter(c => c.category === filterValues.category);
    }

    if (filterValues.status) {
      result = result.filter(c => c.status === filterValues.status);
    }

    if (filterValues.difficulty) {
      result = result.filter(c => c.difficulty === filterValues.difficulty);
    }

    setFilteredCases(result);
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

  const formatDifficulty = (difficulty: string): string => {
    const difficultyMap: { [key: string]: string } = {
      beginner: '入门',
      intermediate: '中级',
      advanced: '高级'
    };
    return difficultyMap[difficulty] || difficulty;
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes}分钟`;
    return `${Math.floor(minutes / 60)}小时${minutes % 60}分钟`;
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

  const filters = {
    category: {
      label: '分类',
      type: 'select' as const,
      options: [
        { value: '数学', label: '数学' },
        { value: '医学', label: '医学' },
        { value: '法学', label: '法学' },
        { value: '物理', label: '物理' },
        { value: '英语', label: '英语' },
        { value: '化学', label: '化学' }
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
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCases = filteredCases.slice(startIndex, endIndex);

  const breadcrumbItems = [
    { label: '首页', path: '/' },
    { label: '案例集' }
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
              <h1 className="text-2xl font-bold text-gray-900">案例集</h1>
              <p className="text-gray-500 mt-1">管理和查看所有学科应用案例</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                导出
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                + 新增案例
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
              <div className="text-sm text-gray-500">全部案例</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{cases.length}</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">已发布</div>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {cases.filter(c => c.status === 'published').length}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">总访问量</div>
              <div className="text-2xl font-bold text-primary-600 mt-1">
                {cases.reduce((sum, c) => sum + c.viewCount, 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">总点赞数</div>
              <div className="text-2xl font-bold text-secondary-600 mt-1">
                {cases.reduce((sum, c) => sum + c.likeCount, 0).toLocaleString()}
              </div>
            </div>
          </div>

          {/* 案例列表 */}
          <div className="bg-white rounded-lg border border-gray-200">
            {loading ? (
              <div className="p-12 text-center text-gray-500">加载中...</div>
            ) : paginatedCases.length === 0 ? (
              <EmptyState
                title="没有找到匹配的案例"
                description="请尝试调整筛选条件"
              />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          案例标题
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          分类
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          场景
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          难度
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          时长/步骤
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          统计
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedCases.map((caseItem) => {
                        const statusInfo = formatStatus(caseItem.status);
                        return (
                          <tr
                            key={caseItem.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => navigate(`/cases/${caseItem.id}`)}
                          >
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-medium text-gray-900">{caseItem.title}</div>
                                <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                                  {caseItem.summary}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {caseItem.tags.slice(0, 3).map((tag, idx) => (
                                    <span key={idx} className="px-1.5 py-0.5 bg-primary-50 text-primary-600 text-xs rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {caseItem.category}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {caseItem.scenario}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>
                                {statusInfo.label}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                caseItem.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                caseItem.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {formatDifficulty(caseItem.difficulty)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <div>{formatDuration(caseItem.duration)}</div>
                              <div className="text-xs">{caseItem.steps} 步骤</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <div>👁️ {caseItem.viewCount.toLocaleString()}</div>
                              <div className="text-xs">❤️ {caseItem.likeCount.toLocaleString()}</div>
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
                    total={filteredCases.length}
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

export default CasesPage;

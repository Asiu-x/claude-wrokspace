import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Breadcrumb from '../../components/layout/Breadcrumb';
import FilterBar from '../../components/common/FilterBar';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import { CapabilityItem } from '../../types/dashboard';

const mockCapabilities: CapabilityItem[] = [
  {
    id: '1',
    name: '智能答题',
    code: 'math_solving',
    description: '提供各类学科问题的智能解答和分析',
    category: 'text_generation',
    subCategory: '核心能力',
    tags: ['文本生成', '写作', '摘要'],
    subjects: ['数学', '物理学'],
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
  },
  {
    id: '5',
    name: '语言学习',
    code: 'language_learning',
    description: '支持多语言学习，包括词汇、语法、口语等',
    category: 'translation' as any,
    subCategory: '语言',
    tags: ['英语', '阅读', '语言'],
    subjects: ['英语', '语言学'],
    avgResponseTime: 1.8,
    availability: 99.4,
    rateLimit: 600,
    isFeatured: false,
    status: 'testing' as any,
    icon: '📚',
    sortOrder: 5,
    usageCount: 54300,
    successRate: 95.8,
    apiEndpoint: '/api/capabilities/language-learning',
    apiMethod: 'POST',
    viewCount: 12300,
    trialCount: 3400,
    rating: 4.5,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-04-08T00:00:00Z'
  },
  {
    id: '6',
    name: '数据分析',
    code: 'data_analysis',
    description: '对实验数据进行统计分析和可视化展示',
    category: 'text_analysis' as any,
    subCategory: '数据处理',
    tags: ['数据', '分析', '可视化'],
    subjects: ['物理学', '化学'],
    avgResponseTime: 2.5,
    availability: 99.0,
    rateLimit: 400,
    isFeatured: false,
    status: 'testing' as any,
    icon: '📊',
    sortOrder: 6,
    usageCount: 34500,
    successRate: 92.8,
    apiEndpoint: '/api/capabilities/data-analysis',
    apiMethod: 'POST',
    viewCount: 8900,
    trialCount: 2100,
    rating: 4.3,
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-04-12T00:00:00Z'
  }
];

const CapabilitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [capabilities, setCapabilities] = useState<CapabilityItem[]>(mockCapabilities);
  const [filteredCapabilities, setFilteredCapabilities] = useState<CapabilityItem[]>(mockCapabilities);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    filterData();
  }, [searchValue, filterValues]);

  const filterData = () => {
    let result = [...capabilities];

    if (searchValue) {
      const lowerSearch = searchValue.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(lowerSearch) ||
        c.description.toLowerCase().includes(lowerSearch) ||
        c.tags.some(t => t.toLowerCase().includes(lowerSearch))
      );
    }

    if (filterValues.category) {
      result = result.filter(c => c.category === filterValues.category);
    }

    if (filterValues.status) {
      result = result.filter(c => c.status === filterValues.status);
    }

    setFilteredCapabilities(result);
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

  const formatCategory = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      text_generation: '文本生成',
      text_analysis: '文本分析',
      question_answering: '问答',
      summarization: '摘要',
      translation: '翻译',
      coding: '编程',
      math: '数学',
      multimodal: '多模态',
      language: '语言',
      data: '数据',
      other: '其他'
    };
    return categoryMap[category] || category;
  };

  const formatStatus = (status: string): { label: string; color: string } => {
    const statusMap: { [key: string]: { label: string; color: string } } = {
      online: { label: '在线', color: 'bg-green-100 text-green-700' },
      development: { label: '开发中', color: 'bg-blue-100 text-blue-700' },
      testing: { label: '测试中', color: 'bg-yellow-100 text-yellow-700' },
      offline: { label: '离线', color: 'bg-gray-100 text-gray-700' }
    };
    return statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-700' };
  };

  const filters = {
    category: {
      label: '能力分类',
      type: 'select' as const,
      options: [
        { value: 'text_generation', label: '文本生成' },
        { value: 'math', label: '数学' },
        { value: 'coding', label: '编程' },
        { value: 'multimodal', label: '多模态' },
        { value: 'language', label: '语言' },
        { value: 'data', label: '数据' }
      ]
    },
    status: {
      label: '状态',
      type: 'select' as const,
      options: [
        { value: 'online', label: '在线' },
        { value: 'development', label: '开发中' },
        { value: 'testing', label: '测试中' },
        { value: 'offline', label: '离线' }
      ]
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCapabilities = filteredCapabilities.slice(startIndex, endIndex);

  const breadcrumbItems = [
    { label: '首页', path: '/' },
    { label: 'AI能力货架' }
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
              <h1 className="text-2xl font-bold text-gray-900">AI能力货架</h1>
              <p className="text-gray-500 mt-1">管理和查看所有AI能力</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
                导出
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                + 新增能力
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
              <div className="text-sm text-gray-500">全部能力</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{capabilities.length}</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">在线能力</div>
              <div className="text-2xl font-bold text-green-600 mt-1">
                {capabilities.filter(c => c.status === 'online').length}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">总调用次数</div>
              <div className="text-2xl font-bold text-primary-600 mt-1">
                {capabilities.reduce((sum, c) => sum + c.usageCount, 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="text-sm text-gray-500">平均可用性</div>
              <div className="text-2xl font-bold text-secondary-600 mt-1">
                {capabilities.reduce((sum, c) => sum + c.availability, 0) / capabilities.length}%
              </div>
            </div>
          </div>

          {/* 能力列表 */}
          <div className="bg-white rounded-lg border border-gray-200">
            {loading ? (
              <div className="p-12 text-center text-gray-500">加载中...</div>
            ) : paginatedCapabilities.length === 0 ? (
              <EmptyState
                title="没有找到匹配的能力"
                description="请尝试调整筛选条件"
              />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          能力名称
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          分类
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          响应时间
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          成功率
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          可用性
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          使用统计
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedCapabilities.map((capability) => {
                        const statusInfo = formatStatus(capability.status);
                        return (
                          <tr
                            key={capability.id}
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => navigate(`/capabilities/${capability.id}`)}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{capability.icon}</div>
                                <div>
                                  <div className="font-medium text-gray-900">{capability.name}</div>
                                  <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                                    {capability.description}
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {capability.tags.slice(0, 3).map((tag, idx) => (
                                      <span key={idx} className="px-1.5 py-0.5 bg-primary-50 text-primary-600 text-xs rounded">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {formatCategory(capability.category)}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>
                                {statusInfo.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {capability.avgResponseTime}s
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="text-sm text-gray-900 mr-2">{capability.successRate}%</div>
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{ width: `${capability.successRate}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="text-sm text-gray-900 mr-2">{capability.availability}%</div>
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-primary-600 h-2 rounded-full"
                                    style={{ width: `${capability.availability}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <div>总调用: {capability.usageCount.toLocaleString()}</div>
                              <div className="text-xs">测试: {capability.trialCount.toLocaleString()}</div>
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
                    total={filteredCapabilities.length}
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

export default CapabilitiesPage;

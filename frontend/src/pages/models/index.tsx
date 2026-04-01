import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import CustomSelect from '../../components/common/CustomSelect';
import { Search, Filter, LayoutGrid, List, ArrowRight } from 'lucide-react';

interface Model {
  id: string;
  name: string;
  description: string;
  source: '自研' | '接入';
  parameters: string;
  contextWindow: string;
  tags: string[];
  accuracy: string;
  bleu: string;
}

const mockModels: Model[] = [
  {
    id: '1',
    name: 'EduMath-7B',
    description: '针对理科教育场景优化的学科大模型，在数学、物理、化学、生物等学科表现出色，支持复杂推理和计算。',
    source: '自研',
    parameters: '7B',
    contextWindow: '8,192',
    tags: ['数学', '物理', '化学', '生物'],
    accuracy: '92.5%',
    bleu: '0.85'
  },
  {
    id: '2',
    name: 'EduChinese-13B',
    description: '面向文科教育的学科大模型，擅长语文文学、古文翻译、历史事件分析等场景，具有丰富的文化底蕴。',
    source: '自研',
    parameters: '13B',
    contextWindow: '16,384',
    tags: ['语文', '历史', '政治', '地理'],
    accuracy: '88.3%',
    bleu: '0.82'
  },
  {
    id: '3',
    name: 'GPT-4-Edu',
    description: '基于GPT-4架构的教育专用模型，在通用教育场景下表现优异，支持多学科、多任务的教学辅助。',
    source: '接入',
    parameters: '1.8T',
    contextWindow: '32,768',
    tags: ['通用', '编程', '语言', '跨学科'],
    accuracy: '95.2%',
    bleu: '0.89'
  },
  {
    id: '4',
    name: 'K12-Math-7B',
    description: '专为K12阶段数学教学打造的模型，覆盖小学到高中全部数学知识点，解题步骤清晰易懂。',
    source: '自研',
    parameters: '7B',
    contextWindow: '4,096',
    tags: ['K12', '小学', '初中', '高中'],
    accuracy: '94.1%',
    bleu: '0.87'
  },
  {
    id: '5',
    name: 'English-Teaching-13B',
    description: '面向英语教学的专用模型，支持写作批改、口语对话、语法纠错等功能，帮助学生提升英语能力。',
    source: '自研',
    parameters: '13B',
    contextWindow: '8,192',
    tags: ['英语', '写作', '口语', '语法'],
    accuracy: '91.8%',
    bleu: '0.86'
  },
  {
    id: '6',
    name: 'Code-Edu-3B',
    description: '面向编程教育的代码模型，支持多种编程语言，能够生成高质量代码并详细解释编程概念。',
    source: '接入',
    parameters: '3B',
    contextWindow: '16,384',
    tags: ['编程', '代码', '算法', '计算机'],
    accuracy: '89.5%',
    bleu: '0.83'
  }
];

const ModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');

  const filteredModels = mockModels.filter((model) => {
    const matchSearch = searchQuery === '' ||
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSource = selectedSource === 'all' || model.source === selectedSource;
    return matchSearch && matchSource;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <main className="flex-1 p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">模型库</h1>
            <p className="text-gray-600">探索平台已接入及自研的各类大模型，按需选择最适合的AI能力</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="搜索模型名称、描述或标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </form>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-3">
              <button className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>筛选</span>
              </button>
              <CustomSelect
                value={selectedSource}
                onChange={setSelectedSource}
                options={[
                  { value: 'all', label: '全部来源' },
                  { value: '自研', label: '自研' },
                  { value: '接入', label: '接入' },
                ]}
              />
            </div>
          </div>

          {/* View Toggle and Count */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded ${viewMode === 'card' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            <div className="text-gray-600">
              共 {filteredModels.length} 个模型
            </div>
          </div>

          {/* Models Grid */}
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        model.source === '自研'
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {model.source}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {model.description}
                    </p>

                    {/* Parameters */}
                    <div className="flex items-center gap-6 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">参数量: </span>
                        <span className="font-medium text-gray-900">{model.parameters}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">上下文: </span>
                        <span className="font-medium text-gray-900">{model.contextWindow}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {model.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center gap-6 mb-4 text-sm">
                      <div>
                        <span className="text-green-600 font-medium">准确率: {model.accuracy}</span>
                      </div>
                      <div>
                        <span className="text-blue-600 font-medium">BLEU: {model.bleu}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => navigate(`/models/${model.id}`)}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      查看详情
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      模型名称
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      来源
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      参数量
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      准确率
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredModels.map((model) => (
                    <tr key={model.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{model.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{model.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          model.source === '自研'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {model.source}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{model.parameters}</td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">{model.accuracy}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/models/${model.id}`)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          查看详情
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ModelsPage;

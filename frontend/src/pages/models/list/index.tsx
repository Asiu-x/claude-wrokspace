import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import Pagination from '../../../components/common/Pagination';
import CustomSelect from '../../../components/common/CustomSelect';
import EmptyState from '../../../components/common/EmptyState';
import { TruncatedLineClampTooltip } from '../../../components/common/TruncatedLineClampTooltip';
import { modelService } from '../../../services/modelService';
import type { ModelItem } from '../../../types/dashboard';

const ModelsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState<ModelItem[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 12, total: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const fetchModels = async () => {
    setLoading(true);
    try {
      const response = await modelService.getModels({
        page: pagination.current,
        size: pagination.pageSize,
        name: searchQuery || undefined,
        category: selectedType !== 'all' ? selectedType : undefined,
        source: selectedSource !== 'all' ? selectedSource : undefined,
      });
      if (response.code === 200) {
        setModels(response.data.records);
        setPagination(prev => ({ ...prev, total: response.data.total }));
      }
    } catch (err) {
      console.error('Failed to fetch models:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, [pagination.current, pagination.pageSize, searchQuery, selectedType, selectedSource]);

  // 筛选条件变化时重置到第1页
  useEffect(() => {
    setPagination(prev => prev.current !== 1 ? { ...prev, current: 1 } : prev);
  }, [searchQuery, selectedType, selectedSource]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({ ...prev, current: page, pageSize: pageSize || prev.pageSize }));
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">模型库</h1>
        <p className="text-gray-500 text-base">探索平台已接入及自研的各类大模型，按需选择最适合的AI能力</p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <button
            onClick={handleSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="搜索模型名称"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <CustomSelect
            value={selectedType}
            onChange={setSelectedType}
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            }
            options={[
              { value: 'all', label: '全部类型' },
              { value: '通用大模型', label: '通用大模型' },
              { value: '学科大模型', label: '学科大模型' },
              { value: '行业大模型', label: '行业大模型' },
            ]}
          />
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

      {/* View Toggle & Count */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-0">
          <button
            onClick={() => setViewMode('card')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              viewMode === 'card'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            卡片视图
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              viewMode === 'list'
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            列表视图
          </button>
        </div>
        <span className="text-sm text-gray-500">共 {pagination.total} 个模型</span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : models.length > 0 ? (
        <>
          {viewMode === 'card' ? (
            /* ========== Card View ========== */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <div
                  key={model.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                >
                  {/* Card Header */}
                  <div className="px-6 pt-6 pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
                      <span className={`shrink-0 ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        model.source === '自研'
                          ? 'bg-gray-900 text-white'
                          : 'border border-gray-300 text-gray-600 bg-white'
                      }`}>
                        {model.source || '接入'}
                      </span>
                    </div>
                    <TruncatedLineClampTooltip
                      text={model.description}
                      lineClamp={2}
                      className="text-sm text-gray-500 leading-relaxed"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="px-6 flex-1">
                    {/* Type & Deployment */}
                    <div className="flex items-center gap-6 mb-3 text-sm">
                      <div>
                        <span className="text-gray-400">类型：</span>
                        <span className="font-medium text-gray-900">{model.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">部署：</span>
                        <span className="font-medium text-gray-900">{model.deploymentMode || '云端部署'}</span>
                      </div>
                    </div>

                    {/* Training Method */}
                    <div className="mb-3 text-sm">
                      <span className="text-gray-400">训练方式：</span>
                      <span className="font-medium text-gray-900">{model.trainingMethod || '领域预训练+微调'}</span>
                    </div>

                    {/* Performance Metrics */}
                    <div className="mb-6 text-sm">
                      <div className="text-gray-400 mb-1">性能指标：</div>
                      <TruncatedLineClampTooltip
                        text={model.performanceMetrics || (model.metrics?.accuracy != null || model.metrics?.inferenceSpeed != null
  ? `准确率${model.metrics?.accuracy ?? '--'}%，推理速度${model.metrics?.inferenceSpeed ?? '--'}ms`
  : '--')}
                        lineClamp={2}
                        className="text-gray-500 text-xs leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Card Footer - CTA Button */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={() => navigate(`/models/${model.id}`)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      查看详情
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ========== List View ========== */
            <div className="space-y-4">
              {models.map((model) => (
                <div
                  key={model.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  {/* Row 1: Name + Badge + Type + Button */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        model.source === '自研'
                          ? 'bg-gray-900 text-white'
                          : 'border border-gray-300 text-gray-600 bg-white'
                      }`}>
                        {model.source || '接入'}
                      </span>
                      <span className="text-sm text-gray-500">{model.category}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/models/${model.id}`)}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shrink-0"
                    >
                      查看详情
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>

                  {/* Row 2: Description */}
                  <TruncatedLineClampTooltip
                    text={model.description}
                    lineClamp={1}
                    className="text-sm text-gray-500 leading-relaxed"
                  />

                  {/* Row 3: Training & Deployment */}
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div>
                      <span className="text-gray-400">训练方式：</span>
                      <span>{model.trainingMethod || '领域预训练+微调'}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">部署方式：</span>
                      <span>{model.deploymentMode || '云端部署'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8">
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <EmptyState
          title="暂无模型"
          description="没有找到符合条件的模型，您可以尝试调整搜索条件"
        />
      )}
    </MainLayout>
  );
};

export default ModelsListPage;

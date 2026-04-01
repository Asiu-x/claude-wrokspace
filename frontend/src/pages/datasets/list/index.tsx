import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import Pagination from '../../../components/common/Pagination';
import CustomSelect from '../../../components/common/CustomSelect';
import EmptyState from '../../../components/common/EmptyState';
import { TruncatedLineClampTooltip } from '../../../components/common/TruncatedLineClampTooltip';
import { datasetService } from '../../../services/datasetService';
import type { DatasetItem } from '../../../types/dataset';

// 数据类型图标
const DataTypeIcon: React.FC<{ type: string }> = ({ type }) => {
  const icons: Record<string, React.ReactNode> = {
    '题库': (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    '文本': (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    '视频': (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    '图文': (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };
  return <>{icons[type] || icons['文本']}</>;
};

const DatasetsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [datasets, setDatasets] = useState<DatasetItem[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 12, total: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const fetchDatasets = async () => {
    setLoading(true);
    try {
      const response = await datasetService.getDatasets({
        page: pagination.current,
        size: pagination.pageSize,
        name: searchQuery || undefined,
        category: selectedType !== 'all' ? selectedType : undefined,
        subject: selectedSubject !== 'all' ? selectedSubject : undefined,
      });
      if (response.code === 200) {
        setDatasets(response.data.records);
        setPagination(prev => ({ ...prev, total: response.data.total }));
      }
    } catch (error) {
      console.error('获取数据集列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, [pagination.current, pagination.pageSize, searchQuery, selectedSubject, selectedType]);

  // 筛选条件变化时重置到第1页
  useEffect(() => {
    setPagination(prev => prev.current !== 1 ? { ...prev, current: 1 } : prev);
  }, [searchQuery, selectedSubject, selectedType]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({ ...prev, current: page, pageSize: pageSize || prev.pageSize }));
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">数据集</h1>
        <p className="text-gray-500 text-base">探索平台拥有的学科数据集资产，支持多维筛选和检索</p>
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
            placeholder="搜索数据集名称"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <CustomSelect
            value={selectedSubject}
            onChange={setSelectedSubject}
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            }
            options={[
              { value: 'all', label: '全部学科' },
              { value: '理科', label: '理科' },
              { value: '文科', label: '文科' },
            ]}
          />
          <CustomSelect
            value={selectedType}
            onChange={setSelectedType}
            options={[
              { value: 'all', label: '全部类型' },
              { value: '文本', label: '文本' },
              { value: '题库', label: '题库' },
              { value: '视频', label: '视频' },
              { value: '图文', label: '图文' },
            ]}
          />
        </div>
      </div>

      {/* Count */}
      <div className="mb-6">
        <span className="text-sm text-gray-500">共 {pagination.total} 个数据集</span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : datasets.length > 0 ? (
        <>
          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => {
              const subject = dataset.subject || '理科';
              const dataType = dataset.dataType || '文本';
              const sizeText = dataset.sizeText || `${(dataset.size / 1024).toFixed(1)} GB`;
              const recordCount = dataset.recordCount || dataset.sampleCount;
              const knowledgePoints = dataset.knowledgePoints || dataset.subjects || [];
              const maxKP = 3;
              const overflowKP = knowledgePoints.length > maxKP ? knowledgePoints.length - maxKP : 0;

              return (
                <div
                  key={dataset.id}
                  className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Subject & DataType badges */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-medium border ${
                        subject === '理科'
                          ? 'text-blue-700 border-blue-200 bg-blue-50'
                          : 'text-amber-700 border-amber-200 bg-amber-50'
                      }`}>
                        {subject}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <DataTypeIcon type={dataType} />
                        {dataType}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{dataset.name}</h3>

                    {/* Description */}
                    <div className="min-h-[40px]">
                      <TruncatedLineClampTooltip
                        text={dataset.description}
                        lineClamp={2}
                        className="text-sm text-gray-500 leading-relaxed"
                      />
                    </div>

                    {/* Size & Data Source */}
                    <div className="flex items-center gap-6 mb-4 text-sm">
                      <div>
                        <span className="text-gray-400">数据量：</span>
                        <span className="font-semibold text-gray-900">{sizeText}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">数据来源：</span>
                        <span className="font-semibold text-gray-900">{dataset.dataSource || '--'}</span>
                      </div>
                    </div>

                    {/* Data Usage */}
                    <div className="mb-3">
                      <div className="text-xs text-gray-400 mb-1.5">数据用途：</div>
                      <div className="flex flex-wrap gap-1.5">
                        {knowledgePoints.slice(0, maxKP).map((kp, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {kp}
                          </span>
                        ))}
                        {overflowKP > 0 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-400 rounded text-xs">+{overflowKP}</span>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {dataset.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => navigate(`/datasets/${dataset.id}`)}
                      className="w-full mt-auto py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      查看详情
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

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
          title="暂无数据集"
          description="没有找到符合条件的数据集，您可以尝试调整搜索条件"
        />
      )}
    </MainLayout>
  );
};

export default DatasetsListPage;

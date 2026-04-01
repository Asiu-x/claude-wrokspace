import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import Pagination from '../../../components/common/Pagination';
import EmptyState from '../../../components/common/EmptyState';
import { TruncatedLineClampTooltip } from '../../../components/common/TruncatedLineClampTooltip';
import { capabilityService } from '../../../services/capabilityService';
import type { CapabilityItem } from '../../../types/dashboard';

const CapabilitiesListPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [capabilities, setCapabilities] = useState<CapabilityItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState<'atomic' | 'business'>('atomic');
  const [pendingDialog, setPendingDialog] = useState<{ open: boolean; feature: string }>({ open: false, feature: '' });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 12, total: 0 });
  const [tabTotals, setTabTotals] = useState({ atomic: 0, business: 0 });
  const apiCategory = activeTab === 'atomic' ? '原子AI能力' : '业务AI能力';

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  const fetchCapabilities = async () => {
    setLoading(true);
    try {
      const response = await capabilityService.getCapabilities({
        page: pagination.current,
        size: pagination.pageSize,
        name: searchQuery || undefined,
        category: apiCategory,
      });
      if (response.code === 200) {
        setCapabilities(response.data.records);
        setPagination(prev => ({ ...prev, total: response.data.total }));
      }
    } catch (err) {
      console.error('Failed to fetch capabilities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapabilities();
  }, [pagination.current, pagination.pageSize, searchQuery, activeTab]);

  const fetchTabTotals = async () => {
    try {
      const [atomicRes, businessRes] = await Promise.all([
        capabilityService.getCapabilities({
          page: 1,
          size: 1,
          name: searchQuery || undefined,
            category: '原子AI能力',
        }),
        capabilityService.getCapabilities({
          page: 1,
          size: 1,
          name: searchQuery || undefined,
            category: '业务AI能力',
        })
      ]);
      setTabTotals({
        atomic: atomicRes.code === 200 ? atomicRes.data.total : 0,
        business: businessRes.code === 200 ? businessRes.data.total : 0,
      });
    } catch (err) {
      console.error('Failed to fetch tab totals:', err);
      setTabTotals({ atomic: 0, business: 0 });
    }
  };

  useEffect(() => {
    fetchTabTotals();
  }, [searchQuery]);

  // 筛选条件变化时重置到第1页
  useEffect(() => {
    setPagination(prev => prev.current !== 1 ? { ...prev, current: 1 } : prev);
  }, [searchQuery, activeTab]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({ ...prev, current: page, pageSize: pageSize || prev.pageSize }));
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">AI能力货架</h1>
        <p className="text-gray-500 text-base">探索平台提供的原子能力和业务能力，即插即用，快速集成到教学场景</p>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
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
          placeholder="搜索AI能力..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent text-sm"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('atomic')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'atomic' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI原子能力
          <span className="text-xs text-gray-400">({tabTotals.atomic})</span>
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === 'business' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          AI业务能力
          <span className="text-xs text-gray-400">({tabTotals.business})</span>
        </button>
      </div>

      {/* Section Subtitle */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          {activeTab === 'atomic' ? '基础AI能力，如OCR识别、语音情感识别、知识点提取等，可灵活组合使用' : '面向具体教学场景封装好的业务能力，如智能批改、PPT生成，即插即用'}
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : capabilities.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap) => (
            <div key={cap.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col">
              <div className="p-5 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-gray-900 leading-tight">{cap.name}</h3>
                  {cap.demoAvailable && (
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-xs font-medium shrink-0 ml-2">可体验</span>
                  )}
                </div>

                {/* Description */}
                <TruncatedLineClampTooltip
                  text={cap.description}
                  lineClamp={2}
                  className="text-sm text-gray-500"
                />

                {/* Response Time */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  响应时间: {cap.responseTime || `${cap.avgResponseTime}s`}
                </div>

                {/* I/O Format */}
                <div className="space-y-1.5 mb-4 text-xs">
                  {cap.inputFormat && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 shrink-0">输入:</span>
                      <span className="text-gray-600">{cap.inputFormat}</span>
                    </div>
                  )}
                  {cap.outputFormat && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 shrink-0">输出:</span>
                      <span className="text-gray-600">{cap.outputFormat}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cap.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{tag}</span>
                  ))}
                </div>

                {/* Integration Features */}
                {cap.integrationFeatures && cap.integrationFeatures.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-1.5">集成特性:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.integrationFeatures.slice(0, 3).map((f, idx) => (
                        <span key={idx} className="px-2 py-0.5 border border-gray-200 text-gray-600 rounded text-xs">{f}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-2">
                  {cap.demoAvailable && (
                    <button
                      onClick={() => setPendingDialog({ open: true, feature: '体验Demo' })}
                      className="flex-1 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                      体验Demo
                    </button>
                  )}
                  <button
                    onClick={() => setPendingDialog({ open: true, feature: '查看文档' })}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    查看文档
                  </button>
                </div>
              </div>
            </div>
          ))}
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
          title="暂无能力"
          description="没有找到符合条件的AI能力，请尝试调整搜索关键词"
        />
      )}

      {/* Pending Dialog */}
      {pendingDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setPendingDialog({ open: false, feature: '' })}>
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <svg className="h-5 w-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">功能开发中</h3>
                <p className="text-sm text-gray-500">"{pendingDialog.feature}" 功能正在开发中，敬请期待</p>
              </div>
            </div>
            <button
              onClick={() => setPendingDialog({ open: false, feature: '' })}
              className="w-full py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
            >
              知道了
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default CapabilitiesListPage;

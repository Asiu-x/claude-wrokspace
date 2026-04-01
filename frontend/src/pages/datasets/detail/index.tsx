import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import { datasetService } from '../../../services/datasetService';
import type { DatasetItem } from '../../../types/dashboard';

const DatasetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataset, setDataset] = useState<DatasetItem | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingDialog, setPendingDialog] = useState(false);

  const fetchDatasetDetail = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await datasetService.getDatasetDetail(id);
      if (response.code === 200) {
        setDataset(response.data);
      }
    } catch (error) {
      console.error('获取数据集详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasetDetail();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </MainLayout>
    );
  }

  if (!dataset) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">数据集不存在</h2>
          <p className="text-gray-500 mb-4">该数据集可能已被删除或不存在</p>
          <button onClick={() => navigate('/datasets')} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            返回数据集列表
          </button>
        </div>
      </MainLayout>
    );
  }

  const subject = dataset.subject || '理科';
  const dataType = dataset.dataType || '文本';
  const sizeText = dataset.sizeText || `${(dataset.size / 1024).toFixed(1)} GB`;
  const recordCount = dataset.recordCount || dataset.sampleCount;
  const knowledgePoints = dataset.knowledgePoints || dataset.subjects || [];

  const tabs = [
    { key: 'overview', label: '概览' },
    { key: 'metadata', label: '元数据' },
    { key: 'preview', label: '样本预览' },
    { key: 'compliance', label: '合规信息' },
  ];

  return (
    <MainLayout>
      {/* Back Button */}
      <button
        onClick={() => navigate('/datasets')}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回数据集
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold text-gray-900">{dataset.name}</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              subject === '理科' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
            }`}>
              {subject}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {dataType}
            </span>
          </div>
          <p className="text-base text-gray-500 leading-relaxed max-w-3xl">{dataset.description}</p>
        </div>
        <button onClick={() => setPendingDialog(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shrink-0">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          下载申请
        </button>
      </div>

      {/* Key Metrics - 1 column */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-sm text-gray-500 mb-2">数据量</div>
          <div className="text-2xl font-bold text-gray-900">{sizeText}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.key
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">基本信息</h2>

            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-2">数据类型</div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {dataType}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-2">学科分类</div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  subject === '理科' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {subject}
                </span>
              </div>
            </div>

            <hr className="border-gray-200 my-6" />

            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-900 mb-2">数据来源</div>
              <p className={`text-sm ${dataset.dataSource ? 'text-gray-500' : 'text-gray-400'}`}>
                {dataset.dataSource || '--'}
              </p>
            </div>

            <hr className="border-gray-200 my-6" />

            <div>
              <div className="text-sm font-semibold text-gray-900 mb-3">标签</div>
              <div className="flex flex-wrap gap-2">
                {dataset.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'metadata' && (
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">元数据详情</h2>

          {/* 标注规范 */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">标注规范</h3>
            <p className="text-sm text-gray-500">知识点标注 + 难度分级</p>
          </div>

          <hr className="border-gray-200 mb-6" />

          {/* 适用训练任务 */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">适用训练任务</h3>
            <div className="flex flex-wrap gap-2">
              {['微调', '预训练', '题型分类', '难度评估'].map((task, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">
                  {task}
                </span>
              ))}
            </div>
          </div>

          {/* 数据统计 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">数据统计</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                <div className="text-sm text-gray-500 mb-2">数据量</div>
                <div className="text-2xl font-bold text-gray-900">{sizeText}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">样本预览</h2>
          <p className="text-sm text-gray-400 mb-6">数据集中的示例数据</p>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs font-medium">样本 {i}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {i === 1 && `这是${dataset.name}中的第一条示例数据，展示了数据集的基本格式和内容结构。`}
                  {i === 2 && `第二条示例数据，包含了${dataset.tags.join('、')}等相关内容的标注信息。`}
                  {i === 3 && `第三条示例数据，体现了数据集在${knowledgePoints.slice(0, 2).join('和')}方面的覆盖范围。`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">合规信息</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">版权说明</h4>
                <p className="text-sm text-gray-500">数据来源合法合规，已获得相关授权许可</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">使用许可</h4>
                <p className="text-sm text-gray-500">CC BY-NC-SA 4.0，仅限教育和研究用途</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">注意：</span>在使用本数据集前，请确保您已了解并遵守相关的版权和使用许可条款。需要下载完整数据集请联系管理员进行申请。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pending Dialog */}
      {pendingDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setPendingDialog(false)}>
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900">功能开发中</h3>
              <p className="text-sm text-gray-500">"下载申请" 功能正在开发中，敬请期待</p>
            </div>
            <button onClick={() => setPendingDialog(false)} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">我知道了</button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DatasetDetailPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import { modelService } from '../../../services/modelService';
import type { ModelItem } from '../../../types/dashboard';

const ModelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<ModelItem | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingDialog, setPendingDialog] = useState<{ open: boolean; feature: string }>({ open: false, feature: '' });

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    modelService.getModelDetail(id)
      .then(res => { if (res.code === 200) setModel(res.data); })
      .catch(err => console.error('获取模型详情失败:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (!model) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">模型不存在</h2>
          <p className="text-gray-500 mb-4">该模型可能已被删除或不存在</p>
          <button onClick={() => navigate('/models')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            返回模型列表
          </button>
        </div>
      </MainLayout>
    );
  }

  const source = model.source || ((['OpenAI', 'Anthropic', 'Google'].includes(model.framework || '')) ? '接入' : '自研');
  const typeLabel = (model.category || '学科').replace('大模型', '');
  const trainingMethod = model.trainingMethod || '领域预训练+微调';
  const deploymentMode = model.deploymentMode || '本地部署';

  const tabs = [
    { key: 'overview', label: '概览' },
    { key: 'data', label: '训练数据' },
    { key: 'performance', label: '性能指标' },
    { key: 'api', label: 'API文档' },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Back */}
        <button onClick={() => navigate('/models')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          返回模型库
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-900">{model.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${source === '自研' ? 'bg-gray-900 text-white' : 'border border-gray-300 text-gray-600'}`}>{source}</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600">{typeLabel}</span>
            </div>
            <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">{model.description}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => setPendingDialog({ open: true, feature: '在线体验' })} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              在线体验
            </button>
            <button onClick={() => setPendingDialog({ open: true, feature: '对比模型' })} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
              对比模型
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              训练方式
            </div>
            <div className="text-xl font-bold text-gray-900">{trainingMethod}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              部署方式
            </div>
            <div className="text-xl font-bold text-gray-900">{deploymentMode}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" /></svg>
              来源
            </div>
            <div className="text-xl font-bold text-gray-900">{source}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${activeTab === tab.key ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">模型简介</h2>
            <p className="text-gray-500 leading-relaxed">{model.description}</p>
          </div>
        )}

        {/* Training Data */}
        {activeTab === 'data' && (
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-2">训练数据集说明</h2>
            <p className="text-sm text-gray-400 mb-4">用于训练该模型的数据来源和规模</p>
            <p className={`leading-relaxed ${model.trainingDataDesc ? 'text-gray-500' : 'text-gray-400'}`}>
              {model.trainingDataDesc || '--'}
            </p>
          </div>
        )}

        {/* Performance */}
        {activeTab === 'performance' && (
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-2">性能指标</h2>
            <p className="text-sm text-gray-400 mb-4">模型在各项评估任务中的表现</p>
            <p className="text-gray-500 leading-relaxed">{model.performanceMetrics || '--'}</p>
          </div>
        )}

        {/* API */}
        {activeTab === 'api' && (
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">API调用文档</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">基础信息</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm space-y-1 text-gray-700">
                  <div>模型ID: {model.id}</div>
                  <div>端点: /api/v1/models/{model.id}</div>
                  <div>方法: POST</div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">请求示例</h3>
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm overflow-x-auto">
{`{
  "model": "${model.code}",
  "messages": [
    {
      "role": "user",
      "content": "请帮我解答这道题..."
    }
  ],
  "max_tokens": 2000,
  "temperature": 0.7
}`}
                </pre>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setPendingDialog({ open: true, feature: '查看完整文档' })} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">查看完整文档</button>
                <button onClick={() => setPendingDialog({ open: true, feature: '下载SDK' })} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">下载SDK</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pending Dialog */}
      {pendingDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setPendingDialog({ open: false, feature: '' })}>
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900">功能开发中</h3>
              <p className="text-sm text-gray-500">"{pendingDialog.feature}" 功能正在开发中，敬请期待</p>
            </div>
            <button onClick={() => setPendingDialog({ open: false, feature: '' })} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              我知道了
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ModelDetailPage;

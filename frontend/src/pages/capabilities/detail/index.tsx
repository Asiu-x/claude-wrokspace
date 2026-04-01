import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import { capabilityService } from '../../../services/capabilityService';
import type { CapabilityItem } from '../../../types/dashboard';

const CapabilityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [capability, setCapability] = useState<CapabilityItem | null>(null);

  const fetchCapabilityDetail = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await capabilityService.getCapabilityDetail(id);
      if (response.code === 200) {
        setCapability(response.data);
      }
    } catch (error) {
      console.error('获取AI能力详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapabilityDetail();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-96 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-500">加载中...</span>
        </div>
      </MainLayout>
    );
  }

  if (!capability) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">AI能力不存在</h2>
          <p className="text-gray-500 mb-4">该AI能力可能已被删除或不存在</p>
          <button
            onClick={() => navigate('/capabilities')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            返回AI能力列表
          </button>
        </div>
      </MainLayout>
    );
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      online: '在线',
      development: '开发中',
      offline: '离线'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      online: 'bg-green-100 text-green-800',
      development: 'bg-blue-100 text-blue-800',
      offline: 'bg-gray-100 text-gray-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <button
          onClick={() => navigate('/capabilities')}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className="ml-1">返回AI能力列表</span>
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{capability.name}</h1>
        <p className="text-gray-500">{capability.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">分类</label>
                <p className="text-gray-900">{capability.category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">子分类</label>
                <p className="text-gray-900">{capability.subCategory || '无'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">状态</label>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(capability.status)}`}>
                  {getStatusText(capability.status)}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">访问次数</label>
                <p className="text-gray-900">{capability.viewCount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">性能指标</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">使用次数</label>
                <p className="text-xl font-semibold text-gray-900">{capability.usageCount.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">平均响应时间</label>
                <p className="text-xl font-semibold text-gray-900">{capability.avgResponseTime} s</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-500 mb-1">成功率</label>
                <p className="text-xl font-semibold text-gray-900">{capability.successRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">详细描述</h2>
            <p className="text-gray-700">{capability.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">操作</h2>
            <div className="space-y-2">
              <button
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                调用API
              </button>
              <button
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                查看文档
              </button>
              <button
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                测试能力
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">时间信息</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">创建时间</span>
                <span className="text-sm text-gray-900">{capability.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">更新时间</span>
                <span className="text-sm text-gray-900">{capability.updatedAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            <span>能力ID: </span>
            <span>{capability.id}</span>
          </div>
          <div>
            <span>最后更新: </span>
            <span>{capability.updatedAt}</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CapabilityDetailPage;

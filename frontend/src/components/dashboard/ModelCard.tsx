import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ModelItem } from '../../types/dashboard';

interface ModelCardProps {
  model: ModelItem;
  dataTestId?: string;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, dataTestId }) => {
  const navigate = useNavigate();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'online':
        return { bg: '#d1fae5', text: '#10b981', label: '已发布' };
      case 'testing':
        return { bg: '#fef3c7', text: '#f59e0b', label: '测试中' };
      case 'offline':
        return { bg: '#fee2e2', text: '#ef4444', label: '离线' };
      case 'draft':
        return { bg: '#F9FAFB', text: '#8A8A9E', label: '草稿' };
      default:
        return { bg: '#F9FAFB', text: '#8A8A9E', label: status };
    }
  };

  const statusConfig = getStatusConfig(model.status);

  // 为不同学科生成不同的渐变背景
  const getGradientBySubject = (subjects: string[]) => {
    if (subjects.includes('数学')) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    if (subjects.includes('物理')) return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    if (subjects.includes('化学')) return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    if (subjects.includes('生物')) return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
    if (subjects.includes('语文')) return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
    if (subjects.includes('英语')) return 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)';
    return 'linear-gradient(135deg, #5B7CFF 0%, #7C98FF 100%)';
  };

  const handleClick = () => {
    navigate(`/models/${model.id}`);
  };

  return (
    <div className="
      bg-white
      rounded-xl
      border border-[#E5E7EB]
      shadow-sm
      overflow-hidden
      transition-all duration-300
      hover:shadow-md
      hover:-translate-y-1
      cursor-pointer
    " data-testid={dataTestId} onClick={handleClick}>
      {/* 卡片头部渐变区域 */}
      <div className="h-24 relative" style={{ background: getGradientBySubject(model.subjects) }}>
        {/* 状态标签 */}
        <span
          className="
            absolute top-3 right-3
            px-2.5 py-1
            bg-white/90 backdrop-blur
            rounded-full
            text-xs font-medium
          "
          style={{ color: statusConfig.text }}
          data-testid={`${dataTestId}-status`}
        >
          {statusConfig.label}
        </span>

        {/* 模型图标 */}
        <div className="
          absolute bottom-0 left-4
          -mb-6
          w-12 h-12
          bg-white
          rounded-xl
          shadow-md
          flex items-center justify-center
          text-[#5B7CFF]
        ">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* 卡片内容 */}
      <div className="pt-8 px-5 pb-5">
        {/* 标题 */}
        <h3 className="
          text-base font-semibold
          text-[#1A1A2E]
          mb-1
          line-clamp-1
        " data-testid={`${dataTestId}-name`}>
          {model.name}
        </h3>

        {/* 副标题/描述 */}
        <p className="
          text-sm text-[#8A8A9E]
          mb-4
          line-clamp-2
          leading-relaxed
        " data-testid={`${dataTestId}-description`}>
          {model.description}
        </p>

        {/* 标签列表 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {model.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="
                px-2.5 py-1
                bg-[#F8F9FA]
                rounded-md
                text-xs text-[#4A4A6A]
              "
              data-testid={`${dataTestId}-tag-${index}`}
            >
              {tag}
            </span>
          ))}
          {model.tags.length > 3 && (
            <span className="
              px-2.5 py-1
              bg-[#F8F9FA]
              rounded-md
              text-xs text-[#4A4A6A]
            ">
              +{model.tags.length - 3}
            </span>
          )}
        </div>

        {/* 底部信息栏 */}
        <div className="
          flex items-center justify-between
          pt-4
          border-t border-[#E5E7EB]
        ">
          {/* 左侧：指标 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-[#8A8A9E]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {model.viewCount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#8A8A9E]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {model.downloadCount.toLocaleString()}
            </div>
          </div>

          {/* 右侧：评分 */}
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[#FFB84D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-[#4A4A6A]">{model.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

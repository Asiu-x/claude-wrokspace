import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CapabilityItem } from '../../types/dashboard';

interface CapabilityCardProps {
  capability: CapabilityItem;
  dataTestId?: string;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({ capability, dataTestId }) => {
  const navigate = useNavigate();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'online':
        return { bg: '#d1fae5', text: '#10b981', label: '在线' };
      case 'developing':
        return { bg: '#F9FAFB', text: '#8A8A9E', label: '开发中' };
      case 'testing':
        return { bg: '#fef3c7', text: '#f59e0b', label: '测试中' };
      case 'offline':
        return { bg: '#fee2e2', text: '#ef4444', label: '离线' };
      default:
        return { bg: '#F9FAFB', text: '#8A8A9E', label: status };
    }
  };

  const statusConfig = getStatusConfig(capability.status);

  const handleClick = () => {
    navigate(`/capabilities/${capability.id}`);
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
      {/* 卡片头部 */}
      <div className="h-24 relative" style={{ background: 'linear-gradient(135deg, #FFB84D 0%, #FFC866 100%)' }}>
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

        {/* 图标 */}
        <div className="
          absolute bottom-0 left-4
          -mb-6
          w-12 h-12
          bg-white
          rounded-xl
          shadow-md
          flex items-center justify-center
          text-[#FFB84D]
        ">
          <span className="text-xl" data-testid={`${dataTestId}-icon`}>
            {capability.icon || '🧠'}
          </span>
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
          {capability.name}
        </h3>

        {/* 副标题/描述 */}
        <p className="
          text-sm text-[#8A8A9E]
          mb-4
          line-clamp-2
          leading-relaxed
        " data-testid={`${dataTestId}-description`}>
          {capability.description}
        </p>

        {/* 标签列表 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {capability.tags.slice(0, 3).map((tag, index) => (
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
          {capability.tags.length > 3 && (
            <span className="
              px-2.5 py-1
              bg-[#F8F9FA]
              rounded-md
              text-xs text-[#4A4A6A]
            ">
              +{capability.tags.length - 3}
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
              {capability.viewCount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#8A8A9E]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {capability.avgResponseTime}ms
            </div>
          </div>

          {/* 右侧：成功率 */}
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-[#4A4A6A]">{capability.successRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

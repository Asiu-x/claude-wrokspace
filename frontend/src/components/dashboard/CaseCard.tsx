import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CaseItem } from '../../types/dashboard';

interface CaseCardProps {
  caseItem: CaseItem;
  dataTestId?: string;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseItem, dataTestId }) => {
  const navigate = useNavigate();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'published':
        return { bg: '#d1fae5', text: '#10b981', label: '已发布' };
      case 'pending':
        return { bg: '#fef3c7', text: '#f59e0b', label: '待发布' };
      case 'archived':
        return { bg: '#F9FAFB', text: '#8A8A9E', label: '已归档' };
      case 'draft':
        return { bg: '#F9FAFB', text: '#8A8A9E', label: '草稿' };
      default:
        return { bg: '#F9FAFB', text: '#8A8A9E', label: status };
    }
  };

  const statusConfig = getStatusConfig(caseItem.status);

  const handleClick = () => {
    navigate(`/cases/${caseItem.id}`);
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
      <div className="h-24 relative" style={{ background: 'linear-gradient(135deg, #A855F7 0%, #C084FC 100%)' }}>
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
          text-[#A855F7]
        ">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
        " data-testid={`${dataTestId}-title`}>
          {caseItem.title}
        </h3>

        {/* 副标题/描述 */}
        <p className="
          text-sm text-[#8A8A9E]
          mb-4
          line-clamp-2
          leading-relaxed
        " data-testid={`${dataTestId}-summary`}>
          {caseItem.summary}
        </p>

        {/* 标签列表 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {caseItem.tags.slice(0, 3).map((tag, index) => (
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
          {caseItem.tags.length > 3 && (
            <span className="
              px-2.5 py-1
              bg-[#F8F9FA]
              rounded-md
              text-xs text-[#4A4A6A]
            ">
              +{caseItem.tags.length - 3}
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
              {caseItem.viewCount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#8A8A9E]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {caseItem.likeCount}
            </div>
          </div>

          {/* 右侧：难度 */}
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-[#4A4A6A]">{caseItem.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

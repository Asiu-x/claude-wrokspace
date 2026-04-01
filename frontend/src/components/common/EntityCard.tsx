import React from 'react';

interface EntityCardProps {
  entity: any;
  type: string;
  onView?: (entity: any) => void;
}

const EntityCard: React.FC<EntityCardProps> = ({
  entity,
  type,
  onView,
}) => {
  const getIcon = () => {
    const icons: Record<string, string> = {
      model: '🤖',
      dataset: '📊',
      case: '📚',
      capability: '🧠',
    };
    return icons[type] || '📦';
  };

  const getCategory = () => {
    switch (type) {
      case 'model':
        return entity.type || '模型';
      case 'dataset':
        return entity.category || '数据集';
      case 'case':
        return entity.category || '案例';
      case 'capability':
        return entity.category || 'AI能力';
      default:
        return '其他';
    }
  };

  const getStatus = () => {
    return entity.status || 'draft';
  };

  const statusColors: Record<string, string> = {
    online: 'bg-green-100 text-green-700',
    active: 'bg-green-100 text-green-700',
    published: 'bg-green-100 text-green-700',
    testing: 'bg-yellow-100 text-yellow-700',
    maintenance: 'bg-yellow-100 text-yellow-700',
    reviewing: 'bg-yellow-100 text-yellow-700',
    draft: 'bg-gray-100 text-gray-600',
    offline: 'bg-red-100 text-red-700',
    inactive: 'bg-gray-100 text-gray-600',
  };

  const statusLabels: Record<string, string> = {
    online: '在线',
    active: '活跃',
    published: '已发布',
    testing: '测试中',
    maintenance: '维护中',
    reviewing: '审核中',
    draft: '草稿',
    offline: '离线',
    inactive: '不活跃',
  };

  const icon = getIcon();
  const category = getCategory();
  const status = getStatus();
  const tags = entity.tags || [];

  const handleClick = () => {
    onView?.(entity);
  };

  const getName = () => {
    if ('name' in entity) return entity.name;
    if ('title' in entity) return entity.title;
    return '未知';
  };

  const getDescription = () => {
    if ('description' in entity) return entity.description;
    if ('summary' in entity) return entity.summary;
    return '无描述';
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
            <span className="text-lg">{icon}</span>
          </div>
          <div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{category}</span>
          </div>
        </div>
        {status && (
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[status] || 'bg-gray-100 text-gray-600'
            }`}
          >
            {statusLabels[status] || status}
          </span>
        )}
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-2 truncate">
        {getName()}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
        {getDescription()}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 3).map((tag: string, idx: number) => (
            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded text-xs">+{tags.length - 3}</span>
          )}
        </div>
      )}

      {(entity.rating || entity.viewCount !== undefined) && (
        <div className="flex items-center space-x-4 pt-3 border-t border-gray-100">
          {entity.rating && (
            <div>
              <span className="text-lg font-semibold text-gray-900">⭐ {entity.rating}</span>
            </div>
          )}
          {entity.viewCount !== undefined && (
            <div>
              <span className="text-lg font-semibold text-gray-900">{entity.viewCount.toLocaleString()}</span>
              <span className="text-xs text-gray-500 ml-1">访问</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EntityCard;

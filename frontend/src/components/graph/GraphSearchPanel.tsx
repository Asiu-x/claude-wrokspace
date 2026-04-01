import React, { useState, useEffect } from 'react';
import { Node as GraphNode, GraphStats as GraphStatsType } from '../../services/graphService';

interface GraphSearchPanelProps {
  nodes: GraphNode[];
  stats: GraphStatsType | null;
  onSearch: (keyword: string, type?: string) => void;
  onNodeSelect: (node: GraphNode) => void;
  searchResults: GraphNode[];
}

export const GraphSearchPanel: React.FC<GraphSearchPanelProps> = ({
  nodes,
  stats,
  onSearch,
  onNodeSelect,
  searchResults,
}) => {
  const [keyword, setKeyword] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(keyword, selectedType || undefined);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [keyword, selectedType, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setKeyword('');
      setSelectedType('');
    }
  };

  const displayNodes = keyword || selectedType ? searchResults : nodes;

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5 space-y-6">
      {/* 搜索框 */}
      <div>
        <h3 className="text-base font-semibold text-[#1A1A2E] mb-4">搜索节点</h3>
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="搜索节点名称或描述..."
              className="
                w-full
                px-4 py-2.5 pl-10
                border border-[#E5E7EB]
                rounded-lg
                text-sm
                text-[#1A1A2E]
                placeholder:text-[#B8B8C8]
                transition-all duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-[#5B7CFF]/50
                focus:border-[#5B7CFF]
              "
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8A8A9E]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                className="
                  absolute right-3 top-1/2 transform -translate-y-1/2
                  text-[#8A8A9E] hover:text-[#4A4A6A]
                  transition-colors
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="
              w-full
              px-4 py-2.5
              border border-[#E5E7EB]
              rounded-lg
              text-sm
              text-[#1A1A2E]
              transition-all duration-200
              focus:outline-none
              focus:ring-2
              focus:ring-[#5B7CFF]/50
              focus:border-[#5B7CFF]
            "
          >
            <option value="">所有类型</option>
            <option value="model">大模型</option>
            <option value="dataset">数据集</option>
            <option value="case">应用案例</option>
            <option value="capability">AI能力</option>
          </select>
        </div>
      </div>

      {/* 统计信息 */}
      {stats && (
        <div>
          <h3 className="text-sm font-medium text-[#4A4A6A] mb-3">图谱统计</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#E8EBFF] rounded-lg p-4 text-center">
              <div className="text-2xl font-semibold text-[#5B7CFF]">{stats.totalNodes}</div>
              <div className="text-xs text-[#4A6AFF]">节点总数</div>
            </div>
            <div className="bg-[#E8F5F2] rounded-lg p-4 text-center">
              <div className="text-2xl font-semibold text-[#00C896]">{stats.totalRelationships}</div>
              <div className="text-xs text-[#00A880]">关系总数</div>
            </div>
          </div>
        </div>
      )}

      {/* 节点列表 */}
      <div>
        <h3 className="text-sm font-medium text-[#4A4A6A] mb-3">
          节点列表 ({displayNodes.length})
        </h3>
        <div className="max-h-80 overflow-y-auto space-y-2">
          {displayNodes.map((node) => (
            <div
              key={node.id}
              className="
                p-3
                rounded-lg
                border border-[#E5E7EB]
                hover:border-[#5B7CFF]
                hover:bg-[#E8EBFF]
                cursor-pointer
                transition-all duration-200
              "
              onClick={() => onNodeSelect(node)}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{node.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-[#1A1A2E] truncate">{node.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8A8A9E]">{node.type}</span>
                    <span className="text-xs text-[#D1D5DB]">•</span>
                    <span className="text-xs text-[#8A8A9E] truncate">{node.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {displayNodes.length === 0 && (
            <div className="text-center py-8 text-[#8A8A9E] text-sm">
              没有找到匹配的节点
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

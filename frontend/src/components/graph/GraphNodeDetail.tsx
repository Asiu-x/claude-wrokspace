import React from 'react';
import {
  Node as GraphNode,
  Relationship as GraphRelationship,
} from '../../services/graphService';

interface GraphNodeDetailProps {
  node: GraphNode;
  relationships: GraphRelationship[];
  relatedNodes: GraphNode[];
  onRelatedNodeClick: (node: GraphNode) => void;
  onClose: () => void;
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'model':
      return '大模型';
    case 'dataset':
      return '数据集';
    case 'case':
      return '应用案例';
    case 'capability':
      return 'AI能力';
    default:
      return type;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'model':
      return 'bg-[#E8EBFF] text-[#5B7CFF]';
    case 'dataset':
      return 'bg-[#E8F5F2] text-[#00C896]';
    case 'case':
      return 'bg-[#F5F0FF] text-[#A855F7]';
    case 'capability':
      return 'bg-[#FFF5E6] text-[#FFB84D]';
    default:
      return 'bg-[#F9FAFB] text-[#8A8A9E]';
  }
};

const getRelationLabel = (type: string) => {
  switch (type) {
    case 'uses':
      return '使用';
    case 'trained_on':
      return '训练于';
    case 'evaluated_on':
      return '评估于';
    case 'includes':
      return '包含';
    case 'related_to':
      return '关联';
    case 'depends_on':
      return '依赖';
    case 'applies_to':
      return '应用于';
    default:
      return type;
  }
};

export const GraphNodeDetail: React.FC<GraphNodeDetailProps> = ({
  node,
  relationships,
  relatedNodes,
  onRelatedNodeClick,
  onClose,
}) => {
  const outgoingRelations = relationships.filter((r) => r.sourceNodeId === node.id);
  const incomingRelations = relationships.filter((r) => r.targetNodeId === node.id);

  const getRelatedNode = (nodeId: number) => relatedNodes.find((n) => n.id === nodeId);

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-[#F9FAFB] to-[#F1F3F5] px-5 py-4 border-b border-[#E5E7EB]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{node.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-[#1A1A2E]">{node.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(node.type)}`}>
                  {getTypeLabel(node.type)}
                </span>
                <span className="text-xs text-[#8A8A9E]">{node.category}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8A8A9E] hover:text-[#4A4A6A] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5 max-h-96 overflow-y-auto">
        {/* 描述 */}
        <div>
          <h4 className="text-sm font-medium text-[#4A4A6A] mb-2">描述</h4>
          <p className="text-sm text-[#8A8A9E]">{node.description}</p>
        </div>

        {/* 基本信息 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-[#4A4A6A] mb-2">创建时间</h4>
            <p className="text-sm text-[#8A8A9E]">
              {new Date(node.createdAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#4A4A6A] mb-2">更新时间</h4>
            <p className="text-sm text-[#8A8A9E]">
              {new Date(node.updatedAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
        </div>

        {/* 关联关系 - 流出 */}
        {outgoingRelations.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-[#4A4A6A] mb-3">关联到</h4>
            <div className="space-y-2">
              {outgoingRelations.map((rel) => {
                const targetNode = getRelatedNode(rel.targetNodeId);
                if (!targetNode) return null;
                return (
                  <div
                    key={rel.id}
                    className="
                      flex items-center gap-3
                      p-3
                      bg-[#F9FAFB]
                      rounded-lg
                      hover:bg-[#F1F3F5]
                      cursor-pointer
                      transition-colors duration-200
                    "
                    onClick={() => onRelatedNodeClick(targetNode)}
                  >
                    <span className="text-lg">{targetNode.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#1A1A2E] truncate">
                        {targetNode.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#5B7CFF]">{getRelationLabel(rel.type)}</span>
                        <span className="text-xs text-[#D1D5DB]">•</span>
                        <span className="text-xs text-[#8A8A9E]">{targetNode.category}</span>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-[#D1D5DB]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 关联关系 - 流入 */}
        {incomingRelations.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-[#4A4A6A] mb-3">被关联</h4>
            <div className="space-y-2">
              {incomingRelations.map((rel) => {
                const sourceNode = getRelatedNode(rel.sourceNodeId);
                if (!sourceNode) return null;
                return (
                  <div
                    key={rel.id}
                    className="
                      flex items-center gap-3
                      p-3
                      bg-[#F9FAFB]
                      rounded-lg
                      hover:bg-[#F1F3F5]
                      cursor-pointer
                      transition-colors duration-200
                    "
                    onClick={() => onRelatedNodeClick(sourceNode)}
                  >
                    <span className="text-lg">{sourceNode.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#1A1A2E] truncate">
                        {sourceNode.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#00C896]">{getRelationLabel(rel.type)}</span>
                        <span className="text-xs text-[#D1D5DB]">•</span>
                        <span className="text-xs text-[#8A8A9E]">{sourceNode.category}</span>
                      </div>
                    </div>
                    <svg
                      className="w-4 h-4 text-[#D1D5DB]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

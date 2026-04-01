import React from 'react';

interface LegendItem {
  type: string;
  label: string;
  color: string;
  icon: string;
}

interface GraphLegendProps {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}

const legendItems: LegendItem[] = [
  { type: 'model', label: '大模型', color: 'bg-[#5B7CFF]', icon: '🤖' },
  { type: 'dataset', label: '数据集', color: 'bg-[#00C896]', icon: '📊' },
  { type: 'case', label: '应用案例', color: 'bg-[#A855F7]', icon: '💡' },
  { type: 'capability', label: 'AI能力', color: 'bg-[#FFB84D]', icon: '⚡' },
];

const relationshipLegendItems = [
  { type: 'uses', label: '使用', color: 'bg-[#3B82F6]' },
  { type: 'trained_on', label: '训练于', color: 'bg-[#10B981]' },
  { type: 'evaluated_on', label: '评估于', color: 'bg-[#F59E0B]' },
  { type: 'includes', label: '包含', color: 'bg-[#8B5CF6]' },
  { type: 'related_to', label: '关联', color: 'bg-[#6B7280]' },
  { type: 'depends_on', label: '依赖', color: 'bg-[#EF4444]' },
  { type: 'applies_to', label: '应用于', color: 'bg-[#EC4899]' },
];

export const GraphLegend: React.FC<GraphLegendProps> = ({ selectedTypes, onTypeToggle }) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5 space-y-6">
      <h3 className="text-base font-semibold text-[#1A1A2E]">图例</h3>

      <div>
        <h4 className="text-sm font-medium text-[#4A4A6A] mb-3">节点类型</h4>
        <div className="space-y-2">
          {legendItems.map((item) => (
            <label
              key={item.type}
              className="flex items-center gap-2 cursor-pointer hover:bg-[#F9FAFB] p-1.5 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(item.type)}
                onChange={() => onTypeToggle(item.type)}
                className="w-4 h-4 text-[#5B7CFF] rounded focus:ring-[#5B7CFF] border-[#D1D5DB]"
              />
              <span className="text-lg">{item.icon}</span>
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-sm text-[#4A4A6A]">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-[#4A4A6A] mb-3">关系类型</h4>
        <div className="grid grid-cols-2 gap-2">
          {relationshipLegendItems.map((item) => (
            <div key={item.type} className="flex items-center gap-2">
              <div className={`w-4 h-0.5 ${item.color}`}></div>
              <span className="text-xs text-[#8A8A9E]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

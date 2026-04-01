import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  Handle,
  Position,
  MarkerType,
  Node,
  Edge,
  Connection,
  Panel,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Node as GraphNode, Relationship as GraphRelationship } from '../../services/graphService';

interface CustomNodeData {
  label: string;
  type: string;
  icon: string;
  category: string;
  description: string;
  onNodeClick: (node: GraphNode) => void;
  originalData: GraphNode;
}

const CustomNode = ({ data, selected }: { data: CustomNodeData; selected: boolean }) => {
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'model':
        return 'bg-[#5B7CFF]';
      case 'dataset':
        return 'bg-[#00C896]';
      case 'case':
        return 'bg-[#A855F7]';
      case 'capability':
        return 'bg-[#FFB84D]';
      default:
        return 'bg-[#6B7280]';
    }
  };

  const getNodeBorderColor = (type: string) => {
    switch (type) {
      case 'model':
        return 'border-[#4A6AFF]';
      case 'dataset':
        return 'border-[#00A880]';
      case 'case':
        return 'border-[#9333EA]';
      case 'capability':
        return 'border-[#F59E0B]';
      default:
        return 'border-[#4B5563]';
    }
  };

  return (
    <div
      className={`shadow-sm rounded-lg overflow-hidden transition-all duration-300 ${
        selected ? 'scale-110' : ''
      }`}
      onClick={() => data.onNodeClick(data.originalData)}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div
        className={`${getNodeColor(data.type)} px-3 py-1.5 flex items-center gap-2`}
      >
        <span className="text-lg">{data.icon}</span>
        <span className="text-white text-xs font-semibold uppercase">{data.type}</span>
      </div>
      <div
        className={`bg-white px-4 py-3 min-w-[160px] max-w-[200px] border-2 ${
          selected ? getNodeBorderColor(data.type) : 'border-transparent'
        }`}
      >
        <div className="text-sm font-medium text-[#1A1A2E] truncate">{data.label}</div>
        <div className="text-xs text-[#8A8A9E] mt-1 truncate">{data.category}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

interface GraphVisualizationProps {
  nodes: GraphNode[];
  relationships: GraphRelationship[];
  onNodeClick: (node: GraphNode) => void;
  selectedNodeId: number | null;
}

const GraphVisualizationInner: React.FC<GraphVisualizationProps> = ({
  nodes,
  relationships,
  onNodeClick,
  selectedNodeId,
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowNodes, setReactFlowNodes, onNodesChange] = useNodesState([]);
  const [reactFlowEdges, setReactFlowEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 250;
    return {
      x: 400 + Math.cos(angle) * radius,
      y: 300 + Math.sin(angle) * radius,
    };
  };

  const getEdgeColor = (type: string) => {
    switch (type) {
      case 'uses':
        return '#3B82F6';
      case 'trained_on':
        return '#10B981';
      case 'evaluated_on':
        return '#F59E0B';
      case 'includes':
        return '#8B5CF6';
      case 'related_to':
        return '#6B7280';
      case 'depends_on':
        return '#EF4444';
      case 'applies_to':
        return '#EC4899';
      case 'powers':
        return '#0EA5E9';
      case 'implemented-by':
        return '#F43F5E';
      default:
        return '#6B7280';
    }
  };

  useEffect(() => {
    const newNodes: Node<CustomNodeData>[] = nodes.map((node, index) => {
      const position = getNodePosition(index, nodes.length);
      return {
        id: String(node.id),
        type: 'custom',
        position,
        data: {
          label: node.name,
          type: node.type,
          icon: node.icon,
          category: node.category,
          description: node.description,
          onNodeClick,
          originalData: node,
        },
        selected: selectedNodeId === node.id,
      };
    });

    const newEdges: Edge[] = relationships.map((rel) => ({
      id: String(rel.id),
      source: String(rel.sourceNodeId),
      target: String(rel.targetNodeId),
      label: rel.name,
      type: 'smoothstep',
      animated: rel.weight > 0.7,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: getEdgeColor(rel.type),
      },
      style: {
        stroke: getEdgeColor(rel.type),
        strokeWidth: 2 + rel.weight * 2,
      },
      labelStyle: {
        fill: '#1A1A2E',
        fontSize: 12,
      },
      labelBgStyle: {
        fill: '#FFFFFF',
        fillOpacity: 0.9,
      },
      labelBgPadding: [4, 4],
    }));

    setReactFlowNodes(newNodes);
    setReactFlowEdges(newEdges);

    setTimeout(() => fitView({ padding: 0.2 }), 100);
  }, [nodes, relationships, setReactFlowNodes, setReactFlowEdges, fitView, onNodeClick, selectedNodeId]);

  const onConnect = useCallback(
    (params: Connection) => setReactFlowEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setReactFlowEdges]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
        className="bg-[#F8F9FA]"
      >
        <Background color="#D1D5DB" gap={20} />
        <Controls className="bg-white border border-[#E5E7EB] shadow-sm rounded-lg" />
        <MiniMap
          nodeColor={(node) => {
            const data = node.data as CustomNodeData;
            switch (data.type) {
              case 'model':
                return '#5B7CFF';
              case 'dataset':
                return '#00C896';
              case 'case':
                return '#A855F7';
              case 'capability':
                return '#FFB84D';
              default:
                return '#6B7280';
            }
          }}
          className="bg-white border border-[#E5E7EB] shadow-sm rounded-lg"
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
};

export const GraphVisualization: React.FC<GraphVisualizationProps> = (props) => {
  return (
    <ReactFlowProvider>
      <GraphVisualizationInner {...props} />
    </ReactFlowProvider>
  );
};

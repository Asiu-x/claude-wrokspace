import React, { useState, useEffect, useCallback } from 'react';
import {
  GraphService,
  Node as GraphNode,
  Relationship as GraphRelationship,
  GraphStats,
} from '../../services/graphService';
import PageContainer from '../../components/PageContainer';
import { GraphVisualization } from '../../components/graph/GraphVisualization';
import { GraphLegend } from '../../components/graph/GraphLegend';
import { GraphSearchPanel } from '../../components/graph/GraphSearchPanel';
import { GraphNodeDetail } from '../../components/graph/GraphNodeDetail';

const GraphPage: React.FC = () => {
  const [allNodes, setAllNodes] = useState<GraphNode[]>([]);
  const [allRelationships, setAllRelationships] = useState<GraphRelationship[]>([]);
  const [filteredNodes, setFilteredNodes] = useState<GraphNode[]>([]);
  const [filteredRelationships, setFilteredRelationships] = useState<GraphRelationship[]>([]);
  const [searchResults, setSearchResults] = useState<GraphNode[]>([]);
  const [stats, setStats] = useState<GraphStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedNodeRelationships, setSelectedNodeRelationships] = useState<GraphRelationship[]>([]);
  const [selectedNodeRelatedNodes, setSelectedNodeRelatedNodes] = useState<GraphNode[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['model', 'dataset', 'case', 'capability']);
  const [viewMode, setViewMode] = useState<'full' | 'related'>('full');

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const [nodeData, relationshipData, statsData] = await Promise.all([
          GraphService.getNodes(),
          GraphService.getRelationships(),
          GraphService.getGraphStats(),
        ]);
        setAllNodes(nodeData);
        setAllRelationships(relationshipData);
        setFilteredNodes(nodeData);
        setFilteredRelationships(relationshipData);
        setStats(statsData);
      } catch (error) {
        console.error('Failed to fetch graph data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  useEffect(() => {
    const nodes = allNodes.filter((node) => selectedTypes.includes(node.type));
    const relationships = allRelationships.filter(
      (rel) =>
        nodes.some((n) => n.id === rel.sourceNodeId) &&
        nodes.some((n) => n.id === rel.targetNodeId)
    );
    setFilteredNodes(nodes);
    setFilteredRelationships(relationships);
  }, [allNodes, allRelationships, selectedTypes]);

  const handleTypeToggle = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const handleSearch = useCallback(
    async (keyword: string, type?: string) => {
      if (!keyword && !type) {
        setSearchResults(filteredNodes);
        return;
      }

      try {
        const results = await GraphService.searchNodes(keyword, type);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      }
    },
    [filteredNodes]
  );

  useEffect(() => {
    setSearchResults(filteredNodes);
  }, [filteredNodes]);

  const handleNodeClick = useCallback(async (node: GraphNode) => {
    setSelectedNode(node);
    setViewMode('related');

    try {
      const response = await GraphService.getNodeRelationships(node.id);
      setSelectedNodeRelationships(response.relationships);
      setSelectedNodeRelatedNodes(response.relatedNodes);
    } catch (error) {
      console.error('Failed to fetch node relationships:', error);
    }
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedNode(null);
    setViewMode('full');
    setSelectedNodeRelationships([]);
    setSelectedNodeRelatedNodes([]);
  }, []);

  const displayNodes =
    viewMode === 'related' && selectedNode
      ? [selectedNode, ...selectedNodeRelatedNodes]
      : filteredNodes;

  const displayRelationships =
    viewMode === 'related' ? selectedNodeRelationships : filteredRelationships;

  if (loading) {
    return (
      <PageContainer title="关联图谱" subtitle="可视化展示模型、数据集、案例和AI能力之间的关联关系">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B7CFF] mx-auto"></div>
            <p className="mt-4 text-sm text-[#8A8A9E]">加载中...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="关联图谱" subtitle="可视化展示模型、数据集、案例和AI能力之间的关联关系">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左侧搜索和筛选面板 */}
        <div className="lg:col-span-3 space-y-6">
          <GraphSearchPanel
            nodes={filteredNodes}
            stats={stats}
            onSearch={handleSearch}
            onNodeSelect={handleNodeClick}
            searchResults={searchResults}
          />
          <GraphLegend selectedTypes={selectedTypes} onTypeToggle={handleTypeToggle} />
        </div>

        {/* 中间图谱可视化区域 */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#1A1A2E]">视图模式:</span>
                <div className="flex bg-[#F9FAFB] rounded-lg p-0.5">
                  <button
                    onClick={() => {
                      setViewMode('full');
                      setSelectedNode(null);
                    }}
                    className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                      viewMode === 'full'
                        ? 'bg-white text-[#5B7CFF] shadow-sm'
                        : 'text-[#8A8A9E] hover:text-[#4A4A6A]'
                    }`}
                  >
                    全图
                  </button>
                  <button
                    onClick={() => selectedNode && setViewMode('related')}
                    disabled={!selectedNode}
                    className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
                      viewMode === 'related'
                        ? 'bg-white text-[#5B7CFF] shadow-sm'
                        : 'text-[#8A8A9E] hover:text-[#4A4A6A]'
                    } ${!selectedNode && 'opacity-50 cursor-not-allowed'}`}
                  >
                    关联视图
                  </button>
                </div>
              </div>
              <div className="text-sm text-[#8A8A9E]">
                {`${displayNodes.length} 个节点, ${displayRelationships.length} 条关系`}
              </div>
            </div>

            <div className="h-[600px]">
              <GraphVisualization
                nodes={displayNodes}
                relationships={displayRelationships}
                onNodeClick={handleNodeClick}
                selectedNodeId={selectedNode?.id || null}
              />
            </div>
          </div>
        </div>

        {/* 右侧节点详情面板 */}
        <div className="lg:col-span-3">
          {selectedNode ? (
            <GraphNodeDetail
              node={selectedNode}
              relationships={selectedNodeRelationships}
              relatedNodes={selectedNodeRelatedNodes}
              onRelatedNodeClick={handleNodeClick}
              onClose={handleCloseDetail}
            />
          ) : (
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
              <div className="text-center text-[#8A8A9E]">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-[#D1D5DB]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm">点击节点查看详情</p>
                <p className="text-xs text-[#B8B8C8] mt-1">或从左侧列表选择节点</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default GraphPage;

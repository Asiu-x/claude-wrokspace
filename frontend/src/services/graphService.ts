import { ApiResponse } from './api';

export interface Node {
  id: number;
  name: string;
  type: string;
  description: string;
  icon: string;
  category: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface Relationship {
  id: number;
  sourceNodeId: number;
  targetNodeId: number;
  type: string;
  name: string;
  description: string;
  weight: number;
  createdAt: string;
  updatedAt: string;
}

export interface GraphStats {
  totalNodes: number;
  totalRelationships: number;
  nodeTypeStats: { type: string; count: number; percentage: number }[];
  relationshipTypeStats: { type: string; count: number; percentage: number }[];
}

export interface NodeRelationshipResponse {
  node: Node;
  relationships: Relationship[];
  relatedNodes: Node[];
}

export interface PathResponse {
  nodes: any[];
  relationships: any[];
}

const MOCK_NODES: Node[] = [
  { id: 1, name: '数学大模型', type: 'model', description: '数学解题大模型', icon: '🤖', category: '数学', size: 100, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 2, name: '数学题库', type: 'dataset', description: '数学题数据集', icon: '📊', category: '数学', size: 80, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 3, name: '高三数学总复习', type: 'case', description: '数学复习案例', icon: '📚', category: '数学', size: 70, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 4, name: '智能答题', type: 'capability', description: '智能答题能力', icon: '🧠', category: '数学', size: 90, createdAt: '2024-01-01', updatedAt: '2024-01-01' }
];

const MOCK_RELATIONSHIPS: Relationship[] = [
  { id: 1, sourceNodeId: 1, targetNodeId: 2, type: 'uses', name: '使用', description: '模型使用数据集', weight: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 2, sourceNodeId: 1, targetNodeId: 3, type: 'powers', name: '支持', description: '模型支持案例', weight: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' },
  { id: 3, sourceNodeId: 4, targetNodeId: 1, type: 'implemented-by', name: '实现', description: '能力由模型实现', weight: 1, createdAt: '2024-01-01', updatedAt: '2024-01-01' }
];

const MOCK_STATS: GraphStats = {
  totalNodes: 4,
  totalRelationships: 3,
  nodeTypeStats: [
    { type: 'model', count: 1, percentage: 25 },
    { type: 'dataset', count: 1, percentage: 25 },
    { type: 'case', count: 1, percentage: 25 },
    { type: 'capability', count: 1, percentage: 25 }
  ],
  relationshipTypeStats: [
    { type: 'uses', count: 1, percentage: 33.33 },
    { type: 'powers', count: 1, percentage: 33.33 },
    { type: 'implemented-by', count: 1, percentage: 33.33 }
  ]
};

export class GraphService {
  static async getNodes(): Promise<Node[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_NODES;
  }

  static async getNodeById(id: number): Promise<Node> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const node = MOCK_NODES.find(n => n.id === id) || MOCK_NODES[0];
    return node;
  }

  static async getNodesByType(type: string): Promise<Node[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_NODES.filter(n => n.type === type);
  }

  static async getRelationships(): Promise<Relationship[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_RELATIONSHIPS;
  }

  static async getNodeRelationships(id: number): Promise<NodeRelationshipResponse> {
    await new Promise(resolve => setTimeout(resolve, 250));
    const node = MOCK_NODES.find(n => n.id === id) || MOCK_NODES[0];
    const relationships = MOCK_RELATIONSHIPS.filter(r => r.sourceNodeId === id || r.targetNodeId === id);
    const relatedNodes: Node[] = [];

    relationships.forEach(r => {
      const relatedId = r.sourceNodeId === id ? r.targetNodeId : r.sourceNodeId;
      const relatedNode = MOCK_NODES.find(n => n.id === relatedId);
      if (relatedNode) {
        relatedNodes.push(relatedNode);
      }
    });

    return {
      node,
      relationships,
      relatedNodes
    };
  }

  static async findPath(sourceId: number, targetId: number, maxDepth: number = 10): Promise<PathResponse[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [];
  }

  static async searchNodes(keyword: string, type?: string): Promise<Node[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let results = MOCK_NODES.filter(node =>
      node.name.toLowerCase().includes(keyword.toLowerCase()) ||
      node.description.toLowerCase().includes(keyword.toLowerCase())
    );

    if (type) {
      results = results.filter(node => node.type === type);
    }

    return results;
  }

  static async getGraphStats(): Promise<GraphStats> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return MOCK_STATS;
  }
}

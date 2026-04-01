import { ModelType, ModelStatus } from './index';

export interface Model {
  id: string;
  name: string;
  code: string;
  description: string;
  version: string;
  type: ModelType;
  status: ModelStatus;
  metrics: {
    accuracy?: number;
    bleu?: number;
    perplexity?: number;
    inferenceSpeed?: number;
  };
  framework: string;
  parameters: string;
  precision: string;
  fileSize: number;
  category: string;
  tags: string[];
  subjects: string[];
  viewCount: number;
  downloadCount: number;
  rating: number;
  createdAt: string;
  publishedAt: string;
  calls?: number;
  successRate?: number;
  responseTime?: number;
  updatedAt?: string;
  source?: string;
  trainingMethod?: string;
  deploymentMode?: string;
  performanceMetrics?: string;
}

export type ModelItem = Model;

export interface ModelQueryParams {
  page?: number;
  size?: number;
  name?: string;
  type?: string;
  category?: string;
  source?: string;
  status?: string;
}

export interface ModelListResponse {
  records: Model[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

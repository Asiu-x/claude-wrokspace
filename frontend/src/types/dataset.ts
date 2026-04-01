import { DatasetFormat, DatasetStatus, DifficultyLevel } from './index';

export interface Dataset {
  id: string;
  name: string;
  code: string;
  description: string;
  version: string;
  format: DatasetFormat;
  status: DatasetStatus;
  size: number;
  sampleCount: number;
  tokenCount?: number;
  languages: string[];
  difficulty: DifficultyLevel;
  qualityScore: number;
  category: string;
  tags: string[];
  subjects: string[];
  viewCount: number;
  downloadCount: number;
  createdAt: string;
  publishedAt: string;
  dataCount?: number;
  fileCount?: number;
  createdBy?: string;
  updatedAt?: string;
  subject?: string;
  dataType?: string;
  sizeText?: string;
  recordCount?: number;
  knowledgePoints?: string[];
  dataSource?: string;
  dataUrl?: string;
  remark?: string;
}

export type DatasetItem = Dataset;

export interface DatasetQueryParams {
  page?: number;
  size?: number;
  name?: string;
  category?: string;
  subject?: string;
  status?: string;
}

export interface DatasetListResponse {
  records: Dataset[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

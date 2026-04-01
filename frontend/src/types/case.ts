import { CaseStatus, DifficultyLevel } from './index';

export interface Case {
  id: string;
  title: string;
  code: string;
  summary: string;
  scenario: string;
  category: string;
  tags: string[];
  subjects: string[];
  relatedModels: string[];
  relatedDatasets: string[];
  relatedCapabilities: string[];
  viewCount: number;
  likeCount: number;
  bookmarkCount: number;
  status: CaseStatus;
  difficulty: DifficultyLevel;
  duration: number;
  steps: number;
  author: string;
  organization: string;
  createdAt: string;
  publishedAt: string;
  updatedAt?: string;
  university?: string;
  universityLevel?: string;
  cooperationType?: string;
  outcomes?: string[];
  subjectLevel?: string;
  dataBasis?: string;
  coreCapabilities?: string;
  landingScenario?: string;
}

export type CaseItem = Case;

export interface CaseQueryParams {
  page?: number;
  size?: number;
  title?: string;
  category?: string;
  status?: string;
  difficulty?: string;
}

export interface CaseListResponse {
  records: Case[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

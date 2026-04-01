import { CapabilityCategory, CapabilityStatus } from './index';

export interface Capability {
  id: string;
  name: string;
  code: string;
  description: string;
  category: CapabilityCategory;
  subCategory: string;
  tags: string[];
  subjects: string[];
  avgResponseTime: number;
  availability: number;
  rateLimit: number;
  isFeatured: boolean;
  status: CapabilityStatus;
  icon: string;
  sortOrder: number;
  usageCount: number;
  successRate: number;
  apiEndpoint: string;
  apiMethod: string;
  viewCount: number;
  trialCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  relatedModels?: string[];
  capType?: 'atomic' | 'business';
  inputFormat?: string;
  outputFormat?: string;
  responseTime?: string;
  demoAvailable?: boolean;
  integrationFeatures?: string[];
  source?: string;
  accessMethod?: string;
}

export type CapabilityItem = Capability;

export interface CapabilityQueryParams {
  page?: number;
  size?: number;
  name?: string;
  category?: string;
  status?: string;
}

export interface CapabilityListResponse {
  records: Capability[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

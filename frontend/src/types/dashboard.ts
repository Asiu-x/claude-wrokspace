import {
  ModelType,
  ModelStatus,
  DatasetFormat,
  DatasetStatus,
  CaseStatus,
  CapabilityCategory,
  CapabilityStatus,
  EntityType,
  ActivityType,
  DifficultyLevel
} from './index';

export interface DashboardStatsResponse {
  totalModels: number;
  totalDatasets: number;
  totalCases: number;
  totalCapabilities: number;

  newModels: number;
  newDatasets: number;
  newCases: number;
  newCapabilities: number;

  activeModels: number;
  publishedDatasets: number;
  publishedCases: number;
  onlineCapabilities: number;

  totalUsers: number;
  totalViews: number;
  avgResponseTime: number;
  availabilityRate: number;
}

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
}

export interface TrendResponse {
  models: TimeSeriesPoint[];
  datasets: TimeSeriesPoint[];
  cases: TimeSeriesPoint[];
  capabilities: TimeSeriesPoint[];
}

export interface QuickAccessResponse {
  models: QuickAccessItem[];
  datasets: QuickAccessItem[];
  cases: QuickAccessItem[];
  capabilities: QuickAccessItem[];
}

export interface QuickAccessItem {
  id: string;
  name: string;
  code: string;
  description: string;
  icon?: string;
  color?: string;
  stats?: {
    count?: number;
    trend?: 'up' | 'down' | 'flat';
    percentage?: number;
  };
}

export interface ModelRecommendationResponse {
  list: ModelItem[];
  total: number;
}

export interface ModelItem {
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
  source?: string;
  trainingMethod?: string;
  deploymentMode?: string;
  performanceMetrics?: string;
  trainingDataDesc?: string;
}

export interface DatasetLatestResponse {
  list: DatasetItem[];
  total: number;
}

export interface DatasetItem {
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
  // 新增字段
  subject?: '理科' | '文科';
  dataType?: '文本' | '图文' | '视频' | '题库';
  sizeText?: string;
  recordCount?: number;
  knowledgePoints?: string[];
  dataSource?: string;
}

export interface CaseFeaturedResponse {
  list: CaseItem[];
  total: number;
}

export interface CaseItem {
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
  // 新增字段
  university?: string;
  universityLevel?: string;
  cooperationType?: string;
  outcomes?: string[];
  coverImage?: string;
  logoUrl?: string;
  subjectLevel?: string;
  dataBasis?: string;
  coreCapabilities?: string;
  landingScenario?: string;
}

export interface CapabilityRecommendationResponse {
  list: CapabilityItem[];
  total: number;
}

export interface CapabilityItem {
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
  // 新增字段
  capType?: 'atomic' | 'business';
  inputFormat?: string;
  outputFormat?: string;
  responseTime?: string;
  demoAvailable?: boolean;
  integrationFeatures?: string[];
}

export interface ActivityResponse {
  list: ActivityItem[];
  total: number;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  action: string;
  entityType: EntityType;
  entityId: string;
  entityName: string;
  description: string;
  user: string;
  organization?: string;
  timestamp: string;
  read: boolean;
  metadata?: {
    version?: string;
    status?: string;
    tags?: string[];
    changes?: ActivityChange[];
  };
}

export interface ActivityChange {
  field: string;
  oldValue: string;
  newValue: string;
}

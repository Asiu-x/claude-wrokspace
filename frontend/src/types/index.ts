export type ModelType = 'llm' | 'embedding' | 'multimodal' | 'classifier' | 'other';

export type ModelStatus = 'draft' | 'testing' | 'online' | 'offline' | 'deprecated';

export type DatasetFormat = 'json' | 'jsonl' | 'csv' | 'parquet' | 'text' | 'other';

export type DatasetStatus = 'draft' | 'reviewing' | 'published' | 'archived';

export type CaseStatus = 'draft' | 'pending' | 'published' | 'archived' | 'completed' | 'failed' | 'reviewing';

export type CapabilityCategory =
  | 'text_generation'
  | 'text_analysis'
  | 'question_answering'
  | 'summarization'
  | 'translation'
  | 'coding'
  | 'math'
  | 'multimodal'
  | 'other';

export type CapabilityStatus = 'developing' | 'testing' | 'online' | 'offline';

export type EntityType = 'model' | 'dataset' | 'case' | 'capability';

export type RelationType =
  | 'uses'
  | 'trained_on'
  | 'evaluated_on'
  | 'includes'
  | 'related_to'
  | 'depends_on'
  | 'applies_to';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type ActivityType =
  | 'create'
  | 'update'
  | 'delete'
  | 'publish'
  | 'offline'
  | 'view'
  | 'like'
  | 'bookmark'
  | 'download'
  | 'trial';

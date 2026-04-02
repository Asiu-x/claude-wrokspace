/**
 * 全项目Mock数据规范
 *
 * 本文件提供所有模块的Mock数据生成方案
 * 确保前端项目可以完全独立运行，不依赖任何后端接口
 */

import type {
  ModelItem,
  DatasetItem,
  CaseItem,
  CapabilityItem,
  ActivityItem,
  DashboardStatsResponse,
  QuickAccessResponse,
  TimeSeriesPoint,
  TrendResponse
} from '../types/dashboard';
import type { CapabilityCategory } from '../types';

// ==================== 工具函数 ====================

/**
 * 生成随机ID
 */
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * 生成随机日期
 */
const generateDate = (daysAgo: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

/**
 * 从数组中随机选择
 */
const randomPick = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * 生成随机数
 */
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 生成随机浮点数
 */
const randomFloat = (min: number, max: number, decimals: number = 1): number => {
  const num = Math.random() * (max - min) + min;
  return Number(num.toFixed(decimals));
};

// ==================== 模型数据 ====================

const MODEL_NAMES = [
  'GPT-4 Turbo', 'Claude 3 Opus', 'Qwen 2.5 72B', 'Llama 3 70B',
  'Gemini Pro 1.5', 'Mistral Large', 'DeepSeek V3', 'Yi-Large',
  'ChatGLM 3 6B', 'Baichuan 2 53B', 'InternLM 2.5', 'XVERSE 13B'
];

const MODEL_CODES = [
  'gpt-4-turbo', 'claude-3-opus', 'qwen-2.5-72b', 'llama-3-70b',
  'gemini-pro-1.5', 'mistral-large', 'deepseek-v3', 'yi-large',
  'chatglm-3-6b', 'baichuan-2-53b', 'internlm-2.5', 'xverse-13b'
];

const MODEL_DESCRIPTIONS = [
  'OpenAI最新的GPT-4模型，具有更强的推理能力和更长的上下文',
  'Anthropic的顶级模型，擅长复杂任务和长文档处理',
  '通义千问2.5系列，性能强劲的开源大模型',
  'Meta开源的最新大模型，性能出色且开源免费',
  'Google的多模态大模型，支持图像和文本理解',
  'Mistral AI的旗舰模型，平衡性能和成本',
  '深度求索的最新模型，代码能力突出',
  '零一万物的大模型，中文能力出色',
  '智谱AI的开源模型，社区活跃度高',
  '百川智能的大模型，推理能力强',
  '书生·浦语的最新模型，综合性能优秀',
  '元象科技的大模型，多语言支持好'
];

const FRAMEWORKS = ['Transformers', 'PyTorch', 'TensorFlow', 'OpenAI', 'Anthropic', 'vLLM'];
const PARAMETERS = ['7B', '13B', '32B', '65B', '70B', '180B', '540B', '1.2T', '1.7T'];
const PRECISIONS = ['FP16', 'FP32', 'INT8', 'INT4', 'GPTQ', 'AWQ'];
const MODEL_TYPES = ['学科大模型', '通用大模型', '行业大模型'];
const CATEGORIES = ['文本生成', '对话', '代码', '推理', '多模态', '数学'];
const TAGS = [
  ['通用', '推理', '对话'],
  ['长文本', '分析', '安全'],
  ['开源', '中文', '通用'],
  ['多模态', '图像', '视频'],
  ['代码', '编程', '开发'],
  ['数学', '逻辑', '科学']
];
const SUBJECTS = [
  ['计算机', '数学', '语言学'],
  ['法学', '管理学', '文学'],
  ['教育学', '社会学', '心理学'],
  ['医学', '生物学', '化学'],
  ['物理学', '工程学', '统计学']
];

/**
 * 生成模型Mock数据
 */
export const generateMockModel = (index: number = 0): ModelItem => {
  const modelType = randomPick(MODEL_TYPES);
  const framework = randomPick(FRAMEWORKS);
  const externalFrameworks = ['OpenAI', 'Anthropic'];
  const source = externalFrameworks.includes(framework) ? '接入' : '自研';
  const trainingMethods = ['领域预训练+微调', '持续预训练+指令微调', '多模态预训练', '代码预训练+指令微调', '领域预训练+任务微调'];
  const deploymentModes = ['本地部署', '云端部署', '云端API'];
  const trainingDataDescs = [
    '高校教材 + 历年高考题 + 学术论文',
    '公开网络语料 + 专业教材 + 题库数据',
    '教学讲义 + 课堂互动数据 + 评测集',
    '行业知识库 + 标注数据 + 专家审核样本'
  ];
  return {
    id: generateId(),
    name: MODEL_NAMES[index % MODEL_NAMES.length],
    code: MODEL_CODES[index % MODEL_CODES.length],
    description: MODEL_DESCRIPTIONS[index % MODEL_DESCRIPTIONS.length],
    version: `v${randomInt(1, 3)}.${randomInt(0, 9)}`,
    type: modelType as any,
    status: randomPick(['draft', 'testing', 'online', 'offline']),
    metrics: {
      perplexity: randomFloat(5, 20, 1),
    },
    framework,
    parameters: randomPick(PARAMETERS),
    precision: randomPick(PRECISIONS),
    fileSize: randomInt(10240, 204800),
    category: modelType,
    tags: randomPick(TAGS),
    subjects: randomPick(SUBJECTS),
    viewCount: randomInt(1000, 50000),
    downloadCount: randomInt(500, 10000),
    rating: randomFloat(4.0, 4.9, 1),
    createdAt: generateDate(randomInt(0, 180)),
    publishedAt: generateDate(randomInt(0, 30)),
    source,
    trainingMethod: randomPick(trainingMethods),
    deploymentMode: randomPick(deploymentModes),
    performanceMetrics: undefined,
    trainingDataDesc: randomPick(trainingDataDescs),
  };
};

/**
 * 生成模型列表Mock数据
 */
export const generateMockModels = (count: number = 12): ModelItem[] => {
  return Array.from({ length: count }, (_, i) => generateMockModel(i));
};

// ==================== 数据集数据 ====================

const DATASET_NAMES = [
  '高考数学题库数据集', '古诗文鉴赏数据集', '物理实验视频数据集',
  '英语作文批改数据集', '化学方程式数据集', '历史事件数据集',
  '中文维基百科', 'GitHub Code', 'Common Crawl', 'Stack Exchange',
  'ArXiv Papers', 'PubMed Central'
];

const DATASET_CODES = [
  'gaokao-math', 'gushi-jiansang', 'physics-video',
  'english-writing', 'chemistry-eq', 'history-events',
  'zhwiki-2024', 'github-code-v1', 'commoncrawl-2024', 'stackexchange-v2',
  'arxiv-papers-2024', 'pubmed-central'
];

const DATASET_DESCRIPTIONS = [
  '覆盖15年全国高考数学真题和权威模拟题，包含详细的答案解析和知识点标注，适合用于数学模型训练和评估。',
  '收录唐诗、宋词、元曲等经典古诗文，包含完整的原文、译文、注释和鉴赏分析，适合用于古文理解模型训练。',
  '高中物理经典实验视频集，包含完整的实验过程、数据记录和现象描述，适合物理视频理解模型训练。',
  '包含大量英语作文样本及专家批改反馈，涵盖不同水平、不同主题，适合英语写作模型训练和评估。',
  '包含各类化学反应方程式，标注了反应类型、条件和产物，适合化学模型训练。',
  '收录重要历史事件，包含时间、地点、人物、经过和影响，适合历史知识问答模型训练。',
  '中文维基百科的完整快照，涵盖各领域知识',
  'GitHub开源代码的精选集，包含多种编程语言',
  '大规模网页爬取数据，用于预训练大模型',
  'Stack Exchange社区问答数据，技术知识丰富',
  'ArXiv学术论文预印本，科学研究必备',
  'PubMed Central生物医学文献数据库'
];

const DATASET_SUBJECTS: ('理科' | '文科')[] = ['理科', '文科', '理科', '文科', '理科', '文科', '文科', '理科', '文科', '理科', '文科', '理科'];
const DATASET_DATA_TYPES: ('文本' | '图文' | '视频' | '题库')[] = ['题库', '文本', '视频', '图文', '题库', '文本', '文本', '题库', '文本', '图文', '文本', '视频'];
const DATASET_SIZES = ['15.2 GB', '3.8 GB', '28.5 GB', '8.7 GB', '5.2 GB', '4.5 GB', '12.3 GB', '6.1 GB', '9.8 GB', '7.4 GB', '15.6 GB', '11.2 GB'];
const DATASET_RECORD_COUNTS = [250000, 50000, 8000, 120000, 80000, 15000, 200000, 90000, 60000, 45000, 180000, 35000];
const DATASET_KNOWLEDGE_POINTS = [
  ['代数', '几何', '概率统计', '三角函数', '立体几何'],
  ['唐诗', '宋词', '元曲', '文言文', '现代文'],
  ['力学', '热学', '电磁学', '光学', '原子物理'],
  ['语法', '词汇', '表达', '逻辑', '篇章结构'],
  ['有机化学', '无机化学', '物理化学', '生物化学'],
  ['中国历史', '世界历史', '古代史', '近现代史'],
  ['百科', '知识', '文化', '科技'],
  ['算法', '数据结构', '系统设计'],
  ['文学', '小说', '散文', '诗歌'],
  ['问答', '技术', '编程'],
  ['论文', '研究', '科学'],
  ['医学', '生物', '健康']
];
const DATASET_TAGS_LIST = [
  ['数学', '高考', '题库'],
  ['语文', '古诗文', '文学'],
  ['物理', '实验', '视频'],
  ['英语', '写作', '批改'],
  ['化学', '方程式', '理科'],
  ['历史', '人文', '文科'],
  ['百科', '知识', '中文'],
  ['代码', '编程', '开发'],
  ['文本', '语料', '预训练'],
  ['问答', '技术', '社区'],
  ['论文', '学术', '科研'],
  ['医学', '对话', '专业']
];

const LANGUAGES = ['中文', '英文', '日文', '韩文', '法文', '德文', '多语言'];
const DATASET_CATEGORIES = ['文本数据', '代码数据', '多模态数据', '对话数据', '知识图谱'];

/**
 * 生成数据集Mock数据
 */
export const generateMockDataset = (index: number = 0): DatasetItem => {
  return {
    id: generateId(),
    name: DATASET_NAMES[index % DATASET_NAMES.length],
    code: DATASET_CODES[index % DATASET_CODES.length],
    description: DATASET_DESCRIPTIONS[index % DATASET_DESCRIPTIONS.length],
    version: `v${randomInt(1, 2)}.${randomInt(0, 5)}`,
    format: randomPick(['json', 'jsonl', 'csv', 'parquet', 'text']),
    status: randomPick(['draft', 'reviewing', 'published', 'archived']),
    size: randomInt(1024, 102400),
    sampleCount: randomInt(10000, 10000000),
    tokenCount: randomInt(1000000, 1000000000),
    languages: [randomPick(LANGUAGES)],
    difficulty: randomPick(['beginner', 'intermediate', 'advanced']),
    qualityScore: randomInt(70, 98),
    category: randomPick(DATASET_CATEGORIES),
    tags: DATASET_TAGS_LIST[index % DATASET_TAGS_LIST.length],
    subjects: randomPick(SUBJECTS),
    viewCount: randomInt(500, 20000),
    downloadCount: randomInt(200, 8000),
    createdAt: generateDate(randomInt(0, 180)),
    publishedAt: generateDate(randomInt(0, 60)),
    subject: DATASET_SUBJECTS[index % DATASET_SUBJECTS.length],
    dataType: DATASET_DATA_TYPES[index % DATASET_DATA_TYPES.length],
    sizeText: DATASET_SIZES[index % DATASET_SIZES.length],
    recordCount: DATASET_RECORD_COUNTS[index % DATASET_RECORD_COUNTS.length],
    knowledgePoints: DATASET_KNOWLEDGE_POINTS[index % DATASET_KNOWLEDGE_POINTS.length],
    dataSource: `${DATASET_TAGS_LIST[index % DATASET_TAGS_LIST.length].join(' + ')}相关教材与资料`
  };
};

/**
 * 生成数据集列表Mock数据
 */
export const generateMockDatasets = (count: number = 10): DatasetItem[] => {
  return Array.from({ length: count }, (_, i) => generateMockDataset(i));
};

// ==================== 案例数据 ====================

const CASE_TITLES = [
  'FoodSeek 食品学科专用大模型', '薪火中国药 中药学教育专用大模型', '材料+ 材料学科专用大模型',
  '元古大模型 地球科学垂直领域专用大模型', '学术世界智能服务平台 哲学社会科学专业学科大模型', '科学技术史学科大模型能力培养平台'
];

const CASE_CODES = [
  'CASE-FOOD-001', 'CASE-TCM-001', 'CASE-MATERIAL-001',
  'CASE-GEOLOGY-001', 'CASE-SOCIAL-001', 'CASE-HISTORY-001'
];

const CASE_SUMMARIES = [
  '江南大学食品科学与工程学科是我国食品领域最具影响力和国际竞争力的学科之一。FoodSeek可实现食物营养成分识别、宏微量营养素计算、国家标准问答、论文关键信息抽取以及肠道健康与个性化膳食推荐等功能。',
  '北京中医药大学牵头，联合国家"一带一路"节点城市高校及科大讯飞等企业，共同研发了"薪火中国药"大模型。该模型整合海量中医药多模态资源，构建以能力图谱为牵引的"五助一体"应用体系。',
  '武汉理工大学充分发挥材料科学与工程A+学科的示范引领作用，与科大讯飞联手打造了"材料+"大模型。基于讯飞星火大模型架构，能实现复杂材料问题的精准解答、材料性能参数的快速获取和合成方案的智能推荐。',
  '科大讯飞与中国地质大学（武汉）强强联合，基于讯飞星火大模型，打造出千亿参数的垂直领域元古大模型。基于62万余张古生物化石图片、3000篇地学文献中45万余条地质实体与属性数据训练。',
  '中国人民大学依托专有文献数据库及哲学社会科学预印本、复印本平台数据，基于DeepSeek系列模型自主训练了社科专业学科大模型。旨在为科研工作者提供一站式辅助，推动社科科研模式智能化转型。',
  '内蒙古师范大学依托中国科技古籍语料库，通过沉浸式、进阶式模拟训练，提升学生对科技古籍数据挖掘、采集、理解、应用能力，塑造数智时代科学技术史创新能力复合型人才。'
];

const CASE_SCENARIOS = [
  '食物营养成分识别、肠道问诊助手、论文抽取助手、食品安全标准问答',
  '个性化学习支持、文献深度挖掘、化学成分分析、数字化传承与创新',
  '材料知识问答、论文提取助手',
  '地学知识学习、智能问答、文献抽取',
  '文献智能检索、文献智能写作、科研资源管理',
  '学科问答、能力训练平台、知识中心'
];

const CASE_UNIVERSITIES = ['江南大学', '北京中医药大学', '武汉理工大学', '中国地质大学（武汉）', '中国人民大学', '内蒙古师范大学'];
const CASE_UNIVERSITY_LEVELS = ['211', '211', '211', '211', '985', '省属重点'];
const CASE_COOPERATION_TYPES = ['校企合作', '校企合作', '校企合作', '校企合作', '自主训练', '校企合作'];
const CASE_LOGO_URLS = [
  '/images/universities/jiangnan.webp',
  '/images/universities/bucm.webp',
  '/images/universities/whut.webp',
  '/images/universities/cug.webp',
  '/images/universities/ruc.webp',
  '/images/universities/imnu.webp',
];
const CASE_OUTCOMES = [
  ['深度赋能教学全过程，实现"教"与"学"双向赋能', '大幅提升文献调研效率，加速知识转化与产业服务', '树立"AI+食品"转型典范，形成可借鉴的"江南大学方案"'],
  ['建成中药学科特色语料库，总量超500TB', '形成"五助一体"智能教育应用体系', '已在北京中医药大学及10所联合高校上线'],
  ['入选教育部第二批"人工智能+高等教育"应用场景典型案例', '已服务上千名师生，打造数十门AI融合课程', '覆盖材料发现、性能优化与工艺设计全流程'],
  ['服务万余名师生，满意度超过95%', '地质文献抽取准确率≥75%', '2025年5月亮相世界数字教育大会'],
  ['打造全场景智能助手，革新科研范式', '精准理解社科领域复杂逻辑与术语', '构建社科领域科研智能服务样板点'],
  ['构建沉浸式训练环境，学习效率提升5倍', '运用AI对科技古籍进行深度解构与重构', '在"AI+人文"交叉领域树立标志性创新范式']
];
const CASE_SUBJECTS_LIST = [
  ['食品科学与工程'],
  ['中药学'],
  ['材料科学与工程'],
  ['地球科学'],
  ['哲学社会科学'],
  ['科学技术史']
];
const CASE_TAGS_LIST = [
  ['食品科学', 'AI+食品', '江南大学'],
  ['中药学', 'AI+中医药', '北京中医药大学'],
  ['材料科学', 'AI+材料', '武汉理工大学'],
  ['地球科学', 'AI+地学', '中国地质大学'],
  ['哲学社会科学', 'AI+社科', '中国人民大学'],
  ['科技史', 'AI+人文', '内蒙古师范大学']
];

const CASE_CATEGORIES = ['教育', '研究', '工业', '医疗', '金融', '法律', '娱乐'];
const AUTHORS = ['张三', '李四', '王五', '赵六', '钱七', '孙八'];
const ORGANIZATIONS = ['清华大学', '北京大学', '阿里巴巴', '腾讯', '百度', '字节跳动'];

/**
 * 生成案例Mock数据
 */
export const generateMockCase = (index: number = 0): CaseItem => {
  return {
    id: String(index + 1), // 使用固定ID：'1', '2', '3', '4', '5', '6'
    title: CASE_TITLES[index % CASE_TITLES.length],
    code: CASE_CODES[index % CASE_CODES.length],
    summary: CASE_SUMMARIES[index % CASE_SUMMARIES.length],
    scenario: CASE_SCENARIOS[index % CASE_SCENARIOS.length],
    category: randomPick(CASE_CATEGORIES),
    tags: CASE_TAGS_LIST[index % CASE_TAGS_LIST.length],
    subjects: CASE_SUBJECTS_LIST[index % CASE_SUBJECTS_LIST.length],
    relatedModels: ['讯飞星火大模型', 'DeepSeek'],
    relatedDatasets: ['学术文献库', '专业数据集'],
    relatedCapabilities: ['智能问答', '文献分析', '知识图谱'],
    viewCount: randomInt(1000, 5000),
    likeCount: randomInt(300, 1500),
    bookmarkCount: randomInt(150, 800),
    status: 'published', // 所有案例都设为已发布
    difficulty: 'advanced',
    duration: randomInt(90, 150),
    steps: randomInt(6, 10),
    author: CASE_UNIVERSITIES[index % CASE_UNIVERSITIES.length],
    organization: CASE_UNIVERSITIES[index % CASE_UNIVERSITIES.length],
    createdAt: generateDate(randomInt(60, 180)),
    publishedAt: generateDate(randomInt(30, 90)),
    university: CASE_UNIVERSITIES[index % CASE_UNIVERSITIES.length],
    universityLevel: CASE_UNIVERSITY_LEVELS[index % CASE_UNIVERSITY_LEVELS.length],
    cooperationType: CASE_COOPERATION_TYPES[index % CASE_COOPERATION_TYPES.length],
    outcomes: CASE_OUTCOMES[index % CASE_OUTCOMES.length],
    logoUrl: CASE_LOGO_URLS[index % CASE_LOGO_URLS.length],
  };
};

/**
 * 生成案例列表Mock数据
 */
export const generateMockCases = (count: number = 8): CaseItem[] => {
  return Array.from({ length: count }, (_, i) => generateMockCase(i));
};

// ==================== AI能力数据 ====================

const CAPABILITY_NAMES = [
  '通用OCR大模型', '星火知识库-文档问答', '星辰MAAS-模型推理', 'AI办公CBB-录音转写',
  'PaddleOCR', '星火X1.5', '语音听写', '语音识别',
  '文本生成', '图片理解', '文生图', '文生视频',
  '文档拆分', '文档采编', '文档重排', '文档向量化',
  '文本向量化', '违规词检测'
];

const CAPABILITY_CODES = [
  'ocr-general', 'doc-qa', 'maas-inference', 'audio-transcribe',
  'paddle-ocr', 'spark-x1.5', 'speech-dictation', 'speech-recognition',
  'text-generation', 'image-understanding', 'text-to-image', 'text-to-video',
  'doc-split', 'doc-edit', 'doc-rerank', 'doc-vectorize',
  'text-vectorize', 'content-moderation'
];

const CAPABILITY_DESCRIPTIONS = [
  '强大的通用光学字符识别能力，支持多语言、多场景文字识别，包括印刷体、手写体、表格等。',
  '基于大语言模型的智能文档问答系统，能够理解文档内容并回答相关问题。',
  '提供强大的模型即服务能力，支持DeepSeek、Qwen等多种大模型的高效推理。',
  '专业级音频转文字服务，支持会议录音、教学录音等多种场景，识别准确率高。',
  '开源OCR工具包，支持多种文字检测和识别模型，适合自定义场景。',
  '星火大模型X1.5版本，具备强大的语言理解和生成能力。',
  '实时语音听写服务，将语音实时转换为文字，支持多种方言。',
  '高精度语音识别服务，支持多种音频格式和语言。',
  '高质量的文本生成能力，支持多种风格和格式的内容创作。',
  '多模态图片理解能力，支持图像描述、视觉问答等任务。',
  '根据文本描述生成高质量图片，支持多种风格和分辨率。',
  '根据文本描述生成视频内容，支持多种时长和分辨率。',
  '智能文档拆分服务，将长文档按语义自动拆分为段落。',
  '文档智能采编服务，支持文档内容的自动提取和编辑。',
  '文档重排服务，根据查询相关性对文档段落进行重新排序。',
  '将文档内容转换为向量表示，支持语义检索和相似度计算。',
  '将文本内容转换为高维向量，用于语义搜索和聚类分析。',
  '智能违规词检测服务，识别文本中的敏感和违规内容。'
];

const CAP_TYPES: ('atomic' | 'business')[] = [
  'atomic', 'atomic', 'atomic', 'atomic',
  'atomic', 'atomic', 'atomic', 'atomic',
  'atomic', 'atomic', 'business', 'business',
  'business', 'business', 'business', 'business',
  'business', 'business'
];

const CAP_INPUT_FORMATS = [
  '图片文件 (JPG/PNG/PDF)', '文档文件 + 问题', '模型选择 + 提示词', '音频文件 (WAV/MP3)',
  '图片文件 (JPG/PNG)', '文本/多模态输入', '实时音频流', '音频文件',
  '文本提示词', '图片 + 问题', '文本描述', '文本描述',
  '长文档', '文档文件', '查询 + 文档列表', '文档内容',
  '文本内容', '待检测文本'
];

const CAP_OUTPUT_FORMATS = [
  '文本 + 位置坐标 + 置信度', '答案 + 引用段落', '生成内容 + Token统计', '转写文本 + 时间戳',
  '文本 + 坐标', '生成文本', '实时文字', '识别文本',
  '生成文本', '描述/答案', '图片文件', '视频文件',
  '段落列表', '编辑后文档', '排序后段落', '向量数组',
  '向量数组', '检测结果 + 违规词列表'
];

const CAP_RESPONSE_TIMES = [
  '200-500ms', '1-3秒', '100-2000ms', '实时/离线',
  '200-800ms', '500-2000ms', '实时', '1-5秒',
  '500-2000ms', '1-3秒', '5-15秒', '10-60秒',
  '1-3秒', '2-5秒', '500ms-2秒', '1-3秒',
  '100-500ms', '100-300ms'
];

const CAP_TAGS_LIST = [
  ['OCR', '文字识别', '图像处理'], ['文档问答', '知识库', 'NLP'], ['模型推理', 'MAAS', '大模型'], ['ASR', '语音识别', '录音转写'],
  ['OCR', '开源', '文字检测'], ['大模型', '语言理解', '生成'], ['语音听写', '实时', '方言'], ['语音识别', '音频', '多语言'],
  ['文本生成', '内容创作', 'NLG'], ['图片理解', '多模态', 'VQA'], ['文生图', 'AI绘画', '创意'], ['文生视频', 'AI视频', '创意'],
  ['文档拆分', '语义分割', 'NLP'], ['文档采编', '信息提取', '编辑'], ['文档重排', '相关性', '检索'], ['文档向量化', '嵌入', '检索'],
  ['文本向量化', '嵌入', '语义'], ['内容审核', '违规检测', '安全']
];

const CAP_INTEGRATION_FEATURES = [
  ['多语言支持', '版面分析', '批量处理', '高精度识别'],
  ['多格式支持', '语义检索', '溯源引用', '上下文理解'],
  ['多模型支持', '灵活配置', '高并发', '流式输出'],
  ['说话人识别', '智能标点', '多语言支持', '噪声抑制'],
  ['轻量部署', '自定义训练', '多模型', '开源免费'],
  ['长文本', '多轮对话', '函数调用', '知识增强'],
  ['实时转写', '方言支持', '标点预测', '低延迟'],
  ['高精度', '多格式', '批量处理', '降噪'],
  ['多风格', '长文本', '可控生成', '流式输出'],
  ['视觉问答', '图像描述', '多模态', '高精度'],
  ['多风格', '高分辨率', '快速生成', '可控性强'],
  ['多时长', '高质量', '风格可控', '批量生成'],
  ['语义分割', '自动标题', '格式保留', '批量处理'],
  ['智能提取', '格式转换', '批量处理', '高准确率'],
  ['相关性排序', '多策略', '高效率', '可配置'],
  ['高维向量', '语义保留', '批量处理', '多模型'],
  ['高维向量', '语义搜索', '聚类分析', '快速响应'],
  ['高准确率', '多类别', '实时检测', '自定义词库']
];

const CAPABILITY_CATEGORIES: CapabilityCategory[] = [
  'text_generation', 'text_analysis', 'question_answering', 'summarization',
  'translation', 'coding', 'math', 'multimodal'
];

const SUB_CATEGORIES = ['通用', '专业', '开源', '商业', '实时'];
const ICONS = ['📝', '📄', '💭', '🎯', '🏷️', '🌐', '💻', '⌨️', '🔢', '🧠', '❓', '📚', '🎨', '🔊', '👂', '🖼️', '📊', '🛡️'];
const API_METHODS = ['GET', 'POST', 'PUT'];

/**
 * 生成AI能力Mock数据
 */
export const generateMockCapability = (index: number = 0): CapabilityItem => {
  return {
    id: generateId(),
    name: CAPABILITY_NAMES[index % CAPABILITY_NAMES.length],
    code: CAPABILITY_CODES[index % CAPABILITY_CODES.length],
    description: CAPABILITY_DESCRIPTIONS[index % CAPABILITY_DESCRIPTIONS.length],
    category: randomPick(CAPABILITY_CATEGORIES as unknown as string[]) as any,
    subCategory: randomPick(SUB_CATEGORIES),
    tags: CAP_TAGS_LIST[index % CAP_TAGS_LIST.length],
    subjects: randomPick(SUBJECTS),
    avgResponseTime: randomFloat(0.1, 2.0, 2),
    availability: randomFloat(95, 99.9, 1),
    rateLimit: randomPick([10, 50, 100, 500, 1000]),
    isFeatured: Math.random() > 0.7,
    status: randomPick(['developing', 'testing', 'online', 'offline']),
    icon: ICONS[index % ICONS.length],
    sortOrder: index + 1,
    usageCount: randomInt(10000, 1000000),
    successRate: randomFloat(90, 99.5, 1),
    apiEndpoint: `/api/v1/capabilities/${CAPABILITY_CODES[index % CAPABILITY_CODES.length]}`,
    apiMethod: randomPick(API_METHODS),
    viewCount: randomInt(5000, 50000),
    trialCount: randomInt(1000, 20000),
    rating: randomFloat(4.0, 4.9, 1),
    createdAt: generateDate(randomInt(0, 180)),
    updatedAt: generateDate(randomInt(0, 30)),
    relatedModels: MODEL_CODES.slice(0, 2),
    capType: CAP_TYPES[index % CAP_TYPES.length],
    inputFormat: CAP_INPUT_FORMATS[index % CAP_INPUT_FORMATS.length],
    outputFormat: CAP_OUTPUT_FORMATS[index % CAP_OUTPUT_FORMATS.length],
    responseTime: CAP_RESPONSE_TIMES[index % CAP_RESPONSE_TIMES.length],
    demoAvailable: Math.random() > 0.3,
    integrationFeatures: CAP_INTEGRATION_FEATURES[index % CAP_INTEGRATION_FEATURES.length]
  };
};

/**
 * 生成AI能力列表Mock数据
 */
export const generateMockCapabilities = (count: number = 16): CapabilityItem[] => {
  return Array.from({ length: count }, (_, i) => generateMockCapability(i));
};

// ==================== 活动数据 ====================

const ACTIVITY_ACTIONS = ['创建了', '更新了', '发布了', '下线了', '查看了', '点赞了', '收藏了', '下载了', '试用了'];
const USERS = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十'];
const ACTIVITY_ORGANIZATIONS = ['AI研究中心', '创新实验室', '数据科学部', '产品团队', '技术开发组'];

/**
 * 生成活动Mock数据
 */
export const generateMockActivity = (index: number = 0): ActivityItem => {
  const entityType = randomPick(['model', 'dataset', 'case', 'capability'] as const);
  let entityName = '';

  switch (entityType) {
    case 'model':
      entityName = MODEL_NAMES[index % MODEL_NAMES.length];
      break;
    case 'dataset':
      entityName = DATASET_NAMES[index % DATASET_NAMES.length];
      break;
    case 'case':
      entityName = CASE_TITLES[index % CASE_TITLES.length];
      break;
    case 'capability':
      entityName = CAPABILITY_NAMES[index % CAPABILITY_NAMES.length];
      break;
  }

  return {
    id: generateId(),
    type: randomPick(['create', 'update', 'delete', 'publish', 'offline', 'view', 'like', 'bookmark', 'download', 'trial'] as const),
    action: randomPick(ACTIVITY_ACTIONS),
    entityType,
    entityId: generateId(),
    entityName,
    description: `${ACTIVITY_ACTIONS[index % ACTIVITY_ACTIONS.length]}${entityName}`,
    user: randomPick(USERS),
    organization: randomPick(ACTIVITY_ORGANIZATIONS),
    timestamp: generateDate(randomInt(0, 7)),
    read: Math.random() > 0.5,
    metadata: {
      version: `v${randomInt(1, 2)}.${randomInt(0, 9)}`,
      status: randomPick(['online', 'published', 'testing'])
    }
  };
};

/**
 * 生成活动列表Mock数据
 */
export const generateMockActivities = (count: number = 20): ActivityItem[] => {
  return Array.from({ length: count }, (_, i) => generateMockActivity(i));
};

// ==================== Dashboard统计数据 ====================

/**
 * 生成Dashboard统计数据
 */
export const generateMockDashboardStats = (): DashboardStatsResponse => {
  return {
    totalModels: randomInt(100, 500),
    totalDatasets: randomInt(50, 200),
    totalCases: randomInt(30, 150),
    totalCapabilities: randomInt(20, 100),
    newModels: randomInt(10, 50),
    newDatasets: randomInt(5, 30),
    newCases: randomInt(3, 20),
    newCapabilities: randomInt(2, 15),
    activeModels: randomInt(80, 400),
    publishedDatasets: randomInt(40, 150),
    publishedCases: randomInt(25, 100),
    onlineCapabilities: randomInt(15, 80),
    totalUsers: randomInt(1000, 10000),
    totalViews: randomInt(100000, 1000000),
    avgResponseTime: randomFloat(0.5, 1.5, 2),
    availabilityRate: randomFloat(98, 99.9, 1)
  };
};

/**
 * 生成时间序列数据
 */
export const generateMockTimeSeries = (days: number = 30): TimeSeriesPoint[] => {
  const points: TimeSeriesPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    points.push({
      timestamp: generateDate(i),
      value: randomInt(50, 200)
    });
  }
  return points;
};

/**
 * 生成趋势数据
 */
export const generateMockTrends = (): TrendResponse => {
  return {
    models: generateMockTimeSeries(30),
    datasets: generateMockTimeSeries(30),
    cases: generateMockTimeSeries(30),
    capabilities: generateMockTimeSeries(30)
  };
};

/**
 * 生成快捷访问数据
 */
export const generateMockQuickAccess = (): QuickAccessResponse => {
  const models = generateMockModels(4).map((m, i) => ({
    id: m.id,
    name: m.name,
    code: m.code,
    description: m.description,
    icon: '🤖',
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i],
    stats: {
      count: randomInt(100, 1000),
      trend: randomPick(['up', 'down', 'flat'] as const),
      percentage: randomFloat(5, 30, 1)
    }
  }));

  const datasets = generateMockDatasets(3).map((m, i) => ({
    id: m.id,
    name: m.name,
    code: m.code,
    description: m.description,
    icon: '📊',
    color: ['#06b6d4', '#8b5cf6', '#ec4899'][i],
    stats: {
      count: randomInt(50, 500),
      trend: randomPick(['up', 'down', 'flat'] as const),
      percentage: randomFloat(3, 20, 1)
    }
  }));

  const cases = generateMockCases(3).map((m, i) => ({
    id: m.id,
    name: m.title,
    code: m.code,
    description: m.summary,
    icon: '📚',
    color: ['#14b8a6', '#f97316', '#a855f7'][i],
    stats: {
      count: randomInt(30, 300),
      trend: randomPick(['up', 'down', 'flat'] as const),
      percentage: randomFloat(2, 15, 1)
    }
  }));

  const capabilities = generateMockCapabilities(3).map((m, i) => ({
    id: m.id,
    name: m.name,
    code: m.code,
    description: m.description,
    icon: m.icon,
    color: ['#6366f1', '#22c55e', '#eab308'][i],
    stats: {
      count: randomInt(20, 200),
      trend: randomPick(['up', 'down', 'flat'] as const),
      percentage: randomFloat(1, 10, 1)
    }
  }));

  return {
    models,
    datasets,
    cases,
    capabilities
  };
};

// ==================== 预生成的Mock数据 ====================

export const MOCK_MODELS = generateMockModels(100);
export const MOCK_DATASETS = generateMockDatasets(10);
export const MOCK_CASES = generateMockCases(6);
export const MOCK_CAPABILITIES = generateMockCapabilities(16);
export const MOCK_ACTIVITIES = generateMockActivities(20);
export const MOCK_DASHBOARD_STATS = generateMockDashboardStats();
export const MOCK_TRENDS = generateMockTrends();
export const MOCK_QUICK_ACCESS = generateMockQuickAccess();

/**
 * Mock数据使用规范：
 *
 * 1. 引入方式：
 *    import { MOCK_MODELS, generateMockModels } from '@/mock/data';
 *
 * 2. 直接使用预生成数据（推荐）：
 *    const models = MOCK_MODELS;
 *
 * 3. 动态生成新数据：
 *    const newModels = generateMockModels(20);
 *
 * 4. 分页筛选实现：
 *    const getPaginatedData = (data, page, pageSize, filters) => {
 *      // 在前端实现筛选和分页逻辑
 *    }
 *
 * 5. 搜索实现：
 *    const searchResults = data.filter(item =>
 *      item.name?.toLowerCase().includes(keyword.toLowerCase())
 *    );
 *
 * 注意：
 * - 所有Mock数据完全在前端生成，不依赖任何后端接口
 * - 可以根据需要调整数据生成逻辑
 * - 保持数据结构与类型定义一致
 */

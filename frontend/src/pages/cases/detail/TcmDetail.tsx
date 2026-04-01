import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlipCard } from '../../../components/FlipCard';
import type { CaseItem } from '../../../types/dashboard';
import { getAssetUrl } from '../../../utils/assets';
import {
  BookOpen,
  FileText,
  Database,
  Languages,
  ImageIcon,
  Scale,
  Brain,
  FlaskConical,
  Atom,
  BookMarked,
  Users,
  Target,
  Globe,
  ArrowLeft
} from 'lucide-react';

interface Props {
  caseItem: CaseItem;
}

const dataCapabilities = [
  { icon: BookOpen, title: '学术文献', value: '103万+', description: '中英文学术论文', color: 'text-amber-500', bgColor: 'bg-amber-50' },
  { icon: BookMarked, title: '电子图书', value: '1.2万册', description: '中医药及相关领域电子书', color: 'text-red-500', bgColor: 'bg-red-50' },
  { icon: FileText, title: '习题库', value: '20万+', description: '专业习题', color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { icon: Scale, title: '法规文档', value: '66篇', description: '药事管理相关法规', color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { icon: Languages, title: '翻译语料', value: '2.4万条', description: '中英翻译语料', color: 'text-purple-500', bgColor: 'bg-purple-50' },
  { icon: ImageIcon, title: '中药材图像', value: '27万+', description: '中药材图像数据', color: 'text-teal-500', bgColor: 'bg-teal-50' },
];

const applicationScenarios = [
  {
    icon: Brain, title: '个性化学习支持', category: '助学智能体',
    description: '基于多模态识别的药材辨识工具与交互式学习平台',
    features: ['药材辨识（准确率90%）', '化学结构式解析', '分子式检索', '配伍规律模拟'],
    image: getAssetUrl('/images/cases/tcm-herbs.jpeg'),
    detailDescription: '基于多模态识别技术（图像/文本）开发的药材辨识工具，准确率达90%。结合化学结构式解析功能，辅助学生快速掌握中药特性。交互式学习平台提供分子式检索、配伍规律模拟等功能，通过拖拽式操作降低学习门槛，增强实践能力。系统支持学生自主学习和个性化学习路径规划。',
  },
  {
    icon: BookOpen, title: '文献深度挖掘', category: '助研智能体',
    description: '学术问答与溯源系统，复方配伍规律挖掘',
    features: ['RAG文献问答', '原文定位溯源', '方剂-中药关系抽取', '知识图谱推理'],
    image: getAssetUrl('/images/cases/tcm-books.jpeg'),
    detailDescription: '利用RAG技术实现文献核心概念提取与答案原文定位，构建可信度评价体系，加速科研成果发现。从古籍、论文中抽取方剂-中药关系，解决同名异物问题，形成可推理知识图谱，预测新方功效与禁忌，支持创新药物研发。系统帮助研究者快速获取关键信息，提升文献研究效率。',
  },
  {
    icon: Atom, title: '化学成分分析', category: '助研智能体',
    description: '高精度OCR与波谱解析，活性成分自动化分析',
    features: ['化学分子式识别（90%）', '核磁波谱解析', '活性成分分析', '靶标预测'],
    image: getAssetUrl('/images/cases/tcm-chemistry.jpeg'),
    detailDescription: '针对环状/立体结构的化学分子式识别准确率达90%，结合核磁波谱数据库与TCMGEST算法，实现活性成分的自动化解析与靶标预测，显著提升研究效率。系统支持复杂化学结构的识别和分析，为中药有效成分研究提供强有力的技术支撑。',
  },
  {
    icon: FlaskConical, title: '数字化传承与创新', category: '助研智能体',
    description: '古籍活化利用与AI驱动的新药研发',
    features: ['古籍文献活化', '传统配伍理论解析', '经典名方开发', '新药研发支持'],
    image: getAssetUrl('/images/cases/tcm-research.jpeg'),
    detailDescription: '整合古籍文献构建语料库，通过大模型解析传统配伍理论，推动经典名方的现代化开发。结合药物-靶标相互作用预测技术，探索中药复方的作用机制与数字化调配方案。系统为中医药传承创新提供数字化支持，促进传统医学与现代科技的深度融合。',
  },
];

const achievements = [
  { icon: Database, title: '专用数据基座', subtitle: '支撑教育全场景应用', description: '建成"全链条覆盖、多模态贯通、结构化表达"的中药学科特色语料库，覆盖"理法方药-剂工质效"全链条数据，总量超500 TB，为中医药智能教育多场景应用提供全面支撑。' },
  { icon: Users, title: '五助一体体系', subtitle: '推进教育模式变革', description: '形成"助学-助教-助研-助管-助国际合作"五助一体智能教育应用体系，推动教育模式由"经验驱动"转变为"数据驱动"的"师-生-机"协同育人模式，全面提升人才培养质量。' },
  { icon: Target, title: '融合创新标杆', subtitle: '树立"中医药+AI教育"典范', description: '已在北京中医药大学及10所联合高校上线，并亮相全球数字经济大会、服贸会等重大会议及论坛，打造中医药领域应用标杆。' },
  { icon: Globe, title: '助力行业发展', subtitle: '传递中医药文化时代价值', description: '推动优质资源共享，赋能拔尖人才培养与中药科研创新，促进中医药文化国际传播，提升中医药教育国际影响力。' },
];

export const TcmDetail: React.FC<Props> = ({ caseItem }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      {/* Back Navigation */}
      <div className="fixed top-20 left-4 z-50">
        <button onClick={() => navigate('/cases')} className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-amber-500/50">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">返回案例集</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-amber-500/10 via-red-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-red-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white rounded-2xl px-8 py-6 shadow-2xl border border-gray-200">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                  薪火中国药
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <img
                src={getAssetUrl('/images/cases/bucm-logo.png')}
                alt="北京中医药大学"
                className="h-8 w-auto object-contain"
              />
              <span className="text-sm text-gray-500 font-medium">北京中医药大学 × 科大讯飞</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
                国内首个中药学教育专用大模型
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-medium">"讯飞星火+DeepSeek"双引擎架构</p>
            </div>

            <div className="max-w-4xl space-y-4 text-lg text-gray-500 leading-relaxed">
              <p>在人工智能与教育数字化深度融合背景下，北京中医药大学牵头，联合国家"一带一路"节点城市高校及科大讯飞等企业，共同研发了"薪火中国药"大模型。</p>
              <p>该模型整合海量中医药多模态资源，打造具备中医药原创思维和跨学科知识体系的超级大脑，构建以能力图谱为牵引的"五助一体"应用体系，实现对中药学教育全场景的智能支撑。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Foundation */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">数据基础与核心能力</h2>
          <p className="text-gray-500 text-lg">构建中药学科特色语料库，总量超500TB</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataCapabilities.map((item, index) => (
            <div key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white/50 backdrop-blur rounded-lg p-6">
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="text-base font-medium text-gray-500 mb-2">{item.title}</div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">{item.value}</div>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Application Scenarios */}
      <div className="bg-gray-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">技术实现与落地场景</h2>
            <p className="text-gray-500 text-lg">构建以能力图谱为牵引的智能教育应用体系</p>
            <p className="text-sm text-gray-400 mt-2">点击卡片查看详细说明</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {applicationScenarios.map((item, index) => (
              <FlipCard key={index} icon={item.icon} title={item.title} category={item.category} description={item.description} features={item.features} image={item.image} detailDescription={item.detailDescription} />
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">应用成效</h2>
          <p className="text-gray-500 text-lg">"中医药+AI教育"标杆，树立行业典范</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <div key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 rounded-lg border border-gray-200 bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500" />
              <div className="pt-8 p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/10 to-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-3">
                    <item.icon className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm text-center">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">薪火中国药</div>
            <p className="text-sm text-gray-500">北京中医药大学 × 科大讯飞 | 传承创新，智慧中药</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TcmDetail;
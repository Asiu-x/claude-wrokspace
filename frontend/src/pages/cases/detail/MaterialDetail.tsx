import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlipCard } from '../../../components/FlipCard';
import type { CaseItem } from '../../../types/dashboard';
import { getAssetUrl } from '../../../utils/assets';
import {
  BookOpen,
  FileText,
  Database,
  Settings,
  MessageCircleQuestion,
  GraduationCap,
  TrendingUp,
  Award,
  ArrowLeft
} from 'lucide-react';

interface Props {
  caseItem: CaseItem;
}

const dataCapabilities = [
  { icon: MessageCircleQuestion, title: '知识问答数据', value: '163,476条', description: '涵盖性能查询、工艺合成等6个子类', color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { icon: Database, title: '材料性能抽取数据', value: '114,382条', description: '正例103,975条，负例10,407条', color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
  { icon: Settings, title: '工艺路径抽取数据', value: '45,876条', description: '正例41,697条，负例4,179条', color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { icon: FileText, title: '外部整合数据', value: '45,280条', description: '材料领域问答、教辅资料及人设对话', color: 'text-violet-500', bgColor: 'bg-violet-50' },
];

const applicationScenarios = [
  {
    icon: MessageCircleQuestion, title: '材料知识问答智能体', category: '教育教学场景',
    description: '支持以自然语言进行专业问答，将复杂知识转化为互动对话',
    features: ['性能查询', '工艺合成问答', '知识图谱导航', '互动对话学习'],
    image: getAssetUrl('/images/cases/material-lab.jpeg'),
    detailDescription: '材料知识问答智能体基于讯飞星火大模型架构，能够精准回答复杂的材料科学问题。支持自然语言交互，将抽象的材料学知识转化为直观的对话形式，显著提升教学直观性与科普效率。系统覆盖材料性能查询、工艺合成路径、材料选择建议等多个维度，为师生提供7×24小时的智能问答服务。',
  },
  {
    icon: FileText, title: '论文提取助手', category: '科研场景',
    description: '从中英文学术文献中精准提取工艺路径和材料性能信息',
    features: ['工艺路径提取', '材料性能提取', '中英文支持', '关键信息定位'],
    image: getAssetUrl('/images/cases/material-paper.jpeg'),
    detailDescription: '论文提取助手具备论文关键信息一键抽取能力，支持从中英文学术资料文献分别提取工艺路径和材料性能两方面精准提取论文内容。帮助科研人员快速洞察海量文献核心，大幅提升文献调研与分析效率。系统采用先进的NLP技术，自动识别和结构化提取论文中的关键实验数据、材料参数、工艺条件等信息，加速科研进程。',
  },
];

const achievements = [
  { icon: Award, title: '国家级典型案例', subtitle: '产学研协同新模式', description: '成功入选教育部第二批"人工智能+高等教育"应用场景典型案例，并上线国家高等教育智慧教育平台。2025年5月亮相世界数字教育大会，向世界展示AI与材料科学创新融合。' },
  { icon: GraduationCap, title: '智能教学基座', subtitle: '创新人才培养范式', description: '以学科大模型为基座，借助知识图谱技术构建交叉学科课程知识图谱体系，打造数十门AI融合课程。自2024年9月上线以来，已服务上千名师生，有效提升人才培养质量。' },
  { icon: TrendingUp, title: '科研全链赋能', subtitle: '管理数智升级', description: '覆盖材料发现、性能优化与工艺设计全流程，以多智能体协同实现自主化智能研发，大幅提升科研效率。建成大模型应用驾驶舱，构建AI运行指数体系。' },
];

export const MaterialDetail: React.FC<Props> = ({ caseItem }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      {/* Back Navigation */}
      <div className="fixed top-20 left-4 z-50">
        <button onClick={() => navigate('/cases')} className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-blue-500/50">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">返回案例集</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-blue-500/10 via-cyan-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* 顶部：武汉理工大学 logo（效果图左侧） */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white rounded-full px-8 py-4 shadow-2xl border border-gray-200">
                <img
                  src={getAssetUrl('/images/cases/wut-logo.png')}
                  alt="武汉理工大学"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">材料+</h1>
              <p className="text-xl md:text-2xl text-gray-500 font-medium">材料学科专用大模型</p>
            </div>

            <p className="text-sm text-gray-500 font-medium">武汉理工大学 × 科大讯飞</p>

            <div className="max-w-4xl space-y-4 text-lg text-gray-500 leading-relaxed">
              <p>武汉理工大学是我国材料科学与工程学科人才培养、科学研究的重要基地之一。学校充分发挥材料科学与工程A+学科的示范引领作用，与科大讯飞联手打造了"材料+"大模型。</p>
              <p>基于讯飞星火大模型架构，对学校材料学教学素材与高质量文献期刊进行微调训练，能实现复杂材料问题的精准解答、材料相关图像的智能分析、材料性能参数的快速获取和合成方案的智能推荐等，为材料科学研究与教学提供全方位、智能化解决方案。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Foundation */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">数据基础与核心能力</h2>
          <p className="text-gray-500 text-lg">构建材料学科高质量数据底座</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataCapabilities.map((item, index) => (
            <div key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white/50 backdrop-blur rounded-lg p-6">
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="text-base font-medium text-gray-500 mb-2">{item.title}</div>
              <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{item.value}</div>
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
            <p className="text-gray-500 text-lg">覆盖教学与科研全场景的智能化应用</p>
            <p className="text-sm text-gray-400 mt-2">点击卡片查看详细说明</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
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
          <p className="text-gray-500 text-lg">国家级典型案例，产学研协同新典范</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 rounded-lg border border-gray-200 bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
              <div className="pt-8 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <img
              src={getAssetUrl('/images/cases/wut-logo.png')}
              alt="武汉理工大学"
              className="h-6 w-auto object-contain"
            />
            <p className="text-sm text-gray-500">武汉理工大学 × 科大讯飞 | 材料+，赋能材料科学创新</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MaterialDetail;

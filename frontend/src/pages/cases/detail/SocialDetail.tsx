import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlipCard } from '../../../components/FlipCard';
import type { CaseItem } from '../../../types/dashboard';
import { getAssetUrl } from '../../../utils/assets';
import {
  BookOpen,
  FileText,
  MessageCircleQuestion,
  Search,
  PenTool,
  FolderOpen,
  GraduationCap,
  TrendingUp,
  Target,
  ArrowLeft
} from 'lucide-react';

interface Props {
  caseItem: CaseItem;
}

const dataCapabilities = [
  { icon: BookOpen, title: '学术论文', value: '35,287篇', description: '含HTML及PDF格式论文', color: 'text-red-600', bgColor: 'bg-red-50' },
  { icon: MessageCircleQuestion, title: '问答对', value: '80,608对', description: '高质量问答数据', color: 'text-rose-500', bgColor: 'bg-rose-50' },
  { icon: FileText, title: '论文元数据', value: '41,334条', description: '结构化元数据信息', color: 'text-pink-500', bgColor: 'bg-pink-50' },
];

const applicationScenarios = [
  {
    icon: Search, title: '文献智能检索与研读', category: '科研场景',
    description: '支持海量社科文献精准检索与深度解析，自动生成摘要与知识脉络',
    features: ['精准检索', '深度解析', '摘要生成', '知识脉络梳理'],
    image: getAssetUrl('/images/cases/social-library.jpg'),
    detailDescription: '文献智能检索与研读功能支持对海量社科文献的精准检索与深度解析，系统能够自动生成论文摘要与知识脉络，帮助用户快速掌握领域前沿。基于DeepSeek模型的强大语义理解能力，可以精准理解社科领域复杂的逻辑与术语，实现学科知识深度挖掘，帮助师生在海量数据中快速定位核心价值。',
  },
  {
    icon: PenTool, title: '文献智能写作辅助', category: '科研场景',
    description: '提供论文翻译、润色、综述自动生成及创新点挖掘功能',
    features: ['论文翻译', '智能润色', '综述生成', '创新点挖掘'],
    image: getAssetUrl('/images/cases/social-writing.jpeg'),
    detailDescription: '文献智能写作辅助功能提供论文翻译、润色、综述自动生成及创新点挖掘功能，辅助科研人员突破创作瓶颈。系统能够理解学术写作的规范和风格，提供专业的语言优化建议，帮助研究者提升论文质量。同时，AI能够分析文献内容，挖掘潜在的创新点和研究方向，为学术创新提供灵感支持。',
  },
  {
    icon: FolderOpen, title: '科研资源管理', category: '科研场景',
    description: '通过"我的论文库"模块，实现综述、笔记及领域追踪的智能化管理',
    features: ['论文库管理', '智能笔记', '领域追踪', '知识管理'],
    image: getAssetUrl('/images/cases/social-library.jpg'),
    detailDescription: '科研资源管理功能通过"我的论文库"模块，实现对综述、笔记及领域追踪的智能化管理。用户可以建立个人学术知识库，系统自动关联相关文献，追踪领域最新研究动态。智能笔记功能支持从阅读到整理的全流程，帮助研究者高效组织和管理学术资源，提升科研效率。',
  },
];

const achievements = [
  { icon: GraduationCap, title: '革新科研范式', subtitle: '打造全场景智能助手', description: '面向教师与科研人员，以"AI科研助理"赋能论文问答与创新点生成；面向学生，以"智能研读学伴"提供摘要生成、知识梳理与写作辅助，推动传统科研范式向全场景智能实践跨越。' },
  { icon: TrendingUp, title: '深挖学科价值', subtitle: '释放社科数据潜能', description: '平台成为连接海量学术资源与前沿研究需求的智能枢纽，能够精准理解社科领域复杂的逻辑与术语，实现学科知识深度挖掘，帮助师生在海量数据中快速定位核心价值，加速社科研究的创新周期。' },
  { icon: Target, title: '赋能智能化转型', subtitle: '打造"AI+社科"智能样板', description: '成功构建社科领域科研智能服务样板点，有效验证平台在真实科研场景中的生命力，探索出一条基于DeepSeek模型、覆盖人文社科领域科研文献"数据处理-模型训练-场景应用"的可复制路径。' },
];

export const SocialDetail: React.FC<Props> = ({ caseItem }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      {/* Back Navigation */}
      <div className="fixed top-20 left-4 z-50">
        <button onClick={() => navigate('/cases')} className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-red-500/50">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">返回案例集</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-red-500/10 via-rose-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* 顶部：中国人民大学 logo，白底药丸形容器 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-rose-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white rounded-full px-8 py-4 shadow-2xl border border-gray-200">
                <img
                  src={getAssetUrl('/images/cases/ruc-logo.png')}
                  alt="中国人民大学"
                  className="h-14 w-auto object-contain"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-700 via-rose-600 to-red-700 bg-clip-text text-transparent">学术世界智能服务平台</h1>
              <p className="text-xl md:text-2xl text-gray-500 font-medium">哲学社会科学专业学科大模型</p>
            </div>

            <p className="text-sm text-gray-500 font-medium">中国人民大学 · 自主训练</p>

            <div className="max-w-4xl space-y-4 text-lg text-gray-500 leading-relaxed">
              <p>中国人民大学在哲学社会科学领域拥有顶尖学术地位与深厚积淀。依托专有文献数据库及哲学社会科学预印本、复印本平台数据，基于DeepSeek系列模型自主训练了社科专业学科大模型。</p>
              <p>学术世界智能服务平台旨在为科研工作者提供一站式辅助，推动社科科研模式智能化转型，帮助研究者突破传统文献处理范式的局限，实现高效的知识融合与创新探索。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Foundation */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">数据基础与核心能力</h2>
          <p className="text-gray-500 text-lg">构建哲学社会科学高质量数据底座</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {dataCapabilities.map((item, index) => (
            <div key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white/50 backdrop-blur rounded-lg p-6">
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="text-base font-medium text-gray-500 mb-2">{item.title}</div>
              <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">{item.value}</div>
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
            <p className="text-gray-500 text-lg">为科研工作者提供一站式智能辅助</p>
            <p className="text-sm text-gray-400 mt-2">点击卡片查看详细说明</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
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
          <p className="text-gray-500 text-lg">推动社科科研模式智能化转型</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 rounded-lg border border-gray-200 bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />
              <div className="pt-8 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/10 to-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-red-500" />
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
            <div className="bg-white rounded-full px-5 py-2 border border-gray-200 shadow-sm">
              <img
                src={getAssetUrl('/images/cases/ruc-logo.png')}
                alt="中国人民大学"
                className="h-4 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-500">中国人民大学 | 学术世界，推动社科科研智能化转型</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SocialDetail;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlipCard } from '../../../components/FlipCard';
import type { CaseItem } from '../../../types/dashboard';
import { getAssetUrl } from '../../../utils/assets';
import {
  BookOpen,
  MessageCircleQuestion,
  FileText,
  Database,
  Sparkles,
  FlaskConical,
  Shield,
  GraduationCap,
  TrendingUp,
  Target,
  ArrowLeft
} from 'lucide-react';

interface Props {
  caseItem: CaseItem;
}

const dataCapabilities = [
  {
    icon: BookOpen,
    title: '学术文献',
    value: '100,000+',
    description: '食品领域的研究文献',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: MessageCircleQuestion,
    title: '问答知识对',
    value: '3,000',
    description: '经食品专业学生团队严格标注',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: FileText,
    title: '国家标准',
    value: '20,000+',
    description: '食品安全国家标准和规范',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Database,
    title: '营养数据',
    value: '50,000+',
    description: '食品营养数据提取',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
];

const applicationScenarios = [
  {
    icon: Sparkles,
    title: '食物营养成分识别',
    category: '教学场景',
    description: '通过自然语言进行互动问答和营养素计算',
    features: ['营养成分分析', '宏微量营养素计算', '食物识别'],
    image: getAssetUrl('/images/cases/nutrition-analysis.jpeg'),
    detailDescription: 'FoodSeek能够精准识别各类食物的营养成分，包括蛋白质、脂肪、碳水化合物、维生素、矿物质等多种营养素。用户只需输入食物名称或上传图片，系统即可快速计算出食物中的宏量营养素和微量营养素含量。该功能在教学中可帮助学生直观理解食物营养学知识，在科普场景中可向公众传递科学的营养知识，显著提升教学直观性与科普效率。',
  },
  {
    icon: FlaskConical,
    title: '肠道问诊助手',
    category: '教学场景',
    description: '为学生提供个性化膳食推荐和肠道健康咨询',
    features: ['肠道健康评估', '个性化膳食推荐', '健康指导'],
    image: getAssetUrl('/images/cases/gut-health.jpeg'),
    detailDescription: '基于江南大学食品学科深厚的专业语料库，肠道问诊助手能够为用户提供个性化的肠道健康咨询服务。系统可以分析用户的饮食习惯、生活方式等因素，结合肠道微生物组学研究，给出科学的膳食调整建议。该功能特别适用于食品营养学、食品卫生学等课程的教学辅助，帮助学生更好地理解肠道健康与饮食之间的关系。',
  },
  {
    icon: FileText,
    title: '论文抽取助手',
    category: '科研场景',
    description: '支持论文关键信息的一键抽取，助力文献调研',
    features: ['关键信息提取', '文献调研加速', '数据整理'],
    image: getAssetUrl('/images/cases/paper-analysis.jpeg'),
    detailDescription: '论文抽取助手利用先进的自然语言处理技术，能够从学术论文中自动提取研究方法、实验数据、核心结论等关键信息。科研人员只需上传论文PDF或输入论文链接，系统即可快速生成结构化的信息摘要，大幅缩短文献调研时间。该功能特别适合研究生和科研工作者使用，可有效提升科研效率，加速学术研究的进程。',
  },
  {
    icon: Shield,
    title: '食品安全国家标准问答',
    category: '行业服务',
    description: '基于RAG技术，严格依据官方标准回答问题',
    features: ['标准查询', '权威准确', '合规指导'],
    image: getAssetUrl('/images/cases/food-safety.jpeg'),
    detailDescription: '基于检索增强生成(RAG)技术，食品安全国家标准问答系统能够严格依据国家食品安全标准数据库进行回答，有效杜绝大模型常见的"幻觉"问题。系统对接了超过20,000项食品安全国家标准和规范，可为企业提供准确的合规指导，帮助食品企业快速查询相关标准要求，解决传统人工查阅效率低、易出错的痛点，确保食品安全监管的权威性和准确性。',
  },
];

const achievements = [
  {
    icon: GraduationCap,
    title: '教学革新',
    subtitle: '实现"教"与"学"双向赋能',
    description: '深度赋能教学全过程。为教师提供AI助教实现备课查标自动化；为学生打造24小时在线学伴，实现个性化精准学习。',
  },
  {
    icon: TrendingUp,
    title: '科研提效',
    subtitle: '加速知识转化与产业服务',
    description: '大幅提升文献调研效率，将顶尖学科知识转化为普惠数字化服务，显著增强学科的社会影响力与产业赋能水平。',
  },
  {
    icon: Target,
    title: '学科标杆',
    subtitle: '形成可借鉴的"智能化转型方案"',
    description: '树立"AI+食品"转型典范，沉淀出一套整建制的方法论，为其他院校提供可借鉴的"江南大学方案"。',
  },
];

export const FoodSeekDetail: React.FC<Props> = ({ caseItem }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      {/* Back Navigation */}
      <div className="fixed top-20 left-4 z-50">
        <button
          onClick={() => navigate('/cases')}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-teal-500/50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">返回案例集</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-teal-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white rounded-2xl p-4 shadow-2xl border border-gray-200">
                <img
                  src={getAssetUrl('/images/cases/foodseek-logo.png')}
                  alt="FoodSeek"
                  className="h-12 md:h-16 w-auto object-contain"
                />
              </div>
            </div>

            {/* School Badge */}
            <div className="flex items-center justify-center gap-3">
              <img
                src={getAssetUrl('/images/cases/jiangnan-logo.jpg')}
                alt="江南大学"
                className="h-8 w-auto object-contain"
              />
              <span className="text-sm text-gray-500 font-medium">江南大学 × 科大讯飞</span>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                国内首个食品学科专用大模型
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-medium">
                开启"食品+智能"新纪元
              </p>
            </div>

            {/* Introduction */}
            <div className="max-w-4xl space-y-4 text-lg text-gray-500 leading-relaxed">
              <p>
                江南大学食品科学与工程学科是我国食品领域最具影响力和国际竞争力的学科之一，长期位列国内高校第一梯队。
              </p>
              <p>
                FoodSeek可实现食物营养成分识别、宏微量营养素计算、国家标准问答、论文关键信息抽取以及肠道健康与个性化膳食推荐等功能，旨在构建一个从专业知识发现到价值创造的端到端赋能体系。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Foundation Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">数据基础与核心能力</h2>
          <p className="text-gray-500 text-lg">构建食品学科知识图谱的坚实数据底座</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataCapabilities.map((item, index) => (
            <div
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white/50 backdrop-blur rounded-lg p-6"
            >
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="text-base font-medium text-gray-500 mb-2">{item.title}</div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                {item.value}
              </div>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Application Scenarios Section */}
      <div className="bg-gray-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">技术实现与落地场景</h2>
            <p className="text-gray-500 text-lg">
              围绕"教学—科研—行业服务"三大核心场景，定向开发四大智能体
            </p>
            <p className="text-sm text-gray-400 mt-2">点击卡片查看详细说明</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {applicationScenarios.map((item, index) => (
              <FlipCard
                key={index}
                icon={item.icon}
                title={item.title}
                category={item.category}
                description={item.description}
                features={item.features}
                image={item.image}
                detailDescription={item.detailDescription}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">应用成效</h2>
          <p className="text-gray-500 text-lg">"AI+食品"转型典范，树立学科标杆</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 rounded-lg border border-gray-200 bg-white"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500" />
              <div className="pt-8 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/10 to-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-teal-500" />
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

      {/* Partners Section */}
      <div className="bg-gradient-to-b from-gray-50/50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">合作单位</h2>
            <p className="text-gray-500 text-lg">产学研深度融合，共建食品智能生态</p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="border border-gray-200 rounded-lg bg-white">
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">模型共建单位</h3>
              </div>
              <div className="p-6 flex flex-wrap justify-center items-center gap-10 md:gap-12">
                <img src={getAssetUrl('/images/cases/jndx.svg')} alt="江南大学" className="h-16 w-auto object-contain" />
                <span className="inline-flex h-16 items-center justify-center">
                  <img
                    src={getAssetUrl('/images/cases/kdxf.jpg')}
                    alt="科大讯飞"
                    className="max-h-11 max-w-[132px] w-auto object-contain md:max-h-12 md:max-w-[148px]"
                  />
                </span>
                <img src={getAssetUrl('/images/cases/wanfang.svg')} alt="万方数据" className="h-16 w-auto object-contain" />
                <img src={getAssetUrl('/images/cases/hw.svg')} alt="华为" className="h-16 w-auto object-contain" />
                <img src={getAssetUrl('/images/cases/icon_food.svg')} alt="食品伙伴网" className="h-16 w-auto object-contain" />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg bg-white">
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">应用支持单位</h3>
              </div>
              <div className="p-6 flex flex-wrap justify-center items-center gap-10 md:gap-14">
                <img src={getAssetUrl('/images/cases/jiankangweiyuanhui.png')} alt="国家卫生健康委员会" className="h-20 w-auto object-contain" />
                <img src={getAssetUrl('/images/cases/jianduguanliju.png')} alt="国家市场监督管理总局" className="h-20 w-auto object-contain" />
                <img src={getAssetUrl('/images/cases/liangyouxuehui.png')} alt="中国粮油学会" className="h-20 w-auto object-contain" />
                <img src={getAssetUrl('/images/cases/shipinkexue.png')} alt="中国食品科学技术学会" className="h-20 w-auto object-contain" />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg bg-white">
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">技术支持单位</h3>
              </div>
              <div className="p-6 flex flex-wrap justify-center items-center gap-12 md:gap-16">
                <img src={getAssetUrl('/images/cases/icmyanjiuyuan.png')} alt="中国科学院计算技术研究所" className="h-20 w-auto object-contain" />
                <img src={getAssetUrl('/images/cases/qinghuadax.png')} alt="清华大学" className="h-20 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <img
              src={getAssetUrl('/images/cases/foodseek-logo.png')}
              alt="FoodSeek"
              className="h-8 w-auto object-contain opacity-80"
            />
            <p className="text-sm text-gray-500">
              江南大学 × 科大讯飞 | 开启"食品+智能"新纪元
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FoodSeekDetail;

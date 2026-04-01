import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FlipCard } from '../../../components/FlipCard';
import type { CaseItem } from '../../../types/dashboard';
import { getAssetUrl } from '../../../utils/assets';
import {
  BookOpen,
  ImageIcon,
  MessageCircleQuestion,
  Eye,
  FileText,
  Network,
  GraduationCap,
  Users,
  Target,
  ArrowLeft
} from 'lucide-react';

interface Props {
  caseItem: CaseItem;
}

const dataCapabilities = [
  { icon: BookOpen, title: '学术文献', value: '5,000+', description: '地学领域的研究文献', color: 'text-amber-500', bgColor: 'bg-amber-50' },
  { icon: ImageIcon, title: '化石图像', value: '500,000张', description: '古生物化石和岩石图片', color: 'text-stone-500', bgColor: 'bg-stone-50' },
  { icon: FileText, title: '地质实体数据', value: '45万+条', description: '来自3000篇地学文献', color: 'text-orange-500', bgColor: 'bg-orange-50' },
  { icon: Network, title: '模型参数', value: '千亿级', description: '基于讯飞星火大模型', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
];

const applicationScenarios = [
  {
    icon: MessageCircleQuestion, title: '地学知识学习智能体', category: '教学场景',
    description: '支持智能问答、图像解析、化石复原等功能，帮助学生可视化学习',
    features: ['智能问答', '图像解析', '化石复原', '可视化学习'],
    image: getAssetUrl('/images/cases/geology-fossil.jpeg'),
    detailDescription: '地学知识学习智能体支持智能问答、图像解析、化石复原等功能，帮助学生可视化学习并显著提升知识答疑效率。系统能够识别古生物化石图片，提供详细的知识解释，并通过AI技术复原古代生物形态，让地学知识更加生动直观。为地质学习者提供了个性化、一体化的学习支撑体验。',
  },
  {
    icon: Eye, title: '智能问答智能体', category: '科研场景',
    description: '支持地质文献核心信息快速抽取，多模态输入与溯源',
    features: ['文献信息抽取（≥75%准确率）', '多模态输入', '鱼类化石复原', '溯源定位'],
    image: getAssetUrl('/images/cases/geology-reconstruction.jpeg'),
    detailDescription: '智能问答智能体支持地质文献核心信息快速抽取功能，支持文本、图像等多模态输入与溯源，大幅提升文献查询、阅读与分析等效率。试运行期间地质文献抽取准确率≥75%，鱼类化石复原抽样平均误差控制在16.5%左右。为科研人员搭建了新形态下的数据处理与分析平台，改善了地学科研体验。',
  },
  {
    icon: FileText, title: '文献抽取智能体', category: '科研场景',
    description: '从地学文献中自动抽取实体关系，构建知识图谱',
    features: ['实体关系抽取', '知识图谱构建', '文献分析', '数据结构化'],
    image: getAssetUrl('/images/cases/geology-rocks.jpeg'),
    detailDescription: '文献抽取智能体能够从海量地学文献中自动抽取实体关系，构建地学知识图谱。系统已从3000篇地学文献中抽取超过45万条地质实体数据，支持地质年代、岩石类型、矿物成分等多维度信息的结构化提取。为地学研究提供了高效的文献分析工具，加速科研知识的积累与发现。',
  },
];

const achievements = [
  { icon: GraduationCap, title: '服务万余名师生', subtitle: '赋能地学科研与科普', description: '元古大模型已面向地学相关学院和专业的科研人员及师生近千余人，为论文研读和课题研究提供智能化支撑；地学科普教育服务平台面向全校10000余名师生提供服务，满意度超过95%。' },
  { icon: Users, title: '多模态技术突破', subtitle: '创新科研应用新范式', description: '元古大模型在基于多模态的图像识别、地学文献实体抽取和数据集成及处理上做出了突破，形成了大模型赋能科研的地学科研新范式，促进学科知识的互补和融合。' },
  { icon: Target, title: '亮相国际舞台', subtitle: '入选省级示范案例', description: '2025年5月亮相世界数字教育大会，AI与地球科学深度融合的创新成果获中外嘉宾高度认可。同时成功入选湖北省2025年全省人工智能典型应用场景，彰显校企协同创新示范价值。' },
];

export const GeologyDetail: React.FC<Props> = ({ caseItem }) => {
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-amber-500/10 via-orange-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* 顶部：中国地质大学（武汉）logo，白底药丸形容器 */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-3xl rounded-full" />
              <div className="relative bg-white rounded-full px-8 py-4 shadow-2xl border border-gray-200">
                <img
                  src={getAssetUrl('/images/cases/cug-logo.jpg')}
                  alt="中国地质大学（武汉）"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">元古大模型</h1>
              <p className="text-xl md:text-2xl text-gray-500 font-medium">地球科学垂直领域专用大模型</p>
            </div>

            <p className="text-sm text-gray-500 font-medium">中国地质大学（武汉）× 科大讯飞</p>

            <div className="max-w-4xl space-y-4 text-lg text-gray-500 leading-relaxed">
              <p>科大讯飞与中国地质大学（武汉）强强联合，探索产学研协同创新的新模式。学校以地球生物学为探索特区，基于讯飞星火大模型，打造出千亿参数的垂直领域元古大模型。</p>
              <p>基于62万余张古生物化石图片、3000篇地学文献中45万余条地质实体与属性数据训练，开发了地质图像理解、鱼类化石复原、文献抽取、知识图谱、地学小助手等智能体，为师生、地质工作者、地学爱好者提供全方位的教学、实践、科研及科普服务支持。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Foundation */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">数据基础与核心能力</h2>
          <p className="text-gray-500 text-lg">构建地球科学高质量数据底座</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataCapabilities.map((item, index) => (
            <div key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 bg-white/50 backdrop-blur rounded-lg p-6">
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="text-base font-medium text-gray-500 mb-2">{item.title}</div>
              <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{item.value}</div>
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
            <p className="text-gray-500 text-lg">覆盖教学、科研、科普全场景的智能化应用</p>
            <p className="text-sm text-gray-400 mt-2">点击卡片查看详细说明</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
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
          <p className="text-gray-500 text-lg">产学研协同创新，树立地学AI标杆</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 rounded-lg border border-gray-200 bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />
              <div className="pt-8 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-amber-500" />
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
                src={getAssetUrl('/images/cases/cug-logo.jpg')}
                alt="中国地质大学（武汉）"
                className="h-4 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-500">中国地质大学（武汉）× 科大讯飞 | 元古大模型，探索地球科学新纪元</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeologyDetail;

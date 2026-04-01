import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CaseItem } from '../../../types/dashboard';
import { getAssetUrl } from '../../../utils/assets';
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  FileSearch,
  Bot,
  Database,
  Target,
  Award,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

interface Props {
  caseItem: CaseItem;
}

const features = [
  { icon: Bot, title: '学科问答', description: '基于科技古籍知识库，为师生提供智能问答服务，解答科技史相关学术问题' },
  { icon: GraduationCap, title: '能力训练平台', description: '沉浸式实训模式，通过与AI导师多轮对话，进行版本鉴定、内容分析等实践操作' },
  { icon: Database, title: '知识中心', description: '系统化梳理古籍知识，自动生成研究笔记，有效提升科技古籍研究效率与系统性' },
];

const capabilities = [
  { icon: FileSearch, title: '能力测评', description: '快速诊断学生知识基础，生成个性化学习路径' },
  { icon: Target, title: '能力训练', description: '自主对话实训，智能批改与反馈，培养实践技能' },
  { icon: Award, title: '诊断报告', description: '生成考核依据报告，量化评估学习成果' },
];

const achievements = [
  { icon: BookOpen, title: '打造古籍研究的"数字训练场"', description: '构建沉浸式训练环境，将古籍整理知识转化为可反复演练的标准化数字化模块，学习效率提升5倍' },
  { icon: Database, title: '实现科技古籍的"数字再生"', description: '运用人工智能对科技古籍进行深度解构与重构，将文献内容转化为可展示、可传承的数字资产' },
  { icon: Lightbulb, title: '锻造交叉学科的"特色名片"', description: '为学科建设积累可传承的数字家底，在"AI+人文"交叉领域树立标志性创新范式' },
];

const dataResources = [
  { label: '数学谱系古籍', value: '6类', subtext: '高质量古籍类型' },
  { label: '古籍总数', value: '1,922部', subtext: '科技史核心文献' },
  { label: '学习效率提升', value: '5倍', subtext: '对比传统学习方式' },
];

export const HistoryDetail: React.FC<Props> = ({ caseItem }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-orange-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Back Button */}
          <div className="fixed top-20 left-4 z-50">
            <button onClick={() => navigate('/cases')} className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-orange-500/50">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">返回案例集</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
                  <img
                    src={getAssetUrl('/images/cases/nmg-logo.jpg')}
                    alt="内蒙古师范大学"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-sm">
                    内蒙古师范大学 × 科大讯飞
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  科学技术史学科大模型
                </h1>
                <p className="text-xl text-gray-500">能力培养平台</p>
                <p className="text-gray-500 leading-relaxed">
                  依托中国科技古籍语料库，通过沉浸式、进阶式模拟训练，提升学生对科技古籍数据挖掘、采集、理解、应用能力，塑造数智时代科学技术史创新能力复合型人才。
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {dataResources.map((item, idx) => (
                  <div key={idx} className="text-center p-4 bg-white/50 rounded-xl border border-gray-200">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">{item.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.subtext}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={getAssetUrl('/images/cases/history-ancient.jpeg')}
                alt="科技古籍研究"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/90 text-lg font-medium">
                  我国科技史研究尤其是少数民族科技史领域的奠基性与引领性学科
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">三大核心功能</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            围绕科学技术学科的"教学—科研"两大核心场景，推出学科问答、能力训练平台与知识中心三大AI功能
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-lg bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Capability Training Flow */}
      <div className="bg-gray-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">能力培养全流程</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              贯穿教学全流程的沉浸式实训模式，培养科技史学科复合型人才
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="relative">
                <div className="h-full hover:shadow-lg transition-shadow border border-gray-200 rounded-lg bg-white p-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg">
                    <cap.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{cap.title}</h3>
                  <p className="text-gray-500 text-sm">{cap.description}</p>
                </div>
                {idx < capabilities.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <TrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">应用成效</h2>
          <p className="text-gray-500 text-lg">创新范式引领学科智能化转型</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="text-center space-y-4">
              <div className="w-20 h-20 rounded-[24px] bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mx-auto shadow-lg">
                <achievement.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{achievement.title}</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Data Foundation Gradient - 明亮橙到深橙红渐变 */}
      <div className="bg-gradient-to-r from-[lab(60.3514%_40.5624_87.1228)] to-[lab(57.1026%_64.2584_89.8886)] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">数据基础与核心能力</h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-12">
            行业知识资源：6类数学谱系的高质量古籍，共计1922部
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">6类</div>
              <div className="text-white/90 text-sm">数学谱系古籍</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">1,922部</div>
              <div className="text-white/90 text-sm">高质量古籍</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">5倍</div>
              <div className="text-white/90 text-sm">学习效率提升</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-white rounded-full px-5 py-2 border border-gray-200 shadow-sm">
              <img
                src={getAssetUrl('/images/cases/nmg-logo.jpg')}
                alt="内蒙古师范大学"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-gray-500">内蒙古师范大学 · 科学技术史学科大模型能力培养平台</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HistoryDetail;

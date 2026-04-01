import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { caseService } from '../../../services/caseService';
import type { CaseItem } from '../../../types/dashboard';
import { FoodSeekDetail } from './FoodSeekDetail';
import { TcmDetail } from './TcmDetail';
import { MaterialDetail } from './MaterialDetail';
import { GeologyDetail } from './GeologyDetail';
import { SocialDetail } from './SocialDetail';
import { HistoryDetail } from './HistoryDetail';

type DetailFC = React.FC<{ caseItem: CaseItem }>;

// 将案例所有文本字段拼接为一个搜索字符串
const getCaseSearchText = (c: CaseItem): string => {
  return [
    c.title,
    c.code,
    c.summary,
    c.scenario,
    c.university,
    c.organization,
    c.category,
    ...(c.tags || []),
    ...(c.subjects || []),
  ].filter(Boolean).join(' ').toLowerCase();
};

// 匹配规则：每个案例对应一组关键词，任意一个命中即匹配
const MATCH_RULES: Array<{ keywords: string[]; component: DetailFC }> = [
  {
    keywords: ['foodseek', '食品', '江南大学', '营养成分', '膳食推荐', '肠道'],
    component: FoodSeekDetail,
  },
  {
    keywords: ['薪火', '中药', '中医药', '北京中医药', '中国药', '药材辨识'],
    component: TcmDetail,
  },
  {
    keywords: ['材料+', '材料科学', '武汉理工', '材料学科', '合成方案'],
    component: MaterialDetail,
  },
  {
    keywords: ['元古', '地质', '地球科学', '地学', '中国地质大学', '化石', '古生物'],
    component: GeologyDetail,
  },
  {
    keywords: ['学术世界', '社会科学', '哲学社会', '人民大学', '社科', '预印本'],
    component: SocialDetail,
  },
  {
    keywords: ['科学技术史', '科技史', '古籍', '内蒙古师范', '科技古籍', '能力培养平台'],
    component: HistoryDetail,
  },
];

// 综合匹配：在案例所有文本字段中搜索关键词
const matchDetailComponent = (caseItem: CaseItem): DetailFC | null => {
  const searchText = getCaseSearchText(caseItem);

  for (const rule of MATCH_RULES) {
    if (rule.keywords.some(kw => searchText.includes(kw.toLowerCase()))) {
      return rule.component;
    }
  }
  return null;
};

const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [caseItem, setCaseItem] = useState<CaseItem | null>(null);

  useEffect(() => {
    setLoading(true);
    caseService.getCaseDetail(id!).then(response => {
      if (response.code === 200) {
        setCaseItem(response.data);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!caseItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">案例不存在</h2>
          <p className="text-gray-500 mb-4">该案例可能已被删除或不存在</p>
          <button onClick={() => navigate('/cases')} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            返回案例列表
          </button>
        </div>
      </div>
    );
  }

  // 综合多字段关键词匹配
  const DetailComponent = matchDetailComponent(caseItem);

  // 调试日志
  console.log('[CaseDetail] caseItem:', JSON.stringify({ id: caseItem.id, code: caseItem.code, title: caseItem.title, university: caseItem.university, summary: caseItem.summary?.slice(0, 50) }));
  console.log('[CaseDetail] 匹配结果:', DetailComponent ? '命中' : '未命中，使用通用详情页');

  if (!DetailComponent) {
    return <GenericCaseDetail caseItem={caseItem} />;
  }

  return <DetailComponent caseItem={caseItem} />;
};

// 通用详情页组件（fallback）
const GenericCaseDetail: React.FC<{ caseItem: CaseItem }> = ({ caseItem }) => {
  const navigate = useNavigate();
  const scenarios = (caseItem.scenario || '').split('、').filter(Boolean);
  const outcomes = caseItem.outcomes || ['效率显著提升', '用户满意度达90%以上'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button onClick={() => navigate('/cases')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回案例集
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{caseItem.title}</h1>
        <div className="flex flex-wrap gap-2 mb-8">
          {caseItem.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{tag}</span>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">案例描述</h2>
            <p className="text-gray-600 leading-relaxed">{caseItem.summary}</p>
          </div>

          {scenarios.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">落地场景</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenarios.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">应用成效</h2>
            <div className="space-y-3">
              {outcomes.map((o, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 border border-green-100 rounded-xl">
                  <span className="text-sm text-gray-700">{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailPage;

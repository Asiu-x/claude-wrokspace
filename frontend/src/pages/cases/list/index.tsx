import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';
import { TruncatedLineClampTooltip } from '../../../components/common/TruncatedLineClampTooltip';
import { caseService } from '../../../services/caseService';
import type { CaseItem } from '../../../types/dashboard';
import { getAssetUrl } from '../../../utils/assets';

// 卡片渐变色配置，按索引循环使用（与参考站点一致）
const CARD_THEMES = [
  { gradient: 'from-teal-500 to-emerald-500', bg: 'from-teal-500/10 to-emerald-500/10' },
  { gradient: 'from-amber-500 to-red-500', bg: 'from-amber-500/10 to-red-500/10' },
  { gradient: 'from-blue-500 to-cyan-500', bg: 'from-blue-500/10 to-cyan-500/10' },
  { gradient: 'from-amber-500 to-orange-500', bg: 'from-amber-500/10 to-orange-500/10' },
  { gradient: 'from-red-600 to-rose-500', bg: 'from-red-500/10 to-rose-500/10' },
  { gradient: 'from-amber-600 to-orange-500', bg: 'from-amber-500/10 to-orange-500/10' },
];

// 根据案例关键词匹配对应的封面图和Logo
const IMAGE_MAPPING: Record<string, { cover: string; logo: string }> = {
  '食品': { cover: getAssetUrl('/images/cases/nutrition-analysis.jpeg'), logo: getAssetUrl('/images/cases/foodseek-logo.png') },
  '中药': { cover: getAssetUrl('/images/cases/tcm-herbs.jpeg'), logo: getAssetUrl('/images/cases/bucm-logo.png') },
  '材料': { cover: getAssetUrl('/images/cases/material-lab.jpeg'), logo: getAssetUrl('/images/cases/wut-logo.png') },
  '地质': { cover: getAssetUrl('/images/cases/geology-fossil.jpeg'), logo: getAssetUrl('/images/cases/cug-logo.jpg') },
  '地球': { cover: getAssetUrl('/images/cases/geology-fossil.jpeg'), logo: getAssetUrl('/images/cases/cug-logo.jpg') },
  '社会': { cover: getAssetUrl('/images/cases/social-library.jpg'), logo: getAssetUrl('/images/cases/ruc-logo.png') },
  '哲学': { cover: getAssetUrl('/images/cases/social-library.jpg'), logo: getAssetUrl('/images/cases/ruc-logo.png') },
  '科技史': { cover: getAssetUrl('/images/cases/history-ancient.jpeg'), logo: getAssetUrl('/images/cases/nmg-logo.jpg') },
  '古籍': { cover: getAssetUrl('/images/cases/history-ancient.jpeg'), logo: getAssetUrl('/images/cases/nmg-logo.jpg') },
};

// 根据案例内容匹配图片
const getImageForCase = (caseItem: CaseItem, index: number): { cover: string; logo: string } => {
  // 如果API返回了图片URL，优先使用（相对路径需要加上basePath前缀）
  if (caseItem.coverImage && caseItem.logoUrl) {
    return {
      cover: caseItem.coverImage.startsWith('http') ? caseItem.coverImage : getAssetUrl(caseItem.coverImage),
      logo: caseItem.logoUrl.startsWith('http') ? caseItem.logoUrl : getAssetUrl(caseItem.logoUrl),
    };
  }

  // 尝试从标题、分类、场景中匹配关键词
  const searchText = `${caseItem.title || ''} ${caseItem.category || ''} ${caseItem.scenario || ''} ${caseItem.university || ''}`;

  for (const [keyword, images] of Object.entries(IMAGE_MAPPING)) {
    if (searchText.includes(keyword)) {
      return images;
    }
  }

  // 如果没有匹配，使用索引循环
  const defaultCovers = [
    getAssetUrl('/images/cases/nutrition-analysis.jpeg'),
    getAssetUrl('/images/cases/tcm-herbs.jpeg'),
    getAssetUrl('/images/cases/material-lab.jpeg'),
    getAssetUrl('/images/cases/geology-fossil.jpeg'),
    getAssetUrl('/images/cases/social-library.jpg'),
    getAssetUrl('/images/cases/history-ancient.jpeg'),
  ];
  const defaultLogos = [
    getAssetUrl('/images/cases/foodseek-logo.png'),
    getAssetUrl('/images/cases/bucm-logo.png'),
    getAssetUrl('/images/cases/wut-logo.png'),
    getAssetUrl('/images/cases/cug-logo.jpg'),
    getAssetUrl('/images/cases/ruc-logo.png'),
    getAssetUrl('/images/cases/nmg-logo.jpg'),
  ];

  return {
    cover: defaultCovers[index % defaultCovers.length],
    logo: defaultLogos[index % defaultLogos.length],
  };
};

// 解析标签字符串（支持JSON数组或逗号分隔）
const parseTags = (value?: string): string[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // not JSON
  }
  return value.split(/[,，、]/).map(s => s.trim()).filter(Boolean);
};

const CasesListPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<CaseItem[]>([]);

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
        const response = await caseService.getCases({ page: 1, size: 100 });
        if (response.code === 200) {
          setCases(response.data.records);
        }
      } catch (err) {
        console.error('Failed to fetch cases:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                AI赋能教育数字化转型
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto">
                探索高校学科专用大模型创新应用，见证人工智能与教育深度融合
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 pt-4">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {cases.length}
                </div>
                <div className="text-sm text-gray-500 mt-2">标杆案例</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  170万+
                </div>
                <div className="text-sm text-gray-500 mt-2">学术文献</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {cases.length}+
                </div>
                <div className="text-sm text-gray-500 mt-2">合作高校</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">案例展示</h2>
          <p className="text-gray-500 text-lg">点击卡片查看详细案例</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {cases.map((caseItem, index) => {
            const theme = CARD_THEMES[index % CARD_THEMES.length];
            const images = getImageForCase(caseItem, index);
            return (
              <div
                key={caseItem.id}
                onClick={() => navigate(`/cases/${caseItem.id}`)}
                className="group relative z-0 overflow-visible rounded-xl border border-gray-200/50 bg-white shadow-sm hover:z-20 hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col"
              >
                {/* Hover Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Image Area */}
                <div className="relative h-56 flex-shrink-0 overflow-hidden rounded-t-xl">
                  <img
                    src={images.cover}
                    alt={caseItem.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Logo Badge - Top Left */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                      <img
                        src={images.logo}
                        alt={caseItem.title}
                        className="h-8 w-auto object-contain max-w-[100px]"
                      />
                    </div>
                  </div>

                  {/* Arrow - Top Right on Hover */}
                  <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-r ${theme.gradient} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 shadow-lg`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    {caseItem.universityLevel && (
                      <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-gray-700 mb-2 shadow-sm">
                        {caseItem.universityLevel}
                      </span>
                    )}
                    <p className="text-white/90 text-lg font-medium leading-tight">
                      {caseItem.category || caseItem.scenario}
                    </p>
                    <p className="text-white/70 text-sm mt-1">
                      {caseItem.university || caseItem.organization} × {caseItem.cooperationType || '科大讯飞'}
                    </p>
                  </div>
                </div>

                {/* Content Area */}
                <div className="relative p-5">
                  <TruncatedLineClampTooltip text={caseItem.summary} lineClamp={2} />

                  {/* Discipline Level Tags (学科水平) */}
                  {(() => {
                    const levelTags = parseTags(caseItem.subjectLevel) || caseItem.tags || [];
                    return levelTags.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {levelTags.slice(0, 4).map((tag, i) => (
                          <span
                            key={i}
                            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs bg-gradient-to-r ${theme.bg} border-gray-200/30`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null;
                  })()}

                  {/* Highlights (数据亮点/成果) */}
                  {(() => {
                    const highlights = caseItem.outcomes && caseItem.outcomes.length > 0
                      ? caseItem.outcomes
                      : parseTags(caseItem.dataBasis);
                    return highlights && highlights.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {highlights.slice(0, 3).map((item, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-4 py-16">
        <div className="rounded-2xl border border-gray-200/60 bg-gradient-to-br from-gray-50/80 to-blue-50/30 p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">核心价值</h2>
            <p className="text-lg text-gray-500">AI大模型赋能高校教育数字化转型</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">学科专用</h3>
              <p className="text-gray-500 text-sm">针对特定学科领域深度训练，具备专业知识和思维能力</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">产学研融合</h3>
              <p className="text-gray-500 text-sm">校企联合开发，深度对接产业需求与教学场景</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">全场景赋能</h3>
              <p className="text-gray-500 text-sm">覆盖教学、科研、行业服务全链条，实现智能化转型</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">AI赋能教育 · 开启智能教育新时代</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default CasesListPage;

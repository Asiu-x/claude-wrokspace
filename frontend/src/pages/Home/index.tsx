import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, animate, useInView, AnimatePresence } from 'framer-motion';
// import Header from '../../components/Header';
import PageContainer from '../../components/PageContainer';
import { DashboardAPI } from '../../services/dashboard';
import type { ModelItem, CaseItem } from '../../types/dashboard';
import {
  Library,
  Database,
  CaseSensitive,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  BarChart3,
  Gauge,
  MonitorPlay,
  FileCode2,
  Ruler,
  Tags,
  Eye,
  ShieldCheck,
  GraduationCap,
  Layers,
  Target,
  RefreshCw,
  Atom,
  Briefcase,
  Play,
  BookOpen,
  Building2,
  Star,
  Zap,
} from 'lucide-react';

/** 鼠标跟随网格背景组件 */
const GridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  // 每个交叉点的当前亮度，用于平滑衰减
  const glowMapRef = useRef<Float32Array>(new Float32Array(0));
  const gridMetaRef = useRef({ cols: 0, rows: 0, gap: 50 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const gap = 50; // 网格间距

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(rect.width / gap) + 1;
      const rows = Math.ceil(rect.height / gap) + 1;
      gridMetaRef.current = { cols, rows, gap };
      glowMapRef.current = new Float32Array(cols * rows);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);

    const draw = () => {
      const { cols, rows, gap: g } = gridMetaRef.current;
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const mouse = mouseRef.current;
      const glow = glowMapRef.current;
      const radius = 200; // 鼠标影响半径

      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // 更新每个交叉点的亮度（鼠标 + 波浪叠加）
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const cx = col * g;
          const cy = row * g;
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // 鼠标亮度
          const mouseTarget = dist < radius ? 1 - dist / radius : 0;

          // 波浪亮度：对角线方向的正弦波缓慢扫过
          const wave = (Math.sin((cx + cy) * 0.008 - time * 0.6) + 1) * 0.5; // 0~1

          const target = Math.min(mouseTarget + wave * 0.15, 1);
          const speed = target > glow[idx] ? 0.15 : 0.04;
          glow[idx] += (target - glow[idx]) * speed;
        }
      }

      // 绘制水平网格线
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          const b = Math.max(glow[row * cols + col], glow[row * cols + col + 1]);
          const alpha = 0.06 + b * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.6 + b * 0.4;
          ctx.moveTo(col * g, row * g);
          ctx.lineTo((col + 1) * g, row * g);
          ctx.stroke();
        }
      }

      // 绘制垂直网格线
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 1; row++) {
          const b = Math.max(glow[row * cols + col], glow[(row + 1) * cols + col]);
          const alpha = 0.06 + b * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.6 + b * 0.4;
          ctx.moveTo(col * g, row * g);
          ctx.lineTo(col * g, (row + 1) * g);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'auto' }}
      />
      {/* 四边淡出遮罩 */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          linear-gradient(to right, white 0%, transparent 15%, transparent 85%, white 100%),
          linear-gradient(to bottom, white 0%, transparent 15%, transparent 85%, white 100%)
        `,
      }} />
    </div>
  );
};

/** 数字滚动动画组件 */
const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>0</span>;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ models: 0, datasets: 0, cases: 0, capabilities: 0 });
  const [activeModule, setActiveModule] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTOPLAY_DURATION = 5000; // 与进度条 duration 对应

  // 自动轮播
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % 4);
    }, AUTOPLAY_DURATION);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [startAutoplay]);

  // 手动切换时重置轮播计时
  const handleModuleHover = (index: number) => {
    setActiveModule(index);
    startAutoplay();
  };

  // 精选案例 + 推荐模型数据
  const [featuredCases, setFeaturedCases] = useState<CaseItem[]>([]);
  const [recommendedModels, setRecommendedModels] = useState<ModelItem[]>([]);
  const casesScrollRef = useRef<HTMLDivElement>(null);
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [hoveredModel, setHoveredModel] = useState<number | null>(null);

  useEffect(() => {
    DashboardAPI.getFeaturedCases(8).then((res) => {
      const list = res?.list || res?.data?.list || (Array.isArray(res) ? res : []);
      setFeaturedCases(list);
    }).catch((err) => { console.warn('获取精选案例失败:', err); });

    // 从模型库获取 100 个模型
    import('../../services/modelService').then(({ modelService }) => {
      modelService.getModels({ page: 1, size: 100 }).then((res: any) => {
        const records = res?.data?.records || res?.records || [];
        if (records.length > 0) {
          setRecommendedModels(records);
        } else {
          // 回退到推荐接口
          DashboardAPI.getModelRecommendations('trending', 12).then((r) => {
            setRecommendedModels(r?.list || []);
          });
        }
      }).catch(() => {
        DashboardAPI.getModelRecommendations('trending', 12).then((r) => {
          setRecommendedModels(r?.list || []);
        }).catch(() => {});
      });
    });
  }, []);

  useEffect(() => {
    DashboardAPI.getStats().then((stats: any) => {
      setCounts({
        models: stats.totalModels ?? 0,
        datasets: stats.totalDatasets ?? 0,
        cases: stats.totalCases ?? 0,
        capabilities: stats.totalCapabilities ?? 0,
      });
    }).catch(() => {});
  }, []);

  const modules = [
    {
      title: '模型库',
      description: '展示平台已接入及自研的大模型，支持在线体验和多维度对比',
      icon: Library,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      link: '/models',
      count: counts.models,
      countLabel: '大模型',
      features: [
        { text: '参数量对比', icon: BarChart3 },
        { text: '性能指标', icon: Gauge },
        { text: '在线体验', icon: MonitorPlay },
        { text: 'API文档', icon: FileCode2 },
      ],
      // 右侧卡片渐变光效
      glowFrom: 'rgba(59, 130, 246, 0.12)',
      glowTo: 'rgba(99, 102, 241, 0.06)',
      accentColor: '#3b82f6',
    },
    {
      title: '数据集',
      description: '学科数据集资产展示，支持多维筛选和检索',
      icon: Database,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      link: '/datasets',
      count: counts.datasets,
      countLabel: '数据集',
      features: [
        { text: '数据规模', icon: Ruler },
        { text: '标注规范', icon: Tags },
        { text: '样本预览', icon: Eye },
        { text: '合规信息', icon: ShieldCheck },
      ],
      glowFrom: 'rgba(16, 185, 129, 0.12)',
      glowTo: 'rgba(6, 182, 212, 0.06)',
      accentColor: '#10b981',
    },
    {
      title: '案例集',
      description: '展示与高校合作的标杆案例，支持按学科和场景查找',
      icon: CaseSensitive,
      iconBg: 'bg-violet-50',
      iconColor: 'text-violet-500',
      link: '/cases',
      count: counts.cases,
      countLabel: '案例',
      features: [
        { text: '合作院校', icon: GraduationCap },
        { text: '项目深度', icon: Layers },
        { text: '落地成效', icon: Target },
        { text: '相似案例', icon: RefreshCw },
      ],
      glowFrom: 'rgba(139, 92, 246, 0.12)',
      glowTo: 'rgba(168, 85, 247, 0.06)',
      accentColor: '#8b5cf6',
    },
    {
      title: 'AI能力货架',
      description: '展示AI原子能力和业务能力，即插即用',
      icon: Sparkles,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
      link: '/capabilities',
      count: counts.capabilities,
      countLabel: 'AI能力',
      features: [
        { text: '原子能力', icon: Atom },
        { text: '业务能力', icon: Briefcase },
        { text: 'Demo体验', icon: Play },
        { text: '集成文档', icon: BookOpen },
      ],
      glowFrom: 'rgba(245, 158, 11, 0.12)',
      glowTo: 'rgba(251, 146, 60, 0.06)',
      accentColor: '#f59e0b',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <PageContainer>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
          {/* 网格背景（边缘淡出） */}
          <GridCanvas />

          {/* 蓝紫氛围光效 */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 45%, rgba(99, 102, 241, 0.06) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 55% 50%, rgba(139, 92, 246, 0.04) 0%, transparent 60%)
            `,
          }} />

          {/* 主内容 - stagger 动画容器 */}
          <motion.div
            className="relative z-10 text-center px-6 max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
            }}
          >
            {/* 主标题 */}
            <motion.h1
              className="text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-gray-900 mb-8"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              学科大模型
              <br />
              <span className="hero-gradient-text-light">AI 能力中心</span>
            </motion.h1>

            {/* 副标题 */}
            <motion.p
              className="text-lg md:text-xl lg:text-2xl font-medium text-gray-500 max-w-2xl mx-auto mb-14 leading-relaxed tracking-[0.02em]"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              模型 · 数据 · 能力 · 案例
              <br className="hidden md:block" />
              全链路AI资产，一站式成效展示
            </motion.p>

            {/* CTA 按钮 */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-5 mb-20"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={() => navigate('/models')}
                className="hero-btn-glow group px-10 py-4 text-lg font-semibold rounded-full inline-flex items-center justify-center gap-3 text-white"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                探索模型库
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                onClick={() => navigate('/cases')}
                className="hero-btn-ghost px-10 py-4 text-lg font-semibold rounded-full inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                查看案例
              </motion.button>
            </motion.div>

            {/* 统计数字 */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-4xl mx-auto"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                { value: counts.models, label: '大模型' },
                { value: counts.datasets, label: '数据集' },
                { value: counts.cases, label: '标杆案例' },
                { value: counts.capabilities, label: 'AI能力' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-sm md:text-base text-gray-400 mt-2 font-medium tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 底部滚动提示 */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-gray-200 flex justify-center pt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="w-1 h-2.5 bg-gray-300 rounded-full"
                animate={{ opacity: [0.5, 0, 0.5], y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* 核心模块 - 交互式焦点面板 */}
        <section className="py-28 px-4 bg-gray-50/50">
          <div className="container mx-auto max-w-6xl">
            {/* 标题区 */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-5">核心模块</h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
                从底层模型到业务能力，从训练数据到落地案例，
                四大模块构建完整的AI能力资产体系
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row gap-8 md:gap-6 min-h-[520px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* 左栏 - layoutId 滑块导航 */}
              <div className="md:w-[33%] flex flex-col justify-center gap-1 md:pr-4">
                {modules.map((module, index) => {
                  const isActive = activeModule === index;
                  const Icon = module.icon;
                  return (
                    <div
                      key={index}
                      className="relative cursor-pointer"
                      onMouseEnter={() => handleModuleHover(index)}
                      onClick={() => navigate(module.link)}
                    >
                      {/* layoutId 驱动的滑块背景 */}
                      {isActive && (
                        <motion.div
                          layoutId="module-highlight"
                          className="absolute inset-0 bg-white rounded-2xl"
                          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px -4px rgba(0,0,0,0.06)' }}
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}

                      <div className="relative flex items-center gap-4 px-5 py-5 rounded-2xl">
                        {/* 左侧竖线 */}
                        <motion.div
                          className="absolute left-0 top-1/2 w-[3px] rounded-full"
                          style={{ backgroundColor: module.accentColor }}
                          initial={false}
                          animate={{ height: isActive ? 32 : 0, y: isActive ? -16 : 0, opacity: isActive ? 1 : 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />

                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${isActive ? module.iconBg : ''}`}>
                          <Icon className={`h-5 w-5 transition-colors duration-300 ${isActive ? module.iconColor : 'text-zinc-400'}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className={`text-[15px] transition-all duration-300 ${isActive ? 'font-bold text-zinc-900' : 'font-medium text-zinc-400'}`}>
                            {module.title}
                          </div>
                          <div className={`text-xs mt-0.5 transition-colors duration-300 ${isActive ? 'text-zinc-400' : 'text-zinc-300'}`}>
                            {module.count} 个{module.countLabel}
                          </div>
                        </div>

                        <ArrowRight className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${isActive ? 'text-zinc-400 opacity-100' : 'text-zinc-300 opacity-0'}`} />
                      </div>

                      {/* 进度条 */}
                      <div className="mx-5 mt-0.5 mb-0.5">
                        <div className="h-[2px] rounded-full bg-zinc-100 overflow-hidden">
                          {isActive && (
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: module.accentColor }}
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 5, ease: 'linear' }}
                              key={`progress-${index}-${activeModule}`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 右栏 - 展示舞台 */}
              <div className="md:w-[67%] relative min-h-[480px]">
                <div className="h-full rounded-3xl border border-zinc-200/80 bg-white/80 backdrop-blur-xl overflow-hidden" style={{
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03), 0 8px 32px -8px rgba(0,0,0,0.06)',
                }}>
                  {/* 动态光晕 */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`glow-${activeModule}`}
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <motion.div
                        className="absolute w-[350px] h-[350px] rounded-full blur-[120px] opacity-50"
                        style={{ background: `radial-gradient(circle, ${modules[activeModule].glowFrom}, transparent 70%)` }}
                        animate={{ top: ['-10%', '0%', '-10%'], right: ['-8%', '2%', '-8%'] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.div
                        className="absolute w-[200px] h-[200px] rounded-full blur-[80px] opacity-30"
                        style={{ background: `radial-gradient(circle, ${modules[activeModule].glowTo}, transparent 70%)` }}
                        animate={{ bottom: ['-5%', '5%', '-5%'], left: ['0%', '10%', '0%'] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* 内容切换 */}
                  <div className="relative z-10 h-full">
                    <AnimatePresence mode="popLayout">
                      {modules.map((module, index) => {
                        if (index !== activeModule) return null;
                        const Icon = module.icon;
                        return (
                          <motion.div
                            key={module.title}
                            className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 lg:p-12"
                            initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
                            transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                          >
                            <div>
                              {/* 顶部标签 */}
                              <motion.div
                                className="flex items-center gap-3 mb-8"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.05 }}
                              >
                                <div className="p-2.5 rounded-xl" style={{ background: `${module.accentColor}12` }}>
                                  <Icon className="h-5 w-5" style={{ color: module.accentColor }} />
                                </div>
                                <span className="text-sm font-semibold text-zinc-400">{module.title}</span>
                              </motion.div>

                              {/* 巨型渐变数字 */}
                              <motion.div
                                className="mb-4"
                                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                              >
                                <span className="hero-gradient-text-light text-7xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-none">
                                  {module.count}
                                </span>
                                <span className="text-xl md:text-2xl font-medium text-zinc-300 ml-3">{module.countLabel}</span>
                              </motion.div>

                              {/* 描述 */}
                              <motion.p
                                className="text-zinc-500 text-[15px] md:text-base leading-relaxed max-w-md"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.15 }}
                              >
                                {module.description}
                              </motion.p>
                            </div>

                            {/* 底部：2列图标网格 + 入口 */}
                            <motion.div
                              className="flex items-end justify-between gap-4"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.22 }}
                            >
                              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                {module.features.map((feature, idx) => {
                                  const FIcon = feature.icon;
                                  return (
                                    <div key={idx} className="flex items-center gap-2.5">
                                      <FIcon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: module.accentColor, opacity: 0.6 }} />
                                      <span className="text-sm text-zinc-500 font-medium">{feature.text}</span>
                                    </div>
                                  );
                                })}
                              </div>
                              <motion.div
                                className="flex-shrink-0 p-3 rounded-full border cursor-pointer"
                                style={{ borderColor: `${module.accentColor}25`, background: `${module.accentColor}06` }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => { e.stopPropagation(); navigate(module.link); }}
                              >
                                <ArrowRight className="h-5 w-5" style={{ color: module.accentColor }} />
                              </motion.div>
                            </motion.div>

                            {/* 装饰 */}
                            <Icon className="absolute -bottom-4 -right-4 h-48 w-48 opacity-[0.025]" style={{ color: module.accentColor }} strokeWidth={0.4} />
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 高校合作案例 - 交互式折叠风琴 */}
        {(() => {
          // 风琴自动轮播
          const accordionCases = featuredCases.slice(0, 4);
          const accordionTimer = useRef<ReturnType<typeof setInterval> | null>(null);
          const startAccordionAutoplay = () => {
            if (accordionTimer.current) clearInterval(accordionTimer.current);
            accordionTimer.current = setInterval(() => {
              setSpotlightIdx((prev) => (prev + 1) % Math.min(featuredCases.length, 4));
            }, 6000);
          };
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            if (featuredCases.length > 0) startAccordionAutoplay();
            return () => { if (accordionTimer.current) clearInterval(accordionTimer.current); };
          }, [featuredCases.length]);

          const handleAccordionClick = (idx: number) => {
            setSpotlightIdx(idx);
            startAccordionAutoplay();
          };

          return (
            <section className="py-28 px-4 bg-[#FCFCFC]">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-5">高校合作案例</h2>
                  <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
                    科大讯飞与全国高校深度合作，打造标杆AI落地案例
                  </p>
                </motion.div>

                {accordionCases.length > 0 ? (
                  <motion.div
                    className="flex gap-2 rounded-3xl overflow-hidden border border-zinc-200/60"
                    style={{ height: 520, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {accordionCases.map((caseItem, idx) => {
                      const isExpanded = spotlightIdx === idx;
                      const titleParts = caseItem.title.split(/\s+/);
                      const modelName = titleParts[0];
                      const modelSub = titleParts.slice(1).join(' ');
                      const dataPoints = caseItem.outcomes?.slice(0, 2) || [];

                      return (
                        <motion.div
                          key={caseItem.id}
                          className={`relative cursor-pointer overflow-hidden transition-colors duration-500 ${isExpanded ? 'bg-white' : 'bg-zinc-50 hover:bg-zinc-100/70'}`}
                          animate={{ flex: isExpanded ? 5 : 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                          onClick={() => handleAccordionClick(idx)}
                          style={{ minWidth: 0 }}
                        >
                          {/* ===== 收拢态 ===== */}
                          <AnimatePresence>
                            {!isExpanded && (
                              <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm overflow-hidden">
                                  {caseItem.logoUrl ? (
                                    <img src={caseItem.logoUrl} alt="" className="w-8 h-8 object-contain" />
                                  ) : (
                                    <Building2 className="h-5 w-5 text-zinc-400" />
                                  )}
                                </div>
                                <div className="flex flex-col items-center gap-0.5">
                                  {(caseItem.university || '').split('').map((char, cIdx) => (
                                    <span key={cIdx} className="text-[13px] font-bold text-zinc-500 leading-tight">{char}</span>
                                  ))}
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                  {[0,1,2].map(d => (
                                    <div key={d} className="w-1 h-1 rounded-full bg-zinc-300" />
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* ===== 展开态 ===== */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                className="absolute inset-0 flex"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                              >
                                {/* 左侧：文字排版 */}
                                <div className="w-[45%] p-8 md:p-10 flex flex-col justify-between relative z-10">
                                  <div>
                                    {/* 联合背书 */}
                                    <motion.div
                                      className="mb-8"
                                      initial={{ opacity: 0, y: 12 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.4, delay: 0.15 }}
                                    >
                                      <div className="text-[12px] text-zinc-400 tracking-[0.12em] font-semibold">
                                        科大讯飞 × {caseItem.university || caseItem.organization}
                                      </div>
                                    </motion.div>

                                    {/* 模型名 */}
                                    <motion.div
                                      initial={{ opacity: 0, y: 16 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                      <h3 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 leading-tight mb-2">
                                        {modelName}
                                      </h3>
                                      {modelSub && (
                                        <p className="text-base text-zinc-400 font-medium leading-snug">{modelSub}</p>
                                      )}
                                    </motion.div>

                                    {/* 学科 + 成果 */}
                                    <motion.div
                                      className="mt-6 space-y-3"
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.4, delay: 0.35 }}
                                    >
                                      {caseItem.subjects?.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                          {caseItem.subjects.map((s, sIdx) => (
                                            <span key={sIdx} className="text-[11px] px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-500 font-semibold">{s}</span>
                                          ))}
                                        </div>
                                      )}
                                      {dataPoints.map((point, pIdx) => (
                                        <div key={pIdx} className="flex items-start gap-2.5">
                                          <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Award className="h-2.5 w-2.5 text-emerald-500" />
                                          </div>
                                          <p className="text-[13px] text-zinc-500 leading-relaxed font-medium line-clamp-2">{point}</p>
                                        </div>
                                      ))}
                                    </motion.div>
                                  </div>

                                  {/* 底部 */}
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.45 }}
                                  >
                                    <button
                                      className="text-[13px] text-zinc-400 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-zinc-50 hover:text-zinc-600 transition-colors"
                                      onClick={(e) => { e.stopPropagation(); navigate(`/cases/${caseItem.id}`); }}
                                    >
                                      查看案例详情 <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                  </motion.div>
                                </div>

                                {/* 右侧：校徽融入背景 */}
                                <div className="w-[55%] relative overflow-hidden">
                                  <motion.div
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                  >
                                    {caseItem.logoUrl ? (
                                      <img
                                        src={caseItem.logoUrl}
                                        alt=""
                                        className="w-[80%] h-[80%] max-w-[360px] max-h-[360px] object-contain opacity-60"
                                      />
                                    ) : (
                                      <Building2 className="w-[60%] h-[60%] text-zinc-900 opacity-[0.04]" strokeWidth={0.5} />
                                    )}
                                  </motion.div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* 自动轮播进度条 - 底部 */}
                          {isExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-100">
                              <motion.div
                                className="h-full bg-indigo-400 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 6, ease: 'linear' }}
                                key={`acc-progress-${idx}-${spotlightIdx}`}
                              />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <div className="flex gap-2 h-[520px] rounded-3xl overflow-hidden">
                    {[0,1,2,3].map(i => (
                      <div key={i} className={`bg-zinc-50 animate-pulse ${i === 0 ? 'flex-[5]' : 'flex-1'}`} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })()}

        {/* 模型生态 - 辐射网状 */}
        <section className="py-28 px-4 bg-[#FCFCFC]" style={{ overflow: 'visible' }}>
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-5">模型生态</h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
                自研与接入模型网络，覆盖多学科AI能力
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
            >
              {recommendedModels.length > 0 ? (() => {
                const allModelsData = recommendedModels.slice(0, 100);
                const VBW = 1600; const VBH = 1000; const CX = VBW / 2; const CY = VBH / 2;
                // 8 层椭圆轨道，垂直半径不超过 VBH/2 - 30 = 470
                const orbits = [140, 195, 250, 300, 345, 385, 420, 455];
                const orbitStretch = 1.55; // 加大横向拉伸，补偿纵向缩小
                // 每层分配节点数（总计 100）
                const layerCounts = [8, 10, 12, 13, 14, 15, 15, 13];
                // 分配模型到各层并计算固定位置
                // 使用黄金角（137.508°）作为层间偏移，确保相邻层不对齐
                const GOLDEN_ANGLE = 137.508;
                let nodeIdx = 0;
                const allNodes = orbits.flatMap((r, oi) => {
                  const count = layerCounts[oi];
                  const nodes = [];
                  for (let mi = 0; mi < count && nodeIdx < allModelsData.length; mi++) {
                    // 每层均匀分布 + 黄金角层间偏移，确保整体散布均匀
                    const angle = (mi / count) * 360 + oi * GOLDEN_ANGLE;
                    const rad = (angle * Math.PI) / 180;
                    const px = CX + Math.cos(rad) * r * orbitStretch;
                    const py = CY + Math.sin(rad) * r;
                    nodes.push({
                      model: allModelsData[nodeIdx],
                      flatIdx: nodeIdx,
                      x: px,
                      y: py,
                      leftPct: (px / VBW) * 100,
                      topPct: (py / VBH) * 100,
                      dotSize: Math.max(4, 10 - oi * 0.6),
                      orbitR: r,
                    });
                    nodeIdx++;
                  }
                  return nodes;
                });
                // 背景星尘
                const bgStars = Array.from({ length: 60 }, (_, i) => {
                  const a = i * 2.39996 + 0.7;
                  const d = 40 + Math.sqrt(i / 60) * 450;
                  return { x: CX + Math.cos(a) * d * orbitStretch, y: CY + Math.sin(a) * d, s: 0.4 + (i % 3) * 0.2, o: 0.03 + (i % 4) * 0.01 };
                });

                return (
                  <div
                    className="relative mx-auto"
                    style={{ width: '110vw', maxWidth: 1600, marginLeft: '-5vw', aspectRatio: '16/10' }}
                    onMouseLeave={() => setHoveredModel(null)}
                  >
                    {/* SVG：星尘 + 同心圆轨道 + 辐射连线 */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${VBW} ${VBH}`}>
                      {/* 星尘 */}
                      {bgStars.map((s, i) => (
                        <circle key={`d-${i}`} cx={s.x} cy={s.y} r={s.s} fill="#818cf8" opacity={s.o} />
                      ))}
                      {/* 同心椭圆虚线轨道 */}
                      {orbits.map((r, i) => (
                        <ellipse key={`orb-${i}`} cx={CX} cy={CY} rx={r * orbitStretch} ry={r} fill="none" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="4 8" opacity="0.35" />
                      ))}
                      {/* 中心到每个节点的辐射连线 - 常驻显示 */}
                      {allNodes.map((n, i) => (
                        <line key={`ray-${i}`} x1={CX} y1={CY} x2={n.x} y2={n.y}
                          stroke="#a5b4fc" strokeWidth="0.8" opacity="0.35"
                        />
                      ))}
                      {/* 中心脉冲 */}
                      {[0, 1, 2].map(ring => (
                        <circle key={`p-${ring}`} cx={CX} cy={CY} fill="none" stroke="#6366f1" strokeWidth={1}>
                          <animate attributeName="r" values={`${30 + ring * 8};${70 + ring * 20}`} dur={`${3 + ring * 0.5}s`} begin={`${ring}s`} repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.15;0" dur={`${3 + ring * 0.5}s`} begin={`${ring}s`} repeatCount="indefinite" />
                        </circle>
                      ))}
                      {/* 节点圆点 */}
                      {allNodes.map((n, i) => (
                        <circle key={`dot-${i}`} cx={n.x} cy={n.y}
                          r={hoveredModel === n.flatIdx ? n.dotSize / 2 * 1.8 : n.dotSize / 2}
                          fill={hoveredModel === n.flatIdx ? '#6366f1' : 'rgba(99,102,241,0.6)'}
                          style={{ transition: 'all 0.3s ease' }}
                        />
                      ))}
                    </svg>

                    {/* 中心数字 - 最高层不被遮挡 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[15] pointer-events-none text-center">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[140px] rounded-full bg-white/90 blur-[40px]" />
                      <div className="relative">
                        <div className="text-7xl md:text-8xl font-black tracking-tighter leading-none bg-gradient-to-br from-indigo-500 to-purple-700 bg-clip-text text-transparent">
                          {counts.models}+
                        </div>
                        <div className="text-sm text-zinc-400 font-semibold mt-2 tracking-wider">接入生态模型</div>
                      </div>
                    </div>

                    {/* 100 个固定位置可交互节点 */}
                    {allNodes.map((n) => {
                      const isHovered = hoveredModel === n.flatIdx;
                      return (
                        <div
                          key={`node-${n.flatIdx}`}
                          className="absolute z-10"
                          style={{ left: `${n.leftPct}%`, top: `${n.topPct}%`, transform: 'translate(-50%, -50%)' }}
                          onMouseEnter={() => setHoveredModel(n.flatIdx)}
                          onMouseLeave={() => setHoveredModel(null)}
                        >
                          {/* 透明 hover 触发区 */}
                          <div
                            className="absolute cursor-pointer"
                            style={{
                              width: n.dotSize * 4,
                              height: n.dotSize * 4,
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                            onClick={() => navigate(`/models/${n.model.id}`)}
                          />
                          {/* 名称标签 - 紧贴圆点下方 */}
                          <div
                            className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none transition-opacity duration-200 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                            style={{ top: n.dotSize / 2 + 4, fontFamily: "'Inter', system-ui" }}
                          >
                            <span className="text-[9px] font-bold text-zinc-400">{n.model.name}</span>
                          </div>
                          {/* Hover 悬浮弹窗 - z-[100] 最高层 */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                className="fixed w-[220px] p-4 rounded-xl border border-zinc-200/60 bg-white backdrop-blur-xl"
                                style={{
                                  zIndex: 9999,
                                  boxShadow: '0 12px 40px -6px rgba(0,0,0,0.15)',
                                  pointerEvents: 'auto',
                                }}
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ duration: 0.2 }}
                                onMouseEnter={() => setHoveredModel(n.flatIdx)}
                                onMouseLeave={() => setHoveredModel(null)}
                                onClick={(e) => { e.stopPropagation(); navigate(`/models/${n.model.id}`); }}
                              >
                                <div className="text-[13px] font-black text-zinc-900 mb-1" style={{ fontFamily: "'Inter', system-ui" }}>{n.model.name}</div>
                                <p className="text-[11px] text-zinc-400 mb-3 line-clamp-2 leading-relaxed">{n.model.description}</p>
                                <div className="flex items-center gap-1.5 flex-wrap mb-2">
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-500 font-bold font-mono">{n.model.parameters}</span>
                                  {n.model.source && (
                                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-semibold ${n.model.source === '自研' ? 'bg-emerald-50 text-emerald-500' : 'bg-zinc-50 text-zinc-400'}`}>{n.model.source}</span>
                                  )}
                                  <span className="text-[9px] text-zinc-400">{n.model.framework}</span>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                                  <div className="flex items-center gap-0.5">
                                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                    <span className="text-[10px] text-zinc-500 font-bold">{n.model.rating?.toFixed(1)}</span>
                                  </div>
                                  <span className="text-[10px] text-indigo-500 font-medium inline-flex items-center gap-1">
                                    查看详情 <ArrowRight className="h-2.5 w-2.5" />
                                  </span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                );
              })() : (
                <div className="mx-auto" style={{ width: '110vw', maxWidth: 1600, marginLeft: '-5vw', aspectRatio: '16/10' }}>
                  <div className="w-full h-full bg-zinc-50 rounded-full animate-pulse" />
                </div>
              )}

              {/* 底部入口 */}
              <div className="text-center mt-6">
                <motion.button
                  className="hero-btn-glow px-8 py-3 text-white rounded-full font-semibold text-sm inline-flex items-center gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/models')}
                >
                  探索全部模型
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-white via-blue-50 to-white">
          <div className="container mx-auto text-center max-w-7xl">
            <h2 className="text-3xl font-bold mb-4 text-foreground">开始探索</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              立即探索丰富的AI能力资产，为教育场景赋能
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/models')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
              >
                浏览模型库
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate('/capabilities')}
                className="px-6 py-3 bg-white border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors"
              >
                查看AI能力
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-8">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center text-muted-foreground text-sm">
              <p>© 2026 学科大模型AI能力中心. 保留所有权利.</p>
            </div>
          </div>
        </footer>
      </PageContainer>
    </div>
  );
};

export default Home;
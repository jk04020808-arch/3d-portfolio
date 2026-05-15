import React, { useState, useRef, Suspense } from 'react';
import { motion } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Center, useGLTF, Bounds, Grid, CameraControls } from '@react-three/drei';
import * as THREE from 'three';
import { 
  ArrowRight, 
  Github, 
  Box, 
  Maximize, 
  Wand2, 
  Layers, 
  ChevronRight,
  Upload,
  Focus,
  Palette,
  Download
} from 'lucide-react';

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0, duration: 1 } },
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 selection:bg-zinc-800 selection:text-zinc-100 overflow-x-hidden font-sans">
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ColorSwatchesSection />
        <KeyFeaturesSection />
      </main>
      <Footer />
    </div>
  );
}

// ==========================================
// 🚨 模型配置区 🚨
// 将下面的 URL 替换为你的 3D 模型地址
// 
// 解决方案（针对大于 30MB 的模型）：
// 方案一（推荐）：将模型存放在外部云盘或对象存储（如阿里云 OSS、GitHub Releases），然后把直链 URL 填到这里。
// 方案二：压缩你的模型（使用 Blender 或 gltfpack 等工具）到 30MB 以内，然后在 AI Studio 左侧文件树中点击 "Upload" 传到根目录。
// ==========================================
const MY_MODEL_URL = "/db32714b640af80536f41fc74f243a91.glb";

function CameraAnimator({ activeView, onUserInteract }: { activeView: string, onUserInteract: () => void }) {
  const controlsRef = useRef<any>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  React.useEffect(() => {
    if (!controlsRef.current) return;
    const transitionTo = async () => {
      setIsTransitioning(true);
      try {
        switch (activeView) {
          case 'top':
            await controlsRef.current.setLookAt(0, 5, 0.01, 0, 0, 0, true);
            break;
          case 'front':
            await controlsRef.current.setLookAt(0, 0, 5, 0, 0, 0, true);
            break;
          case 'side':
            await controlsRef.current.setLookAt(5, 0, 0, 0, 0, 0, true);
            break;
          case 'iso':
            await controlsRef.current.setLookAt(3, 2, 5, 0, 0, 0, true);
            break;
        }
      } finally {
        setIsTransitioning(false);
      }
    };
    transitionTo();
  }, [activeView]);

  useFrame((state, delta) => {
    if (activeView === 'iso' && controlsRef.current && !isTransitioning) {
      controlsRef.current.azimuthAngle += delta * 0.5;
    }
  });

  return (
    <CameraControls 
      ref={controlsRef} 
      makeDefault 
      minDistance={2}
      maxDistance={10}
      onStart={() => setIsTransitioning(true)}
      onEnd={() => { 
        if (activeView === 'iso') {
          setIsTransitioning(false);
        }
      }}
    />
  );
}

function HeroSection() {
  const [activeView, setActiveView] = useState<'iso' | 'top' | 'front' | 'side'>('iso');

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl"
      >
        <motion.h1 
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-gradient mb-6 leading-[1.1] font-sans"
        >
          从“手动制图”到“一键出图”<br className="hidden md:block"/>
          的工业效率革命
        </motion.h1>
        
        <motion.p 
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed font-mono"
        >
          Automated 3D to 2D Orthographic Projections.
        </motion.p>

        {/* Motivation Quote */}
        <motion.div 
          variants={FADE_UP_ANIMATION_VARIANTS}
          className="max-w-3xl mx-auto mb-12 relative"
        >
          <div className="absolute -left-6 -top-6 text-zinc-800 font-serif text-6xl">"</div>
          <p className="text-lg md:text-2xl text-zinc-300 font-medium leading-relaxed italic border-l-2 border-blue-500/50 pl-6 py-2 text-left bg-gradient-to-r from-blue-500/5 to-transparent">
            手搓三视图极其繁琐耗时，工业设计与原型开发需要一种更优雅、高效的自动化解法。
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, type: "spring", bounce: 0 }}
        className="w-full mt-24 relative perspective-[1200px]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none" />
        <div className="w-full h-[400px] md:h-[600px] glass-card rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center relative shadow-2xl transition-all duration-300">
           {/* Placeholder for 3D Viewer */}
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent pointer-events-none" />
           
           {/* Floating Analyzer UI to explain the "Orthographic" concept */}
           <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
             {/* Crosshairs */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-blue-500/10 rounded-full" />
             <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-blue-500/20" />
             <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-blue-500/20" />

             {/* Floating Tags */}
             <motion.button 
                onPointerDown={(e) => { e.stopPropagation(); setActiveView('top'); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-[15%] left-[10%] md:left-[20%] glass px-4 py-2 border ${activeView === 'top' ? 'border-blue-400 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-blue-500/30'} hover:bg-blue-500/10 transition-colors rounded-lg flex items-center gap-2 backdrop-blur-md pointer-events-auto cursor-pointer`}
             >
                <div className={`w-2 h-2 rounded-full ${activeView === 'top' ? 'bg-blue-400 animate-pulse' : 'bg-blue-400/50'}`} />
                <span className="font-mono text-xs text-blue-200 pointer-events-none">解析：顶视图 (TOP)</span>
             </motion.button>

             <motion.button 
                onPointerDown={(e) => { e.stopPropagation(); setActiveView('front'); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className={`absolute top-[50%] right-[5%] md:right-[15%] glass px-4 py-2 border ${activeView === 'front' ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'border-emerald-500/30'} hover:bg-emerald-500/10 transition-colors rounded-lg flex items-center gap-2 backdrop-blur-md pointer-events-auto cursor-pointer`}
             >
                <div className={`w-2 h-2 rounded-full ${activeView === 'front' ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400/50'}`} />
                <span className="font-mono text-xs text-emerald-200 pointer-events-none">解析：正视图 (FRONT)</span>
             </motion.button>

             <motion.button 
                onPointerDown={(e) => { e.stopPropagation(); setActiveView('side'); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className={`absolute bottom-[20%] left-[15%] md:left-[25%] glass px-4 py-2 border ${activeView === 'side' ? 'border-purple-400 bg-purple-500/20 shadow-[0_0_15px_rgba(167,139,250,0.5)]' : 'border-purple-500/30'} hover:bg-purple-500/10 transition-colors rounded-lg flex items-center gap-2 backdrop-blur-md pointer-events-auto cursor-pointer`}
             >
                <div className={`w-2 h-2 rounded-full ${activeView === 'side' ? 'bg-purple-400 animate-pulse' : 'bg-purple-400/50'}`} />
                <span className="font-mono text-xs text-purple-200 pointer-events-none">解析：侧视图 (SIDE)</span>
             </motion.button>

             {/* Reset / ISO View Button */}
             <div className="absolute right-6 bottom-6 pointer-events-auto">
               <button 
                 onPointerDown={(e) => { e.stopPropagation(); setActiveView('iso'); }}
                 className={`text-xs font-mono px-3 py-1.5 rounded-md border ${activeView === 'iso' ? 'border-zinc-400 bg-zinc-800' : 'border-white/10 bg-black/40 hover:bg-zinc-800/80'} transition-colors cursor-pointer`}
               >
                 视角复位 (ISO)
               </button>
             </div>
           </div>
           
           <div 
             className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing bg-[#020202]"
             onPointerDown={() => {
                // If user grabs the canvas, revert to ISO to allow auto rotate when they stop
                if (activeView !== 'iso') setActiveView('iso');
             }}
           >
             <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
               <ambientLight intensity={0.25} />
               <directionalLight position={[8, 10, 5]} intensity={8} color="#ffffff" castShadow />

               <Suspense fallback={null}>
                 <Center>
                   <UserCustomModel url={MY_MODEL_URL} />
                 </Center>
                 
                 <Grid 
                   position={[0, -1, 0]} 
                   args={[30, 30]} 
                   cellSize={0.5} 
                   cellThickness={0.5} 
                   cellColor="#1a1a1a" 
                   sectionSize={2.5} 
                   sectionThickness={1} 
                   sectionColor="#333333" 
                   fadeDistance={15} 
                   fadeStrength={1} 
                 />
                 <ContactShadows position={[0, -0.99, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
               </Suspense>
               <CameraAnimator activeView={activeView} onUserInteract={() => setActiveView('iso')} />
             </Canvas>
           </div>
           
           <div className="absolute top-6 left-6 flex justify-between items-end z-20 pointer-events-none">
             <div className="flex gap-4">
               <div className="glass px-4 py-2 rounded-lg border border-white/5 font-mono text-xs text-zinc-400 flex items-center gap-2">
                 <Wand2 className="w-3 h-3 text-blue-400" />
                 自动网格对齐中...
               </div>
             </div>
             <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
               <div className="w-2 h-2 rounded-full bg-zinc-600" />
             </div>
           </div>
        </div>
      </motion.div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "输入模型", subtitle: "Input Model", desc: "接入混元3D大模型与Tripo API。上传2D照片一键生成高质量3D模型，或直接拉取本地现成 3D 模型文件 (.glb 格式)。", icon: <Upload className="w-6 h-6" /> },
    { num: "02", title: "标定正视", subtitle: "Define Front View", desc: "在内置的3D渲染视窗中，自由旋转并预览模型，选定完美的正面视角并点击“确定”，建立精准的空间坐标系。", icon: <Focus className="w-6 h-6" /> },
    { num: "03", title: "选择风格", subtitle: "Select Theme", desc: "提供 10 种独家预设的工程级线稿图纸配色方案，从复古泛黄到极客暗黑，任君挑选。", icon: <Palette className="w-6 h-6" /> },
    { num: "04", title: "一键生成", subtitle: "One-Click Generation", desc: "单点触发，引擎自动完成数学投影、三维轮廓线条提取，智能生成附带长宽高工程标注 (L/W/H) 的三视图。", icon: <Layers className="w-6 h-6" /> },
  ];

  return (
    <section id="how-it-works" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">化繁为简，四步构建完美工程级视图映射。</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card p-8 flex flex-col rounded-3xl relative group hover:-translate-y-2 transition-transform duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 text-5xl font-bold italic text-white/[0.03] pointer-events-none font-sans transition-transform duration-500 group-hover:scale-110">
                {step.num}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors duration-300">
                 {step.icon}
              </div>
              <div className="relative z-10 flex-1">
                <h3 className="text-xl font-bold text-zinc-100 mb-1">{step.title}</h3>
                <h4 className="text-xs font-mono text-zinc-500 mb-4 tracking-widest uppercase">{step.subtitle}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ColorSwatchesSection() {
  const swatches = [
    { name: "经典配色 (Default)", bg: "#ffffff", line: "#000000", annotation: "#3b82f6", eng: "Classic" },
    { name: "工程蓝图 (Blueprint)", bg: "#0a3663", line: "#ffffff", annotation: "#88bbff", eng: "Blueprint" },
    { name: "极客暗黑 (Dark)", bg: "#121212", line: "#00ffcc", annotation: "#ff0055", eng: "Geek Dark" },
    { name: "复古泛黄 (Sepia)", bg: "#f4ece2", line: "#3d2b1f", annotation: "#cc3333", eng: "Vintage Sepia" },
    { name: "墨绿黑板 (Chalkboard)", bg: "#2b3e34", line: "#f4f4f0", annotation: "#fadb5f", eng: "Chalkboard" },
    { name: "赛博霓虹 (Cyberpunk)", bg: "#09090b", line: "#00f0ff", annotation: "#ff003c", eng: "Cyberpunk" },
    { name: "建筑暖灰 (Architecture)", bg: "#e2e0db", line: "#333333", annotation: "#e65c00", eng: "Warm Grey" },
    { name: "医疗洁净 (Medical)", bg: "#f0f7f9", line: "#2c5282", annotation: "#38a169", eng: "Medical Clean" },
    { name: "专利申请 (Patent)", bg: "#fdfdfc", line: "#2b2b2b", annotation: "#e53e3e", eng: "Patent Draft" },
    { name: "军工图纸 (Military)", bg: "#2d3324", line: "#9ea98b", annotation: "#fcd34d", eng: "Military Spec" }
  ];

  return (
    <section id="swatches" className="py-32 bg-[#050505]/50 border-t border-b border-white/5 relative backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Theme Showcase</h2>
            <p className="text-zinc-400 max-w-xl text-lg font-light">10 大严谨配置的图纸配色方案可视化展示柜。</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {swatches.map((color, idx) => (
            <ColorCard key={idx} color={color} delay={idx * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ColorCard({ color, delay }: { color: any, delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-48 rounded-3xl overflow-hidden cursor-crosshair border border-white/10 transition-transform duration-300 hover:-translate-y-2 shadow-2xl"
      style={{ backgroundColor: color.bg }}
    >
      {/* Decorative Lines simulating blueprint */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(${color.line} 1px, transparent 1px), linear-gradient(90deg, ${color.line} 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
      
      {/* Blueprint elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 transition-transform duration-700 ease-out group-hover:scale-125 group-hover:rotate-45" style={{ borderColor: color.line }}>
         <div className="absolute top-1/2 -translate-y-1/2 -left-6 -right-6 border-t-2 border-dashed transition-all duration-700" style={{ borderColor: color.annotation }} />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-300"
           style={{ background: `linear-gradient(to top, ${color.bg}f2, ${color.bg}cc 50%, transparent)` }}>
        <h4 className="font-bold text-sm mb-1 truncate" style={{ color: color.line }}>{color.name}</h4>
        
        <div className={`flex flex-col gap-1.5 overflow-hidden transition-all duration-300 origin-bottom ${isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex justify-between items-center text-[11px] font-mono">
            <span style={{ color: color.line }} className="opacity-70 font-semibold tracking-wider">BG</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border border-black/10" style={{ backgroundColor: color.bg }}/>
              <span style={{ color: color.line }}>{color.bg.toUpperCase()}</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono">
            <span style={{ color: color.line }} className="opacity-70 font-semibold tracking-wider">LINE</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border border-black/10" style={{ backgroundColor: color.line }}/>
              <span style={{ color: color.line }}>{color.line.toUpperCase()}</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono">
            <span style={{ color: color.annotation }} className="opacity-70 font-semibold tracking-wider">ANNO</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border border-black/10" style={{ backgroundColor: color.annotation }}/>
              <span style={{ color: color.annotation }}>{color.annotation.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function KeyFeaturesSection() {
  return (
    <section id="features" className="py-32 max-w-7xl mx-auto px-6 md:px-12 relative">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Key Features</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-lg font-light">四大杀手锏，构筑绝对的技术壁垒。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        {/* Feature 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2 glass-card rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative border hover:border-white/20 transition-all"
        >
          <div className="absolute right-0 bottom-0 w-[80%] h-[80%] bg-blue-500/5 blur-3xl rounded-full" />
          
          {/* Fake UI Visualizer for "AI Generation" */}
          <div className="relative z-10 w-full flex-1 min-h-[240px] mb-8 flex items-center justify-center">
            <div className="flex items-center justify-between w-full max-w-[90%] md:max-w-[75%]">
              
              {/* 2D Input Card */}
              <div className="relative w-28 h-36 md:w-32 md:h-44 rounded-2xl bg-[#111] border border-white/10 flex-shrink-0 group-hover:-translate-y-2 group-hover:-rotate-3 transition-transform duration-500 shadow-2xl p-2 z-10">
                 <div className="w-full h-[70%] bg-zinc-800 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/5">
                   <div className="absolute inset-0 bg-gradient-to-b from-zinc-700 to-zinc-800" />
                   {/* Abstract Image Icon */}
                   <div className="w-10 h-10 rounded-full border-2 border-white/20 opacity-40 relative z-10" />
                   
                   {/* Scanning Bar */}
                   <motion.div 
                     animate={{ y: ['-10%', '200%', '-10%'] }} 
                     transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                     className="absolute left-0 right-0 h-[2px] bg-blue-400 z-20 shadow-[0_0_10px_#60a5fa] opacity-60" 
                   />
                 </div>
                 <div className="mt-3 flex flex-col gap-1.5 px-1">
                   <div className="w-16 h-1.5 bg-zinc-700 rounded-full" />
                   <div className="w-10 h-1.5 bg-zinc-800 rounded-full" />
                 </div>
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-500 whitespace-nowrap">INPUT: 2D IMAGE</div>
              </div>

              {/* Connecting Line & AI Node */}
              <div className="flex-1 flex items-center justify-center relative px-2">
                 <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                   className="w-12 h-12 rounded-full glass border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] absolute group-hover:scale-110 transition-transform duration-500 z-10"
                 >
                   <Wand2 className="w-5 h-5 text-blue-400" />
                 </motion.div>
              </div>

              {/* 3D Output Card */}
              <div className="relative w-28 h-36 md:w-32 md:h-44 rounded-2xl bg-[#0a0f1a] border border-blue-500/30 flex-shrink-0 group-hover:-translate-y-2 group-hover:rotate-3 transition-transform duration-500 shadow-[0_0_30px_rgba(59,130,246,0.1)] flex items-center justify-center z-10">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,transparent_70%)] rounded-2xl" />
                 
                 {/* Fake 3D Object (Isometric layers) */}
                 <div className="relative w-14 h-14 group-hover:rotate-[90deg] transition-all duration-1000 ease-in-out" style={{ transform: 'rotateX(60deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
                    <div className="absolute inset-0 bg-blue-500/10 border border-blue-400/50 rounded shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
                    <div className="absolute inset-0 bg-blue-500/10 border border-blue-400/40 rounded -translate-y-4 translate-x-4" />
                    <div className="absolute inset-0 bg-blue-500/10 border border-blue-400/30 rounded -translate-y-8 translate-x-8" />
                 </div>
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-blue-400 whitespace-nowrap">OUTPUT: 3D MODEL</div>
              </div>

            </div>
          </div>

          <div className="relative z-10 max-w-md">
            <h3 className="text-2xl font-bold text-zinc-100 mb-3 flex flex-wrap items-center gap-3">
              AI 驱动模型生成
              <span className="text-[10px] md:text-xs font-mono font-normal bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">Hunyuan3D & Tripo</span>
            </h3>
            <p className="text-zinc-400 leading-relaxed font-light text-sm md:text-base">
              原生集成业内顶尖的混元3D与Tripo模型生成链路，打破传统建模必须精通专业软件的门槛，从 2D 照片到完整工程图纸，一步到位。
            </p>
          </div>
        </motion.div>

        {/* Feature 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.1 }}
          className="md:col-span-1 md:row-span-1 glass-card rounded-3xl p-8 flex flex-col group relative overflow-hidden transition-all hover:border-emerald-500/30"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full" />
          <div className="relative z-10 mb-auto">
            <Layers className="w-8 h-8 text-emerald-400 mb-6" />
            <h3 className="text-xl font-bold text-zinc-100 mb-2">动态三维计算驱动</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              基于真正的 3D 相机正交投影 (OrthographicCamera) 与矩阵变换算法提取线条，尺寸严格无误。
            </p>
          </div>
        </motion.div>

        {/* Feature 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.2 }}
          className="md:col-span-1 md:row-span-2 glass-card rounded-3xl p-8 flex flex-col group relative overflow-hidden transition-all hover:border-purple-500/30"
        >
          <div className="absolute left-0 bottom-0 w-full h-[50%] bg-purple-500/5 blur-2xl rounded-t-full" />
          <div className="relative z-10">
            <Focus className="w-8 h-8 text-purple-400 mb-6" />
            <h3 className="text-xl font-bold text-zinc-100 mb-4">智能排版与尺寸标注</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light mb-8">
              自动提取 3D BoundingBox，智能避让与对齐，生成所见即所得的工程级 L/W/H 参考线与尺寸标注。
            </p>
            
            {/* Visualizer */}
            <div className="w-full aspect-square border border-purple-500/20 rounded-xl relative overflow-hidden flex items-center justify-center bg-[#050505]">
                <div className="w-16 h-16 border-2 border-purple-500/50" />
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 border-t border-dashed border-zinc-500" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#050505] px-1 text-[10px] font-mono text-purple-400">128.5</span>
            </div>
          </div>
        </motion.div>

        {/* Feature 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.3 }}
          className="md:col-span-2 md:row-span-1 glass-card rounded-3xl p-8 flex sm:flex-row flex-col sm:items-center justify-between group relative overflow-hidden transition-all hover:border-amber-500/30"
        >
          <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 max-w-sm">
            <Download className="w-8 h-8 text-amber-400 mb-6" />
            <h3 className="text-xl font-bold text-zinc-100 mb-2">企业级导出能力</h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              一键将带标注的成果高清下载保存，无缝对接后续硬件开发与专利申报文档制造流程。
            </p>
          </div>
          <div className="relative z-10 mt-6 sm:mt-0 glass p-4 rounded-2xl flex items-center gap-3">
             <div className="font-mono text-xs text-zinc-300">format: <span className="text-amber-400">.PNG (16K+)</span></div>
             <div className="w-px h-6 bg-white/20" />
             <div className="font-mono text-xs bg-white/10 px-2 py-1 rounded">DPI: 300+</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-24 bg-zinc-950 mt-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">告别繁杂操作，释放设计师创造力。</h2>
          <a href="https://trihunyuan-studio.vercel.app" target="_blank" rel="noreferrer" className="inline-block bg-zinc-100 hover:bg-white text-zinc-900 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
            立即接入体验
          </a>
        </motion.div>

      </div>
    </footer>
  );
}

function UserCustomModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.8} />;
}

function HeroModel() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <Center>
        <mesh castShadow>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial 
            color="#222222" 
            roughness={0.2} 
            metalness={0.8}
            wireframe={true}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial 
            color="#050505" 
            roughness={0.8} 
            metalness={0.2}
          />
        </mesh>
      </Center>
    </group>
  );
}

// Reusable SVG Icon for Quote
function Quote(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}


import { useState, useEffect, useRef } from 'react';
import Swiper from 'swiper';
import {
  Navigation as SwiperNavigation,
  Pagination as SwiperPagination,
  Autoplay as SwiperAutoplay,
  Scrollbar as SwiperScrollbar,
  EffectFade,
  EffectCoverflow,
  EffectCards,
  EffectCube,
  EffectFlip,
  EffectCreative
} from 'swiper/modules';
import {
  Sliders, Copy, Check, Layers, Settings, FileCode2,
  BookOpen, Sparkles, Smartphone, Tablet, Monitor,
  Compass, ArrowRight, Star, ExternalLink,
  Zap, RefreshCw, Plus, Minus,
  Search, Code2, Terminal, ChevronDown, Palette
} from 'lucide-react';
import { parseSwiperClasses } from '../plugin/swiper-init';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-creative';

Swiper['use']([
  SwiperNavigation,
  SwiperPagination,
  SwiperAutoplay,
  SwiperScrollbar,
  EffectFade,
  EffectCoverflow,
  EffectCards,
  EffectCube,
  EffectFlip,
  EffectCreative
]);

// ─── Toggle Component ─────────────────────────────────────────────────────────
function Toggle({ checked, onChange, size = 'md' }: { checked: boolean; onChange: () => void; size?: 'sm' | 'md' }) {
  const track = size === 'sm'
    ? `w-8 h-4 rounded-full relative transition-all duration-300 cursor-pointer ${checked ? 'bg-blue-600 shadow-sm shadow-blue-500/50' : 'bg-slate-700/80'}`
    : `w-11 h-6 rounded-full relative transition-all duration-300 cursor-pointer ${checked ? 'bg-blue-600 shadow-md shadow-blue-500/40' : 'bg-slate-800 border border-slate-700'}`;
  const thumb = size === 'sm'
    ? `w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow ${checked ? 'left-4' : 'left-0.5'}`
    : `w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 shadow ${checked ? 'left-6' : 'left-1'}`;
  return (
    <button onClick={onChange} className={track} aria-checked={checked} role="switch" type="button">
      <div className={thumb} />
    </button>
  );
}

// ─── Section Accordion Header ──────────────────────────────────────────────────
function SettingSection({
  title,
  icon: Icon,
  isOpen,
  onToggle,
  children
}: {
  title: string;
  icon: any;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={`border rounded-xl overflow-hidden bg-slate-900/40 transition-all duration-300 ${
      isOpen ? 'border-blue-500/40 shadow-lg shadow-blue-500/5' : 'border-slate-800/80 hover:border-slate-700/80'
    }`}>
      <button
        onClick={onToggle}
        type="button"
        className={`w-full flex items-center justify-between px-4 py-3 transition-colors duration-200 text-left ${
          isOpen ? 'bg-slate-800/70 text-white' : 'bg-slate-900/80 hover:bg-slate-800/60 text-slate-300'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Icon className={`w-4 h-4 transition-colors duration-200 ${isOpen ? 'text-blue-400' : 'text-slate-400'}`} />
          <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} />
      </button>

      {/* Smooth Grid Accordion Animation Container */}
      <div className={`accordion-wrapper ${isOpen ? 'open' : ''}`}>
        <div className="accordion-content">
          <div className="p-4 flex flex-col gap-4 border-t border-slate-800/60">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Setting Row ──────────────────────────────────────────────────────────────
function SettingRow({ label, sublabel, right }: { label: string; sublabel?: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-0.5">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-200 leading-tight">{label}</p>
        {sublabel && <p className="text-[11px] text-slate-500 mt-0.5">{sublabel}</p>}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

// ─── Range Slider ─────────────────────────────────────────────────────────────
function RangeSlider({ min, max, step, value, onChange, label, unit }: {
  min: number; max: number; step: number; value: number;
  onChange: (v: number) => void; label: string; unit?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 py-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-300">{label}</span>
        <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
          {value}{unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-800 accent-blue-500"
      />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'templates' | 'docs'>('editor');
  const [selectedTemplate, setSelectedTemplate] = useState<'hero' | 'product' | 'testimonial' | 'coverflow' | 'cube'>('hero');
  const [codeTab, setCodeTab] = useState<'html' | 'react' | 'js' | 'tailwind'>('html');

  // Viewport mode for preview
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [slideStyle, setSlideStyle] = useState<'feature' | 'image' | 'minimal'>('feature');
  const [slideCount, setSlideCount] = useState(4);

  // Configurator state
  const [loop, setLoop] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [autoplayDelay, setAutoplayDelay] = useState(3000);
  const [autoplayPause, setAutoplayPause] = useState(true);
  const [autoplayStopLast, setAutoplayStopLast] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [effect, setEffect] = useState('slide');
  const [centered, setCentered] = useState(false);
  const [themeColor, setThemeColor] = useState('primary');
  const [spvMobile, setSpvMobile] = useState(1);
  const [spvTablet, setSpvTablet] = useState<number | 'auto'>(2);
  const [spvDesktop, setSpvDesktop] = useState<number | 'auto'>(3);
  const [spaceBetween, setSpaceBetween] = useState('4');
  const [navigation, setNavigation] = useState(true);
  const [pagination, setPagination] = useState(true);
  const [paginationType, setPaginationType] = useState('bullets');
  const [paginationDynamic, setPaginationDynamic] = useState(true);
  const [scrollbar, setScrollbar] = useState(false);

  // Accordion open state (single section open at a time - opening one closes all others)
  const [openSection, setOpenSection] = useState<string | null>('theme');

  const toggleSection = (key: string) => {
    setOpenSection(prev => (prev === key ? null : key));
  };

  // Toast / Copy states
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [docsSearch, setDocsSearch] = useState('');

  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<any>(null);

  // Presets Swiper Ref
  const presetSwiperRef = useRef<HTMLDivElement>(null);
  const presetSwiperInstanceRef = useRef<any>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const getSwiperClasses = () => {
    const c = ['swiper', `swiper-theme-${themeColor}`];
    if (loop && !['cards', 'coverflow'].includes(effect)) c.push('swiper-loop');
    if (speed !== 300) c.push(`swiper-speed-${speed}`);
    if (effect !== 'slide') c.push(`swiper-effect-${effect}`);
    
    // Space-x and per-view classes
    if (effect === 'slide') {
      if (spaceBetween !== '0') c.push(`swiper-space-x-${spaceBetween}`);
      if (centered) c.push('swiper-centered');

      if (viewportMode === 'mobile') {
        c.push(`swiper-slides-per-view-${spvMobile}`);
      } else if (viewportMode === 'tablet') {
        c.push(`swiper-slides-per-view-${spvTablet}`);
      } else {
        if (spvMobile !== 1) c.push(`swiper-slides-per-view-${spvMobile}`);
        if (spvTablet !== 1) c.push(`md:swiper-slides-per-view-${spvTablet}`);
        if (spvDesktop !== 1) c.push(`lg:swiper-slides-per-view-${spvDesktop}`);
      }
    } else if (effect === 'coverflow') {
      c.push('swiper-centered');
    }

    if (autoplay) {
      c.push('swiper-autoplay');
      if (autoplayDelay !== 3000) c.push(`swiper-autoplay-delay-${autoplayDelay}`);
      if (autoplayPause) c.push('swiper-autoplay-pause');
      if (autoplayStopLast) c.push('swiper-autoplay-stop-last');
    }
    return c.join(' ');
  };

  const getSwiperClassesForExport = () => {
    const c = ['swiper', `swiper-theme-${themeColor}`];
    const is3DNoLoop = ['cards', 'coverflow'].includes(effect);
    if (loop && !is3DNoLoop) c.push('swiper-loop');
    if (speed !== 300) c.push(`swiper-speed-${speed}`);
    if (effect !== 'slide') c.push(`swiper-effect-${effect}`);
    
    // Space-x and per-view classes
    if (effect === 'slide') {
      if (spaceBetween !== '0') c.push(`swiper-space-x-${spaceBetween}`);
      if (centered) c.push('swiper-centered');

      c.push(`swiper-slides-per-view-${spvMobile}`);
      if (spvTablet !== spvMobile) {
        c.push(`md:swiper-slides-per-view-${spvTablet}`);
      }
      if (spvDesktop !== spvTablet) {
        c.push(`lg:swiper-slides-per-view-${spvDesktop}`);
      }
    } else if (effect === 'coverflow') {
      c.push('swiper-centered');
    }

    if (autoplay && !is3DNoLoop) {
      c.push('swiper-autoplay');
      if (autoplayDelay !== 3000) c.push(`swiper-autoplay-delay-${autoplayDelay}`);
      if (autoplayPause) c.push('swiper-autoplay-pause');
      if (autoplayStopLast && !loop) c.push('swiper-autoplay-stop-last');
    }
    return c.join(' ');
  };

  const getPaginationClasses = () => {
    const c = ['swiper-pagination'];
    if (paginationType === 'progressbar') c.push('swiper-pagination-progressbar');
    if (paginationType === 'fraction') c.push('swiper-pagination-fraction');
    if (paginationDynamic && paginationType === 'bullets') c.push('swiper-pagination-dynamic');
    return c.join(' ');
  };

  // Swiper Init Effect for Configurator Editor
  useEffect(() => {
    if (activeTab !== 'editor') return;
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }
    if (sliderRef.current) {
      const t = setTimeout(() => {
        const options = parseSwiperClasses(sliderRef.current!);
        options.modules = [
          SwiperNavigation,
          SwiperPagination,
          SwiperAutoplay,
          SwiperScrollbar,
          EffectFade,
          EffectCoverflow,
          EffectCards,
          EffectCube,
          EffectFlip,
          EffectCreative
        ];
        try { swiperInstanceRef.current = new Swiper(sliderRef.current!, options); }
        catch (err) { console.error('Swiper init failed', err); }
      }, 80);
      return () => clearTimeout(t);
    }
  }, [
    activeTab, viewportMode, slideStyle, slideCount,
    loop, autoplay, autoplayDelay, autoplayPause, autoplayStopLast,
    speed, effect, centered, themeColor, spvMobile, spvTablet, spvDesktop,
    spaceBetween, navigation, pagination, paginationType, paginationDynamic, scrollbar
  ]);

  // Swiper Init Effect for Presets tab
  useEffect(() => {
    if (activeTab !== 'templates') return;
    if (presetSwiperInstanceRef.current) {
      presetSwiperInstanceRef.current.destroy(true, true);
      presetSwiperInstanceRef.current = null;
    }
    if (presetSwiperRef.current) {
      const t = setTimeout(() => {
        const options = parseSwiperClasses(presetSwiperRef.current!, [
          SwiperNavigation,
          SwiperPagination,
          SwiperAutoplay,
          SwiperScrollbar,
          EffectFade,
          EffectCoverflow,
          EffectCards,
          EffectCube,
          EffectFlip,
          EffectCreative
        ]);
        try { presetSwiperInstanceRef.current = new Swiper(presetSwiperRef.current!, options); }
        catch (err) { console.error('Preset Swiper init failed', err); }
      }, 100);
      return () => clearTimeout(t);
    }
  }, [activeTab, selectedTemplate]);

  const resetToDefaults = () => {
    setLoop(true);
    setAutoplay(true);
    setAutoplayDelay(3000);
    setAutoplayPause(true);
    setAutoplayStopLast(false);
    setSpeed(500);
    setEffect('slide');
    setCentered(false);
    setThemeColor('primary');
    setSpvMobile(1);
    setSpvTablet(2);
    setSpvDesktop(3);
    setSpaceBetween('4');
    setNavigation(true);
    setPagination(true);
    setPaginationType('bullets');
    setPaginationDynamic(true);
    setScrollbar(false);
    setSlideStyle('feature');
    setSlideCount(4);
    showToast('Reset configuration to default settings.');
  };

  const copyToClipboard = (text: string, label = 'Copied to clipboard!') => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    showToast(label);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Code Generation Helpers
  const generateHTMLMarkup = () => {
    const sc = getSwiperClassesForExport();
    const pc = getPaginationClasses();

    const slideElements = Array.from({ length: slideCount })
      .map((_, i) => {
        const slideIndex = i + 1;
        if (slideStyle === 'image') {
          return `    <div class="swiper-slide relative bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 border border-violet-500/40 rounded-2xl h-64 p-8 flex flex-col justify-end shadow-2xl overflow-hidden">
      <span class="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Visual Banner</span>
      <h3 class="text-2xl font-black text-white mb-2 leading-tight">Dynamic Slider Slide #${slideIndex}</h3>
      <p class="text-xs text-slate-300">Responsive Tailwind CSS Swiper slider powered by zero JavaScript code.</p>
    </div>`;
        }

        if (slideStyle === 'minimal') {
          return `    <div class="swiper-slide rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between min-h-[220px] shadow-xl">
      <div class="flex justify-between items-center">
        <span class="text-xs font-bold text-blue-400">Card #${slideIndex}</span>
      </div>
      <div>
        <h4 class="font-bold text-white text-base mb-1">Minimal Slide Content #${slideIndex}</h4>
        <p class="text-slate-400 text-xs">Clean lightweight card design optimized for performance.</p>
      </div>
      <div class="text-xs font-semibold text-blue-400">Learn more &rarr;</div>
    </div>`;
        }

        return `    <div class="swiper-slide rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[220px] shadow-xl">
      <h4 class="font-bold text-white text-base mb-1">Feature Slide #${slideIndex}</h4>
      <p class="text-slate-400 text-xs">Declarative zero-JS slider responsive configuration.</p>
    </div>`;
      })
      .join('\n');

    return `<div class="${sc} w-full rounded-2xl overflow-hidden py-8 px-12">
  <div class="swiper-wrapper">
${slideElements}
  </div>
${pagination ? `  <div class="${pc}"></div>\n` : ''}${navigation ? `  <div class="swiper-button-prev"></div>\n  <div class="swiper-button-next"></div>\n` : ''}${scrollbar ? `  <div class="swiper-scrollbar"></div>\n` : ''}</div>`;
  };

  const generateReactMarkup = () => {
    const sc = getSwiperClassesForExport();
    const pc = getPaginationClasses();

    const slideJSX = Array.from({ length: slideCount })
      .map((_, i) => {
        const slideIndex = i + 1;
        if (slideStyle === 'image') {
          return `        <div className="swiper-slide relative bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 border border-violet-500/40 rounded-2xl h-64 p-8 flex flex-col justify-end shadow-2xl overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Visual Banner</span>
          <h3 className="text-2xl font-black text-white mb-2 leading-tight">Dynamic Slider Slide #${slideIndex}</h3>
          <p className="text-xs text-slate-300">Responsive Tailwind CSS Swiper slider powered by zero JavaScript code.</p>
        </div>`;
        }

        if (slideStyle === 'minimal') {
          return `        <div className="swiper-slide rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between min-h-[220px] shadow-xl">
          <span className="text-xs font-bold text-blue-400">Card #${slideIndex}</span>
          <div>
            <h4 className="font-bold text-white text-base mb-1">Minimal Slide Content #${slideIndex}</h4>
            <p className="text-slate-400 text-xs">Clean lightweight card design optimized for performance.</p>
          </div>
          <div className="text-xs font-semibold text-blue-400">Learn more &rarr;</div>
        </div>`;
        }

        return `        <div className="swiper-slide rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[220px] shadow-xl">
          <h4 className="font-bold text-white text-base mb-1">Feature Slide #${slideIndex}</h4>
          <p className="text-slate-400 text-xs">Declarative zero-JS slider responsive configuration.</p>
        </div>`;
      })
      .join('\n');

    return `import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { initTailwindSwipers } from './plugin/swiper-init';
import 'swiper/css';

export function CustomSlider() {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      initTailwindSwipers(Swiper);
    }
  }, []);

  return (
    <div ref={sliderRef} className="${sc} w-full rounded-2xl overflow-hidden py-8 px-12">
      <div className="swiper-wrapper">
${slideJSX}
      </div>
${pagination ? `      <div className="${pc}" />\n` : ''}${navigation ? `      <div className="swiper-button-prev" />\n      <div className="swiper-button-next" />\n` : ''}${scrollbar ? `      <div className="swiper-scrollbar" />\n` : ''}    </div>
  );
}`;
  };

  const generateJSInitCode = () => {
    return `import Swiper from 'swiper';
import {
  Navigation, Pagination, Autoplay, Scrollbar,
  EffectFade, EffectCoverflow, EffectCards,
  EffectCube, EffectFlip, EffectCreative
} from 'swiper/modules';
import { initTailwindSwipers } from './plugin/swiper-init';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-creative';

// Register Swiper modules
Swiper.use([
  Navigation, Pagination, Autoplay, Scrollbar,
  EffectFade, EffectCoverflow, EffectCards,
  EffectCube, EffectFlip, EffectCreative
]);

// Auto-detect and parse classes for all elements with .swiper class
document.addEventListener('DOMContentLoaded', () => {
  initTailwindSwipers(Swiper);
});`;
  };

  const generateTailwindConfig = () => {
    return `// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('./plugin/tailwind-swiper-plugin.cjs'),
  ],
};`;
  };

  const getTemplateCode = () => {
    if (selectedTemplate === 'hero') return `<div class="swiper swiper-loop swiper-autoplay swiper-speed-800 swiper-effect-fade swiper-theme-violet w-full h-[450px] rounded-3xl overflow-hidden relative shadow-2xl">
  <div class="swiper-wrapper">
    <div class="swiper-slide relative w-full h-full flex items-center bg-gradient-to-tr from-slate-950 via-slate-900 to-violet-950 p-10 md:p-16">
      <div class="max-w-xl relative z-10">
        <span class="px-3 py-1 text-xs font-bold tracking-wider text-violet-400 uppercase bg-violet-400/10 border border-violet-400/20 rounded-full mb-4 inline-block">Design Revolution</span>
        <h2 class="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">The Next Dimension Of Web Sliders</h2>
        <p class="text-sm text-slate-300 mb-6 leading-relaxed">Build rich slider experiences purely using Tailwind utility classes. Zero JS boilerplate.</p>
        <button class="px-6 py-3 font-bold text-xs uppercase tracking-wider text-white bg-violet-600 rounded-xl hover:bg-violet-500 transition shadow-lg shadow-violet-600/30">Explore Now</button>
      </div>
    </div>
    <div class="swiper-slide relative w-full h-full flex items-center bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950 p-10 md:p-16">
      <div class="max-w-xl relative z-10">
        <span class="px-3 py-1 text-xs font-bold tracking-wider text-emerald-400 uppercase bg-emerald-400/10 border border-emerald-400/20 rounded-full mb-4 inline-block">Unrivaled Power</span>
        <h2 class="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">Tailwind CSS Native Integration</h2>
        <p class="text-sm text-slate-300 mb-6 leading-relaxed">Leverage Tailwind responsive breakpoints directly in HTML class attributes.</p>
        <button class="px-6 py-3 font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/30">View Docs</button>
      </div>
    </div>
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>`;

    if (selectedTemplate === 'product') return `<div class="swiper swiper-loop swiper-space-x-4 swiper-slides-per-view-1 md:swiper-slides-per-view-2 lg:swiper-slides-per-view-3 swiper-theme-emerald w-full py-8">
  <div class="swiper-wrapper">
    <div class="swiper-slide bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
      <div class="h-44 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-xl flex items-center justify-center border border-emerald-500/10">
        <span class="text-6xl">📱</span>
      </div>
      <div class="flex items-center justify-between"><h4 class="font-bold text-white text-base">Quantum Phone X</h4><span class="text-emerald-400 font-extrabold text-sm">$999</span></div>
      <p class="text-xs text-slate-400">Next-gen OLED display with titanium body.</p>
      <button class="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 transition rounded-xl text-xs font-bold text-white shadow-md shadow-emerald-600/20">Add to Cart</button>
    </div>
    <div class="swiper-slide bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
      <div class="h-44 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-xl flex items-center justify-center border border-violet-500/10">
        <span class="text-6xl">⌚</span>
      </div>
      <div class="flex items-center justify-between"><h4 class="font-bold text-white text-base">Aura Watch Studio</h4><span class="text-emerald-400 font-extrabold text-sm">$349</span></div>
      <p class="text-xs text-slate-400">Advanced fitness tracking with sapphire glass.</p>
      <button class="w-full py-2.5 bg-slate-800 hover:bg-emerald-600 transition rounded-xl text-xs font-bold text-slate-200 hover:text-white">Add to Cart</button>
    </div>
    <div class="swiper-slide bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
      <div class="h-44 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-xl flex items-center justify-center border border-blue-500/10">
        <span class="text-6xl">🎧</span>
      </div>
      <div class="flex items-center justify-between"><h4 class="font-bold text-white text-base">Sonic Buds ANC</h4><span class="text-emerald-400 font-extrabold text-sm">$199</span></div>
      <p class="text-xs text-slate-400">Lossless spatial audio with active noise cancellation.</p>
      <button class="w-full py-2.5 bg-slate-800 hover:bg-emerald-600 transition rounded-xl text-xs font-bold text-slate-200 hover:text-white">Add to Cart</button>
    </div>
  </div>
  <div class="swiper-pagination"></div>
</div>`;

    if (selectedTemplate === 'testimonial') return `<div class="swiper swiper-loop swiper-space-x-6 swiper-slides-per-view-1 md:swiper-slides-per-view-2 swiper-theme-rose w-full py-8">
  <div class="swiper-wrapper">
    <div class="swiper-slide bg-slate-900/70 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between min-h-[240px] shadow-xl">
      <div class="flex gap-1 mb-4">{[1,2,3,4,5].map(() => <Star className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
      <p class="text-slate-300 italic text-sm leading-relaxed">"Implementing sliders used to require lines of boilerplate JS. With this Tailwind plugin, I just declare responsive classes directly in HTML. This is revolutionary!"</p>
      <div class="flex items-center gap-3 mt-6">
        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-xs font-bold text-white shadow-md">SJ</div>
        <div><p class="font-bold text-sm text-white">Sarah Jenkins</p><p class="text-xs text-slate-500 font-medium">Frontend Architect at Vercel</p></div>
      </div>
    </div>
    <div class="swiper-slide bg-slate-900/70 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between min-h-[240px] shadow-xl">
      <div class="flex gap-1 mb-4">{[1,2,3,4,5].map(() => <Star className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
      <p class="text-slate-300 italic text-sm leading-relaxed">"The configuration is incredibly intuitive. I love how natively it matches standard Tailwind responsive design. Transitions feel ultra silky."</p>
      <div class="flex items-center gap-3 mt-6">
        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-md">MK</div>
        <div><p class="font-bold text-sm text-white">Marcus Kaelen</p><p class="text-xs text-slate-500 font-medium">Lead Designer at Figma</p></div>
      </div>
    </div>
  </div>
  <div class="swiper-pagination"></div>
</div>`;

    if (selectedTemplate === 'coverflow') return `<div class="swiper swiper-loop swiper-effect-coverflow swiper-centered swiper-slides-per-view-auto swiper-theme-primary w-full py-10">
  <div class="swiper-wrapper">
    <div class="swiper-slide w-[280px] h-[360px] rounded-3xl bg-gradient-to-b from-indigo-900/80 to-slate-950 border border-indigo-500/30 flex flex-col justify-end p-6 shadow-2xl">
      <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Gallery 01</span>
      <h4 class="font-black text-xl text-white mb-2">Deep Indigo</h4>
      <p class="text-xs text-slate-400 leading-relaxed">Visualizing futuristic glassmorphism nodes inside dark themes.</p>
    </div>
    <div class="swiper-slide w-[280px] h-[360px] rounded-3xl bg-gradient-to-b from-rose-900/80 to-slate-950 border border-rose-500/30 flex flex-col justify-end p-6 shadow-2xl">
      <span class="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">Gallery 02</span>
      <h4 class="font-black text-xl text-white mb-2">Neon Cyber</h4>
      <p class="text-xs text-slate-400 leading-relaxed">High-contrast neon glow effects with sleek borders.</p>
    </div>
    <div class="swiper-slide w-[280px] h-[360px] rounded-3xl bg-gradient-to-b from-emerald-900/80 to-slate-950 border border-emerald-500/30 flex flex-col justify-end p-6 shadow-2xl">
      <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Gallery 03</span>
      <h4 class="font-black text-xl text-white mb-2">Jade Horizon</h4>
      <p class="text-xs text-slate-400 leading-relaxed">Organic forest tones combined with modern card physics.</p>
    </div>
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>`;

    if (selectedTemplate === 'cube') return `<div class="swiper swiper-loop swiper-effect-cube swiper-theme-amber w-full max-w-md h-[380px] mx-auto py-4">
  <div class="swiper-wrapper">
    <div class="swiper-slide rounded-3xl bg-gradient-to-br from-amber-600 to-orange-900 p-8 flex flex-col justify-between shadow-2xl border border-amber-400/30">
      <span class="text-xs font-bold text-amber-200 uppercase tracking-widest">Face 01</span>
      <div>
        <h3 class="text-2xl font-black text-white mb-2">3D Cube Rotation</h3>
        <p class="text-xs text-amber-100/80 leading-relaxed">Rotates slides on 3D cube faces with realistic floor shadows.</p>
      </div>
      <button class="w-max px-4 py-2 bg-amber-500 text-xs font-bold text-white rounded-xl shadow-lg">Explore Cube</button>
    </div>
    <div class="swiper-slide rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-900 p-8 flex flex-col justify-between shadow-2xl border border-blue-400/30">
      <span class="text-xs font-bold text-blue-200 uppercase tracking-widest">Face 02</span>
      <div>
        <h3 class="text-2xl font-black text-white mb-2">Seamless Physics</h3>
        <p class="text-xs text-blue-100/80 leading-relaxed">Powered by Swiper 3D perspective transformation engine.</p>
      </div>
      <button class="w-max px-4 py-2 bg-blue-500 text-xs font-bold text-white rounded-xl shadow-lg">Learn More</button>
    </div>
    <div class="swiper-slide rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-900 p-8 flex flex-col justify-between shadow-2xl border border-emerald-400/30">
      <span class="text-xs font-bold text-emerald-200 uppercase tracking-widest">Face 03</span>
      <div>
        <h3 class="text-2xl font-black text-white mb-2">Declarative Class</h3>
        <p class="text-xs text-emerald-100/80 leading-relaxed">Just add <code class="bg-black/30 px-1.5 py-0.5 rounded">swiper-effect-cube</code> to your HTML.</p>
      </div>
      <button class="w-max px-4 py-2 bg-emerald-500 text-xs font-bold text-white rounded-xl shadow-lg">Get Started</button>
    </div>
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>`;
    return '';
  };

  const loadPresetToEditor = (presetKey: typeof selectedTemplate) => {
    if (presetKey === 'hero') {
      setLoop(true); setAutoplay(true); setAutoplayDelay(4000); setEffect('fade');
      setThemeColor('violet'); setSpvMobile(1); setSpvTablet(1); setSpvDesktop(1); setSlideStyle('image');
    } else if (presetKey === 'product') {
      setLoop(true); setAutoplay(false); setEffect('slide');
      setThemeColor('emerald'); setSpvMobile(1); setSpvTablet(2); setSpvDesktop(3); setSpaceBetween('4'); setSlideStyle('feature');
    } else if (presetKey === 'testimonial') {
      setLoop(true); setAutoplay(true); setAutoplayDelay(5000); setEffect('slide');
      setThemeColor('rose'); setSpvMobile(1); setSpvTablet(2); setSpvDesktop(2); setSpaceBetween('6'); setSlideStyle('minimal');
    } else if (presetKey === 'coverflow') {
      setLoop(true); setAutoplay(false); setEffect('coverflow'); setCentered(true);
      setThemeColor('primary'); setSpvMobile(1); setSpvTablet('auto'); setSpvDesktop('auto'); setSlideStyle('image');
    } else if (presetKey === 'cube') {
      setLoop(true); setAutoplay(true); setAutoplayDelay(3000); setEffect('cube');
      setThemeColor('amber'); setSpvMobile(1); setSpvTablet(1); setSpvDesktop(1); setSpaceBetween('0'); setSlideStyle('image');
    }
    setActiveTab('editor');
    showToast(`Loaded ${presetKey.toUpperCase()} preset into Configurator!`);
  };

  const themeColorMap: Record<string, { bg: string; ring: string }> = {
    primary: { bg: 'bg-blue-500', ring: 'ring-blue-400' },
    emerald: { bg: 'bg-emerald-500', ring: 'ring-emerald-400' },
    rose: { bg: 'bg-rose-500', ring: 'ring-rose-400' },
    violet: { bg: 'bg-violet-500', ring: 'ring-violet-400' },
    amber: { bg: 'bg-amber-500', ring: 'ring-amber-400' },
    indigo: { bg: 'bg-indigo-500', ring: 'ring-indigo-400' },
    slate: { bg: 'bg-slate-400', ring: 'ring-slate-300' },
  };

  const tabs = [
    { id: 'editor', label: 'Configurator', icon: Sliders },
    { id: 'templates', label: 'Presets', icon: Sparkles },
    { id: 'docs', label: 'Docs', icon: BookOpen },
  ] as const;

  const templateTabs = [
    { id: 'hero', label: 'Hero Carousel', badge: 'Fade' },
    { id: 'product', label: 'Product Slider', badge: 'Grid' },
    { id: 'testimonial', label: 'Testimonials', badge: 'Cards' },
    { id: 'coverflow', label: '3D Gallery', badge: '3D' },
    { id: 'cube', label: '3D Cube Showcase', badge: 'Cube' },
  ] as const;

  const classRefList = [
    { cls: 'swiper-loop', opt: 'loop: true', desc: 'Enables continuous infinite loop sliding' },
    { cls: 'swiper-autoplay', opt: 'autoplay: true', desc: 'Enables automatic slide cycling (3000ms default)' },
    { cls: 'swiper-autoplay-delay-[ms]', opt: 'autoplay.delay: [ms]', desc: 'Custom autoplay interval in milliseconds (e.g. 5000)' },
    { cls: 'swiper-autoplay-pause', opt: 'pauseOnMouseEnter: true', desc: 'Pauses autoplay cycling when mouse hovers over slider' },
    { cls: 'swiper-autoplay-stop-last', opt: 'stopOnLastSlide: true', desc: 'Stops autoplay upon reaching the final slide' },
    { cls: 'swiper-speed-[ms]', opt: 'speed: [ms]', desc: 'Transition speed duration in milliseconds (default: 300)' },
    { cls: 'swiper-effect-[type]', opt: 'effect: "slide"|"fade"|"coverflow"|"cards"|"cube"|"flip"|"creative"', desc: 'Sets visual transition effect' },
    { cls: 'swiper-effect-cube', opt: 'effect: "cube"', desc: 'Rotates slides on faces of a 3D box cube' },
    { cls: 'swiper-effect-flip', opt: 'effect: "flip"', desc: 'Flips slide 180 degrees in 3D perspective space' },
    { cls: 'swiper-effect-creative-stack', opt: 'effect: "creative"', desc: 'Stacked depth slide transition with scale & translate' },
    { cls: 'swiper-effect-creative-zoom', opt: 'effect: "creative"', desc: 'Zoom-out parallax transition pushing slide into Z-space' },
    { cls: 'swiper-effect-creative-3d', opt: 'effect: "creative"', desc: 'Full 3D rotation along X and Z axes for hero banners' },
    { cls: 'swiper-slides-per-view-[n]', opt: 'slidesPerView: n | "auto"', desc: 'Number of slides visible simultaneously' },
    { cls: 'md:swiper-slides-per-view-2', opt: 'breakpoints: { 768: { slidesPerView: 2 } }', desc: 'Responsive breakpoint override (sm, md, lg, xl)' },
    { cls: 'swiper-space-x-[n]', opt: 'spaceBetween: px', desc: 'Spacing between slides matching Tailwind spacing scale' },
    { cls: 'swiper-centered', opt: 'centeredSlides: true', desc: 'Centers active slide in container' },
    { cls: 'swiper-theme-[color]', opt: '--swiper-theme-color', desc: 'Sets accent theme color (primary, emerald, rose, violet, etc.)' },
    { cls: 'swiper-mousewheel', opt: 'mousewheel: true', desc: 'Enables mouse wheel scrolling navigation' },
    { cls: 'swiper-keyboard', opt: 'keyboard: true', desc: 'Enables keyboard arrow key navigation' },
  ];

  const filteredClassRef = classRefList.filter(item =>
    item.cls.toLowerCase().includes(docsSearch.toLowerCase()) ||
    item.opt.toLowerCase().includes(docsSearch.toLowerCase()) ||
    item.desc.toLowerCase().includes(docsSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden selection:bg-blue-500/30">
      
      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[100] bg-slate-900/95 border border-blue-500/30 text-slate-100 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-float">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ── Glowing Background Lights ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[130px] animate-pulse-glow" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[400px] rounded-full bg-emerald-600/5 blur-[140px]" />
      </div>

      {/* ── Header Bar ── */}
      <header className="relative z-50 sticky top-0 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25 border border-blue-400/20">
              <Sliders className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold text-white tracking-tight">Tailwind Swiper</span>
                <span className="text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">v1.0.0</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Declarative Zero-JS Slider Plugin</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex bg-slate-900/90 border border-slate-800/80 rounded-xl p-1 gap-1 shadow-inner">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                type="button"
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Right Action Badges */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText('npm install swiper');
                setCopiedInstall(true);
                showToast('Copied "npm install swiper" to clipboard!');
                setTimeout(() => setCopiedInstall(false), 2000);
              }}
              type="button"
              className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl px-3 py-1.5 transition text-xs font-mono text-slate-300"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>npm i swiper</span>
              {copiedInstall ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            </button>

            <a
              href="https://github.com/SnehMoradia"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 rounded-full px-3.5 py-1.5 transition text-xs font-bold text-emerald-400"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Zero-JS</span>
            </a>
          </div>

        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main className="relative z-10 flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* ════════════════════════════════════════════════════════════════════ Output 1: CONFIGURATOR TAB */}
        {activeTab === 'editor' && (
          <div className="flex flex-col xl:flex-row gap-6 items-start">

            {/* ── Left Sidebar Settings Panel ── */}
            <aside className="w-full xl:w-[360px] shrink-0 bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-slate-900/90">
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-blue-400" />
                  <h2 className="font-bold text-sm text-white">Slider Configurator</h2>
                </div>
                <button
                  onClick={resetToDefaults}
                  type="button"
                  title="Reset to default settings"
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-blue-400 transition bg-slate-800/60 border border-slate-700/60 px-2.5 py-1 rounded-lg"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Scrollable Accordion Sections */}
              <div className="overflow-y-auto max-h-full p-4 flex flex-col gap-3">

                {/* 1. Theme & Style */}
                <SettingSection
                  title="Theme & Card Style"
                  icon={Palette}
                  isOpen={openSection === 'theme'}
                  onToggle={() => toggleSection('theme')}
                >
                  {/* Color Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-300">Accent Color</span>
                      <span className="text-[11px] font-mono text-blue-400 capitalize font-bold">{themeColor}</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {Object.keys(themeColorMap).map((color) => (
                        <button
                          key={color}
                          onClick={() => setThemeColor(color)}
                          type="button"
                          title={color}
                          className={`w-8 h-8 rounded-full ${themeColorMap[color].bg} transition-all duration-200 flex items-center justify-center ring-offset-slate-950 ring-offset-2 ${
                            themeColor === color ? `ring-2 ${themeColorMap[color].ring} scale-110 shadow-lg` : 'opacity-60 hover:opacity-100 hover:scale-105'
                          }`}
                        >
                          {themeColor === color && <Check className="w-4 h-4 text-white drop-shadow" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Design Style */}
                  <div className="flex flex-col gap-1.5 border-t border-slate-800/60 pt-3">
                    <span className="text-xs font-semibold text-slate-300">Preview Card Preset</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'feature', label: 'Features' },
                        { id: 'image', label: 'Banners' },
                        { id: 'minimal', label: 'Minimal' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSlideStyle(s.id as any)}
                          type="button"
                          className={`py-1.5 text-xs font-semibold rounded-lg transition ${
                            slideStyle === s.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </SettingSection>

                {/* 2. Motion & Effect */}
                <SettingSection
                  title="Motion & Behavior"
                  icon={Zap}
                  isOpen={openSection === 'motion'}
                  onToggle={() => toggleSection('motion')}
                >
                  {(() => {
                    const is3DNoLoop = ['cards', 'coverflow'].includes(effect);
                    return (
                      <>
                        <SettingRow
                          label="Infinite Loop"
                          sublabel={is3DNoLoop ? "Disabled for 3D Coverflow / Card Stack mode" : "Wrap seamlessly past end slide"}
                          right={
                            <Toggle
                              checked={is3DNoLoop ? false : loop}
                              onChange={() => {
                                if (!is3DNoLoop) setLoop(!loop);
                              }}
                            />
                          }
                        />
                        <SettingRow
                          label="Autoplay"
                          sublabel={is3DNoLoop ? "Disabled for 3D Coverflow / Card Stack mode" : "Automatic slide transition"}
                          right={
                            <Toggle
                              checked={is3DNoLoop ? false : autoplay}
                              onChange={() => {
                                if (!is3DNoLoop) setAutoplay(!autoplay);
                              }}
                            />
                          }
                        />

                        {autoplay && !is3DNoLoop && (
                          <div className="ml-3 pl-3 border-l-2 border-blue-600/40 flex flex-col gap-3">
                            <RangeSlider
                              label="Autoplay Interval" unit="ms"
                              min={1000} max={10000} step={500}
                              value={autoplayDelay} onChange={setAutoplayDelay}
                            />
                            <SettingRow
                              label="Pause on Hover"
                              right={<Toggle size="sm" checked={autoplayPause} onChange={() => setAutoplayPause(!autoplayPause)} />}
                            />
                            {!loop && (
                              <SettingRow
                                label="Stop on Last Slide"
                                right={<Toggle size="sm" checked={autoplayStopLast} onChange={() => setAutoplayStopLast(!autoplayStopLast)} />}
                              />
                            )}
                          </div>
                        )}
                      </>
                    );
                  })()}

                  <RangeSlider
                    label="Transition Speed" unit="ms"
                    min={100} max={2000} step={50}
                    value={speed} onChange={setSpeed}
                  />

                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-slate-300">Transition Effect</span>
                    <select
                      value={effect}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEffect(val);
                        if (['cards', 'coverflow'].includes(val)) {
                          setLoop(false);
                          setAutoplay(false);
                        } else if (val === 'slide' || val === 'fade') {
                          setLoop(true);
                          setAutoplay(true);
                        }
                        if (['fade', 'cards', 'cube', 'flip', 'creative-stack', 'creative-zoom', 'creative-3d'].includes(val)) {
                          setSpvMobile(1); setSpvTablet(1); setSpvDesktop(1); setCentered(false); setSpaceBetween('0');
                        } else if (val === 'coverflow') {
                          setCentered(true); setSpaceBetween('0'); setSpvMobile('auto' as any); setSpvTablet('auto'); setSpvDesktop('auto');
                        } else if (val === 'slide') {
                          setSpvMobile(1); setSpvTablet(2); setSpvDesktop(3); setSpaceBetween('4'); setCentered(false);
                        }
                      }}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition font-medium"
                    >
                      <option value="slide">Slide (Default Horizontal)</option>
                      <option value="fade">Fade Dissolve</option>
                      <option value="coverflow">3D Coverflow Depth</option>
                      <option value="cards">3D Card Stack</option>
                      <option value="cube">3D Cube Rotation (NEW)</option>
                      <option value="flip">3D Flip Card (NEW)</option>
                      <option value="creative-stack">Creative Card Stack (NEW)</option>
                      <option value="creative-zoom">Creative Depth Zoom (NEW)</option>
                      <option value="creative-3d">Creative 3D Rotate (NEW)</option>
                    </select>
                  </div>
                </SettingSection>

                {/* 3. Responsive Layout */}
                {!['fade', 'cards', 'cube', 'flip', 'creative-stack', 'creative-zoom', 'creative-3d'].includes(effect) && (
                  <SettingSection
                    title="Layout & Breakpoints"
                    icon={Monitor}
                    isOpen={openSection === 'layout'}
                    onToggle={() => toggleSection('layout')}
                  >
                    <SettingRow
                      label="Center Active Slide"
                      sublabel="Highlight active slide in middle"
                      right={<Toggle checked={centered} onChange={() => setCentered(!centered)} />}
                    />

                    {/* Responsive Slides Per View Stacked Segment Controls */}
                    <div className="flex flex-col gap-3">
                      <span className="text-xs font-semibold text-slate-300">Slides Per View (Responsive)</span>
                      
                      {/* Mobile Breakpoint */}
                      <div className="flex items-center justify-between gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Smartphone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="text-xs font-medium text-slate-300">Mobile (&lt;768px)</span>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {[1, 2].map((num) => (
                            <button
                              key={num}
                              onClick={() => setSpvMobile(num)}
                              type="button"
                              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                                spvMobile === num ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                              }`}
                            >
                              {num} {num === 1 ? 'col' : 'cols'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tablet Breakpoint */}
                      <div className="flex items-center justify-between gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Tablet className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                          <span className="text-xs font-medium text-slate-300">Tablet (≥768px)</span>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {['1', '2', '3', 'auto'].map((val) => (
                            <button
                              key={val}
                              onClick={() => setSpvTablet(val === 'auto' ? 'auto' : parseInt(val))}
                              type="button"
                              className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                                String(spvTablet) === val ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                              }`}
                            >
                              {val === 'auto' ? 'Auto' : `${val}`}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Desktop Breakpoint */}
                      <div className="flex items-center justify-between gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <Monitor className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="text-xs font-medium text-slate-300">Desktop (≥1024px)</span>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          {['1', '2', '3', '4', 'auto'].map((val) => (
                            <button
                              key={val}
                              onClick={() => setSpvDesktop(val === 'auto' ? 'auto' : parseInt(val))}
                              type="button"
                              className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                                String(spvDesktop) === val ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                              }`}
                            >
                              {val === 'auto' ? 'Auto' : `${val}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Gap */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-semibold text-slate-300">Space Between Slides</span>
                      <select
                        value={spaceBetween}
                        onChange={(e) => setSpaceBetween(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/60 transition"
                      >
                        <option value="0">None — 0px</option>
                        <option value="2">xs — 8px</option>
                        <option value="4">sm — 16px</option>
                        <option value="6">md — 24px</option>
                        <option value="8">lg — 32px</option>
                        <option value="12">xl — 48px</option>
                        <option value="16">2xl — 64px</option>
                      </select>
                    </div>
                  </SettingSection>
                )}

                {/* 4. Controls & Pagination */}
                <SettingSection
                  title="Controls & Pagination"
                  icon={Sliders}
                  isOpen={openSection === 'controls'}
                  onToggle={() => toggleSection('controls')}
                >
                  <SettingRow
                    label="Navigation Arrows"
                    sublabel="Prev & Next arrow buttons"
                    right={<Toggle checked={navigation} onChange={() => setNavigation(!navigation)} />}
                  />
                  <SettingRow
                    label="Pagination"
                    sublabel="Bullets, progressbar, or fraction"
                    right={<Toggle checked={pagination} onChange={() => setPagination(!pagination)} />}
                  />

                  {pagination && (
                    <div className="ml-3 pl-3 border-l-2 border-blue-600/40 flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs text-slate-400 font-medium">Pagination Style</span>
                        <div className="flex gap-1.5">
                          {[['bullets','Bullets'], ['progressbar','Bar'], ['fraction','1/4']].map(([v, l]) => (
                            <button
                              key={v}
                              onClick={() => setPaginationType(v)}
                              type="button"
                              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                                paginationType === v ? 'bg-blue-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                              }`}
                            >
                              {l}
                            </button>
                          ))}
                        </div>
                      </div>
                      {paginationType === 'bullets' && (
                        <SettingRow
                          label="Dynamic Bullets"
                          right={<Toggle size="sm" checked={paginationDynamic} onChange={() => setPaginationDynamic(!paginationDynamic)} />}
                        />
                      )}
                    </div>
                  )}

                  <SettingRow
                    label="Scrollbar"
                    sublabel="Bottom draggable scroll bar"
                    right={<Toggle checked={scrollbar} onChange={() => setScrollbar(!scrollbar)} />}
                  />
                </SettingSection>

              </div>
            </aside>

            {/* ── Right Panel: Live Preview + Code Export ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-6 w-full">

              {/* ── Live Preview Card ── */}
              <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
                
                {/* Preview Header Bar */}
                <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/90 gap-3">
                  
                  {/* Left: Window Controls + Label */}
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Live Interactive Playground</span>
                  </div>

                  {/* Center: Device Viewport Switcher */}
                  <div className="flex bg-slate-950/80 border border-slate-800 rounded-xl p-1 gap-1">
                    {[
                      { id: 'desktop', label: 'Desktop', icon: Monitor },
                      { id: 'tablet', label: 'Tablet', icon: Tablet },
                      { id: 'mobile', label: 'Mobile', icon: Smartphone },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setViewportMode(id as any)}
                        type="button"
                        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                          viewportMode === id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Right: Slide Count Controls */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400">Slides:</span>
                    <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5">
                      <button
                        onClick={() => setSlideCount(Math.max(2, slideCount - 1))}
                        type="button"
                        className="p-1 text-slate-400 hover:text-white transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white font-mono">{slideCount}</span>
                      <button
                        onClick={() => setSlideCount(Math.min(8, slideCount + 1))}
                        type="button"
                        className="p-1 text-slate-400 hover:text-white transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Swiper Interactive Preview Outer Wrapper */}
                <div className={`p-6 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.06),transparent_70%)] flex justify-center transition-all duration-300 ${effect === 'coverflow' ? 'overflow-visible' : 'overflow-hidden'}`}>
                  <div className={`transition-all duration-300 ${
                    viewportMode === 'mobile' ? 'w-[375px]' : viewportMode === 'tablet' ? 'w-[768px]' : 'w-full'
                  }`}>
                    <div className={`bg-slate-950/80 rounded-2xl p-2 sm:p-5 border border-slate-800/80 shadow-inner ${effect === 'coverflow' ? 'overflow-visible' : 'overflow-hidden'}`}>
                      
                      {/* Outer wrapper with side padding for navigation arrows */}
                      <div className="relative px-2 sm:px-12 w-full flex items-center">
                        <div
                          ref={sliderRef}
                          key={`${getSwiperClasses()}-${pagination}-${navigation}-${scrollbar}-${paginationType}-${paginationDynamic}-${slideStyle}-${slideCount}-${viewportMode}`}
                          className={`${getSwiperClasses()} w-full rounded-xl ${effect === 'coverflow' ? 'overflow-visible' : 'overflow-hidden'}`}
                          style={{
                            paddingBottom: pagination ? '2.75rem' : '0.5rem'
                          }}
                        >
                          <div className="swiper-wrapper">
                            {Array.from({ length: slideCount }).map((_, i) => {
                              const slideIndex = i + 1;
                              const isCards = effect === 'cards';
                              const isCoverflow = effect === 'coverflow';
                              const isCube = effect === 'cube';
                              const isFlip = effect === 'flip';
                              const isCreative = effect.startsWith('creative');

                              const cardSizeClass = isCards
                                ? 'w-[260px] sm:w-[320px] h-64 mx-auto shrink-0'
                                : isCoverflow
                                ? 'w-[240px] sm:w-[300px] h-64 shrink-0'
                                : isCube || isFlip
                                ? 'w-[260px] sm:w-[300px] h-64 mx-auto shrink-0'
                                : isCreative
                                ? 'w-[260px] sm:w-[320px] h-64 mx-auto shrink-0'
                                : '';

                              if (slideStyle === 'image') {
                                const gradients = [
                                  'from-violet-950 via-slate-900 to-indigo-950 border-violet-500/40',
                                  'from-emerald-950 via-slate-900 to-teal-950 border-emerald-500/40',
                                  'from-blue-950 via-slate-900 to-cyan-950 border-blue-500/40',
                                  'from-rose-950 via-slate-900 to-orange-950 border-rose-500/40',
                                  'from-amber-950 via-slate-900 to-yellow-950 border-amber-500/40',
                                  'from-indigo-950 via-slate-900 to-purple-950 border-indigo-500/40',
                                ];
                                const g = gradients[i % gradients.length];
                                return (
                                  <div key={i} className={`swiper-slide rounded-2xl border bg-gradient-to-br ${g} bg-slate-950 p-8 flex flex-col justify-end shadow-2xl relative overflow-hidden ${cardSizeClass || 'h-64'}`}>
                                    <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-[10px] font-bold text-slate-300">
                                      Banner #{slideIndex}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">Visual Banner</span>
                                    <h3 className="text-2xl font-black text-white mb-2 leading-tight">Dynamic Slider Slide #{slideIndex}</h3>
                                    <p className="text-xs text-slate-300 leading-relaxed max-w-sm">Responsive Tailwind CSS Swiper slider powered by zero JavaScript code.</p>
                                  </div>
                                );
                              }

                              if (slideStyle === 'minimal') {
                                return (
                                  <div key={i} className={`swiper-slide rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between shadow-2xl ${cardSizeClass || 'min-h-[220px]'}`}>
                                    <div className="flex justify-between items-center">
                                      <span className="text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full">Card #{slideIndex}</span>
                                      <Zap className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-white text-base mb-1">Minimal Slide Content</h4>
                                      <p className="text-slate-400 text-xs leading-relaxed">Clean lightweight card design optimized for performance.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-blue-400">
                                      <span>Learn more</span> <ArrowRight className="w-3 h-3" />
                                    </div>
                                  </div>
                                );
                              }

                              // Default Feature style with solid opaque bg-slate-900 background to prevent text bleed
                              const icons = [Sliders, Sparkles, Layers, Compass, Zap, Star];
                              const colors = ['blue', 'emerald', 'violet', 'rose', 'amber', 'indigo'];
                              const IconComp = icons[i % icons.length];
                              const c = colors[i % colors.length];

                              const colorStyles: Record<string, string> = {
                                blue: 'from-blue-900/40 via-slate-900 to-slate-950 border-blue-500/30 text-blue-400',
                                emerald: 'from-emerald-900/40 via-slate-900 to-slate-950 border-emerald-500/30 text-emerald-400',
                                violet: 'from-violet-900/40 via-slate-900 to-slate-950 border-violet-500/30 text-violet-400',
                                rose: 'from-rose-900/40 via-slate-900 to-slate-950 border-rose-500/30 text-rose-400',
                                amber: 'from-amber-900/40 via-slate-900 to-slate-950 border-amber-500/30 text-amber-400',
                                indigo: 'from-indigo-900/40 via-slate-900 to-slate-950 border-indigo-500/30 text-indigo-400',
                              };
                              const [grad, border, text] = colorStyles[c].split(' ');

                              return (
                                <div key={i} className={`swiper-slide rounded-2xl border ${border} bg-gradient-to-br ${grad} bg-slate-900 p-6 flex flex-col items-center justify-center text-center gap-3 shadow-2xl ${cardSizeClass || 'min-h-[220px]'}`}>
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-slate-950 border ${border} shadow-md`}>
                                    <IconComp className={`w-6 h-6 ${text}`} />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-white text-base mb-1">Feature Slide #{slideIndex}</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed max-w-xs">Change sidebar settings to test reactive transitions instantly.</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {pagination && <div className={getPaginationClasses()} />}
                          {scrollbar && <div className="swiper-scrollbar" />}
                        </div>

                        {navigation && (
                          <>
                            <div className="swiper-button-prev !left-1 cursor-pointer" />
                            <div className="swiper-button-next !right-1 cursor-pointer" />
                          </>
                        )}
                      </div>

                    </div>
                  </div>
                </div>

              </div>

              {/* ── Generated Code Export Panel ── */}
              <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
                
                {/* Header with Code Tabs */}
                <div className="flex flex-wrap items-center justify-between px-5 py-3 border-b border-slate-800/80 bg-slate-900/90 gap-3">
                  
                  {/* Left: Code Tabs */}
                  <div className="flex items-center gap-1 max-sm:flex-wrap">
                    {[
                      { id: 'html', label: 'HTML Markup', icon: Code2 },
                      { id: 'react', label: 'React / JSX', icon: FileCode2 },
                      { id: 'js', label: 'JS Init', icon: Terminal },
                      { id: 'tailwind', label: 'Tailwind Config', icon: Settings },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setCodeTab(id as any)}
                        type="button"
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                          codeTab === id
                            ? 'bg-slate-800 text-white shadow border border-slate-700'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-blue-400" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Right: Copy Button */}
                  <button
                    onClick={() => {
                      const textToCopy =
                        codeTab === 'html' ? generateHTMLMarkup() :
                        codeTab === 'react' ? generateReactMarkup() :
                        codeTab === 'js' ? generateJSInitCode() : generateTailwindConfig();
                      copyToClipboard(textToCopy, `Copied ${codeTab.toUpperCase()} snippet!`);
                    }}
                    type="button"
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all shadow ${
                      copiedCode ? 'bg-emerald-600 text-white border border-emerald-500' : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/30'
                    }`}
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                {/* Code Pre Container */}
                <div className="max-h-72 overflow-auto p-5 bg-slate-950/90 font-mono text-xs text-blue-300 leading-relaxed border-t border-slate-900">
                  <pre className="whitespace-pre-wrap select-all">
                    {codeTab === 'html' && generateHTMLMarkup()}
                    {codeTab === 'react' && generateReactMarkup()}
                    {codeTab === 'js' && generateJSInitCode()}
                    {codeTab === 'tailwind' && generateTailwindConfig()}
                  </pre>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ Output 2: PRESETS TAB */}
        {activeTab === 'templates' && (
          <div className="flex flex-col gap-6">
            
            {/* Template Selector Bar */}
            <div className="flex justify-center">
              <div className="flex bg-slate-900/90 border border-slate-800 rounded-xl p-1 gap-1 shadow-inner">
                {templateTabs.map(({ id, label, badge }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedTemplate(id)}
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                      selectedTemplate === id
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{label}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950/50 text-slate-300 border border-slate-700/60">{badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Template Display Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              
              {/* Interactive Live Swiper Preset */}
              <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/90">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <h3 className="font-bold text-sm text-slate-200">
                      {selectedTemplate === 'hero' && 'Hero Carousel (Fade Dissolve)'}
                      {selectedTemplate === 'product' && 'Product Showcase (3-Col Grid)'}
                      {selectedTemplate === 'testimonial' && 'Customer Reviews (2-Col Slider)'}
                      {selectedTemplate === 'coverflow' && '3D Gallery (Coverflow Effect)'}
                    </h3>
                  </div>
                  <button
                    onClick={() => loadPresetToEditor(selectedTemplate)}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition"
                  >
                    <span>Load into Configurator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-6 min-h-[380px] bg-slate-950/60 flex items-center justify-center overflow-hidden">
                  
                  {/* HERO PRESET */}
                  {selectedTemplate === 'hero' && (
                    <div ref={presetSwiperRef} key="hero-swiper" className="swiper swiper-loop swiper-autoplay swiper-speed-800 swiper-effect-fade swiper-theme-violet w-full h-80 rounded-2xl overflow-hidden relative shadow-2xl px-12">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide relative w-full h-full flex items-center bg-gradient-to-tr from-slate-950 via-slate-900 to-violet-950 p-8 md:p-12 border border-violet-900/40">
                          <div className="max-w-md relative z-10">
                            <span className="text-[10px] font-bold tracking-wider text-violet-400 uppercase bg-violet-400/10 border border-violet-400/20 rounded-full px-3 py-0.5 mb-3 inline-block">Design Revolution</span>
                            <h2 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight">The Next Dimension Of Sliders</h2>
                            <p className="text-xs text-slate-300 mb-5 leading-relaxed">Build experiences purely using Tailwind utility classes. Zero JS boilerplate required.</p>
                            <button className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-violet-600 rounded-xl hover:bg-violet-500 transition shadow-lg shadow-violet-600/30">Get Started</button>
                          </div>
                        </div>
                        <div className="swiper-slide relative w-full h-full flex items-center bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950 p-8 md:p-12 border border-emerald-900/40">
                          <div className="max-w-md relative z-10">
                            <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-0.5 mb-3 inline-block">Unrivaled Power</span>
                            <h2 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight">Tailwind CSS Native Plugin</h2>
                            <p className="text-xs text-slate-300 mb-5 leading-relaxed">Leverage Tailwind responsive breakpoints directly in HTML class attributes.</p>
                            <button className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/30">Documentation</button>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-pagination"></div>
                      <div className="swiper-button-prev"></div>
                      <div className="swiper-button-next"></div>
                    </div>
                  )}

                  {/* PRODUCT PRESET */}
                  {selectedTemplate === 'product' && (
                    <div ref={presetSwiperRef} key="product-swiper" className="swiper swiper-loop swiper-space-x-4 swiper-slides-per-view-1 md:swiper-slides-per-view-2 lg:swiper-slides-per-view-3 swiper-theme-emerald w-full py-4 px-12">
                      <div className="swiper-wrapper">
                        {[
                          { emoji: '📱', name: 'Quantum Phone X', price: '$999', desc: 'Titanium OLED Display', bg: 'from-emerald-500/10 to-teal-500/5' },
                          { emoji: '⌚', name: 'Aura Watch Studio', price: '$349', desc: 'Sapphire Glass Fitness', bg: 'from-violet-500/10 to-purple-500/5' },
                          { emoji: '🎧', name: 'Sonic Buds ANC', price: '$199', desc: 'Spatial Lossless Audio', bg: 'from-blue-500/10 to-cyan-500/5' },
                        ].map(({ emoji, name, price, desc, bg }) => (
                          <div key={name} className="swiper-slide bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-lg">
                            <div className={`h-32 bg-gradient-to-br ${bg} rounded-xl flex items-center justify-center border border-slate-800 text-4xl`}>
                              {emoji}
                            </div>
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-white text-sm">{name}</h4>
                              <span className="text-emerald-400 font-extrabold text-xs">{price}</span>
                            </div>
                            <p className="text-[11px] text-slate-400">{desc}</p>
                            <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 transition rounded-xl text-xs font-bold text-white shadow">Add to Cart</button>
                          </div>
                        ))}
                      </div>
                      <div className="swiper-pagination"></div>
                    </div>
                  )}

                  {/* TESTIMONIAL PRESET */}
                  {selectedTemplate === 'testimonial' && (
                    <div ref={presetSwiperRef} key="testimonial-swiper" className="swiper swiper-loop swiper-space-x-6 swiper-slides-per-view-1 md:swiper-slides-per-view-2 swiper-theme-rose w-full py-4 px-12">
                      <div className="swiper-wrapper">
                        {[
                          { text: '"Implementing sliders used to take 20 lines of JS. With this plugin, I just set responsive classes in HTML."', name: 'Sarah Jenkins', role: 'Architect at Vercel', initials: 'SJ', color: 'from-rose-500 to-amber-500' },
                          { text: '"The declarative configuration is brilliant. It matches standard Tailwind responsive design seamlessly."', name: 'Marcus Kaelen', role: 'Lead at Figma', initials: 'MK', color: 'from-violet-500 to-indigo-500' },
                        ].map(({ text, name, role, initials, color }) => (
                          <div key={name} className="swiper-slide bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between min-h-[220px] shadow-lg">
                            <div className="flex gap-1 mb-2">{[1,2,3,4,5].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                            <p className="text-slate-300 italic text-xs leading-relaxed flex-1">{text}</p>
                            <div className="flex items-center gap-3 mt-4">
                              <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${color} flex items-center justify-center text-xs font-bold text-white shadow`}>{initials}</div>
                              <div>
                                <p className="text-xs font-bold text-white">{name}</p>
                                <p className="text-[10px] text-slate-500">{role}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="swiper-pagination"></div>
                    </div>
                  )}

                  {/* COVERFLOW PRESET */}
                  {selectedTemplate === 'coverflow' && (
                    <div ref={presetSwiperRef} key="coverflow-swiper" className="swiper swiper-loop swiper-effect-coverflow swiper-centered swiper-slides-per-view-auto swiper-theme-primary w-full py-6 px-12">
                      <div className="swiper-wrapper">
                        {[
                          { bg: 'from-indigo-900 to-slate-950', border: 'border-indigo-500/30', title: 'Deep Indigo', tag: 'NODE 01' },
                          { bg: 'from-rose-900 to-slate-950', border: 'border-rose-500/30', title: 'Neon Cyber', tag: 'NODE 02' },
                          { bg: 'from-emerald-900 to-slate-950', border: 'border-emerald-500/30', title: 'Jade Horizon', tag: 'NODE 03' },
                        ].map(({ bg, border, title, tag }) => (
                          <div key={title} className={`swiper-slide w-[240px] h-[300px] rounded-3xl bg-gradient-to-b ${bg} border ${border} flex flex-col justify-end p-5 shadow-2xl`}>
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{tag}</span>
                            <h4 className="font-extrabold text-lg text-white mb-1">{title}</h4>
                            <p className="text-[11px] text-slate-400">3D perspective transforms with glass physics.</p>
                          </div>
                        ))}
                      </div>
                      <div className="swiper-pagination"></div>
                      <div className="swiper-button-prev"></div>
                      <div className="swiper-button-next"></div>
                    </div>
                  )}

                </div>
              </div>

              {/* Template Code Preview Panel */}
              <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/90">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-bold text-slate-200">Template HTML Markup</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(getTemplateCode(), `Copied ${selectedTemplate.toUpperCase()} markup!`)}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition shadow"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Preset HTML</span>
                  </button>
                </div>
                <div className="flex-1 max-h-[380px] overflow-auto p-5 bg-slate-950/90 font-mono text-xs text-blue-300 leading-relaxed">
                  <pre className="whitespace-pre-wrap select-all">{getTemplateCode()}</pre>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ Output 3: DOCS TAB */}
        {activeTab === 'docs' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            
            {/* Integration Banner */}
            <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg border border-blue-400/20 shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-extrabold text-xl text-white">Integration & Setup Guide</h2>
                  <p className="text-xs text-slate-400 mt-1">Get production-ready Tailwind Swipers up and running in under 2 minutes.</p>
                </div>
              </div>
              <a
                href="https://swiperjs.com/swiper-api"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition bg-blue-500/10 border border-blue-500/20 px-3.5 py-2 rounded-xl"
              >
                <span>Swiper API Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 3 Step Integration Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: '01',
                  title: 'Install Swiper',
                  desc: 'Add Swiper package to your dependencies.',
                  code: 'npm install swiper'
                },
                {
                  step: '02',
                  title: 'Register Plugin',
                  desc: 'Add plugin to tailwind.config.cjs.',
                  code: `plugins: [\n  require('./plugin/tailwind-swiper-plugin.cjs')\n]`
                },
                {
                  step: '03',
                  title: 'Initialize in Main',
                  desc: 'Call auto-init in main entry file.',
                  code: `import Swiper from 'swiper';\nimport { initTailwindSwipers } from './plugin/swiper-init';\n\ninitTailwindSwipers(Swiper);`
                }
              ].map(({ step, title, desc, code }) => (
                <div key={step} className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 shadow-xl flex flex-col justify-between backdrop-blur-xl">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black text-blue-400 font-mono bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">STEP {step}</span>
                    </div>
                    <h3 className="font-bold text-base text-white mb-1">{title}</h3>
                    <p className="text-xs text-slate-400 mb-4">{desc}</p>
                  </div>
                  <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-blue-300 leading-relaxed overflow-x-auto relative">
                    <pre>{code}</pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Utility Class Reference with Interactive Search */}
            <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
              
              {/* Header with Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/90 gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-white">Utility Class Reference</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Classes parsed automatically by the Tailwind Swiper initializer.</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={docsSearch}
                    onChange={(e) => setDocsSearch(e.target.value)}
                    placeholder="Search classes..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950/80 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-3.5 font-bold text-slate-400 uppercase tracking-wider">Tailwind Utility Class</th>
                      <th className="px-6 py-3.5 font-bold text-slate-400 uppercase tracking-wider">Swiper Option Mapping</th>
                      <th className="px-6 py-3.5 font-bold text-slate-400 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredClassRef.length > 0 ? (
                      filteredClassRef.map(({ cls, opt, desc }) => (
                        <tr key={cls} className="hover:bg-slate-800/40 transition">
                          <td className="px-6 py-3.5 font-bold text-blue-400">{cls}</td>
                          <td className="px-6 py-3.5 text-slate-300">{opt}</td>
                          <td className="px-6 py-3.5 text-slate-400 font-sans">{desc}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-slate-500 font-sans">
                          No matching utility classes found for "{docsSearch}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-slate-800/80 py-6 mt-10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-xs">TS</div>
            <p className="text-xs text-slate-400">Tailwind CSS Swiper Plugin — Zero-JS Declarative Slider Integration</p>
          </div>
          <p className="text-xs text-slate-500">Built with React, TypeScript, Vite &amp; Swiper.js</p>
        </div>
      </footer>

    </div>
  );
}

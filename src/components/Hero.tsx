import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowDown, 
  GithubLogo, 
  LinkedinLogo,
  FilePdf,
  ShieldCheck, 
  CheckCircle, 
  Gauge, 
  GitBranch, 
  Cpu
} from '@phosphor-icons/react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const telemetryItems = [
    { 
      label: t('telemetry.uptime'), 
      val: t('telemetry.uptime_val'), 
      icon: <Gauge size={16} className="text-accent-mint" />,
      sub: "Render Prod" 
    },
    { 
      label: t('telemetry.tests'), 
      val: t('telemetry.tests_val'), 
      icon: <CheckCircle size={16} className="text-accent-cyan" />,
      sub: "Unit & Fuzz" 
    },
    { 
      label: t('telemetry.ci'), 
      val: t('telemetry.ci_val'), 
      icon: <GitBranch size={16} className="text-emerald-400" />,
      sub: "GitHub Actions" 
    },
    { 
      label: t('telemetry.latency'), 
      val: t('telemetry.latency_val'), 
      icon: <Cpu size={16} className="text-amber-400" />,
      sub: "Benchmarked" 
    },
  ];

  return (
    <section className="relative min-h-[92dvh] flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background subtle architectural grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(#00E5FF 1px, transparent 1px)`, 
          backgroundSize: '24px 24px' 
        }} 
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full space-y-10">
        
        {/* Top Eyebrow / Role Badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-900 border border-border-subtle text-xs font-mono text-zinc-300">
            <ShieldCheck size={16} className="text-accent-cyan" weight="bold" />
            <span>{t('hero.badge')}</span>
          </div>
          <span className="text-xs font-mono text-zinc-400">Dong Nai, Viet Nam</span>
        </div>

        {/* Headline & Value Proposition */}
        <div className="space-y-4 max-w-4xl">
          {/* Subtle Elegance Greeting & Candidate Identity */}
          <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-zinc-400">
            <span className="text-accent-cyan font-bold">&gt;</span>
            <span>{t('hero.greeting')}</span>
            <span className="font-semibold text-zinc-100">{t('hero.name')}</span>
          </div>

          {/* Main Powerful Engineering Slogan Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-100 leading-[1.25] sm:leading-[1.28] lg:leading-[1.3]">
            <span className="block">{t('hero.headline_prefix')}</span>
            <span className="block mt-1 sm:mt-1.5 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-accent-cyan to-emerald-400">
              {t('hero.headline_highlight')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal pt-1">
            {t('hero.description')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-cyan text-white dark:text-surface-950 font-bold text-sm hover:bg-cyan-400 dark:hover:bg-cyan-300 transition-all shadow-[0_0_20px_-5px_rgba(0,229,255,0.4)] active:scale-95"
          >
            <span>{t('hero.cta.projects')}</span>
            <ArrowDown size={16} weight="bold" />
          </a>

          <a
            href="/CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf"
            download="CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-surface-900 hover:bg-surface-850 border border-accent-cyan/40 hover:border-accent-cyan text-zinc-100 font-mono text-sm transition-all shadow-sm active:scale-95 group"
          >
            <FilePdf size={18} className="text-accent-cyan group-hover:scale-110 transition-transform" weight="bold" />
            <span>{t('hero.cta.cv')}</span>
          </a>

          <a
            href="https://github.com/NguyenQuan121321"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-zinc-200 font-mono text-sm transition-all active:scale-95"
          >
            <GithubLogo size={18} weight="bold" />
            <span>{t('hero.cta.github')}</span>
          </a>

          <a
            href="https://www.linkedin.com/in/qu%C3%A2n-nguy%E1%BB%85n-bb2053433/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-accent-cyan/60 text-zinc-200 hover:text-accent-cyan font-mono text-sm transition-all active:scale-95"
          >
            <LinkedinLogo size={18} weight="bold" className="text-blue-400" />
            <span>{t('hero.cta.linkedin')}</span>
          </a>
        </div>

        {/* Telemetry Strip */}
        <div className="pt-6 border-t border-border-subtle/80">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
            <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400 font-semibold">
              {t('telemetry.title')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {telemetryItems.map((item, idx) => (
              <div 
                key={idx}
                className="bg-surface-900/90 border border-border-subtle rounded-lg p-3.5 sm:p-4 hover:border-border-highlight transition-all"
              >
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                  <span>{item.label}</span>
                  {item.icon}
                </div>
                <div className="font-mono text-lg sm:text-xl font-bold text-zinc-100">
                  {item.val}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

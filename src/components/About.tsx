import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Quotes, 
  CheckCircle, 
  TrendUp
} from '@phosphor-icons/react';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const strengths = [1, 2, 3, 4].map(num => t(`about.strengths_${num}`));
  const growth = [1, 2, 3, 4].map(num => t(`about.growth_${num}`));

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-border-subtle/80 bg-surface-900/40">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            {t('about.title')}
          </h2>
        </div>

        {/* Philosophy Callout Banner */}
        <div className="p-6 sm:p-8 rounded-xl bg-surface-900 border border-border-subtle relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/[0.02] rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-4">
            <Quotes size={36} weight="duotone" className="text-accent-cyan shrink-0 hidden sm:block mt-1" />
            <div className="space-y-4">
              <blockquote className="text-base sm:text-lg text-zinc-200 font-medium leading-relaxed italic">
                "{t('about.quote')}"
              </blockquote>
              <div className="space-y-3 text-sm text-zinc-400 leading-relaxed font-sans">
                <p>{t('about.p1')}</p>
                <p>{t('about.p2')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Growth Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="p-6 sm:p-7 rounded-xl bg-surface-900 border border-border-subtle space-y-4">
            <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
              <CheckCircle size={20} className="text-accent-mint" weight="bold" />
              <h3 className="font-bold text-base text-zinc-100 font-mono">
                {t('about.strengths_title')}
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
              {strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-accent-mint font-bold shrink-0 mt-0.5">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Active Growth */}
          <div className="p-6 sm:p-7 rounded-xl bg-surface-900 border border-border-subtle space-y-4">
            <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
              <TrendUp size={20} className="text-accent-cyan" weight="bold" />
              <h3 className="font-bold text-base text-zinc-100 font-mono">
                {t('about.growth_title')}
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
              {growth.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-accent-cyan font-bold shrink-0 mt-0.5">→</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

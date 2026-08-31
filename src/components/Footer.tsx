import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, TerminalWindow } from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-border-subtle/80 bg-surface-950 text-xs font-mono text-zinc-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Branding & Verification */}
        <div className="flex items-center gap-3 text-zinc-400">
          <div className="w-6 h-6 rounded bg-surface-900 border border-border-subtle flex items-center justify-center text-accent-cyan">
            <TerminalWindow size={14} weight="bold" />
          </div>
          <span>&copy; {year} Nguyễn Hoàng Anh Quân. {t('footer.text')}</span>
        </div>

        {/* Right: Back to top button */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-zinc-400">
            {t('footer.commit')}
          </span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-md bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-zinc-300 transition-colors flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={12} weight="bold" />
          </button>
        </div>

      </div>
    </footer>
  );
};

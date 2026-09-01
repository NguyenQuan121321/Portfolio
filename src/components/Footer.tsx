import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, GithubLogo, LinkedinLogo, FilePdf } from '@phosphor-icons/react';

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
        <div className="flex items-center gap-3 text-zinc-400 group">
          <div className="w-6 h-6 rounded bg-surface-900 border border-border-subtle group-hover:border-accent-cyan overflow-hidden flex items-center justify-center transition-colors shrink-0 shadow-sm">
            <div 
              className="w-full h-full bg-no-repeat bg-[length:200%_100%] bg-[position:0%_center] group-hover:bg-[position:100%_center] transition-[background-position] duration-150"
              style={{ backgroundImage: `url('/finn.png')` }}
              aria-hidden="true"
            />
          </div>
          <span>&copy; {year} Nguyễn Hoàng Anh Quân. {t('footer.text')}</span>
        </div>

        {/* Right: Quick Links & Back to top button */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          <a
            href="https://www.linkedin.com/in/qu%C3%A2n-nguy%E1%BB%85n-bb2053433/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-cyan transition-colors flex items-center gap-1"
            title="LinkedIn Profile"
          >
            <LinkedinLogo size={14} weight="bold" />
            <span>{t('footer.linkedin')}</span>
          </a>

          <a
            href="https://github.com/NguyenQuan121321"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors flex items-center gap-1"
            title="GitHub Profile"
          >
            <GithubLogo size={14} weight="bold" />
            <span>{t('footer.github')}</span>
          </a>

          <a
            href="/CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf"
            download="CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf"
            className="hover:text-accent-cyan transition-colors flex items-center gap-1"
            title="Download CV"
          >
            <FilePdf size={14} weight="bold" className="text-accent-cyan" />
            <span>{t('footer.cv')}</span>
          </a>

          <span className="text-zinc-600">|</span>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-md bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-zinc-300 transition-colors flex items-center gap-1.5 active:scale-95"
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

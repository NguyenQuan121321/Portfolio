import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { GithubLogo, LinkedinLogo, FilePdf, List, X, Globe, Sun, Moon } from '@phosphor-icons/react';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds: string[] = ['projects', 'writeups', 'skills', 'about', 'contact'];
      const scrollY = window.scrollY;

      if (scrollY < 200) {
        setActiveSection('');
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        if (!id) continue;
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'vi' : 'en');
  };

  const navLinks = [
    { href: '#projects', label: t('nav.projects') },
    { href: '#writeups', label: t('nav.writeups') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#about', label: t('nav.about') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-surface-950/85 border-b border-border-subtle/80 transition-all">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Left: Brand & 2-Line Live Status */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a 
              href="#" 
              className="flex items-center gap-2.5 font-mono text-lg font-bold text-zinc-100 group transition-colors select-none"
              title="Finn.dev"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-surface-900 border border-border-highlight group-hover:border-accent-cyan overflow-hidden relative flex items-center justify-center transition-all shrink-0 shadow-sm p-0.5">
                <img 
                  src="/img/maskironman.gif" 
                  alt="Avatar" 
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <span className="text-base sm:text-lg">Finn<span className="text-accent-cyan">.dev</span></span>
            </a>

            {/* Status Indicator: Alive & Refined 2-Line Telemetry Widget */}
            <a 
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/[0.08] via-emerald-500/[0.04] to-cyan-500/[0.06] border border-emerald-500/25 hover:border-emerald-400/60 text-emerald-400 select-none cursor-pointer transition-all duration-300 shadow-[0_0_15px_-4px_rgba(16,185,129,0.25)] hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.45)] hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
              title={t('nav.status_tooltip')}
            >
              {/* Subtle ambient shimmer beam on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent pointer-events-none" />

              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              </span>
              <div className="flex flex-col text-left leading-none font-mono">
                <span className="text-[9px] uppercase tracking-wider text-emerald-400/90 font-semibold flex items-center gap-1">
                  <span>{t('nav.status_line1')}</span>
                </span>
                <span className="text-[11.5px] text-zinc-100 group-hover:text-emerald-300 transition-colors font-bold tracking-tight mt-0.5">
                  {t('nav.status_line2')}
                </span>
              </div>
            </a>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/25 shadow-[0_0_12px_-2px_rgba(0,229,255,0.25)] font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-surface-900 border border-transparent'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle, GitHub, LinkedIn, CV & Language */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Button: Animated Sun & Moon Transition */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight transition-all focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 shadow-sm flex items-center justify-center relative overflow-hidden group hover:scale-105 active:scale-95"
              title={theme === 'dark' ? t('theme.toggle_light') : t('theme.toggle_dark')}
              aria-label={theme === 'dark' ? t('theme.toggle_light') : t('theme.toggle_dark')}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                {/* Sun (Light mode toggle) */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                    theme === 'dark' 
                      ? 'translate-y-0 rotate-0 scale-100 opacity-100 text-white group-hover:text-amber-300' 
                      : 'translate-y-6 rotate-90 scale-50 opacity-0 text-amber-500'
                  }`}
                >
                  <Sun size={19} weight="bold" />
                </div>

                {/* Moon (Dark mode toggle) */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                    theme === 'light' 
                      ? 'translate-y-0 rotate-0 scale-100 opacity-100 text-slate-800 group-hover:text-indigo-600' 
                      : '-translate-y-6 -rotate-90 scale-50 opacity-0 text-slate-400'
                  }`}
                >
                  <Moon size={19} weight="bold" />
                </div>
              </div>
            </button>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/qu%C3%A2n-nguy%E1%BB%85n-bb2053433/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-400 hover:text-accent-cyan hover:bg-surface-900 border border-transparent hover:border-border-subtle transition-colors"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <LinkedinLogo size={20} weight="bold" />
            </a>

            {/* GitHub Link */}
            <a
              href="https://github.com/NguyenQuan121321"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface-900 border border-transparent hover:border-border-subtle transition-colors"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <GithubLogo size={20} weight="bold" />
            </a>

            {/* Download CV PDF Action Button */}
            <a
              href="/CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf"
              download="CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-xs font-mono font-medium text-zinc-200 hover:text-accent-cyan transition-all active:scale-95"
              title={t('nav.cv')}
              aria-label={t('nav.cv')}
            >
              <FilePdf size={15} className="text-accent-cyan" weight="bold" />
              <span>{t('nav.cv')}</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-xs font-mono font-medium text-zinc-200 transition-colors"
              aria-label="Switch Language"
            >
              <Globe size={14} className="text-accent-cyan" />
              <span>{t('lang.toggle')}</span>
            </button>

            {/* Mobile Menu Toggle in Navbar */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface-900"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-950 border-b border-border-subtle px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 font-semibold'
                      : 'text-zinc-300 hover:text-white hover:bg-surface-900'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          
          <div className="pt-2 border-t border-border-subtle flex flex-col gap-2">
            <a
              href="/CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf"
              download="CV_Nguyen_Hoang_Anh_Quan_Backend_Developer.pdf"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-accent-cyan text-white dark:text-surface-950 font-bold text-sm"
            >
              <FilePdf size={16} weight="bold" />
              <span>{t('nav.cv')}</span>
            </a>

            <div className="flex items-center justify-between px-3 pt-1 text-xs text-zinc-400">
              <a 
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/25 text-emerald-400 active:scale-95 transition-transform"
                title={t('nav.status_tooltip')}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-pulse shrink-0"></span>
                <div className="flex flex-col text-left leading-none font-mono">
                  <span className="text-[9px] uppercase tracking-wider text-emerald-400/90 font-semibold">
                    {t('nav.status_line1')}
                  </span>
                  <span className="text-[11.5px] text-zinc-100 font-bold tracking-tight mt-0.5">
                    {t('nav.status_line2')}
                  </span>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.linkedin.com/in/qu%C3%A2n-nguy%E1%BB%85n-bb2053433/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-accent-cyan"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinLogo size={18} weight="bold" />
                </a>
                <a 
                  href="https://github.com/NguyenQuan121321" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-accent-cyan"
                  aria-label="GitHub Profile"
                >
                  <GithubLogo size={18} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

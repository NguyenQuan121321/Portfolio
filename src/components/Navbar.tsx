import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { GithubLogo, List, X, Globe, Sun, Moon } from '@phosphor-icons/react';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'vi' : 'en');
  };

  const navLinks = [
    { href: '#projects', label: t('nav.projects') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#about', label: t('nav.about') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-surface-950/85 border-b border-border-subtle/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand & Live Status */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="flex items-center gap-2.5 font-mono text-lg font-bold text-zinc-100 group transition-colors select-none"
              title="Finn.dev"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-900 border border-border-highlight group-hover:border-accent-cyan overflow-hidden relative flex items-center justify-center transition-all shrink-0 shadow-sm">
                <div 
                  className="w-full h-full bg-no-repeat bg-[length:200%_100%] bg-[position:0%_center] group-hover:bg-[position:100%_center] transition-[background-position] duration-150 transform group-hover:scale-105"
                  style={{ backgroundImage: `url('/finn.png')` }}
                  aria-label="Finn Avatar"
                />
              </div>
              <span>Finn<span className="text-accent-cyan">.dev</span></span>
            </a>

            {/* Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-900 border border-border-subtle text-xs text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mint"></span>
              </span>
              <span>{t('nav.status')}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-md text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-surface-900 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Theme Toggle, GitHub & Language */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button: Animated Sun & Moon Transition */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight transition-all focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 shadow-sm flex items-center justify-center relative overflow-hidden group hover:scale-105 active:scale-95"
              title={theme === 'dark' ? t('theme.toggle_light') : t('theme.toggle_dark')}
              aria-label={theme === 'dark' ? t('theme.toggle_light') : t('theme.toggle_dark')}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                {/* Sun (Mặt trời mọc/lặn) */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                    theme === 'dark' 
                      ? 'translate-y-0 rotate-0 scale-100 opacity-100 text-white group-hover:text-amber-300' 
                      : 'translate-y-6 rotate-90 scale-50 opacity-0 text-amber-500'
                  }`}
                >
                  <Sun size={19} weight="bold" />
                </div>

                {/* Moon (Mặt trăng mọc/lặn) */}
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

            {/* GitHub Link */}
            <a
              href="https://github.com/NguyenQuan121321"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-surface-900 border border-transparent hover:border-border-subtle transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubLogo size={20} weight="bold" />
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-zinc-300 hover:text-white hover:bg-surface-900"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center gap-2 px-3 text-xs text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-accent-mint inline-block"></span>
            <span>{t('nav.status')}</span>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GithubLogo, List, X, TerminalWindow, Globe } from '@phosphor-icons/react';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'vi' : 'en');
  };

  const navLinks = [
    { href: '#projects', label: t('nav.projects') },
    { href: '#thesis', label: t('nav.thesis') },
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
              className="flex items-center gap-2 font-mono text-lg font-bold text-zinc-100 group transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-900 border border-border-highlight flex items-center justify-center text-accent-cyan group-hover:border-accent-cyan transition-colors">
                <TerminalWindow size={18} weight="bold" />
              </div>
              <span>NQ<span className="text-accent-cyan">.dev</span></span>
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

          {/* Right Actions: Language & GitHub */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/NguyenQuan121321"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-surface-900 border border-transparent hover:border-border-subtle transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubLogo size={20} weight="bold" />
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-900 hover:bg-surface-850 border border-border-subtle hover:border-border-highlight text-xs font-mono font-medium text-zinc-200 transition-colors"
              aria-label="Switch Language"
            >
              <Globe size={14} className="text-accent-cyan" />
              <span>{t('lang.toggle')}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-surface-900"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-950 border-b border-border-subtle px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-surface-900"
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

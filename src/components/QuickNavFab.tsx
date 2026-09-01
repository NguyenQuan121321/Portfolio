import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  List, 
  X, 
  House, 
  Cpu, 
  Code, 
  User, 
  EnvelopeSimple,
  CaretRight
} from '@phosphor-icons/react';

export const QuickNavFab: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close when pressing ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const navItems = [
    { href: '#', label: t('nav.home'), icon: <House size={18} className="text-accent-cyan" /> },
    { href: '#projects', label: t('nav.projects'), icon: <Cpu size={18} className="text-emerald-400" /> },
    { href: '#skills', label: t('nav.skills'), icon: <Code size={18} className="text-amber-400" /> },
    { href: '#about', label: t('nav.about'), icon: <User size={18} className="text-purple-400" /> },
    { href: '#contact', label: t('nav.contact'), icon: <EnvelopeSimple size={18} className="text-cyan-400" /> },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside aria-label="Quick Floating Navigation" className="fixed bottom-6 left-6 z-40" ref={containerRef}>
      {/* Floating Vertical Navigation Menu */}
      {isOpen && (
        <div 
          className="absolute bottom-16 left-0 mb-2 w-56 sm:w-60 bg-surface-900/95 backdrop-blur-xl border border-border-highlight rounded-2xl shadow-[0_10px_35px_-5px_rgba(0,0,0,0.6)] p-2 space-y-1 animate-scaleUp origin-bottom-left"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Header Label */}
          <div className="px-3 py-2 border-b border-border-subtle flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>{t('nav.quick_menu')}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
          </div>

          {/* Vertical Nav Links */}
          <div className="py-1 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-850 text-left font-sans text-xs sm:text-sm font-semibold text-zinc-200 hover:text-accent-cyan transition-all group active:scale-[0.98]"
                role="menuitem"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-surface-950 border border-border-subtle group-hover:border-accent-cyan/50 transition-colors">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
                <CaretRight size={14} className="text-zinc-500 group-hover:text-accent-cyan group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Round FAB Button with 3 Horizontal Lines */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-surface-900 hover:bg-surface-850 border-2 border-accent-cyan/60 hover:border-accent-cyan text-accent-cyan flex items-center justify-center shadow-[0_0_25px_-4px_rgba(0,229,255,0.45)] hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent-cyan/50"
        title={t('nav.quick_menu')}
        aria-label={t('nav.quick_menu')}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={22} weight="bold" className="text-zinc-200 transition-transform rotate-90" />
        ) : (
          <List size={24} weight="bold" className="text-accent-cyan" />
        )}
      </button>
    </aside>
  );
};

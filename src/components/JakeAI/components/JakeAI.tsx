import React, { useEffect, useState, useMemo } from 'react';
import { JakeProps } from '../types';
import { injectStyles } from '../styles/styles';
import { AIService } from '../services/aiService';
import { ChatModal } from './ChatModal';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { ChatCircleDots } from '@phosphor-icons/react';

export const JakeAI: React.FC<JakeProps> = (props) => {
  const { theme: contextTheme } = useTheme();
  const { lang } = useLanguage();

  const currentTheme = props.theme || contextTheme || 'dark';

  const {
    backendUrl = '',
    name = 'Jake AI',
    className = '',
    style = {}
  } = props;

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const aiService = useMemo(() => new AIService(backendUrl), [backendUrl]);

  useEffect(() => {
    aiService.setBackendUrl(backendUrl);
  }, [backendUrl, aiService]);

  // Re-inject styles whenever theme changes
  useEffect(() => {
    injectStyles(currentTheme as 'dark' | 'light' | 'auto');
  }, [currentTheme]);

  // Expose global JakeAI API for external callers without breaking compatibility
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.JakeAI = {
        openChat: () => {
          setIsChatOpen(true);
        },
        closeChat: () => {
          setIsChatOpen(false);
        },
        toggleChat: () => {
          setIsChatOpen((prev) => !prev);
        },
        say: (text: string) => {
          console.log(`[JakeAI] say: ${text}`);
        },
        showHint: () => {},
        moveTo: () => {},
        setSpeed: () => {},
        version: '2.0.0-copilot'
      };
    }
  }, []);

  const handleToggleChat = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div
      id="jake-ai-container"
      className={`jake-ai-root jake-theme-${currentTheme} ${className}`}
      style={style}
    >
      {/* Floating AI Copilot Action Hub Button */}
      <div className="fixed bottom-6 right-6 z-[9990] flex items-center">
        {/* The Main Copilot Trigger Button */}
        <button
          type="button"
          onClick={handleToggleChat}
          className={`group relative flex items-center gap-2.5 px-4 py-3 rounded-full font-mono text-xs font-medium transition-all duration-200 shadow-xl select-none ${
            isChatOpen
              ? 'bg-cyan-500 text-surface-950 border border-cyan-300 shadow-cyan-500/25 ring-2 ring-cyan-400/40'
              : 'bg-surface-900/90 dark:bg-surface-900/90 text-zinc-100 border border-cyan-500/30 hover:border-cyan-400/80 hover:shadow-cyan-500/20 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0'
          }`}
          aria-label={isChatOpen ? 'Close Jake AI Assistant' : 'Open Jake AI Assistant'}
          title={lang === 'vi' ? 'Trò chuyện cùng Jake AI Copilot' : 'Chat with Jake AI Copilot'}
        >
          {/* Live Ping Status Indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>

          {/* Icon */}
          <ChatCircleDots 
            size={18} 
            weight={isChatOpen ? 'fill' : 'bold'} 
            className={isChatOpen ? 'text-surface-950' : 'text-cyan-400 group-hover:rotate-12 transition-transform'} 
          />

          {/* Label (Desktop) */}
          <span className="hidden sm:inline-block font-semibold tracking-wide">
            {name}
          </span>

          {/* Copilot Tag */}
          <span className={`hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-full border ${
            isChatOpen
              ? 'bg-surface-950/20 border-surface-950/30 text-surface-950 font-bold'
              : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
          }`}>
            Copilot
          </span>
        </button>
      </div>

      {/* Interactive Chat Window */}
      <ChatModal
        {...props}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        aiService={aiService}
      />
    </div>
  );
};

export default JakeAI;

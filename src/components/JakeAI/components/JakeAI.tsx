import React, { useEffect, useRef, useState, useMemo } from 'react';
import { JakeProps } from '../types';
import { injectStyles } from '../styles/styles';
import { MovementEngine } from '../engine/MovementEngine';
import { AIService } from '../services/aiService';
import { ChatModal } from './ChatModal';

export const DogBedIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 54 42" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Soft Pet Bed Outer Rim (Warm Amber / Brown) */}
    <ellipse cx="27" cy="24" rx="25" ry="15" fill="#d35400" />
    <ellipse cx="27" cy="22" rx="24" ry="14" fill="#e67e22" />
    {/* Inner Plush Cushion (Cream / Soft Tan) */}
    <ellipse cx="27" cy="23" rx="19" ry="10" fill="#f8c291" />
    <ellipse cx="27" cy="22" rx="17" ry="8" fill="#fad390" />
    {/* Little Cute Paw Imprint on Cushion */}
    <circle cx="27" cy="23" r="2.5" fill="#e67e22" />
    <circle cx="23" cy="19.5" r="1.3" fill="#e67e22" />
    <circle cx="26" cy="18" r="1.3" fill="#e67e22" />
    <circle cx="29" cy="18" r="1.3" fill="#e67e22" />
    <circle cx="32" cy="19.5" r="1.3" fill="#e67e22" />
  </svg>
);

export const JakeAI: React.FC<JakeProps> = (props) => {
  const {
    backendUrl = '',
    theme = 'auto',
    name = 'Jake',
    showDogHouse = true,
    className = '',
    style = {}
  } = props;

  const corgiRef = useRef<HTMLDivElement>(null);
  const movementEngineRef = useRef<MovementEngine | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState<boolean>(false);
  const [isSleeping, setIsSleeping] = useState<boolean>(false);
  const [corgiCoord, setCorgiCoord] = useState<{ x: number; y: number }>({ x: 100, y: 100 });

  const aiService = useMemo(() => new AIService(backendUrl), [backendUrl]);

  useEffect(() => {
    aiService.setBackendUrl(backendUrl);
  }, [backendUrl, aiService]);

  useEffect(() => {
    injectStyles(theme);

    if (corgiRef.current) {
      const engine = new MovementEngine(corgiRef.current, props, (x, y) => {
        setCorgiCoord({ x, y });
        setIsActionMenuOpen((prev) => !prev);
      });
      movementEngineRef.current = engine;
      setIsSleeping(engine.isSleeping);

      let animId: number;
      const onFrame = (time: number) => {
        engine.step(time);
        animId = requestAnimationFrame(onFrame);
      };
      animId = requestAnimationFrame(onFrame);

      if (typeof window !== 'undefined') {
        window.JakeAI = {
          openChat: (x, y) => {
            if (x && y) engine.teleportTo(x, y);
            setCorgiCoord({ x: engine.corgiX, y: engine.corgiY });
            setIsChatOpen(true);
            setIsActionMenuOpen(false);
          },
          closeChat: () => {
            setIsChatOpen(false);
          },
          toggleChat: () => {
            setCorgiCoord({ x: engine.corgiX, y: engine.corgiY });
            setIsChatOpen((prev) => !prev);
            setIsActionMenuOpen(false);
          },
          say: (text: string) => {
            console.log(`[JakeAI] say: ${text}`);
          },
          showHint: (text: string, duration?: number) => {
            engine.showHint(text, duration);
          },
          moveTo: (x: number, y: number) => {
            engine.teleportTo(x, y);
          },
          setSpeed: (speed: number) => {
            engine.config.speed = speed;
          },
          version: '1.0.0'
        };
      }

      return () => {
        cancelAnimationFrame(animId);
      };
    }
  }, [theme]);

  // Click outside to close action menu
  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#jake-ai-corgi') && !target.closest('#jake-ai-dogbed') && !target.closest('.jake-action-menu')) {
        setIsActionMenuOpen(false);
      }
    };
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  const handleOpenChat = () => {
    setIsActionMenuOpen(false);
    setIsChatOpen(true);
  };

  const handleGoToBed = () => {
    if (movementEngineRef.current) {
      movementEngineRef.current.goToBed();
      setIsSleeping(true);
      setCorgiCoord({
        x: movementEngineRef.current.corgiX,
        y: movementEngineRef.current.corgiY
      });
    }
    setIsActionMenuOpen(false);
  };

  const handleWakeUp = () => {
    if (movementEngineRef.current) {
      movementEngineRef.current.wakeUp();
      setIsSleeping(false);
    }
    setIsActionMenuOpen(false);
  };

  const handleDogBedClick = () => {
    if (movementEngineRef.current) {
      if (isSleeping) {
        handleWakeUp();
      } else {
        handleGoToBed();
      }
    }
  };

  return (
    <div
      id="jake-ai-container"
      className={`jake-ai-root jake-theme-${theme} ${className}`}
      style={style}
    >
      {/* Corgi Pet Element */}
      <div
        ref={corgiRef}
        id="jake-ai-corgi"
        className="jake-corgi-sprite"
        role="button"
        tabIndex={0}
        aria-label={`${name} the Corgi companion`}
      >
        {/* Action Menu popup directly above Corgi */}
        <div className={`jake-action-menu ${isActionMenuOpen ? 'jake-menu-open' : ''}`}>
          <button
            type="button"
            className="jake-action-btn"
            onClick={handleOpenChat}
            title="Mở khung trò chuyện"
          >
            💬 Trò chuyện
          </button>

          {isSleeping ? (
            <button
              type="button"
              className="jake-action-btn"
              onClick={handleWakeUp}
              title="Đánh thức Jake dậy"
            >
              🐾 Đi theo chuột
            </button>
          ) : (
            <button
              type="button"
              className="jake-action-btn"
              onClick={handleGoToBed}
              title="Cho Jake về chỗ ngủ"
            >
              💤 Về chỗ ngủ
            </button>
          )}
        </div>
      </div>

      {/* Dog Bed (Sleep Cushion at bottom right) */}
      {showDogHouse && (
        <button
          type="button"
          id="jake-ai-dogbed"
          className="jake-dogbed"
          onClick={handleDogBedClick}
          aria-label={`${name}'s Bed`}
          title={isSleeping ? "Nhấp để gọi Jake dậy 🐾" : "Nhấp để Jake về chỗ ngủ 💤"}
        >
          <DogBedIcon className="jake-dogbed-svg" />
          {isSleeping && <span className="jake-sleep-zzz">zZz</span>}
          <span className="jake-dogbed-tooltip">
            {isSleeping ? "Jake đang ngủ (Nhấp để gọi dậy) 🐾" : "Chỗ ngủ của Jake (Nhấp để về ngủ) 💤"}
          </span>
        </button>
      )}

      {/* Interactive Chat Window */}
      <ChatModal
        {...props}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        aiService={aiService}
        corgiPos={corgiCoord}
      />
    </div>
  );
};

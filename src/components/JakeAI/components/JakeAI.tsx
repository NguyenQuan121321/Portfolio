import React, { useEffect, useRef, useState, useMemo } from 'react';
import { JakeProps } from '../types';
import { injectStyles } from '../styles/styles';
import { MovementEngine } from '../engine/MovementEngine';
import { AIService } from '../services/aiService';
import { ChatModal } from './ChatModal';
import { COZY_BED_BASE64 } from '../assets';

export const JakeAI: React.FC<JakeProps> = (props) => {
  const {
    backendUrl = '',
    theme = 'dark',
    name = 'Jake',
    dogHouseImage,
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

  // Close action menu on outside click
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

  const handleOpenChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsActionMenuOpen(false);
    setIsChatOpen(true);
  };

  const handleGoToBed = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleWakeUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (movementEngineRef.current) {
      movementEngineRef.current.wakeUp();
      setIsSleeping(false);
      setCorgiCoord({
        x: movementEngineRef.current.corgiX,
        y: movementEngineRef.current.corgiY
      });
    }
    setIsActionMenuOpen(false);
  };

  const handleDogBedClick = () => {
    if (isSleeping) {
      if (movementEngineRef.current) {
        movementEngineRef.current.wakeUp();
        setIsSleeping(false);
      }
    } else {
      if (movementEngineRef.current) {
        movementEngineRef.current.goToBed();
        setIsSleeping(true);
      }
    }
  };

  const bedImageSrc = dogHouseImage || COZY_BED_BASE64;

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
        className={`jake-corgi-sprite ${isSleeping ? 'jake-corgi-hidden' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={`${name} the Corgi companion`}
      >
        {/* Action Menu popup directly above Corgi: 2 compact circular icon buttons */}
        <div className={`jake-action-menu ${isActionMenuOpen ? 'jake-menu-open' : ''}`}>
          <button
            type="button"
            className="jake-circle-action-btn"
            onClick={handleOpenChat}
            title="Trò chuyện với Jake AI"
            aria-label="Trò chuyện"
          >
            💬
          </button>

          {isSleeping ? (
            <button
              type="button"
              className="jake-circle-action-btn"
              onClick={handleWakeUp}
              title="Gọi Jake thức dậy"
              aria-label="Gọi Jake thức dậy"
            >
              🐾
            </button>
          ) : (
            <button
              type="button"
              className="jake-circle-action-btn"
              onClick={handleGoToBed}
              title="Cho Jake về đệm ngủ"
              aria-label="Cho Jake về đệm ngủ"
            >
              💤
            </button>
          )}
        </div>
      </div>

      {/* Cozy Dog Bed (At bottom right corner) */}
      {showDogHouse && (
        <button
          type="button"
          id="jake-ai-dogbed"
          className={`jake-dogbed ${isSleeping ? 'jake-bed-sleeping' : ''}`}
          onClick={handleDogBedClick}
          aria-label={`${name}'s Cozy Bed`}
          title={isSleeping ? "Jake đang ngủ (Nhấp để gọi dậy) 🐾" : "Đệm ngủ của Jake (Nhấp để về ngủ) 💤"}
        >
          <img
            src={bedImageSrc}
            alt={`${name}'s Cozy Bed`}
            className="jake-cozybed-img"
          />
          {isSleeping && <span className="jake-sleep-zzz">zZz</span>}
          <span className="jake-dogbed-tooltip">
            {isSleeping ? `Gọi ${name} thức dậy 🐾` : `Đệm ngủ của ${name} 💤`}
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

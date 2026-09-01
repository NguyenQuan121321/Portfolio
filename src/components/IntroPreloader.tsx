import React, { useState, useEffect, useCallback } from 'react';
import { TerminalWindow } from '@phosphor-icons/react';

interface IntroPreloaderProps {
  onComplete?: () => void;
}

export const IntroPreloader: React.FC<IntroPreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Smooth boot progression over 2.0 seconds
  useEffect(() => {
    const totalDuration = 1800; // 1.8s loading + ~0.35s transition = 2s total
    const intervalTime = 20;
    const increment = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              setIsVisible(false);
              onComplete?.();
            }, 350);
          }, 120);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Support ESC or Skip button
  const handleSkip = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 250);
  }, [onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  if (!isVisible) return null;

  // Ultra-fast readable boot logs
  const getBootLog = (p: number) => {
    if (p < 35) return "Initializing Go 1.26 Core & Goroutine Scheduler...";
    if (p < 75) return "Verifying Redis 7 Token Rotation & Security Subsystems...";
    return "Render Live API Verified (HTTP 200 OK). Launching Portfolio...";
  };

  return (
    <aside 
      aria-label="Welcome Introduction Loader"
      className={`fixed inset-0 z-[9999] bg-surface-950 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden transition-all duration-350 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-[1.02] blur-sm pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Architectural Grid & Ambient Glows */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]" 
        style={{ 
          backgroundImage: `radial-gradient(#00E5FF 1.5px, transparent 1.5px)`, 
          backgroundSize: '32px 32px' 
        }} 
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-7 px-4">
        
        {/* Holographic Avatar Core with Dual Rotating Tech Rings */}
        <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          {/* Outer Spin Ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/40 border-t-accent-cyan animate-spin [animation-duration:2s]"></div>
          {/* Inner Reverse Spin Ring */}
          <div className="absolute -inset-1.5 rounded-full border border-dashed border-emerald-500/30 border-r-emerald-400 animate-spin [animation-duration:4s] [animation-direction:reverse]"></div>
          {/* Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/15 blur-xl animate-pulse"></div>

          {/* 2-Frame Sprite Avatar */}
          <div 
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-accent-cyan bg-surface-900 bg-[url('/finn.png')] bg-[length:200%_100%] bg-[position:0%_center] hover:bg-[position:100%_center] transition-all duration-300 shadow-[0_0_25px_-4px_rgba(0,229,255,0.6)]"
          />
        </div>

        {/* Eyebrow / Security Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10.5px] font-mono text-cyan-300 shadow-[0_0_15px_-3px_rgba(0,229,255,0.3)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
          </span>
          <span className="tracking-wider">FINN.DEV · DISTRIBUTED SYSTEMS & SECURITY</span>
        </div>

        {/* Requested Welcome Headline */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-normal text-zinc-100 drop-shadow-[0_0_35px_rgba(0,229,255,0.4)] leading-snug">
            <span>Welcome to </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-accent-cyan to-emerald-300">
              Finn Portfolio
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-lg mx-auto">
            Nguyen Hoang Anh Quan · Backend Developer & API Security Specialist
          </p>
        </div>

        {/* Progress & Live Boot Telemetry */}
        <div className="w-full max-w-md mx-auto space-y-3 pt-1">
          
          {/* Status Header */}
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400 px-1">
            <div className="flex items-center gap-2">
              <TerminalWindow size={15} className="text-accent-cyan animate-pulse" />
              <span className="text-zinc-300 font-semibold tracking-wider text-[11px]">WARP BOOT KERNEL</span>
            </div>
            <span className="text-accent-cyan font-bold text-sm font-mono tracking-widest">
              {Math.min(100, Math.floor(progress)).toString().padStart(2, '0')}%
            </span>
          </div>

          {/* Progress Bar with Glowing Laser Head */}
          <div className="relative h-2 w-full bg-surface-900 rounded-full overflow-hidden border border-border-subtle p-0.5 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-cyan-600 via-accent-cyan to-emerald-400 rounded-full transition-all duration-75 shadow-[0_0_15px_rgba(0,229,255,0.8)] relative"
              style={{ width: `${Math.min(100, progress)}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
            </div>
          </div>

          {/* Dynamic Boot Step Log */}
          <div className="h-5 flex items-center justify-center font-mono text-[11px] text-zinc-400 px-2">
            <span className="text-accent-cyan mr-1.5 font-bold">&gt;</span>
            <span className="text-zinc-300 truncate transition-all duration-150">
              {getBootLog(progress)}
            </span>
          </div>

        </div>

      </div>

      {/* Skip Button at Bottom-Right */}
      <div className="absolute bottom-6 right-6 z-20">
        <button
          type="button"
          onClick={handleSkip}
          className="px-3 py-1 rounded-lg bg-surface-900/80 hover:bg-surface-850 border border-border-subtle hover:border-accent-cyan/50 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-all flex items-center gap-1.5 backdrop-blur-sm shadow-lg hover:scale-105 active:scale-95"
        >
          <span>Bỏ qua</span>
          <span className="text-zinc-500 text-[10px]">(ESC / Skip)</span>
        </button>
      </div>

      {/* Watermark / Tech Spec Tag */}
      <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-2 text-[10.5px] font-mono text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        <span>Go 1.26 · Redis 7 · Clean Architecture</span>
      </div>

    </aside>
  );
};

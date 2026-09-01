import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeTransitionEffect: React.FC = () => {
  const { transitionType } = useTheme();

  if (!transitionType) return null;

  return (
    <div 
      aria-hidden="true"
      className="fixed inset-0 z-[9990] pointer-events-none overflow-hidden select-none"
    >
      {/* ☀️ SUNRISE: Golden sunrise light sweep expanding from bottom-left across the screen */}
      {transitionType === 'sunrise' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/40 via-orange-100/25 to-sky-100/20 animate-sunrise-sweep" />
      )}

      {/* 🌙 SUNSET: Twilight darkness sweep expanding from bottom-right across the screen */}
      {transitionType === 'sunset' && (
        <div className="absolute inset-0 bg-gradient-to-tl from-orange-600/35 via-purple-950/50 to-surface-950 animate-sunset-sweep" />
      )}
    </div>
  );
};

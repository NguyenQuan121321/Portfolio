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
      {/* ☀️ SUNRISE: Luồng ánh sáng bình minh lan toả cong từ dưới bên trái lên đỉnh rồi qua phải */}
      {transitionType === 'sunrise' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-300/40 via-orange-100/25 to-sky-100/20 animate-sunrise-sweep" />
      )}

      {/* 🌙 SUNSET: Luồng bóng tối hoàng hôn lan toả cong từ dưới bên phải lên đỉnh rồi qua trái */}
      {transitionType === 'sunset' && (
        <div className="absolute inset-0 bg-gradient-to-tl from-orange-600/35 via-purple-950/50 to-surface-950 animate-sunset-sweep" />
      )}
    </div>
  );
};

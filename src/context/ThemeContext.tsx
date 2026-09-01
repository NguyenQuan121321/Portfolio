import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  transitionType: 'sunrise' | 'sunset' | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [transitionType, setTransitionType] = useState<'sunrise' | 'sunset' | null>(null);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    const body = document.body;

    root.setAttribute('data-theme', t);
    if (body) body.setAttribute('data-theme', t);

    if (t === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      if (body) {
        body.classList.add('dark');
        body.classList.remove('light');
      }
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      if (body) {
        body.classList.remove('dark');
        body.classList.add('light');
      }
    }
  };

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('finn_theme') as Theme;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        setThemeState('dark');
        applyTheme('dark');
      }
    } catch {
      setThemeState('dark');
      applyTheme('dark');
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    const type = newTheme === 'light' ? 'sunrise' : 'sunset';
    setTransitionType(type);
    setThemeState(newTheme);
    try {
      localStorage.setItem('finn_theme', newTheme);
    } catch {
      // ignore
    }
    applyTheme(newTheme);

    // Reset transition effect after 1600ms
    setTimeout(() => {
      setTransitionType(null);
    }, 1600);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, transitionType }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

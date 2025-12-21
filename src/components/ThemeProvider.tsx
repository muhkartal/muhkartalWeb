import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle Dynamic Favicon based on System Preference (Browser Theme)
  useEffect(() => {
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!favicon) return;

    const updateFavicon = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDark = e.matches;
      if (isDark) {
        // System is Dark -> Tab is Dark -> Use Light Icon (White)
        favicon.href = 'https://img.icons8.com/?size=100&id=OwxAdV9EpT94&format=png&color=FFFFFF';
      } else {
        // System is Light -> Tab is Light -> Use Dark Icon (Black)
        favicon.href = 'https://img.icons8.com/?size=100&id=OwxAdV9EpT94&format=png&color=000000';
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial
    updateFavicon(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', updateFavicon);
    
    return () => mediaQuery.removeEventListener('change', updateFavicon);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

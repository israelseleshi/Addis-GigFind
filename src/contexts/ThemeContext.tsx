// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'addis-gigfind-theme',
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Calculate actual theme based on user preference and system
  const calculateActualTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      } else {
        setThemeState('system');
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      setThemeState('system');
    }
  }, [storageKey]);

  // Update actual theme when theme changes
  useEffect(() => {
    const newActualTheme = calculateActualTheme(theme);
    setActualTheme(newActualTheme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setActualTheme(getSystemTheme());
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(actualTheme);
    
    // Set CSS custom property for theme
    root.style.setProperty('--theme', actualTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        actualTheme === 'dark' ? '#0A2239' : '#FFFFFF'
      );
    }

    // Update favicon based on theme (if you have dark/light variants)
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      const faviconPath = actualTheme === 'dark' 
        ? '/favicon-dark.ico' 
        : '/favicon-light.ico';
      
      // Only update if the favicon files exist
      fetch(faviconPath, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            favicon.href = faviconPath;
          }
        })
        .catch(() => {
          // Silently fail if favicon variants don't exist
        });
    }
  }, [actualTheme]);

  // Set theme function
  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
      setThemeState(newTheme);
    }
  };

  // Toggle between light and dark (skips system)
  const toggleTheme = () => {
    if (theme === 'system') {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  };

  const value: ThemeContextType = {
    theme,
    actualTheme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme transition component for smooth theme changes
export const ThemeTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { actualTheme } = useTheme();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 150);
    return () => clearTimeout(timer);
  }, [actualTheme]);

  return (
    <div 
      className={`transition-colors duration-150 ease-in-out ${
        isTransitioning ? 'pointer-events-none' : ''
      }`}
    >
      {children}
    </div>
  );
};

// Hook for theme-aware animations
export const useThemeTransition = () => {
  const { actualTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [actualTheme]);

  return { isTransitioning, actualTheme };
};

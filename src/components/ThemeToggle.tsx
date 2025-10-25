// @ts-nocheck
import React, { useState } from 'react';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from './ui/utils';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'switch';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'dropdown',
  size = 'md',
  showLabel = false,
  className,
}) => {
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setIsAnimating(true);
    setTheme(newTheme);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getThemeIcon = (themeType: string, isActive: boolean = false) => {
    const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
    const iconClass = cn(
      iconSize,
      'transition-all duration-200',
      isActive && 'text-[#FFB300] scale-110'
    );

    switch (themeType) {
      case 'light':
        return <Sun className={iconClass} />;
      case 'dark':
        return <Moon className={iconClass} />;
      case 'system':
        return <Monitor className={iconClass} />;
      default:
        return <Palette className={iconClass} />;
    }
  };

  const getCurrentThemeIcon = () => {
    return getThemeIcon(theme === 'system' ? 'system' : actualTheme, true);
  };

  // Simple toggle button (light/dark only)
  if (variant === 'button') {
    return (
      <Button
        variant="ghost"
        size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'icon'}
        onClick={toggleTheme}
        className={cn(
          'relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95',
          isAnimating && 'animate-pulse',
          className
        )}
        aria-label={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        <div className={cn(
          'transition-all duration-300 transform',
          actualTheme === 'dark' ? 'rotate-180 scale-0' : 'rotate-0 scale-100'
        )}>
          <Sun className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
        </div>
        <div className={cn(
          'absolute inset-0 flex items-center justify-center transition-all duration-300 transform',
          actualTheme === 'dark' ? 'rotate-0 scale-100' : 'rotate-180 scale-0'
        )}>
          <Moon className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
        </div>
      </Button>
    );
  }

  // Switch style toggle
  if (variant === 'switch') {
    return (
      <div className={cn('flex items-center space-x-3', className)}>
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </span>
        )}
        <button
          onClick={toggleTheme}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFB300] focus:ring-offset-2 dark:focus:ring-offset-gray-800',
            actualTheme === 'dark' 
              ? 'bg-[#0A2239]' 
              : 'bg-gray-200'
          )}
          aria-label={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-lg',
              actualTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'
            )}
          >
            <span className="flex items-center justify-center h-full w-full">
              {actualTheme === 'dark' ? (
                <Moon className="h-2 w-2 text-[#0A2239]" />
              ) : (
                <Sun className="h-2 w-2 text-[#FFB300]" />
              )}
            </span>
          </span>
        </button>
      </div>
    );
  }

  // Dropdown menu (default)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={size === 'sm' ? 'sm' : 'icon'}
          className={cn(
            'relative transition-all duration-300 hover:scale-105 active:scale-95',
            isAnimating && 'animate-pulse',
            className
          )}
          aria-label="Theme options"
        >
          <div className="relative">
            {getCurrentThemeIcon()}
            {/* Animated ring indicator */}
            <div className={cn(
              'absolute inset-0 rounded-full border-2 border-[#FFB300] transition-all duration-300',
              isAnimating ? 'scale-150 opacity-0' : 'scale-0 opacity-100'
            )} />
          </div>
          {showLabel && (
            <span className="ml-2 text-sm font-medium capitalize">
              {theme}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <DropdownMenuLabel className="text-gray-700 dark:text-gray-300">
          Theme Preference
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        
        <DropdownMenuItem
          onClick={() => handleThemeChange('light')}
          className={cn(
            'flex items-center space-x-3 cursor-pointer transition-colors duration-200',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            theme === 'light' && 'bg-[#FFB300]/10 text-[#FFB300] dark:bg-[#FFB300]/20'
          )}
        >
          {getThemeIcon('light', theme === 'light')}
          <span>Light</span>
          {theme === 'light' && (
            <div className="ml-auto h-2 w-2 rounded-full bg-[#FFB300]" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleThemeChange('dark')}
          className={cn(
            'flex items-center space-x-3 cursor-pointer transition-colors duration-200',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            theme === 'dark' && 'bg-[#FFB300]/10 text-[#FFB300] dark:bg-[#FFB300]/20'
          )}
        >
          {getThemeIcon('dark', theme === 'dark')}
          <span>Dark</span>
          {theme === 'dark' && (
            <div className="ml-auto h-2 w-2 rounded-full bg-[#FFB300]" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => handleThemeChange('system')}
          className={cn(
            'flex items-center space-x-3 cursor-pointer transition-colors duration-200',
            'hover:bg-gray-100 dark:hover:bg-gray-700',
            theme === 'system' && 'bg-[#FFB300]/10 text-[#FFB300] dark:bg-[#FFB300]/20'
          )}
        >
          {getThemeIcon('system', theme === 'system')}
          <span>System</span>
          {theme === 'system' && (
            <div className="ml-auto h-2 w-2 rounded-full bg-[#FFB300]" />
          )}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        
        <div className="px-2 py-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Current: {actualTheme === 'light' ? '☀️ Light' : '🌙 Dark'}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Compact theme indicator for status bars
export const ThemeIndicator: React.FC<{ className?: string }> = ({ className }) => {
  const { actualTheme } = useTheme();
  
  return (
    <div className={cn(
      'flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400',
      className
    )}>
      {actualTheme === 'light' ? (
        <>
          <Sun className="h-3 w-3" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon className="h-3 w-3" />
          <span>Dark</span>
        </>
      )}
    </div>
  );
};

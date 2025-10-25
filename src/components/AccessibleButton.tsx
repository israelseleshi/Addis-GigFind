// @ts-nocheck
import React, { forwardRef } from 'react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  className?: string;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    children, 
    loading = false, 
    loadingText, 
    ariaLabel, 
    ariaDescribedBy,
    disabled,
    onClick,
    className = '',
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled && onClick) {
        onClick(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!isDisabled && onClick) {
          onClick(e as any);
        }
      }
    };

    return (
      <Button
        ref={ref}
        {...props}
        className={`focus-ring ${className}`}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-disabled={isDisabled}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
      >
        {loading && (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading...</span>
          </>
        )}
        <span aria-hidden={loading}>
          {loading && loadingText ? loadingText : children}
        </span>
      </Button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

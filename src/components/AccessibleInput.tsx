// @ts-nocheck
import React, { forwardRef, useState } from 'react';
import { Input } from './ui/input';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { AccessibleButton } from './AccessibleButton';

interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: string;
  hint?: string;
  showPasswordToggle?: boolean;
  required?: boolean;
  className?: string;
}

export const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ 
    label, 
    error, 
    success, 
    hint, 
    showPasswordToggle = false, 
    required = false,
    type = 'text',
    id,
    className = '',
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const successId = success ? `${inputId}-success` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;
    
    const describedBy = [errorId, successId, hintId].filter(Boolean).join(' ');
    const inputType = showPasswordToggle && type === 'password' 
      ? (showPassword ? 'text' : 'password') 
      : type;

    const hasError = Boolean(error);
    const hasSuccess = Boolean(success);

    return (
      <div className={`space-y-2 ${className}`}>
        {/* Label */}
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium transition-colors duration-200 ${
            hasError 
              ? 'text-red-700' 
              : hasSuccess 
                ? 'text-green-700'
                : isFocused 
                  ? 'text-[#FFB300]' 
                  : 'text-[#2D3748]'
          }`}
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">
              *
            </span>
          )}
        </label>

        {/* Hint */}
        {hint && (
          <p 
            id={hintId}
            className="text-sm text-[#4A5568]"
            role="note"
          >
            {hint}
          </p>
        )}

        {/* Input Container */}
        <div className="relative">
          <Input
            ref={ref}
            {...props}
            id={inputId}
            type={inputType}
            required={required}
            aria-invalid={hasError}
            aria-describedby={describedBy || undefined}
            aria-required={required}
            className={`focus-ring transition-all duration-200 ${
              hasError 
                ? 'error-state border-red-500 focus:border-red-500' 
                : hasSuccess 
                  ? 'success-state border-green-500 focus:border-green-500'
                  : 'border-[#E2E8F0] focus:border-[#FFB300]'
            } ${showPasswordToggle ? 'pr-12' : ''}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {/* Password Toggle */}
          {showPasswordToggle && type === 'password' && (
            <AccessibleButton
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              ariaLabel={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-[#4A5568]" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4 text-[#4A5568]" aria-hidden="true" />
              )}
            </AccessibleButton>
          )}

          {/* Status Icons */}
          {(hasError || hasSuccess) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {hasError && (
                <AlertCircle 
                  className="h-5 w-5 text-red-500" 
                  aria-hidden="true"
                />
              )}
              {hasSuccess && (
                <CheckCircle 
                  className="h-5 w-5 text-green-500" 
                  aria-hidden="true"
                />
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p 
            id={errorId}
            className="text-sm text-red-600 flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p 
            id={successId}
            className="text-sm text-green-600 flex items-center gap-1"
            role="status"
            aria-live="polite"
          >
            <CheckCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {success}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';

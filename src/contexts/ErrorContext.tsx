// @ts-nocheck
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AppError {
  id: string;
  type: 'network' | 'validation' | 'api' | 'general';
  message: string;
  details?: string;
  timestamp: Date;
}

interface ErrorContextType {
  errors: AppError[];
  addError: (error: Omit<AppError, 'id' | 'timestamp'>) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
  hasErrors: boolean;
  networkError: boolean;
  setNetworkError: (hasError: boolean) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<AppError[]>([]);
  const [networkError, setNetworkError] = useState(false);

  const addError = (error: Omit<AppError, 'id' | 'timestamp'>) => {
    const newError: AppError = {
      ...error,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    
    setErrors(prev => [...prev, newError]);
    
    // Auto-remove error after 5 seconds for non-critical errors
    if (error.type !== 'network') {
      setTimeout(() => {
        removeError(newError.id);
      }, 5000);
    }
  };

  const removeError = (id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const hasErrors = errors.length > 0;

  return (
    <ErrorContext.Provider
      value={{
        errors,
        addError,
        removeError,
        clearErrors,
        hasErrors,
        networkError,
        setNetworkError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}

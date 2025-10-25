// @ts-nocheck
import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  pageTransition: boolean;
  setPageTransition: (loading: boolean) => void;
  searchLoading: boolean;
  setSearchLoading: (loading: boolean) => void;
  formLoading: boolean;
  setFormLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        pageTransition,
        setPageTransition,
        searchLoading,
        setSearchLoading,
        formLoading,
        setFormLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

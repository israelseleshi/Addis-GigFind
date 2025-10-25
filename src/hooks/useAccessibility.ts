// @ts-nocheck
import { useEffect, useState, useCallback } from 'react';

// Hook for managing keyboard navigation
export function useKeyboardNavigation() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
        document.body.classList.add('keyboard-nav');
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardUser(false);
      document.body.classList.remove('keyboard-nav');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isKeyboardUser;
}

// Hook for managing focus trap
export function useFocusTrap(isActive: boolean) {
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([]);
  const [firstElement, setFirstElement] = useState<HTMLElement | null>(null);
  const [lastElement, setLastElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    const elements = Array.from(document.querySelectorAll(focusableSelectors)) as HTMLElement[];
    setFocusableElements(elements);
    setFirstElement(elements[0] || null);
    setLastElement(elements[elements.length - 1] || null);

    // Focus first element
    if (elements[0]) {
      elements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        // Allow parent to handle escape
        const escapeEvent = new CustomEvent('focustrap:escape');
        document.dispatchEvent(escapeEvent);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, firstElement, lastElement]);

  return { focusableElements, firstElement, lastElement };
}

// Hook for screen reader announcements
export function useScreenReader() {
  const [announcer, setAnnouncer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'screen-reader-announcer';
    document.body.appendChild(liveRegion);
    setAnnouncer(liveRegion);

    return () => {
      if (liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion);
      }
    };
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announcer) {
      announcer.setAttribute('aria-live', priority);
      announcer.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }
  }, [announcer]);

  return { announce };
}

// Hook for managing reduced motion preferences
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

// Hook for managing high contrast preferences
export function useHighContrast() {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersHighContrast;
}

// Hook for managing ARIA live regions
export function useAriaLiveRegion(regionId: string) {
  const [region, setRegion] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let liveRegion = document.getElementById(regionId);
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = regionId;
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    
    setRegion(liveRegion);

    return () => {
      if (liveRegion && liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion);
      }
    };
  }, [regionId]);

  const updateRegion = useCallback((content: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (region) {
      region.setAttribute('aria-live', priority);
      region.textContent = content;
    }
  }, [region]);

  return { updateRegion };
}

// Hook for managing focus management
export function useFocusManagement() {
  const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    setPreviousFocus(document.activeElement as HTMLElement);
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousFocus && previousFocus.focus) {
      previousFocus.focus();
    }
  }, [previousFocus]);

  const focusElement = useCallback((selector: string | HTMLElement) => {
    const element = typeof selector === 'string' 
      ? document.querySelector(selector) as HTMLElement
      : selector;
    
    if (element && element.focus) {
      element.focus();
    }
  }, []);

  return { saveFocus, restoreFocus, focusElement };
}

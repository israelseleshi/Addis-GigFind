// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { cn } from './ui/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

// Generate optimized Unsplash URLs with different formats and sizes
const generateUnsplashSrcSet = (src: string, quality: number = 80) => {
  if (!src.includes('unsplash.com')) return src;
  
  const baseUrl = src.split('?')[0];
  const sizes = [400, 800, 1200, 1600, 2000];
  
  const webpSrcSet = sizes
    .map(size => `${baseUrl}?w=${size}&q=${quality}&fm=webp ${size}w`)
    .join(', ');
    
  const jpegSrcSet = sizes
    .map(size => `${baseUrl}?w=${size}&q=${quality}&fm=jpg ${size}w`)
    .join(', ');
    
  return { webpSrcSet, jpegSrcSet };
};

// Generate blur placeholder
const generateBlurDataURL = (width: number = 10, height: number = 10) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a subtle gradient blur placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(0.5, '#e5e7eb');
    gradient.addColorStop(1, '#d1d5db');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 80,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  loading = 'lazy',
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate optimized URLs
  const { webpSrcSet, jpegSrcSet } = generateUnsplashSrcSet(src, quality);
  const placeholderDataURL = blurDataURL || generateBlurDataURL(width || 400, height || 300);

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // WebP support detection
  const [supportsWebP, setSupportsWebP] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const dataURL = canvas.toDataURL('image/webp');
      setSupportsWebP(dataURL.indexOf('data:image/webp') === 0);
    };

    checkWebPSupport();
  }, []);

  // Don't render until we know WebP support status
  if (supportsWebP === null) {
    return (
      <div 
        className={cn(
          'animate-pulse bg-gray-200 dark:bg-gray-700',
          className
        )}
        style={{ width, height }}
      />
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)} ref={imgRef}>
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={placeholderDataURL}
          alt=""
          className={cn(
            'absolute inset-0 w-full h-full transition-opacity duration-300',
            isLoaded ? 'opacity-0' : 'opacity-100'
          )}
          style={{ objectFit }}
          aria-hidden="true"
        />
      )}

      {/* Loading shimmer effect */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]" />
      )}

      {/* Main image with progressive enhancement */}
      {(isInView || priority) && !hasError && (
        <picture>
          {/* WebP source for modern browsers */}
          {supportsWebP && webpSrcSet && (
            <source
              srcSet={webpSrcSet}
              sizes={sizes}
              type="image/webp"
            />
          )}
          
          {/* JPEG fallback */}
          <source
            srcSet={jpegSrcSet}
            sizes={sizes}
            type="image/jpeg"
          />
          
          {/* Fallback img element */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : loading}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              'w-full h-full transition-all duration-500 ease-out',
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
              hasError && 'hidden'
            )}
            style={{ objectFit }}
            decoding="async"
            fetchpriority={priority ? 'high' : 'auto'}
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div className={cn(
          'flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500',
          className
        )}>
          <div className="text-center p-4">
            <svg
              className="mx-auto h-12 w-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Loading indicator for priority images */}
      {priority && !isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}
    </div>
  );
};

// Preload critical images
export const preloadImage = (src: string, priority: boolean = false) => {
  const link = document.createElement('link');
  link.rel = priority ? 'preload' : 'prefetch';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

// Image optimization utilities
export const getOptimizedImageUrl = (
  src: string,
  width?: number,
  height?: number,
  quality: number = 80,
  format: 'webp' | 'jpg' | 'auto' = 'auto'
) => {
  if (!src.includes('unsplash.com')) return src;
  
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  params.set('q', quality.toString());
  params.set('fm', format === 'auto' ? 'jpg' : format);
  params.set('fit', 'crop');
  params.set('crop', 'smart');
  
  return `${src.split('?')[0]}?${params.toString()}`;
};

// @ts-nocheck
import { useState, useEffect, useMemo } from 'react';
import { categories } from '../lib/data';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  freelancer: string;
  tags: string[];
  type: 'gig' | 'freelancer' | 'category';
}

// Mock gig data for search
const mockGigs: SearchResult[] = [
  {
    id: '1',
    title: 'Professional Logo Design',
    description: 'I will create a modern, professional logo for your business with unlimited revisions',
    category: 'Design',
    location: 'Bole, Addis Ababa',
    price: 1500,
    rating: 4.9,
    freelancer: 'Sarah Tadesse',
    tags: ['logo', 'design', 'branding', 'graphic design'],
    type: 'gig'
  },
  {
    id: '2',
    title: 'Website Development',
    description: 'Full-stack web development using React, Node.js, and modern technologies',
    category: 'Web Development',
    location: 'Kazanchis, Addis Ababa',
    price: 8000,
    rating: 4.8,
    freelancer: 'Michael Bekele',
    tags: ['website', 'react', 'nodejs', 'fullstack'],
    type: 'gig'
  },
  {
    id: '3',
    title: 'Content Writing Services',
    description: 'Professional content writing for blogs, websites, and marketing materials',
    category: 'Writing',
    location: 'Piassa, Addis Ababa',
    price: 500,
    rating: 4.7,
    freelancer: 'Hanan Ahmed',
    tags: ['writing', 'content', 'blog', 'copywriting'],
    type: 'gig'
  },
  {
    id: '4',
    title: 'Mobile App Development',
    description: 'Native iOS and Android app development with modern UI/UX design',
    category: 'Mobile Development',
    location: 'Megenagna, Addis Ababa',
    price: 12000,
    rating: 4.9,
    freelancer: 'Daniel Worku',
    tags: ['mobile', 'ios', 'android', 'app development'],
    type: 'gig'
  },
  {
    id: '5',
    title: 'Photography Services',
    description: 'Professional photography for events, portraits, and commercial projects',
    category: 'Photography',
    location: 'CMC, Addis Ababa',
    price: 2000,
    rating: 4.6,
    freelancer: 'Meron Getachew',
    tags: ['photography', 'events', 'portraits', 'commercial'],
    type: 'gig'
  },
  {
    id: '6',
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive digital marketing strategy and social media management',
    category: 'Marketing',
    location: 'Arat Kilo, Addis Ababa',
    price: 3500,
    rating: 4.8,
    freelancer: 'Yonas Haile',
    tags: ['marketing', 'social media', 'strategy', 'digital'],
    type: 'gig'
  },
  {
    id: '7',
    title: 'Translation Services',
    description: 'Professional translation between Amharic, English, and other languages',
    category: 'Translation',
    location: 'Sidist Kilo, Addis Ababa',
    price: 300,
    rating: 4.9,
    freelancer: 'Tigist Alemayehu',
    tags: ['translation', 'amharic', 'english', 'languages'],
    type: 'gig'
  },
  {
    id: '8',
    title: 'Video Editing',
    description: 'Professional video editing for YouTube, social media, and promotional content',
    category: 'Video',
    location: 'Mexico, Addis Ababa',
    price: 1200,
    rating: 4.7,
    freelancer: 'Robel Tesfaye',
    tags: ['video editing', 'youtube', 'social media', 'promotional'],
    type: 'gig'
  }
];

export function useSearch() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minPrice: 0,
    maxPrice: 50000,
    minRating: 0
  });
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Search results based on query and filters
  const searchResults = useMemo(() => {
    if (!query.trim() && !filters.category && !filters.location) {
      return mockGigs;
    }

    return mockGigs.filter(gig => {
      // Text search
      const searchText = query.toLowerCase();
      const matchesText = !searchText || 
        gig.title.toLowerCase().includes(searchText) ||
        gig.description.toLowerCase().includes(searchText) ||
        gig.freelancer.toLowerCase().includes(searchText) ||
        gig.tags.some(tag => tag.toLowerCase().includes(searchText)) ||
        gig.category.toLowerCase().includes(searchText);

      // Category filter
      const matchesCategory = !filters.category || gig.category === filters.category;

      // Location filter
      const matchesLocation = !filters.location || gig.location.includes(filters.location);

      // Price filter
      const matchesPrice = gig.price >= filters.minPrice && gig.price <= filters.maxPrice;

      // Rating filter
      const matchesRating = gig.rating >= filters.minRating;

      return matchesText && matchesCategory && matchesLocation && matchesPrice && matchesRating;
    });
  }, [query, filters]);

  // Generate search suggestions
  const generateSuggestions = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const searchText = query.toLowerCase();
    const suggestions = new Set<string>();

    // Add matching gig titles
    mockGigs.forEach(gig => {
      if (gig.title.toLowerCase().includes(searchText)) {
        suggestions.add(gig.title);
      }
      
      // Add matching tags
      gig.tags.forEach(tag => {
        if (tag.toLowerCase().includes(searchText)) {
          suggestions.add(tag);
        }
      });

      // Add matching categories
      if (gig.category.toLowerCase().includes(searchText)) {
        suggestions.add(gig.category);
      }
    });

    // Add matching categories from the categories list
    categories.forEach(category => {
      if (category.toLowerCase().includes(searchText)) {
        suggestions.add(category);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }, [query]);

  // Update suggestions when query changes
  useEffect(() => {
    setSuggestions(generateSuggestions);
  }, [generateSuggestions]);

  // Simulate search delay
  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [query]);

  const performSearch = (searchQuery: string, searchFilters = filters) => {
    setQuery(searchQuery);
    setFilters(searchFilters);
  };

  const clearSearch = () => {
    setQuery('');
    setFilters({
      category: '',
      location: '',
      minPrice: 0,
      maxPrice: 50000,
      minRating: 0
    });
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    query,
    setQuery,
    filters,
    setFilters,
    updateFilters,
    searchResults,
    isSearching,
    suggestions,
    performSearch,
    clearSearch,
    hasResults: searchResults.length > 0,
    totalResults: searchResults.length
  };
}

// Popular search terms
export const popularSearches = [
  'Logo Design',
  'Website Development',
  'Content Writing',
  'Mobile App',
  'Photography',
  'Video Editing',
  'Translation',
  'Digital Marketing'
];

// Search categories for quick filters
export const searchCategories = [
  'All Categories',
  ...categories
];

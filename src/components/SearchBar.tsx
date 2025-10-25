// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Filter, MapPin, Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { useSearch, popularSearches, searchCategories } from '../hooks/useSearch';
import { addisLocations } from '../lib/data';
import { AccessibleButton } from './AccessibleButton';

interface SearchBarProps {
  onSearch?: (query: string, filters?: any) => void;
  onNavigateToResults?: () => void;
  placeholder?: string;
  showFilters?: boolean;
  compact?: boolean;
  className?: string;
}

export function SearchBar({ 
  onSearch, 
  onNavigateToResults,
  placeholder = "What service do you need?", 
  showFilters = true,
  compact = false,
  className = ""
}: SearchBarProps) {
  const {
    query,
    setQuery,
    filters,
    updateFilters,
    suggestions,
    isSearching,
    performSearch,
    clearSearch
  } = useSearch();

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle search submission
  const handleSearch = () => {
    if (query.trim()) {
      performSearch(query, filters);
      setShowSuggestions(false);
      onSearch?.(query, filters);
      onNavigateToResults?.();
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setShowFiltersPanel(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    performSearch(suggestion, filters);
    onSearch?.(suggestion, filters);
    onNavigateToResults?.();
  };

  // Handle popular search selection
  const handlePopularSearchSelect = (search: string) => {
    setQuery(search);
    performSearch(search, filters);
    onSearch?.(search, filters);
    onNavigateToResults?.();
  };

  // Handle clear search
  const handleClear = () => {
    clearSearch();
    setShowSuggestions(false);
    setShowFiltersPanel(false);
    inputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show suggestions when input is focused and has content
  const handleInputFocus = () => {
    if (query.trim() || suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== '' && value !== 0 && value !== 50000
  ).length;

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      {/* Main Search Input */}
      <div className={`relative ${compact ? 'flex gap-2' : 'space-y-4'}`}>
        <div className="flex-1 relative">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#4A5568] transition-colors duration-300" 
              aria-hidden="true"
            />
            <Input
              ref={inputRef}
              type="search"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={handleInputFocus}
              className={`pl-10 ${query ? 'pr-20' : 'pr-4'} ${compact ? 'h-10' : 'h-12'} border-2 border-gray-300 bg-white focus:border-[#FFB300] focus:ring-2 focus:ring-[#FFB300]/20 shadow-md hover:shadow-lg transition-all duration-300 rounded-lg font-medium text-gray-700 placeholder:text-gray-500`}
              aria-label="Search for services"
              aria-expanded={showSuggestions}
              aria-haspopup="listbox"
              role="combobox"
            />
            
            {/* Loading indicator */}
            {isSearching && (
              <Loader2 className="absolute right-12 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-[#FFB300]" aria-hidden="true" />
            )}
            
            {/* Clear button */}
            {query && (
              <AccessibleButton
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-gray-100"
                onClick={handleClear}
                ariaLabel="Clear search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </AccessibleButton>
            )}
          </div>
        </div>

        {/* Search and Filter Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSearch}
            className={`${compact ? 'h-10 px-4' : 'h-12 px-6'} bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00] font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 border-0`}
            aria-label="Search for services"
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>Search</span>
            </div>
          </Button>

          {showFilters && (
            <Button
              variant="outline"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`${compact ? 'h-10 px-4' : 'h-12 px-6'} relative border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-[#FFB300] font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95`}
              aria-label={`${showFiltersPanel ? 'Hide' : 'Show'} search filters`}
            >
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" aria-hidden="true" />
                <span>Filters</span>
              </div>
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-[#FFB300] text-[#0A2239] text-xs font-bold rounded-full border-2 border-white shadow-sm">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFiltersPanel && showFilters && (
        <Card className="mt-6 border-2 border-[#FFB300]/30 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-[#2D3748] mb-2">
                  Category
                </label>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => updateFilters({ category: value === 'All Categories' ? '' : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {searchCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-[#2D3748] mb-2">
                  Location
                </label>
                <Select 
                  value={filters.location} 
                  onValueChange={(value) => updateFilters({ location: value === 'All Locations' ? '' : value })}
                >
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#4A5568]" aria-hidden="true" />
                      <SelectValue placeholder="All Locations" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Locations">All Locations</SelectItem>
                    {addisLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-[#2D3748] mb-2">
                  Budget Range
                </label>
                <Select 
                  value={`${filters.minPrice}-${filters.maxPrice}`}
                  onValueChange={(value) => {
                    const [min, max] = value.split('-').map(Number);
                    updateFilters({ minPrice: min, maxPrice: max });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50000">Any Budget</SelectItem>
                    <SelectItem value="0-500">Under 500 ETB</SelectItem>
                    <SelectItem value="500-2000">500 - 2,000 ETB</SelectItem>
                    <SelectItem value="2000-5000">2,000 - 5,000 ETB</SelectItem>
                    <SelectItem value="5000-10000">5,000 - 10,000 ETB</SelectItem>
                    <SelectItem value="10000-50000">10,000+ ETB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 pt-4 border-t">
                <AccessibleButton
                  variant="ghost"
                  onClick={() => updateFilters({
                    category: '',
                    location: '',
                    minPrice: 0,
                    maxPrice: 50000,
                    minRating: 0
                  })}
                  className="text-[#4A5568] hover:text-[#2D3748]"
                  ariaLabel="Clear all filters"
                >
                  Clear all filters
                </AccessibleButton>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-2 border-[#FFB300]/20 shadow-lg">
          <CardContent className="p-0">
            {/* Current suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4 border-b">
                <h4 className="text-sm font-medium text-[#2D3748] mb-2">Suggestions</h4>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-[#F7FAFC] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
                      onClick={() => handleSuggestionSelect(suggestion)}
                      role="option"
                      aria-selected={false}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-[#4A5568]" aria-hidden="true" />
                        <span className="text-[#2D3748]">{suggestion}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular searches */}
            {(!query || query.length < 2) && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-[#2D3748] mb-2">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 text-sm bg-[#F7FAFC] text-[#2D3748] rounded-full hover:bg-[#FFB300]/10 hover:text-[#FFB300] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFB300]"
                      onClick={() => handlePopularSearchSelect(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

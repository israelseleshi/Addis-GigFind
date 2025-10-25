// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Star, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { SearchBar } from '../components/SearchBar';
import { useSearch, SearchResult } from '../hooks/useSearch';
import { EmptyState, NoSearchResults } from '../components/EmptyState';
import { AccessibleButton } from '../components/AccessibleButton';
import { useScreenReader } from '../hooks/useAccessibility';

interface SearchResultsPageProps {
  onNavigate: (page: string, param?: string) => void;
  initialQuery?: string;
}

export function SearchResultsPage({ onNavigate, initialQuery = '' }: SearchResultsPageProps) {
  const {
    query,
    setQuery,
    searchResults,
    isSearching,
    totalResults,
    clearSearch
  } = useSearch();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating'>('relevance');
  const { announce } = useScreenReader();

  // Set initial query if provided
  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery, query, setQuery]);

  // Announce search results to screen readers
  useEffect(() => {
    if (!isSearching && query) {
      announce(`Found ${totalResults} results for "${query}"`);
    }
  }, [isSearching, totalResults, query, announce]);

  // Sort search results
  const sortedResults = React.useMemo(() => {
    const results = [...searchResults];
    
    switch (sortBy) {
      case 'price-low':
        return results.sort((a, b) => a.price - b.price);
      case 'price-high':
        return results.sort((a, b) => b.price - a.price);
      case 'rating':
        return results.sort((a, b) => b.rating - a.rating);
      case 'relevance':
      default:
        return results;
    }
  }, [searchResults, sortBy]);

  const handleSearch = (searchQuery: string, filters: any) => {
    announce(`Searching for "${searchQuery}"`);
  };

  const handleClearSearch = () => {
    clearSearch();
    announce('Search cleared');
  };

  const handleGigClick = (gigId: string) => {
    onNavigate('gig-details', gigId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Back button and title */}
          <div className="flex items-center gap-4 mb-4">
            <AccessibleButton
              variant="ghost"
              size="icon"
              onClick={() => onNavigate('home')}
              ariaLabel="Go back to homepage"
            >
              <ArrowLeft className="h-5 w-5" />
            </AccessibleButton>
            <div>
              <h1 className="text-2xl font-bold text-[#0A2239]">
                {query ? `Search Results for "${query}"` : 'Browse All Gigs'}
              </h1>
              {totalResults > 0 && (
                <p className="text-[#4A5568]" role="status" aria-live="polite">
                  {totalResults} {totalResults === 1 ? 'result' : 'results'} found
                </p>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for services..."
            showFilters={true}
            className="mb-4"
          />

          {/* Results Controls */}
          {totalResults > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Sort and View Controls */}
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-sm font-medium text-[#2D3748]">
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1 border border-[#E2E8F0] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB300] focus:border-[#FFB300]"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 border border-[#E2E8F0] rounded-md p-1">
                  <AccessibleButton
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    ariaLabel="Grid view"
                    className="h-8 w-8"
                  >
                    <Grid className="h-4 w-4" />
                  </AccessibleButton>
                  <AccessibleButton
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    ariaLabel="List view"
                    className="h-8 w-8"
                  >
                    <List className="h-4 w-4" />
                  </AccessibleButton>
                </div>
              </div>

              {/* Clear Search */}
              {query && (
                <AccessibleButton
                  variant="outline"
                  onClick={handleClearSearch}
                  ariaLabel="Clear search and show all gigs"
                >
                  Clear Search
                </AccessibleButton>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" id="search-results">
        {isSearching ? (
          // Loading State
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFB300] mx-auto mb-4"></div>
              <p className="text-[#4A5568]">Searching for gigs...</p>
            </div>
          </div>
        ) : totalResults === 0 ? (
          // Empty State
          <NoSearchResults onClearFilters={handleClearSearch} />
        ) : (
          // Results
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {sortedResults.map((result, index) => (
              <SearchResultCard
                key={result.id}
                result={result}
                viewMode={viewMode}
                onClick={() => handleGigClick(result.id)}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Search Result Card Component
interface SearchResultCardProps {
  result: SearchResult;
  viewMode: 'grid' | 'list';
  onClick: () => void;
  formatPrice: (price: number) => string;
}

function SearchResultCard({ result, viewMode, onClick, formatPrice }: SearchResultCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#FFB300] ${
        viewMode === 'list' ? 'flex' : ''
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${result.title} by ${result.freelancer}`}
    >
      <CardContent className={`p-6 ${viewMode === 'list' ? 'flex gap-6 w-full' : ''}`}>
        {/* Freelancer Avatar */}
        <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
          <Avatar className="h-12 w-12">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${result.freelancer}`} />
            <AvatarFallback>{result.freelancer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>

        {/* Content */}
        <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg font-semibold text-[#0A2239] line-clamp-2">
                {result.title}
              </h3>
              <Badge variant="secondary" className="flex-shrink-0">
                {result.category}
              </Badge>
            </div>
            
            <p className="text-[#4A5568] text-sm mb-2">
              by {result.freelancer}
            </p>
            
            <p className={`text-[#4A5568] ${viewMode === 'list' ? 'line-clamp-2' : 'line-clamp-3'}`}>
              {result.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {result.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {result.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{result.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-[#4A5568]">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#FFB300] text-[#FFB300]" />
                <span className="font-medium">{result.rating}</span>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="truncate">{result.location}</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-lg font-bold text-[#0A2239]">
                {formatPrice(result.price)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

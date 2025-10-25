// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Briefcase, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { GigCard } from '../components/GigCard';
import { GigCardSkeleton } from '../components/GigCardSkeleton';
import { mockGigs, categories, addisLocations } from '../lib/data';

interface BrowseGigsPageProps {
  onNavigate: (page: string, gigId?: string) => void;
}

export function BrowseGigsPage({ onNavigate }: BrowseGigsPageProps) {
  const [gigsLoading, setGigsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [budgetRange, setBudgetRange] = useState<number[]>([0, 20000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGigsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredGigs = mockGigs.filter((gig) => {
    if (selectedCategory !== 'all' && gig.category !== selectedCategory) return false;
    if (selectedLocation !== 'all' && !gig.location.includes(selectedLocation)) return false;
    if (gig.budget < budgetRange[0] || gig.budget > budgetRange[1]) return false;
    if (searchTerm && !gig.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !gig.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleViewGigDetails = (gigId: string) => {
    onNavigate('gig-details', gigId);
  };

  const handleAuthRequired = () => {
    onNavigate('auth');
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar with Filters */}
          <aside className="lg:col-span-3 space-y-6 animate-in slide-in-from-left duration-700">
            {/* Filters */}
            <Card className="border-none shadow-md hover:shadow-xl bg-[#242526] shadow-black/50 transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-[#EAEAEA]">Filters</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className={`p-6 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="space-y-2">
                  <label className="text-sm text-[#B0B3B8]">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-2 border-[#3E4042] focus:border-[#FFB300] bg-[#1E1E1E] text-[#EAEAEA]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-[#B0B3B8]">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="border-2 border-[#3E4042] focus:border-[#FFB300] bg-[#1E1E1E] text-[#EAEAEA]">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {addisLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm text-[#717182]">
                    Budget Range: {budgetRange[0]} - {budgetRange[1]} ETB
                  </label>
                  <Slider
                    min={0}
                    max={20000}
                    step={500}
                    value={budgetRange}
                    onValueChange={setBudgetRange}
                    className="py-2"
                  />
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedLocation('all');
                    setBudgetRange([0, 20000]);
                    setSearchTerm('');
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>

            {/* Auth CTA */}
            <Card className="border-none shadow-md hover:shadow-xl bg-[#242526] shadow-black/50 transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-[#FFB300]/15 to-[#FF8F00]/10">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FFB300] flex items-center justify-center mx-auto">
                  <Briefcase className="h-6 w-6 text-[#0A2239]" />
                </div>
                <h3 className="text-lg font-semibold text-[#EAEAEA]">Ready to Apply?</h3>
                <p className="text-sm text-[#B0B3B8]">
                  Sign in to apply for gigs and start earning in Addis Ababa
                </p>
                <Button
                  onClick={() => onNavigate('auth')}
                  className="w-full bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00] transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                >
                  Sign In to Apply
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-6 animate-in slide-in-from-right duration-700">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-[#EAEAEA]">Browse Gigs</h1>
                  <p className="text-[#B0B3B8]">Discover opportunities in Addis Ababa</p>
                </div>
              </div>

              {/* Search */}
              <Card className="border-none shadow-md hover:shadow-xl bg-[#242526] shadow-black/50 transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#B0B3B8]" />
                      <Input
                        placeholder="Search gigs by title or keyword..."
                        className="pl-10 h-12 bg-[#1E1E1E] border-2 border-[#3E4042] focus:border-[#FFB300] focus:ring-2 focus:ring-[#FFB300]/20 transition-all duration-200 text-[#EAEAEA] placeholder-[#B0B3B8]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && console.log('Search triggered')}
                      />
                    </div>
                    <Button
                      onClick={() => console.log('Search triggered')}
                      className="h-12 px-6 bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00] transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        <span>Search</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#B0B3B8]">
                  {filteredGigs.length} gig{filteredGigs.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {gigsLoading ? (
                <div className="grid gap-4">
                  {[...Array(6)].map((_, index) => (
                    <GigCardSkeleton key={index} />
                  ))}
                </div>
              ) : filteredGigs.length > 0 ? (
                <Card className="border-none shadow-md hover:shadow-xl bg-[#242526] shadow-black/50 transition-all duration-300">
                  <CardContent className="p-0">
                    {filteredGigs.map((gig, index) => (
                      <div key={gig.id}>
                        <div className="p-6 hover:bg-[#1E1E1E] transition-colors duration-200">
                          <GigCard
                            gig={gig}
                            onViewDetails={handleViewGigDetails}
                            isAuthenticated={false}
                            onAuthRequired={handleAuthRequired}
                          />
                        </div>
                        {index < filteredGigs.length - 1 && (
                          <div className="border-b border-gray-700"></div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-none shadow-md hover:shadow-xl bg-[#242526] shadow-black/50 transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                    <Briefcase className="h-16 w-16 text-[#B0B3B8] mb-4 animate-bounce" />
                    <h3 className="text-xl text-[#EAEAEA] mb-2">No gigs found</h3>
                    <p className="text-[#B0B3B8] mb-6">
                      Try adjusting your filters to see more results
                    </p>
                    <Button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedLocation('all');
                        setBudgetRange([0, 20000]);
                        setSearchTerm('');
                      }}
                      className="bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00] transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg"
                    >
                      Reset Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

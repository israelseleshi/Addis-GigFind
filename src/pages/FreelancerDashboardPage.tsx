// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Briefcase, MessageSquare, DollarSign, Settings, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { GigCard } from '../components/GigCard';
import { GigCardSkeleton } from '../components/GigCardSkeleton';
import { Spinner } from '../components/ui/spinner';
import { useLoading } from '../contexts/LoadingContext';
import { useError } from '../contexts/ErrorContext';
import { mockGigs, categories, addisLocations } from '../lib/data';

interface FreelancerDashboardPageProps {
  onNavigate: (page: string, gigId?: string) => void;
}

export function FreelancerDashboardPage({ onNavigate }: FreelancerDashboardPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [budgetRange, setBudgetRange] = useState<number[]>([0, 20000]);
  const [showFilters, setShowFilters] = useState(false);
  const [gigsLoading, setGigsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { searchLoading, setSearchLoading } = useLoading();
  const { addError, setNetworkError } = useError();

  // Simulate initial loading with potential network error
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate network error (10% chance)
      if (Math.random() < 0.1) {
        setGigsLoading(false);
        setNetworkError(true);
        addError({
          type: 'network',
          message: 'Failed to load gigs',
          details: 'Please check your internet connection and try again'
        });
        return;
      }
      
      setGigsLoading(false);
      setNetworkError(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [addError, setNetworkError]);

  // Simulate search loading
  useEffect(() => {
    if (searchTerm) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        setSearchLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setSearchLoading(false);
    }
  }, [searchTerm, setSearchLoading]);

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

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-6 animate-in slide-in-from-left duration-700">
            {/* Quick Stats */}
            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-lg text-[#0A2239]">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#717182]">Applications</span>
                    <span className="text-xl text-[#FFB300]">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#717182]">Active Gigs</span>
                    <span className="text-xl text-[#2ECC71]">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#717182]">Total Earned</span>
                    <span className="text-xl text-[#0A2239]">47,500 ETB</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate('profile')}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-[#0A2239]">Filters</CardTitle>
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
                  <label className="text-sm text-[#717182]">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
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
                  <label className="text-sm text-[#717182]">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
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
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6 space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#FFB300]/10 transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={() => onNavigate('messages')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                  <Badge className="ml-auto bg-[#FFB300] text-[#0A2239] border-none">3</Badge>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#FFB300]/10 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Earnings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-[#FFB300]/10 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
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
                  <h1 className="text-3xl text-[#0A2239]">Browse Gigs</h1>
                  <p className="text-[#717182]">Find your next opportunity in Addis Ababa</p>
                </div>
              </div>

              {/* Search */}
              <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#717182]" />
                    <Input
                      placeholder="Search gigs by title or keyword..."
                      className="pl-10 pr-10 h-12 bg-white border-none focus:ring-2 focus:ring-[#FFB300]/20 transition-all duration-200"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    {searchLoading && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Spinner size="sm" className="text-[#FFB300]" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="bg-white border shadow-sm">
                <TabsTrigger value="all">
                  All Gigs
                  <Badge className="ml-2 bg-[#F5F5F5] text-[#0A2239] border-none">
                    {filteredGigs.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="applications">
                  My Applications
                  <Badge className="ml-2 bg-[#F5F5F5] text-[#0A2239] border-none">
                    12
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active Gigs
                  <Badge className="ml-2 bg-[#2ECC71] text-white border-none">
                    3
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {gigsLoading ? (
                  <div className="grid gap-4">
                    {[...Array(6)].map((_, index) => (
                      <GigCardSkeleton key={index} />
                    ))}
                  </div>
                ) : filteredGigs.length > 0 ? (
                  <div className="grid gap-4">
                    {filteredGigs.map((gig) => (
                      <GigCard
                        key={gig.id}
                        gig={gig}
                        onViewDetails={handleViewGigDetails}
                        isAuthenticated={true}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                      <Briefcase className="h-16 w-16 text-[#717182] mb-4 animate-bounce" />
                      <h3 className="text-xl text-[#0A2239] mb-2">No gigs found</h3>
                      <p className="text-[#717182] mb-6">
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
              </TabsContent>

              <TabsContent value="applications" className="space-y-4">
                <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                    <MessageSquare className="h-16 w-16 text-[#717182] mb-4 animate-pulse" />
                    <h3 className="text-xl text-[#0A2239] mb-2">Your Applications</h3>
                    <p className="text-[#717182]">
                      Track your gig applications here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="active" className="space-y-4">
                <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                    <Briefcase className="h-16 w-16 text-[#717182] mb-4 animate-pulse" />
                    <h3 className="text-xl text-[#0A2239] mb-2">Active Gigs</h3>
                    <p className="text-[#717182]">
                      Your ongoing gigs will appear here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}

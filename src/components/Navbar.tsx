// @ts-nocheck
import React, { useState } from 'react';
import { Menu, X, Bell, User, Search, MessageCircle, Briefcase, Star, Settings, LogOut, Home, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import { NotificationDropdown } from './NotificationDropdown';
import { AccessibleButton } from './AccessibleButton';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { useKeyboardNavigation, useScreenReader } from '../hooks/useAccessibility';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated?: boolean;
  userRole?: 'freelancer' | 'client';
}

export function Navbar({ currentPage, onNavigate, isAuthenticated = false, userRole }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isKeyboardUser = useKeyboardNavigation();
  const { announce } = useScreenReader();

  const handleMobileNavigation = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    announce(`Navigated to ${page} page`);
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    announce(`Navigated to ${page} page`);
  };

  return (
    <nav 
      className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-[#3A3B3C] bg-white/95 dark:bg-[#18191A]/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-[#18191A]/80 animate-in slide-in-from-top duration-500" 
      role="navigation" 
      aria-label="Main navigation"
      id="navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button 
            className="flex items-center gap-2 focus-ring rounded-lg p-1 -m-1 transition-all duration-200 hover:scale-105 active:scale-95" 
            onClick={() => handleNavigation('home')}
            aria-label="Addis GigFind - Go to homepage"
            type="button"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFB300] to-[#FF8F00] transition-all duration-300 hover:shadow-lg hover:rotate-12" aria-hidden="true">
              <span className="text-[#0A2239] font-bold transition-all duration-300 hover:scale-110">AG</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[#0A2239] dark:text-[#EAEAEA] font-semibold">Addis GigFind</span>
              <div className="h-0.5 w-full bg-gradient-to-r from-[#FFB300] to-transparent" aria-hidden="true"></div>
            </div>
          </button>

          {/* Center - Search (on authenticated pages) */}
          {isAuthenticated && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar
                onSearch={(query, filters) => {
                  announce(`Searching for "${query}"`);
                  handleNavigation('search-results');
                }}
                onNavigateToResults={() => handleNavigation('search-results')}
                placeholder="Search gigs..."
                showFilters={false}
                compact={true}
                className="w-full"
              />
            </div>
          )}

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavigation('browse-gigs')}
              className="flex items-center gap-2 text-[#0A2239] dark:text-[#EAEAEA] hover:text-[#0A2239]/80 dark:hover:text-[#EAEAEA]/80 transition-colors duration-200 font-medium"
            >
              <Briefcase className="h-4 w-4" />
              Browse Gigs
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Messages */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-[#0A2239] dark:text-[#EAEAEA] hover:text-[#0A2239]/80 dark:hover:text-[#EAEAEA]/80"
                  onClick={() => onNavigate('messages')}
                >
                  <MessageSquare className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#FFB300] text-[#0A2239] border-none">
                    3
                  </Badge>
                </Button>

                {/* Notifications */}
                <NotificationDropdown onNavigate={onNavigate} />

                {/* Profile */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#0A2239] dark:text-[#EAEAEA] hover:text-[#0A2239]/80 dark:hover:text-[#EAEAEA]/80"
                  onClick={() => onNavigate('profile')}
                >
                  <User className="h-5 w-5" />
                </Button>

                {/* Theme Toggle */}
                <ThemeToggle variant="dropdown" size="md" />

                {/* Dashboard Button */}
                <Button
                  onClick={() => onNavigate(userRole === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard')}
                  className="bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00] hidden sm:flex"
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                {/* Theme Toggle for unauthenticated users */}
                <ThemeToggle variant="dropdown" size="md" />
                
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('auth')}
                  className="text-[#0A2239] dark:text-white"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => onNavigate('auth')}
                  className="bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]"
                >
                  Join Now
                </Button>
              </>
            )}

            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-[#0A2239] dark:text-[#EAEAEA]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] dark:bg-[#242526] dark:border-[#3A3B3C]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-[#0A2239] dark:text-[#EAEAEA]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FFB300] to-[#FF8F00]">
                      <span className="text-[#0A2239] text-sm font-bold">AG</span>
                    </div>
                    Addis GigFind
                  </SheetTitle>
                  <SheetDescription className="dark:text-[#B0B3B8]">
                    Navigate through the application using the menu below
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {/* Mobile Search */}
                  {isAuthenticated && (
                    <div className="space-y-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground dark:text-[#B0B3B8]" />
                        <Input
                          type="search"
                          placeholder="Search gigs..."
                          className="pl-10 bg-[#F5F5F5] dark:bg-[#1E1E1E] border-none dark:text-[#EAEAEA] dark:placeholder-[#B0B3B8]"
                        />
                      </div>
                      <Separator />
                    </div>
                  )}

                  {/* Navigation Items */}
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-12 text-[#0A2239] dark:text-[#EAEAEA] hover:bg-gray-100 dark:hover:bg-[#1E1E1E]"
                      onClick={() => handleMobileNavigation('home')}
                    >
                      <Home className="h-5 w-5" />
                      Home
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-12 text-[#0A2239] dark:text-[#EAEAEA] hover:bg-gray-100 dark:hover:bg-[#1E1E1E]"
                      onClick={() => handleMobileNavigation('browse-gigs')}
                    >
                      <Briefcase className="h-5 w-5" />
                      Browse Gigs
                    </Button>

                    {isAuthenticated ? (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-12 text-[#0A2239] dark:text-[#EAEAEA] hover:bg-gray-100 dark:hover:bg-[#1E1E1E]"
                          onClick={() => handleMobileNavigation(userRole === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard')}
                        >
                          <Briefcase className="h-5 w-5" />
                          Dashboard
                        </Button>

                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-12 relative text-[#0A2239] dark:text-[#EAEAEA] hover:bg-gray-100 dark:hover:bg-[#1E1E1E]"
                          onClick={() => handleMobileNavigation('messages')}
                        >
                          <MessageSquare className="h-5 w-5" />
                          Messages
                          <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 bg-[#FFB300] text-[#0A2239] border-none">
                            3
                          </Badge>
                        </Button>

                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-12 relative text-[#0A2239] dark:text-[#EAEAEA] hover:bg-gray-100 dark:hover:bg-[#1E1E1E]"
                        >
                          <Bell className="h-5 w-5" />
                          Notifications
                          <Badge className="ml-auto h-5 w-5 flex items-center justify-center p-0 bg-[#E74C3C] text-white border-none">
                            5
                          </Badge>
                        </Button>

                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-12 text-[#0A2239] dark:text-[#EAEAEA] hover:bg-gray-100 dark:hover:bg-[#1E1E1E]"
                          onClick={() => handleMobileNavigation('profile')}
                        >
                          <User className="h-5 w-5" />
                          Profile
                        </Button>

                        <Separator />

                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-12 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => handleMobileNavigation('home')}
                        >
                          <Settings className="h-5 w-5" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-3 h-12 text-[#0A2239] dark:text-[#EAEAEA] hover:bg-gray-100 dark:hover:bg-[#1E1E1E]"
                          onClick={() => handleMobileNavigation('auth')}
                        >
                          <User className="h-5 w-5" />
                          Sign In
                        </Button>

                        <Button
                          className="w-full bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00] h-12"
                          onClick={() => handleMobileNavigation('auth')}
                        >
                          Join Now
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

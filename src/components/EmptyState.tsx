// @ts-nocheck
import React from 'react';
import { Button } from './ui/button';
import { Search, Plus, Users, Briefcase, MessageCircle, Star, Coffee, Palette } from 'lucide-react';

interface EmptyStateProps {
  type: 'gigs' | 'messages' | 'notifications' | 'search' | 'reviews' | 'portfolio' | 'bookmarks';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const emptyStateConfig = {
  gigs: {
    icon: Briefcase,
    title: "No gigs found",
    description: "Looks like there are no gigs matching your criteria. Try adjusting your filters or check back later for new opportunities!",
    actionLabel: "Browse All Categories",
    illustration: "🎯",
    suggestions: [
      "Try searching with different keywords",
      "Expand your location radius", 
      "Check different categories",
      "Post your own gig request"
    ]
  },
  messages: {
    icon: MessageCircle,
    title: "No conversations yet",
    description: "Start connecting with freelancers and clients in Addis Ababa. Your next great collaboration is just a message away!",
    actionLabel: "Find Freelancers",
    illustration: "💬",
    suggestions: [
      "Browse available gigs",
      "Post a service request",
      "Connect with top-rated freelancers"
    ]
  },
  notifications: {
    icon: Users,
    title: "All caught up!",
    description: "You're all up to date. We'll notify you when there's something new happening with your gigs and messages.",
    actionLabel: "Explore Gigs",
    illustration: "🔔",
    suggestions: [
      "Check your active gigs",
      "Browse new opportunities",
      "Update your profile"
    ]
  },
  search: {
    icon: Search,
    title: "No results found",
    description: "We couldn't find any gigs matching your search. Try different keywords or browse our popular categories.",
    actionLabel: "Clear Filters",
    illustration: "🔍",
    suggestions: [
      "Check your spelling",
      "Use more general terms",
      "Try browsing categories",
      "Post what you're looking for"
    ]
  },
  reviews: {
    icon: Star,
    title: "No reviews yet",
    description: "Complete your first gig to start building your reputation in the Addis GigFind community!",
    actionLabel: "Find Your First Gig",
    illustration: "⭐",
    suggestions: [
      "Complete gigs to earn reviews",
      "Provide excellent service",
      "Ask clients for feedback"
    ]
  },
  portfolio: {
    icon: Palette,
    title: "Showcase your work",
    description: "Add examples of your best work to attract more clients and stand out in the Addis GigFind marketplace.",
    actionLabel: "Add Portfolio Item",
    illustration: "🎨",
    suggestions: [
      "Upload your best work samples",
      "Add detailed descriptions",
      "Include before/after photos",
      "Highlight your skills"
    ]
  },
  bookmarks: {
    icon: Coffee,
    title: "No saved gigs",
    description: "Save interesting gigs to easily find them later. Start building your collection of opportunities!",
    actionLabel: "Browse Gigs",
    illustration: "📌",
    suggestions: [
      "Browse available gigs",
      "Save gigs you're interested in",
      "Set up job alerts"
    ]
  }
};

export function EmptyState({ 
  type, 
  title, 
  description, 
  actionLabel, 
  onAction, 
  className = "" 
}: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const IconComponent = config.icon;

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`} role="region" aria-label="Empty state">
      {/* Illustration */}
      <div className="mb-6 relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFB300]/10 to-[#0A2239]/5 flex items-center justify-center mb-4 mx-auto animate-pulse">
          <span className="text-6xl" role="img" aria-label={`${type} illustration`}>
            {config.illustration}
          </span>
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-[#FFB300]/20 flex items-center justify-center">
          <IconComponent className="h-6 w-6 text-[#FFB300]" aria-hidden="true" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md space-y-4">
        <h3 className="text-2xl font-semibold text-[#0A2239]">
          {title || config.title}
        </h3>
        <p className="text-[#4A5568] leading-relaxed">
          {description || config.description}
        </p>

        {/* Suggestions */}
        <div className="mt-6 p-4 bg-[#F7FAFC] rounded-lg border border-[#E2E8F0]">
          <h4 className="text-sm font-medium text-[#2D3748] mb-3">💡 Helpful tips:</h4>
          <ul className="text-sm text-[#4A5568] space-y-2">
            {config.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#FFB300] mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        {(onAction || actionLabel) && (
          <div className="pt-4">
            <Button
              onClick={onAction}
              className="bg-[#FFB300] text-[#0A2239] hover:bg-[#FFB300]/90 font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFB300] focus:ring-offset-2"
              aria-label={actionLabel || config.actionLabel}
            >
              {actionLabel || config.actionLabel}
            </Button>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-[#FFB300]/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} aria-hidden="true"></div>
      <div className="absolute top-20 right-16 w-3 h-3 bg-[#0A2239]/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} aria-hidden="true"></div>
      <div className="absolute bottom-16 left-20 w-2 h-2 bg-[#FFB300]/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} aria-hidden="true"></div>
    </div>
  );
}

// Specialized empty state components for common use cases
export function NoGigsFound({ onBrowseAll }: { onBrowseAll?: () => void }) {
  return (
    <EmptyState 
      type="gigs" 
      onAction={onBrowseAll}
      className="min-h-[400px]"
    />
  );
}

export function NoSearchResults({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState 
      type="search" 
      onAction={onClearFilters}
      className="min-h-[300px]"
    />
  );
}

export function NoMessages({ onFindFreelancers }: { onFindFreelancers?: () => void }) {
  return (
    <EmptyState 
      type="messages" 
      onAction={onFindFreelancers}
      className="min-h-[400px]"
    />
  );
}

export function NoNotifications({ onExploreGigs }: { onExploreGigs?: () => void }) {
  return (
    <EmptyState 
      type="notifications" 
      onAction={onExploreGigs}
      className="min-h-[300px]"
    />
  );
}

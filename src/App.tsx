// @ts-nocheck
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { FreelancerDashboardPage } from './pages/FreelancerDashboardPage';
import { ClientDashboardPage } from './pages/ClientDashboardPage';
import { GigDetailsPage } from './pages/GigDetailsPage';
import { MessagingPage } from './pages/MessagingPage';
import { ProfilePage } from './pages/ProfilePage';
import { RatingPage } from './pages/RatingPage';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import { ErrorProvider } from './contexts/ErrorContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider, ThemeTransition } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorToast } from './components/ErrorToast';
import { PageTransitionLoader } from './components/PageTransitionLoader';
import { NotFoundPage } from './pages/NotFoundPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { BrowseGigsPage } from './pages/BrowseGigsPage';
import { SkipLinks } from './components/SkipLinks';
import { useKeyboardNavigation } from './hooks/useAccessibility';

type Page = 'home' | 'auth' | 'freelancer-dashboard' | 'client-dashboard' | 'gig-details' | 'messages' | 'profile' | 'rating' | 'notifications' | 'search-results' | 'browse-gigs' | '404';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'freelancer' | 'client'>('freelancer');
  const [selectedGigId, setSelectedGigId] = useState<string>('1');
  const { setPageTransition } = useLoading();
  const isKeyboardUser = useKeyboardNavigation();

  const handleNavigate = (page: string, param?: string) => {
    // Show page transition loading
    setPageTransition(true);
    
    // Simulate page transition delay
    setTimeout(() => {
      if (page === 'freelancer-dashboard' || page === 'client-dashboard') {
        setIsAuthenticated(true);
        if (page === 'freelancer-dashboard') {
          setUserRole('freelancer');
        } else {
          setUserRole('client');
        }
      }
      
      if (page === 'gig-details' && param) {
        setSelectedGigId(param);
      }
      
      setCurrentPage(page as Page);
      setPageTransition(false);
    }, 800); // 800ms delay to show loading effect
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'freelancer-dashboard':
        return <FreelancerDashboardPage onNavigate={handleNavigate} />;
      case 'client-dashboard':
        return <ClientDashboardPage onNavigate={handleNavigate} />;
      case 'gig-details':
        return <GigDetailsPage gigId={selectedGigId} onNavigate={handleNavigate} />;
      case 'messages':
        return <MessagingPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} userRole={userRole} />;
      case 'rating':
        return <RatingPage onNavigate={handleNavigate} />;
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} />;
      case 'search-results':
        return <SearchResultsPage onNavigate={handleNavigate} />;
      case 'browse-gigs':
        return <BrowseGigsPage onNavigate={handleNavigate} />;
      case '404':
        return <NotFoundPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeTransition>
      <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-200">
        <SkipLinks />
        {currentPage !== 'auth' && currentPage !== 'rating' && currentPage !== '404' && (
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated}
            userRole={userRole}
          />
        )}
        <main id="main-content" role="main" tabIndex={-1}>
          {renderPage()}
        </main>
        <PageTransitionLoader />
        <ErrorToast />
      </div>
    </ThemeTransition>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="addis-gigfind-theme">
        <LoadingProvider>
          <ErrorProvider>
            <NotificationProvider>
              <AppContent />
              <ErrorToast />
            </NotificationProvider>
          </ErrorProvider>
        </LoadingProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

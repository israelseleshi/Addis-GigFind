import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F5F5F5] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-[#FFB300]/20 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[#FFB300]/10 flex items-center justify-center">
              <Search className="h-12 w-12 text-[#FFB300]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#0A2239]">Page Not Found</h1>
          <p className="text-lg text-[#717182] max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Suggestions */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#0A2239] mb-4">What can you do?</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2ECC71]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#2ECC71]">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#0A2239]">Check the URL</h4>
                  <p className="text-sm text-[#717182]">Make sure you typed the address correctly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2ECC71]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#2ECC71]">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#0A2239]">Browse Gigs</h4>
                  <p className="text-sm text-[#717182]">Explore available opportunities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2ECC71]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#2ECC71]">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#0A2239]">Go Home</h4>
                  <p className="text-sm text-[#717182]">Start fresh from our homepage</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2ECC71]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#2ECC71]">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#0A2239]">Contact Support</h4>
                  <p className="text-sm text-[#717182]">We're here to help you</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => onNavigate('home')}
            className="bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]"
            size="lg"
          >
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage
          </Button>
          <Button
            onClick={() => onNavigate('freelancer-dashboard')}
            variant="outline"
            size="lg"
          >
            <Search className="mr-2 h-5 w-5" />
            Browse Gigs
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="ghost"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Footer */}
        <p className="text-sm text-[#717182]">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
}

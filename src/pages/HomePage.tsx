// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Shield, Zap, Users, Star, ChevronRight, Camera, BookOpen, Palette, Calendar, Code, PenTool, Languages, Wrench, Car, ChefHat, Sparkles, MoreHorizontal } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Spinner } from '../components/ui/spinner';
import { Footer } from '../components/Footer';
import { OptimizedImage } from '../components/OptimizedImage';
import { categories, addisLocations, testimonials } from '../lib/data';
import { AccessibleButton } from '../components/AccessibleButton';
import { AccessibleInput } from '../components/AccessibleInput';
import { SearchBar } from '../components/SearchBar';
import { useScreenReader, useReducedMotion } from '../hooks/useAccessibility';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [searchLoading, setSearchLoading] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    hero: false,
    howItWorks: false,
    categories: false,
    whyChoose: false,
    testimonials: false,
    cta: false
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setVisibleSections(prev => ({
              ...prev,
              [sectionId]: true
            }));
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    // Trigger hero section immediately
    setTimeout(() => {
      setVisibleSections(prev => ({ ...prev, hero: true }));
    }, 100);

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const handleSearch = () => {
    setSearchLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      setSearchLoading(false);
      onNavigate('freelancer-dashboard');
    }, 1500);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Photography': Camera,
      'Tutoring': BookOpen,
      'Design': Palette,
      'Event Help': Calendar,
      'Web Development': Code,
      'Writing': PenTool,
      'Translation': Languages,
      'Repair & Maintenance': Wrench,
      'Driving': Car,
      'Cooking': ChefHat,
      'Cleaning': Sparkles,
      'Other': MoreHorizontal
    };
    
    return iconMap[category] || Briefcase;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden" data-section="hero">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFB300]/10 to-[#0A2239]/5 dark:from-[#FFB300]/20 dark:to-[#0A2239]/10 animate-pulse"></div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#FFB300]/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[#0A2239]/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-[#FFB300]/30 rounded-full blur-lg animate-bounce" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8 transform transition-all duration-1000 ease-out" style={{
              transform: visibleSections.hero ? 'translateX(0) translateY(0)' : 'translateX(-2.5rem) translateY(0)',
              opacity: visibleSections.hero ? 1 : 0
            }}>
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl text-white leading-tight transform transition-all duration-1200 ease-out" 
                    style={{ 
                      transitionDelay: '200ms',
                      transform: visibleSections.hero ? 'translateY(0)' : 'translateY(1.25rem)',
                      opacity: visibleSections.hero ? 1 : 0
                    }}>
                  Find trusted local help in Addis
                </h1>
                <p className="text-xl text-gray-300 transform transition-all duration-1200 ease-out" 
                   style={{ 
                     transitionDelay: '400ms',
                     transform: visibleSections.hero ? 'translateY(0)' : 'translateY(1.25rem)',
                     opacity: visibleSections.hero ? 1 : 0
                   }}>
                  Fast, simple, reliable — connecting you with skilled freelancers for any gig
                </p>
              </div>

              {/* Search Bar */}
              <div 
                className="transform transition-all duration-500 ease-out" 
                style={{ 
                  transitionDelay: '600ms',
                  transform: visibleSections.hero ? 'translateY(0)' : 'translateY(2.5rem)',
                  opacity: visibleSections.hero ? 1 : 0
                }}
              >
                <SearchBar
                  onSearch={(query, filters) => {
                    // Navigate to search results page with query
                    onNavigate('search-results');
                  }}
                  onNavigateToResults={() => onNavigate('search-results')}
                  placeholder="What service do you need?"
                  showFilters={true}
                  className="bg-white border-2 border-[#FFB300]/20 rounded-lg p-6 shadow-lg hover:shadow-xl hover:border-[#FFB300]/40 transition-all duration-300"
                />
              </div>

            </div>

            {/* Right image */}
            <div className="relative transform transition-all duration-1200 ease-out" 
                 style={{ 
                   transitionDelay: '400ms',
                   transform: visibleSections.hero ? 'translateX(0)' : 'translateX(2.5rem)',
                   opacity: visibleSections.hero ? 1 : 0
                 }}>
              <div className="absolute -inset-4 bg-gradient-to-br from-[#FFB300]/20 to-[#0A2239]/20 rounded-3xl blur-3xl animate-pulse"></div>
              <div className="lg:w-1/2 relative">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1545110013-3796ae894aab"
                  alt="Addis Ababa marketplace showcasing local businesses and services"
                  width={1080}
                  height={720}
                  priority={true}
                  quality={85}
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                  objectFit="cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#242526] relative overflow-hidden" data-section="howItWorks">
        {/* Background decoration */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-[#FFB300]/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#0A2239]/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 transform transition-all duration-1000 ease-out" 
               style={{ 
                 transitionDelay: '100ms',
                 transform: visibleSections.howItWorks ? 'translateY(0)' : 'translateY(2.5rem)',
                 opacity: visibleSections.howItWorks ? 1 : 0
               }}>
            <h2 className="text-3xl lg:text-4xl text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-300">
              Connecting Addis — One Gig at a Time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Search,
                title: 'Find or Post Gigs',
                description: 'Browse available gigs or post your own. Filter by category, location, and budget.',
                color: '#FFB300'
              },
              {
                icon: Users,
                title: 'Connect & Communicate',
                description: 'Message directly with clients or freelancers. Discuss details and expectations.',
                color: '#0A2239'
              },
              {
                icon: Zap,
                title: 'Get It Done',
                description: 'Complete the gig, get paid, and leave reviews. Build your reputation in the community.',
                color: '#2ECC71'
              }
            ].map((step, index) => (
              <Card 
                key={index} 
                className="border-none shadow-lg hover:shadow-xl bg-[#1E1E1E] shadow-black/30 transition-all duration-500 transform"
                style={{ 
                  transitionDelay: `${300 + index * 150}ms`,
                  transform: visibleSections.howItWorks ? 'translateY(0) scale(1)' : 'translateY(2.5rem) scale(1)',
                  opacity: visibleSections.howItWorks ? 1 : 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-0.5rem) scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = visibleSections.howItWorks ? 'translateY(0) scale(1)' : 'translateY(2.5rem) scale(1)'}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div
                    className="mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: `${step.color}20` }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(12deg)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                  >
                    <step.icon className="h-8 w-8 transition-all duration-300" style={{ color: step.color }} />
                  </div>
                  <h3 className="text-xl text-white transition-all duration-300">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-[#1E1E1E] relative overflow-hidden" data-section="categories">
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#FFB300]/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#0A2239]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 transform transition-all duration-1000 ease-out" 
               style={{ 
                 transitionDelay: '200ms',
                 transform: visibleSections.categories ? 'translateY(0)' : 'translateY(2.5rem)',
                 opacity: visibleSections.categories ? 1 : 0
               }}>
            <h2 className="text-3xl lg:text-4xl text-white mb-4">Popular Categories</h2>
            <p className="text-lg text-gray-300">
              Explore services from talented locals in Addis Ababa
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const IconComponent = getCategoryIcon(category);
              return (
                <Card
                  key={category}
                  className="border-none shadow-md hover:shadow-xl bg-[#242526] shadow-black/30 transition-all duration-500 cursor-pointer group transform"
                  style={{ 
                    transitionDelay: `${400 + index * 100}ms`,
                    transform: visibleSections.categories ? 'translateY(0) scale(1)' : 'translateY(2.5rem) scale(1)',
                    opacity: visibleSections.categories ? 1 : 0
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-0.5rem) scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = visibleSections.categories ? 'translateY(0) scale(1)' : 'translateY(2.5rem) scale(1)'}
                >
                  <CardContent className="p-6 text-center space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#FFB300]/20 flex items-center justify-center group-hover:bg-[#FFB300] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                      <IconComponent className="h-6 w-6 text-[#FFB300] group-hover:text-[#0A2239] transition-all duration-300 group-hover:scale-110" />
                    </div>
                    <p className="text-sm text-white group-hover:font-medium transition-all duration-300">{category}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden" data-section="whyChoose">
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-28 h-28 bg-[#2ECC71]/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-20 h-20 bg-[#FFB300]/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 transform transition-all duration-1000 ease-out" 
               style={{ 
                 transitionDelay: '200ms',
                 transform: visibleSections.whyChoose ? 'translateY(0)' : 'translateY(2.5rem)',
                 opacity: visibleSections.whyChoose ? 1 : 0
               }}>
            <h2 className="text-3xl lg:text-4xl text-[#0A2239] dark:text-white mb-4">Why Choose Addis GigFind?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: 'Trusted Community',
                description: 'Verified users and rating system ensure safe, reliable connections'
              },
              {
                icon: Zap,
                title: 'Fast & Easy',
                description: 'Find help or get hired in minutes, not days'
              },
              {
                icon: MapPin,
                title: 'Local First',
                description: 'Built for Addis Ababa, connecting neighbors and communities'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center space-y-4 transform transition-all duration-700 ease-out"
                style={{ 
                  transitionDelay: `${400 + index * 200}ms`,
                  transform: visibleSections.whyChoose ? 'translateY(0) scale(1)' : 'translateY(2.5rem) scale(1)',
                  opacity: visibleSections.whyChoose ? 1 : 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = visibleSections.whyChoose ? 'translateY(0) scale(1)' : 'translateY(2.5rem) scale(1)'}
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-[#FFB300] to-[#FF8F00] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg">
                  <feature.icon className="h-7 w-7 text-[#0A2239] transition-all duration-300 hover:scale-110" />
                </div>
                <h3 className="text-xl text-[#0A2239] dark:text-white transition-all duration-300 hover:text-[#FFB300]">{feature.title}</h3>
                <p className="text-[#4A5568] dark:text-gray-300 transition-all duration-300 hover:text-[#0A2239] dark:hover:text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#0A2239] relative overflow-hidden" data-section="testimonials">
        {/* Background decoration */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#FFB300]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#2ECC71]/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '5s' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 transform transition-all duration-1000 ease-out" 
               style={{ 
                 transitionDelay: '100ms',
                 transform: visibleSections.testimonials ? 'translateY(0)' : 'translateY(2.5rem)',
                 opacity: visibleSections.testimonials ? 1 : 0
               }}>
            <h2 className="text-3xl lg:text-4xl text-white mb-4">What Our Community Says</h2>
            <p className="text-lg text-white/70">
              Real stories from real people in Addis Ababa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="border-none bg-white/10 backdrop-blur transition-all duration-600 transform"
                style={{ 
                  transitionDelay: `${300 + index * 150}ms`,
                  transform: visibleSections.testimonials ? 'translateY(0) scale(1)' : 'translateY(2.5rem) scale(1)',
                  opacity: visibleSections.testimonials ? 1 : 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-0.5rem) scale(1.05)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = visibleSections.testimonials ? 'translateY(0) scale(1)' : 'translateY(2.5rem) scale(1)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#FFB300] text-[#FFB300]" />
                    ))}
                  </div>
                  <p className="text-white/90">{testimonial.comment}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#FFB300] to-[#FF8F00] relative overflow-hidden" data-section="cta">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto space-y-6 transform transition-all duration-1000 ease-out" 
               style={{ 
                 transitionDelay: '300ms',
                 transform: visibleSections.cta ? 'translateY(0)' : 'translateY(2.5rem)',
                 opacity: visibleSections.cta ? 1 : 0
               }}>
            <h2 className="text-3xl lg:text-4xl text-[#0A2239] animate-pulse">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-[#0A2239]/80">
              Join thousands of Addis residents finding and offering services every day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#0A2239] text-white hover:bg-[#0A2239]/90 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 hover:-translate-y-1"
                onClick={() => onNavigate('auth')}
              >
                Join as Freelancer
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-[#0A2239] border-[#0A2239] hover:bg-white/90 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 hover:-translate-y-1"
                onClick={() => onNavigate('auth')}
              >
                Post a Gig
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

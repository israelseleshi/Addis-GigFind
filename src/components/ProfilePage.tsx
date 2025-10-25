import { MapPin, Star, Briefcase, Edit, DollarSign, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { mockUsers, mockGigs, mockReviews } from '../lib/data';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  userRole?: 'freelancer' | 'client';
}

export function ProfilePage({ onNavigate, userRole = 'freelancer' }: ProfilePageProps) {
  // Mock current user
  const currentUser = mockUsers[0];
  const completedGigs = mockGigs.slice(0, 2);
  const reviews = mockReviews.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <aside className="space-y-6">
            {/* Profile Card */}
            <Card className="border-none shadow-md">
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="text-2xl">{currentUser.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2 w-full">
                    <h2 className="text-2xl text-[#0A2239]">{currentUser.name}</h2>
                    <div className="flex items-center justify-center gap-2 text-[#717182]">
                      <MapPin className="h-4 w-4" />
                      <span>{currentUser.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(currentUser.rating)
                              ? 'fill-[#FFB300] text-[#FFB300]'
                              : 'text-[#717182]'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-[#0A2239]">{currentUser.rating}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#717182]">Member Since</span>
                    <span className="text-sm text-[#0A2239]">Jan 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#717182]">Completed Gigs</span>
                    <span className="text-sm text-[#0A2239]">{currentUser.completedGigs}</span>
                  </div>
                  {userRole === 'freelancer' && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#717182]">Total Earned</span>
                      <span className="text-sm text-[#0A2239]">127,500 ETB</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#717182]">Response Time</span>
                    <span className="text-sm text-[#0A2239]">1 hour</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills (for freelancers) */}
            {userRole === 'freelancer' && currentUser.skills && (
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-[#0A2239]">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skills.map((skill, index) => (
                      <Badge key={index} className="bg-[#FFB300]/10 text-[#FFB300] border-[#FFB300]/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="border-none shadow-md">
              <CardContent className="p-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => onNavigate(userRole === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard')}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => onNavigate('messages')}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-[#0A2239]">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#717182] leading-relaxed">
                  {currentUser.about || 'Professional freelancer based in Addis Ababa with extensive experience in various projects. Dedicated to delivering high-quality work and excellent customer service.'}
                </p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="gigs" className="space-y-6">
              <TabsList className="bg-white border shadow-sm">
                <TabsTrigger value="gigs">
                  {userRole === 'freelancer' ? 'Past Work' : 'Posted Gigs'}
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({reviews.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gigs" className="space-y-4">
                {completedGigs.map((gig) => (
                  <Card key={gig.id} className="border-none shadow-md">
                    <CardContent className="p-6 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <h3 className="text-lg text-[#0A2239]">{gig.title}</h3>
                          <p className="text-sm text-[#717182] line-clamp-2">{gig.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {gig.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-[#F5F5F5] text-[#0A2239] border-none text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Badge className="bg-[#2ECC71] text-white border-none whitespace-nowrap ml-4">
                          Completed
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#717182]">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{gig.budget.toLocaleString()} ETB</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(gig.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id} className="border-none shadow-md">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={review.reviewerAvatar} />
                          <AvatarFallback>{review.reviewerName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[#0A2239]">{review.reviewerName}</p>
                              <p className="text-sm text-[#717182]">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-[#FFB300] text-[#FFB300]" />
                              ))}
                            </div>
                          </div>
                          <p className="text-[#717182]">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            {/* Portfolio (for freelancers) */}
            {userRole === 'freelancer' && (
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-[#0A2239]">Portfolio</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="aspect-square bg-[#F5F5F5] rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <span className="text-[#717182]">Portfolio Item</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

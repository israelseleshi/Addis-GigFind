import { MapPin, Calendar, DollarSign, Star, ArrowLeft, Send, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { mockGigs, mockReviews } from '../lib/data';

interface GigDetailsProps {
  gigId: string;
  onNavigate: (page: string) => void;
}

export function GigDetails({ gigId, onNavigate }: GigDetailsProps) {
  const gig = mockGigs.find((g) => g.id === gigId) || mockGigs[0];
  const reviews = mockReviews.filter((r) => r.gigId === gigId);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => onNavigate('freelancer-dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gigs
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gig Header */}
            <Card className="border-none shadow-md">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-3xl text-[#0A2239]">{gig.title}</h1>
                  <Badge className="bg-[#2ECC71] text-white border-none whitespace-nowrap">
                    Open
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-[#717182]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{gig.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(gig.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{gig.category}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-[#0A2239]">Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#717182] leading-relaxed">{gig.description}</p>
              </CardContent>
            </Card>

            {/* Skills Required */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-[#0A2239]">Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {gig.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#FFB300]/10 text-[#FFB300] border-[#FFB300]/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Application Form */}
            <Card className="border-none shadow-md border-l-4 border-l-[#FFB300]">
              <CardHeader>
                <CardTitle className="text-xl text-[#0A2239]">Apply for This Gig</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-[#717182]">
                    Tell the client why you're the right fit for this gig
                  </label>
                  <Textarea
                    placeholder="Introduce yourself and explain your relevant experience..."
                    rows={6}
                    className="resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('messages')}
                  >
                    Message Client
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Client Reviews */}
            {reviews.length > 0 && (
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-[#0A2239]">Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="space-y-3">
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
                      <Separator />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget */}
            <Card className="border-none shadow-md bg-gradient-to-br from-[#FFB300] to-[#FF8F00]">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-[#0A2239]/80">Budget</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl text-[#0A2239]">{gig.budget.toLocaleString()}</span>
                    <span className="text-xl text-[#0A2239]">ETB</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-[#0A2239] text-white hover:bg-[#0A2239]/90"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#0A2239]">About the Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={gig.clientAvatar} />
                    <AvatarFallback>{gig.clientName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-[#0A2239]">{gig.clientName}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-[#FFB300] text-[#FFB300]" />
                      <span className="text-sm text-[#717182]">{gig.clientRating} rating</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#717182]">Location</span>
                    <span className="text-sm text-[#0A2239]">{gig.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#717182]">Gigs Posted</span>
                    <span className="text-sm text-[#0A2239]">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#717182]">Member Since</span>
                    <span className="text-sm text-[#0A2239]">Jan 2024</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onNavigate('messages')}
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Gig Stats */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#0A2239]">Gig Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#717182]">Applicants</span>
                  <Badge className="bg-[#FFB300] text-[#0A2239] border-none">
                    {gig.applicants} applied
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#717182]">Posted</span>
                  <span className="text-sm text-[#0A2239]">2 days ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#717182]">Category</span>
                  <span className="text-sm text-[#0A2239]">{gig.category}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Plus, Briefcase, MessageSquare, Star, Settings, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { mockGigs, categories, addisLocations } from '../lib/data';

interface ClientDashboardPageProps {
  onNavigate: (page: string, gigId?: string) => void;
}

export function ClientDashboardPage({ onNavigate }: ClientDashboardPageProps) {
  const [isPostGigOpen, setIsPostGigOpen] = useState(false);
  const myGigs = mockGigs.slice(0, 3);

  const handleViewGigDetails = (gigId: string) => {
    onNavigate('gig-details', gigId);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Quick Stats */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#0A2239]">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#717182]">Posted Gigs</span>
                    <span className="text-xl text-[#FFB300]">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#717182]">Active Gigs</span>
                    <span className="text-xl text-[#2ECC71]">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#717182]">Rating</span>
                    <span className="text-xl text-[#0A2239]">4.9 ⭐</span>
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

            {/* Quick Actions */}
            <Card className="border-none shadow-md bg-gradient-to-br from-[#FFB300] to-[#FF8F00]">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg text-[#0A2239]">Need help with a task?</h3>
                  <p className="text-sm text-[#0A2239]/80">
                    Post a gig and connect with talented freelancers
                  </p>
                </div>
                <Dialog open={isPostGigOpen} onOpenChange={setIsPostGigOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#0A2239] text-white hover:bg-[#0A2239]/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Post a Gig
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-[#0A2239]">Post a New Gig</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to post your gig and connect with freelancers
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Gig Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Wedding Photography Needed"
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe what you need help with..."
                          rows={5}
                          className="resize-none"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger id="category" className="h-11">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget (ETB)</Label>
                          <Input
                            id="budget"
                            type="number"
                            placeholder="e.g., 5000"
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Select>
                            <SelectTrigger id="location" className="h-11">
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              {addisLocations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="date">Date Needed</Label>
                          <Input
                            id="date"
                            type="date"
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="skills">Required Skills (comma separated)</Label>
                        <Input
                          id="skills"
                          placeholder="e.g., Photography, Event Coverage, Portrait"
                          className="h-11"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setIsPostGigOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsPostGigOpen(false);
                          }}
                        >
                          Post Gig
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card className="border-none shadow-md">
              <CardContent className="p-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => onNavigate('messages')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                  <Badge className="ml-auto bg-[#FFB300] text-[#0A2239] border-none">5</Badge>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Star className="mr-2 h-4 w-4" />
                  Reviews
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl text-[#0A2239]">My Gigs</h1>
                  <p className="text-[#717182]">Manage your posted gigs and applications</p>
                </div>
                <Button
                  className="bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00] hidden sm:flex"
                  onClick={() => setIsPostGigOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Post a Gig
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="active" className="space-y-6">
              <TabsList className="bg-white border shadow-sm">
                <TabsTrigger value="active">
                  Active Gigs
                  <Badge className="ml-2 bg-[#2ECC71] text-white border-none">
                    {myGigs.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed
                  <Badge className="ml-2 bg-[#F5F5F5] text-[#0A2239] border-none">
                    5
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="draft">
                  Drafts
                  <Badge className="ml-2 bg-[#F5F5F5] text-[#0A2239] border-none">
                    2
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {myGigs.length > 0 ? (
                  <div className="grid gap-4">
                    {myGigs.map((gig) => (
                      <Card key={gig.id} className="border-none shadow-md">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <CardTitle
                                className="text-xl text-[#0A2239] cursor-pointer hover:text-[#FFB300] transition-colors"
                                onClick={() => handleViewGigDetails(gig.id)}
                              >
                                {gig.title}
                              </CardTitle>
                              <div className="flex flex-wrap gap-2 text-sm text-[#717182]">
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {gig.applicants} applicants
                                </span>
                                <span>•</span>
                                <span>Posted 2 days ago</span>
                              </div>
                            </div>
                            <Badge className="bg-[#2ECC71] text-white border-none">
                              Active
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-[#717182]">{gig.description}</p>
                          <div className="flex flex-wrap gap-4">
                            <Button
                              variant="outline"
                              onClick={() => handleViewGigDetails(gig.id)}
                            >
                              View Applications
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => onNavigate('messages')}
                            >
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Messages
                            </Button>
                            <Button variant="outline">
                              Edit Gig
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-none shadow-md">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                      <Briefcase className="h-16 w-16 text-[#717182] mb-4" />
                      <h3 className="text-xl text-[#0A2239] mb-2">No active gigs</h3>
                      <p className="text-[#717182] mb-6">
                        Post your first gig to find talented freelancers
                      </p>
                      <Button
                        onClick={() => setIsPostGigOpen(true)}
                        className="bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Post a Gig
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <Card className="border-none shadow-md">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <Star className="h-16 w-16 text-[#717182] mb-4" />
                    <h3 className="text-xl text-[#0A2239] mb-2">Completed Gigs</h3>
                    <p className="text-[#717182]">
                      Your completed gigs will appear here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="draft" className="space-y-4">
                <Card className="border-none shadow-md">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <Briefcase className="h-16 w-16 text-[#717182] mb-4" />
                    <h3 className="text-xl text-[#0A2239] mb-2">Draft Gigs</h3>
                    <p className="text-[#717182]">
                      Your draft gigs will be saved here
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

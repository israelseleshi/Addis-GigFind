import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mockUsers } from '../lib/data';

interface RatingReviewProps {
  onNavigate: (page: string) => void;
  userToReview?: typeof mockUsers[0];
  gigTitle?: string;
}

export function RatingReview({ onNavigate, userToReview, gigTitle = 'Wedding Photography' }: RatingReviewProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  const user = userToReview || mockUsers[0];

  const handleSubmit = () => {
    // Mock review submission
    console.log('Submitting review:', { rating, review, userId: user.id });
    onNavigate('freelancer-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFB300]/5 via-white to-[#0A2239]/5 flex items-center justify-center p-4">
      <Card className="border-none shadow-2xl max-w-2xl w-full">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl text-[#0A2239]">Rate Your Experience</CardTitle>
            <CardDescription>
              How was working with {user.name} on "{gigTitle}"?
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Star Rating */}
          <div className="space-y-4">
            <div className="text-center">
              <label className="text-sm text-[#717182]">Your Rating</label>
            </div>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-12 w-12 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-[#FFB300] text-[#FFB300]'
                        : 'text-[#717182]'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-[#0A2239]">
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </p>
            )}
          </div>

          {/* Written Review */}
          <div className="space-y-2">
            <label className="text-sm text-[#717182]">
              Share your experience (optional)
            </label>
            <Textarea
              placeholder="Tell others about your experience working with this person..."
              rows={6}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="resize-none"
            />
            <p className="text-xs text-[#717182]">
              Your review will be public and help others make informed decisions
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onNavigate('freelancer-dashboard')}
            >
              Skip for Now
            </Button>
            <Button
              className="flex-1 bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00]"
              onClick={handleSubmit}
              disabled={rating === 0}
            >
              Submit Review
            </Button>
          </div>

          {/* Review Guidelines */}
          <Card className="bg-[#F5F5F5] border-none">
            <CardContent className="p-4">
              <h4 className="text-sm text-[#0A2239] mb-2">Review Guidelines</h4>
              <ul className="text-xs text-[#717182] space-y-1">
                <li>• Be honest and constructive</li>
                <li>• Focus on your personal experience</li>
                <li>• Avoid personal attacks or offensive language</li>
                <li>• Include specific details about the work quality and communication</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

// @ts-nocheck
import React from 'react';
import { MapPin, Calendar, DollarSign, Users, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Gig } from '../lib/data';

interface GigCardProps {
  gig: Gig;
  onViewDetails: (gigId: string) => void;
  showApplyButton?: boolean;
  isAuthenticated?: boolean;
  onAuthRequired?: () => void;
}

export const GigCard: React.FC<GigCardProps> = ({ gig, onViewDetails, showApplyButton = true, isAuthenticated = true, onAuthRequired }) => {
  const handleApplyClick = () => {
    if (!isAuthenticated && onAuthRequired) {
      onAuthRequired();
    } else {
      onViewDetails(gig.id);
    }
  };

  return (
    <div className="group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <h3
              className="text-lg text-white cursor-pointer hover:text-[#FFB300] transition-colors font-semibold"
              onClick={() => onViewDetails(gig.id)}
            >
              {gig.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Avatar className="h-6 w-6">
                <AvatarImage src={gig.clientAvatar} />
                <AvatarFallback>{gig.clientName[0]}</AvatarFallback>
              </Avatar>
              <span>{gig.clientName}</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-[#FFB300] text-[#FFB300]" />
                <span>{gig.clientRating}</span>
              </div>
            </div>
          </div>
          <Badge className="bg-[#2ECC71] text-white border-none">
            {gig.status === 'open' ? 'Open' : gig.status}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-300 line-clamp-2">
          {gig.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {gig.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-[#3E4042] text-white border-none">
              {skill}
            </Badge>
          ))}
          {gig.skills.length > 3 && (
            <Badge variant="secondary" className="bg-[#3E4042] text-gray-300 border-none">
              +{gig.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-[#2ECC71]" />
            <span className="text-white font-semibold">{gig.budget} ETB</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-300" />
            <span className="text-gray-300">{gig.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-300" />
            <span className="text-gray-300">{new Date(gig.date).toLocaleDateString()}</span>
          </div>
          {gig.applicants && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-gray-300" />
              <span className="text-gray-300">{gig.applicants} applicants</span>
            </div>
          )}
        </div>
      </div>

      {showApplyButton && (
        <div className="pt-4">
          <Button
            className="w-full bg-[#FFB300] text-[#0A2239] hover:bg-[#FF8F00] transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg group-hover:animate-pulse"
            onClick={handleApplyClick}
          >
            View Details & Apply
          </Button>
        </div>
      )}
    </div>
  );
};

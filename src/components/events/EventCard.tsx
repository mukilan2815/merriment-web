
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import Card from '../ui-custom/Card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Event } from '@/services/eventService';

interface EventCardProps {
  event: Event;
  className?: string;
  compact?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, className, compact = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Card 
      className={cn(
        'h-full transition-all duration-300 overflow-hidden group',
        compact ? 'max-w-full' : 'max-w-md',
        className
      )}
      hover
    >
      <Link to={`/events/${event.id}`} className="block h-full">
        <div className="relative overflow-hidden">
          <div 
            className={cn(
              "relative aspect-[16/9] overflow-hidden",
              !imageLoaded && "bg-gray-200 animate-pulse"
            )}
          >
            <img
              src={event.image}
              alt={event.title}
              className={cn(
                "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105",
                imageLoaded ? "image-loaded" : "image-loading"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="secondary" className="shadow-md">
              {event.category}
            </Badge>
          </div>
          {event.featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="default" className="bg-primary shadow-md">
                Featured
              </Badge>
            </div>
          )}
        </div>
        
        <Card.Content className="p-4 md:p-6">
          <h3 className="text-xl font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          
          <div className="flex flex-col space-y-2 mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar size={16} className="mr-2 text-primary" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground truncate">
              <MapPin size={16} className="mr-2 text-primary flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users size={16} className="mr-2 text-primary" />
              <span>{event.availableSeats} seats available</span>
            </div>
          </div>
          
          {!compact && (
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {event.description}
            </p>
          )}
          
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-border">
            <span className="font-semibold text-xl">
              ${event.price}
            </span>
            <span className="text-sm text-primary underline">View details</span>
          </div>
        </Card.Content>
      </Link>
    </Card>
  );
};

export default EventCard;

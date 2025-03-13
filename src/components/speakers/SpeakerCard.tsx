
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Globe } from 'lucide-react';
import Card from '../ui-custom/Card';
import { cn } from '@/lib/utils';
import type { Speaker } from '@/services/eventService';

interface SpeakerCardProps {
  speaker: Speaker;
  className?: string;
  compact?: boolean;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, className, compact = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card 
      className={cn(
        'h-full overflow-hidden',
        className
      )}
      hover
    >
      <div className="flex flex-col h-full">
        <div className="relative overflow-hidden">
          <div 
            className={cn(
              "relative",
              compact ? "h-28" : "aspect-[3/2]",
              !imageLoaded && "bg-gray-200 animate-pulse"
            )}
          >
            <img
              src={speaker.image}
              alt={speaker.name}
              className={cn(
                "w-full h-full object-cover",
                compact ? "object-top" : "object-center",
                imageLoaded ? "image-loaded" : "image-loading"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
        
        <Card.Content className="p-4 md:p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-semibold mb-1">{speaker.name}</h3>
          <p className="text-primary font-medium text-sm mb-2">
            {speaker.role} at {speaker.company}
          </p>
          
          {!compact && (
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
              {speaker.bio}
            </p>
          )}
          
          {speaker.socialLinks && (
            <div className="flex mt-auto pt-4 space-x-3">
              {speaker.socialLinks.twitter && (
                <a 
                  href={speaker.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              )}
              {speaker.socialLinks.linkedin && (
                <a 
                  href={speaker.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              {speaker.socialLinks.website && (
                <a 
                  href={speaker.socialLinks.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label="Website"
                >
                  <Globe size={18} />
                </a>
              )}
            </div>
          )}
        </Card.Content>
      </div>
    </Card>
  );
};

export default SpeakerCard;

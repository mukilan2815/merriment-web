
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Button from '../ui-custom/Button';
import AnimatedSection from '../ui-custom/AnimatedSection';
import SpeakerCard from '../speakers/SpeakerCard';
import TicketBooking from './TicketBooking';
import { Event } from '@/services/eventService';

interface EventDetailProps {
  event: Event;
}

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatedSection animation="fade-up" className="space-y-8">
            <div className="relative rounded-xl overflow-hidden">
              <div 
                className={cn(
                  "relative aspect-video w-full",
                  !imageLoaded && "bg-gray-200 animate-pulse"
                )}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className={cn(
                    "w-full h-full object-cover",
                    imageLoaded ? "image-loaded" : "image-loading"
                  )}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
              <div className="mt-4 flex flex-wrap gap-6">
                <div className="flex items-center text-muted-foreground">
                  <Calendar size={18} className="mr-2 text-primary" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin size={18} className="mr-2 text-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users size={18} className="mr-2 text-primary" />
                  <span>{event.availableSeats} seats available</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <User size={18} className="mr-2 text-primary" />
                  <span>Organized by {event.organizer}</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-6">
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="speakers" className="pt-6">
                {event.speakers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker) => (
                      <SpeakerCard key={speaker.id} speaker={speaker} compact />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No speakers listed for this event yet.</p>
                )}
              </TabsContent>
              <TabsContent value="location" className="pt-6">
                <div className="rounded-xl overflow-hidden border border-border h-[400px] bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-medium mb-2">{event.location}</h3>
                    <p className="text-muted-foreground">Interactive map would be displayed here</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedSection>
        </div>

        <div className="lg:col-span-1">
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-4">Ticket Information</h2>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Price</span>
                  <span className="text-2xl font-semibold">${event.price}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Available seats</span>
                  <span className="font-medium">{event.availableSeats}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{event.category}</span>
                </div>
              </div>

              <Button 
                variant="primary"
                size="lg"
                className="w-full mt-4"
                onClick={() => setShowBooking(true)}
                disabled={event.availableSeats === 0}
              >
                {event.availableSeats > 0 ? 'Book Tickets' : 'Sold Out'}
              </Button>

              {showBooking && (
                <TicketBooking 
                  event={event} 
                  onClose={() => setShowBooking(false)}
                />
              )}
            </div>

            {event.speakers.length > 0 && (
              <div className="mt-8 bg-card rounded-xl p-6 border border-border shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Featured Speakers</h2>
                <div className="space-y-4">
                  {event.speakers.filter(s => s.featured).map((speaker) => (
                    <div key={speaker.id} className="flex items-center space-x-4">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{speaker.name}</h3>
                        <p className="text-sm text-muted-foreground">{speaker.role} at {speaker.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default EventDetail;

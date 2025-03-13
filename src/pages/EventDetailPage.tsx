
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@/services/eventService';
import { Container } from '@/components/layout/Container';
import PageLayout from '@/components/layout/PageLayout';
import { Loader2, ArrowLeft, Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import SpeakerCard from '@/components/speakers/SpeakerCard';
import TicketBooking from '@/components/events/TicketBooking';
import AnimatedSection from '@/components/ui-custom/AnimatedSection';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => id ? EventService.getEventById(id) : Promise.resolve(null),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <PageLayout>
        <Container className="py-12">
          <div className="flex justify-center items-center py-24">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        </Container>
      </PageLayout>
    );
  }

  if (error || !event) {
    return (
      <PageLayout>
        <Container className="py-12">
          <div className="text-center py-24">
            <h3 className="text-xl font-medium text-destructive">Event not found</h3>
            <p className="mt-2 text-muted-foreground">The event you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="mt-6">
              <Link to="/events">Back to Events</Link>
            </Button>
          </div>
        </Container>
      </PageLayout>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <PageLayout>
      <Container className="py-12">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/events" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="shadow-md">
                  {event.category}
                </Badge>
              </div>
              {event.featured && (
                <div className="absolute top-4 right-4">
                  <Badge variant="default" className="bg-primary shadow-md">
                    Featured
                  </Badge>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">Organized by {event.organizer}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span>{event.availableSeats} seats available</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-primary" />
                <span>${event.price.toFixed(2)} per ticket</span>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
              </div>
              
              {event.speakers && event.speakers.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mt-8 mb-4">Speakers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <AnimatedSection
                        key={speaker.id}
                        animation="fade-up"
                        delay={index * 100}
                        className="h-full"
                      >
                        <SpeakerCard speaker={speaker} />
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Event Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{formattedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-right">{event.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">${event.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Seats</span>
                  <span className="font-medium">{event.availableSeats}</span>
                </div>
              </div>
              
              <Button 
                className="w-full"
                variant="default"
                size="lg"
                onClick={() => setShowBookingModal(true)}
                disabled={event.availableSeats === 0}
              >
                {event.availableSeats > 0 ? 'Book Tickets' : 'Sold Out'}
              </Button>
            </div>
          </div>
        </div>
      </Container>
      
      {showBookingModal && (
        <TicketBooking event={event} onClose={() => setShowBookingModal(false)} />
      )}
    </PageLayout>
  );
};

export default EventDetailPage;

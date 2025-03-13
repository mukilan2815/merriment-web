
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@/services/eventService';
import EventList from '@/components/events/EventList';
import { Container } from '@/components/layout/Container';
import PageHeader from '@/components/layout/PageHeader';
import PageLayout from '@/components/layout/PageLayout';
import { Loader2 } from 'lucide-react';

const EventsPage = () => {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: EventService.getEvents
  });

  return (
    <PageLayout>
      <PageHeader
        title="All Events"
        description="Discover our upcoming events and secure your spot today."
      />
      
      <Container className="py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-destructive">Error loading events</h3>
            <p className="mt-2 text-muted-foreground">Please try again later</p>
          </div>
        ) : events && events.length > 0 ? (
          <EventList events={events} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-muted-foreground">No events found</h3>
          </div>
        )}
      </Container>
    </PageLayout>
  );
};

export default EventsPage;

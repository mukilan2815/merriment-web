
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@/services/eventService';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { ArrowRight } from 'lucide-react';
import EventList from '@/components/events/EventList';
import SpeakerList from '@/components/speakers/SpeakerList';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/layout/HeroSection';
import AnimatedSection from '@/components/ui-custom/AnimatedSection';

const HomePage = () => {
  const { data: featuredEvents } = useQuery({
    queryKey: ['featuredEvents'],
    queryFn: EventService.getFeaturedEvents
  });

  const { data: featuredSpeakers } = useQuery({
    queryKey: ['featuredSpeakers'],
    queryFn: EventService.getFeaturedSpeakers
  });

  return (
    <PageLayout>
      <HeroSection />
      
      <Container className="py-16">
        <AnimatedSection animation="fade-up">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <Button variant="outline" asChild>
              <Link to="/events" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {featuredEvents && featuredEvents.length > 0 ? (
            <EventList events={featuredEvents} showFilters={false} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-muted-foreground">No featured events found</h3>
            </div>
          )}
        </AnimatedSection>
      </Container>
      
      <div className="bg-muted py-16">
        <Container>
          <AnimatedSection animation="fade-up">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Speakers</h2>
              <Button variant="outline" asChild>
                <Link to="/speakers" className="flex items-center">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {featuredSpeakers && featuredSpeakers.length > 0 ? (
              <SpeakerList speakers={featuredSpeakers} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-muted-foreground">No featured speakers found</h3>
              </div>
            )}
          </AnimatedSection>
        </Container>
      </div>
      
      <Container className="py-16">
        <AnimatedSection animation="fade-up">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Events?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Browse our upcoming events and secure your spot today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/events">View Events</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </PageLayout>
  );
};

export default HomePage;

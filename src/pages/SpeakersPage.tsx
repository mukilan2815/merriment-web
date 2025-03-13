
import React, { useEffect, useState } from 'react';
import SpeakerList from '@/components/speakers/SpeakerList';
import { EventService, Speaker } from '@/services/eventService';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@/components/layout/Container';
import PageHeader from '@/components/layout/PageHeader';
import PageLayout from '@/components/layout/PageLayout';
import { Loader2 } from 'lucide-react';

const SpeakersPage = () => {
  const { data: speakers, isLoading, error } = useQuery({
    queryKey: ['speakers'],
    queryFn: EventService.getSpeakers
  });

  return (
    <PageLayout>
      <PageHeader
        title="Our Speakers"
        description="Meet our industry experts and thought leaders who share their knowledge and insights at our events."
      />
      
      <Container className="py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-destructive">Error loading speakers</h3>
            <p className="mt-2 text-muted-foreground">Please try again later</p>
          </div>
        ) : speakers && speakers.length > 0 ? (
          <SpeakerList speakers={speakers} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-muted-foreground">No speakers found</h3>
          </div>
        )}
      </Container>
    </PageLayout>
  );
};

export default SpeakersPage;

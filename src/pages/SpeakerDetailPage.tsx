
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { EventService, Speaker } from '@/services/eventService';
import { Container } from '@/components/layout/Container';
import PageLayout from '@/components/layout/PageLayout';
import { Loader2, ArrowLeft, Twitter, Linkedin, Globe, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

const SpeakerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: speaker, isLoading, error } = useQuery({
    queryKey: ['speaker', id],
    queryFn: () => id ? EventService.getSpeakerById(id) : Promise.resolve(null),
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

  if (error || !speaker) {
    return (
      <PageLayout>
        <Container className="py-12">
          <div className="text-center py-24">
            <h3 className="text-xl font-medium text-destructive">Speaker not found</h3>
            <p className="mt-2 text-muted-foreground">The speaker you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="mt-6">
              <Link to="/speakers">Back to Speakers</Link>
            </Button>
          </div>
        </Container>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Container className="py-12">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/speakers" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Speakers
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-48 w-48 mb-4">
                  <AvatarImage src={speaker.image} alt={speaker.name} />
                  <AvatarFallback>{speaker.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                
                {speaker.socialLinks && (
                  <div className="flex gap-2 mt-4">
                    {speaker.socialLinks.twitter && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={speaker.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {speaker.socialLinks.linkedin && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={speaker.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {speaker.socialLinks.website && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={speaker.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {speaker.socialLinks.instagram && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={speaker.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{speaker.name}</h1>
            <p className="text-xl text-muted-foreground mb-4">{speaker.role} at {speaker.company}</p>
            
            <Separator className="my-6" />
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-muted-foreground whitespace-pre-line">{speaker.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
};

export default SpeakerDetailPage;

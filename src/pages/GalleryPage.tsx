
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { EventService } from '@/services/eventService';
import { Container } from '@/components/layout/Container';
import PageHeader from '@/components/layout/PageHeader';
import PageLayout from '@/components/layout/PageLayout';
import { Loader2 } from 'lucide-react';
import GalleryGrid from '@/components/gallery/GalleryGrid';

const GalleryPage = () => {
  const { data: images, isLoading, error } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: EventService.getGalleryImages
  });

  return (
    <PageLayout>
      <PageHeader
        title="Event Gallery"
        description="Browse photos from our past events."
      />
      
      <Container className="py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-destructive">Error loading gallery</h3>
            <p className="mt-2 text-muted-foreground">Please try again later</p>
          </div>
        ) : images && images.length > 0 ? (
          <GalleryGrid images={images} />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-muted-foreground">No images found</h3>
          </div>
        )}
      </Container>
    </PageLayout>
  );
};

export default GalleryPage;

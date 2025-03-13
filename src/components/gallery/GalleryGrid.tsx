
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AnimatedSection from '../ui-custom/AnimatedSection';
import { cn } from '@/lib/utils';
import { GalleryImage } from '@/services/eventService';

interface GalleryGridProps {
  images: GalleryImage[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <AnimatedSection
            key={image.id}
            animation="fade-up"
            delay={index * 100}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div 
              className={cn(
                "w-full h-full bg-gray-200",
                !loadedImages[image.id] && "animate-pulse"
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-500 hover:scale-110",
                  loadedImages[image.id] ? "image-loaded" : "image-loading"
                )}
                onLoad={() => handleImageLoad(image.id)}
              />
            </div>
          </AnimatedSection>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-3xl p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <h3 className="font-medium">{selectedImage.alt}</h3>
                <p className="text-sm text-gray-300">
                  {selectedImage.event} - {new Date(selectedImage.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryGrid;

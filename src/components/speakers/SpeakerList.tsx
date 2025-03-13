
import React from 'react';
import SpeakerCard from './SpeakerCard';
import AnimatedSection from '../ui-custom/AnimatedSection';
import { Speaker } from '@/services/eventService';

interface SpeakerListProps {
  speakers: Speaker[];
}

const SpeakerList: React.FC<SpeakerListProps> = ({ speakers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {speakers.map((speaker, index) => (
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
  );
};

export default SpeakerList;

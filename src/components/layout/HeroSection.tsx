
import React from 'react';
import { Container } from './Container';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimatedSection from '../ui-custom/AnimatedSection';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-white py-24">
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000)',
        }}
      />
      <Container>
        <div className="max-w-3xl relative z-10">
          <AnimatedSection animation="fade-up" delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Experience the Best Events in Town
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              From tech summits to creative arts festivals, we bring you the most exciting and informative events.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="default" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/events">Explore Events</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;

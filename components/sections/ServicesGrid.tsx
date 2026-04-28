import React from 'react';
import Badge from '@/components/ui/Badge';
import ServiceCard from '@/components/ui/ServiceCard';
import type { ServiceItem } from '@/types';

interface ServicesGridProps {
  eyebrow?: string;
  headline?: string;
  services: ServiceItem[];
}

/**
 * ServicesGrid — responsive 6-card grid of services.
 * 1 col → 2 col → 3 col across breakpoints.
 */
export default function ServicesGrid({
  eyebrow = 'WHAT WE COVER',
  headline = 'Six ways Drivly has you covered.',
  services,
}: ServicesGridProps) {
  return (
    <section className="bg-white section-pad" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          {eyebrow && <Badge variant="green-outline" className="mb-3">{eyebrow}</Badge>}
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-extrabold text-brand-text-primary"
          >
            {headline}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

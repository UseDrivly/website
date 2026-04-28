import React from 'react';
import type { ServiceItem } from '@/types';

interface ServiceCardProps {
  service: ServiceItem;
}

/**
 * ServiceCard — matches Figma spec exactly.
 * White bg, #D4E8C8 border, 16px radius, 26px padding.
 * Emoji 28px, title 16px bold #0E1510, body 13px/21px #4D6147.
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div
      className="flex flex-col p-6 rounded-2xl bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{ border: '1px solid #D4E8C8', borderRadius: '16px', padding: '26px', gap: '4.9px' }}
    >
      {/* Emoji icon — 28px as per spec */}
      <div
        className="flex flex-col items-start"
        aria-hidden="true"
        style={{ fontSize: '28px', lineHeight: '36px', fontFamily: 'DM Sans, sans-serif' }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <div className="flex flex-col items-start" style={{ paddingTop: '7.1px' }}>
        <h3
          className="flex items-center font-bold leading-tight"
          style={{ fontSize: '16px', lineHeight: '20px', color: '#0E1510' }}
        >
          {service.title}
        </h3>
      </div>

      {/* Description */}
      <div className="flex flex-col items-start" style={{ paddingBottom: '6.8px' }}>
        <p style={{ fontSize: '13px', lineHeight: '21px', color: '#4D6147' }}>
          {service.description}
        </p>
      </div>
    </div>
  );
}

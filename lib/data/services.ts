import type { ServiceItem } from '@/types';

/**
 * Six core services — exact titles and emojis from the Figma CSS spec.
 */
export const services: ServiceItem[] = [
  {
    icon: '😖',
    title: 'Flat Tyre Repair',
    description: 'A tyre specialist comes to you with everything needed to get you moving again.',
  },
  {
    icon: '🔋',
    title: 'Battery Jump Start',
    description: 'Dead battery? A specialist arrives with a jump pack or replacement in minutes.',
  },
  {
    icon: '🚙',
    title: 'Tow Truck',
    description: 'Vehicle recovery to any destination or a Drivly partner workshop, your call.',
  },
  {
    icon: '⛽',
    title: 'Emergency Fuel',
    description: 'Ran out of petrol or diesel? We bring fuel so you can get to the nearest station.',
  },
  {
    icon: '🔑',
    title: 'Car Lockout',
    description: 'A verified locksmith gets you back in your car without causing any damage.',
  },
  {
    icon: '🔧',
    title: 'Mobile Mechanic',
    description: 'A mechanic comes to diagnose or fix the problem on-site, wherever you are.',
  },
];

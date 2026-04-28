import type { StatItem } from '@/types';

/**
 * Stats shown on the Home page StatsBar.
 * Extracted from the Figma CSS spec exactly.
 * Note: Third stat is ₦0 (Naira zero) — no negotiation.
 */
export const homeStats: StatItem[] = [
  { value: '2M+',  label: 'Registered vehicles in Lagos State' },
  { value: '8min', label: 'Target average provider arrival' },
  { value: '₦0',   label: 'Negotiation on any job ever' },
  { value: '85%',  label: 'Of every job fee goes to the provider' },
];

/** Stats shown on the Providers page StatsBar */
export const providerStats: StatItem[] = [
  { value: '2M+',  label: 'Active vehicles' },
  { value: '8min', label: 'Average response target' },
  { value: 'NO',   label: 'Middlemen' },
  { value: '85%',  label: 'You keep per job' },
];

/** Stats shown on the Businesses/Fleet page StatsBar */
export const fleetStats: StatItem[] = [
  { value: '2M+',  label: 'Registered vehicles' },
  { value: '8min', label: 'Target response time' },
  { value: '₦0',   label: 'Hidden charges' },
  { value: '85%',  label: 'Provider retention rate' },
];

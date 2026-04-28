import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Drivly',
  description: "Drivly is a Nigerian technology company building the country's first organised, app-based roadside assistance platform. Learn about our story, team, and mission.",
};

export default function AboutPage() {
  return <AboutClient />;
}

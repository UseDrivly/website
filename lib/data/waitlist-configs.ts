import type { WaitlistFormConfig } from '@/types';

/**
 * Per-page WaitlistForm configurations.
 * Each config drives the form fields, role, and CTA label.
 */

export const driverWaitlistConfig: WaitlistFormConfig = {
  title: 'Driver Waitlist',
  subtitle: 'Leave your details and be the first to know when Drivly launches in your city.',
  role: 'driver',
  ctaLabel: 'Join the Waitlist',
  fields: [
    { id: 'name',         label: 'Full name',        type: 'text',   placeholder: 'e.g. Amaka Okafor',          required: true },
    { id: 'email',        label: 'Email address',    type: 'email',  placeholder: 'you@example.com',             required: true },
    { id: 'phone',        label: 'Phone number',     type: 'tel',    placeholder: '+234 800 000 0000',           required: true },
    { id: 'city',         label: 'City',             type: 'text',   placeholder: 'e.g. Lagos, Abuja',           required: true },
    {
      id: 'vehicle_type',
      label: 'Vehicle type',
      type: 'select',
      required: false,
      options: [
        { value: 'car',          label: 'Car (saloon/sedan)' },
        { value: 'suv',          label: 'SUV / Crossover' },
        { value: 'bus',          label: 'Bus / Minibus' },
        { value: 'truck',        label: 'Truck / Lorry' },
        { value: 'van',          label: 'Van' },
        { value: 'motorcycle',   label: 'Motorcycle' },
        { value: 'other',        label: 'Other' },
      ],
    },
  ],
};

export const providerWaitlistConfig: WaitlistFormConfig = {
  title: 'Provider Waitlist',
  subtitle: `Join our network of verified providers. We'll be in touch before we launch.`,
  role: 'provider',
  ctaLabel: 'Apply to Join the Network',
  fields: [
    { id: 'name',         label: 'Full name',        type: 'text',   placeholder: 'e.g. Chidi Eze',              required: true },
    { id: 'email',        label: 'Email address',    type: 'email',  placeholder: 'you@example.com',              required: true },
    { id: 'phone',        label: 'Phone number',     type: 'tel',    placeholder: '+234 800 000 0000',            required: true },
    { id: 'city',         label: 'City',             type: 'text',   placeholder: 'e.g. Lagos, Abuja',            required: true },
    { id: 'address',      label: 'Address',          type: 'text',   placeholder: 'Your address',                 required: true },
    {
      id: 'service_type',
      label: 'Service type',
      type: 'select',
      required: true,
      options: [
        { value: 'tyre',        label: 'Tyre change / puncture repair' },
        { value: 'towing',      label: 'Towing / recovery' },
        { value: 'battery',     label: 'Battery jump start' },
        { value: 'fuel',        label: 'Fuel delivery' },
        { value: 'lockout',     label: 'Lockout assistance' },
        { value: 'mechanical',  label: 'General mechanic / breakdown' },
        { value: 'multi',       label: 'Multiple services' },
      ],
    },
  ],
};

export const businessWaitlistConfig: WaitlistFormConfig = {
  title: 'Business Waitlist',
  subtitle: 'Set up fleet coverage for your business. Tell us a bit about your operation.',
  role: 'business',
  ctaLabel: 'Request a Demo',
  fields: [
    { id: 'company_name', label: 'Company name',    type: 'text',   placeholder: 'e.g. Acme Logistics Ltd',      required: true },
    { id: 'name',         label: 'Contact name',    type: 'text',   placeholder: 'Your full name',                required: true },
    { id: 'email',        label: 'Business email',  type: 'email',  placeholder: 'you@yourcompany.com',           required: true },
    { id: 'phone',        label: 'Phone number',    type: 'tel',    placeholder: '+234 800 000 0000',             required: true },
    { id: 'city',         label: 'City',            type: 'text',   placeholder: 'e.g. Lagos, Abuja',             required: true },
    {
      id: 'fleet_size',
      label: 'Fleet size',
      type: 'select',
      required: false,
      options: [
        { value: '1-10',   label: '1–10 vehicles' },
        { value: '11-50',  label: '11–50 vehicles' },
        { value: '51-200', label: '51–200 vehicles' },
        { value: '200+',   label: '200+ vehicles' },
      ],
    },
  ],
};

export const generalWaitlistConfig: WaitlistFormConfig = {
  title: 'Join the Waitlist',
  subtitle: `Leave your details and we'll be in touch before we launch.`,
  role: 'driver',
  ctaLabel: 'Join the Waitlist',
  fields: [
    { id: 'name',  label: 'Full name',     type: 'text',  placeholder: 'Your full name',      required: true },
    { id: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com',     required: true },
    { id: 'phone', label: 'Phone number',  type: 'tel',   placeholder: '+234 800 000 0000',   required: true },
    { id: 'city',  label: 'City',          type: 'text',  placeholder: 'e.g. Lagos, Abuja',   required: true },
  ],
};

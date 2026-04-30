'use client';

import React, { useState } from 'react';
import { submitWaitlist } from '@/actions/waitlist';
import type { WaitlistFormConfig, WaitlistFormData } from '@/types';

interface WaitlistFormProps {
  config: WaitlistFormConfig;
}

type FieldValues = Partial<Record<keyof WaitlistFormData, string>>;

/**
 * WaitlistForm — Client Component
 *
 * Driven entirely by the WaitlistFormConfig prop.
 * States: idle → loading → success | error
 *
 * The form calls the `submitWaitlist` Server Action directly.
 */
export default function WaitlistForm({ config }: WaitlistFormProps) {
  const [values, setValues] = useState<FieldValues>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (id: keyof WaitlistFormData, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Build typed payload from field values
    const payload: WaitlistFormData = {
      name:          values.name ?? '',
      email:         values.email ?? '',
      phone:         values.phone ?? '',
      city:          values.city ?? '',
      role:          config.role,
      vehicle_type:  values.vehicle_type,
      service_type:  values.service_type,
      address:       values.address,
      company_name:  values.company_name,
      fleet_size:    values.fleet_size,
    };

    const result = await submitWaitlist(payload);

    setIsLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  /* ── Success State ───────────────────────────────────────── */
  if (success) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-brand-action-light flex items-center justify-center">
          <svg className="w-8 h-8 text-brand-action" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-text-primary mb-1">
            You&apos;re on the list! 🎉
          </h3>
          <p className="text-brand-text-muted text-sm leading-relaxed">
            We&apos;ll reach out before we launch. No spam, ever.
          </p>
        </div>
        <button
          onClick={() => { setSuccess(false); setValues({}); }}
          className="text-xs text-brand-text-muted hover:text-brand-action underline transition-colors"
        >
          Submit another response
        </button>
      </div>
    );
  }

  /* ── Form State ──────────────────────────────────────────── */
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* Form header */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest uppercase bg-brand-dark text-brand-action rounded-full mb-3">
          {config.title}
        </span>
        <p className="text-sm text-brand-text-muted leading-relaxed">
          {config.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 text-left">
        {config.fields.map((field) => {
          const value = values[field.id] ?? '';
          const inputClasses = `
            w-full px-4 py-3 rounded-xl border border-brand-border bg-white
            text-sm text-brand-text-primary placeholder:text-brand-text-muted
            focus:outline-none focus:ring-2 focus:ring-brand-action focus:border-transparent
            transition-all duration-150
          `;

          if (field.type === 'select' && field.options) {
            return (
              <div key={field.id} className="flex flex-col gap-1.5">
                <label
                  htmlFor={`field-${field.id}`}
                  className="text-xs font-semibold text-brand-text-primary"
                >
                  {field.label}
                  {field.required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
                <select
                  id={`field-${field.id}`}
                  name={field.id}
                  required={field.required}
                  value={value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className={`${inputClasses} cursor-pointer`}
                >
                  <option value="">Select an option</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return (
            <div key={field.id} className="flex flex-col gap-1.5">
              <label
                htmlFor={`field-${field.id}`}
                className="text-xs font-semibold text-brand-text-primary"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
              <input
                id={`field-${field.id}`}
                name={field.id}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                value={value}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className={inputClasses}
                autoComplete={
                  field.id === 'email' ? 'email'
                  : field.id === 'name' ? 'name'
                  : field.id === 'phone' ? 'tel'
                  : undefined
                }
              />
            </div>
          );
        })}

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700"
          >
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          id="waitlist-submit-btn"
          disabled={isLoading}
          className="
            w-full mt-1 px-6 py-4 rounded-xl
            bg-brand-action text-brand-dark font-bold text-sm
            hover:bg-brand-action-hover transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-action focus-visible:ring-offset-2
            disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </>
          ) : (
            config.ctaLabel
          )}
        </button>

        <p className="text-center text-xs text-brand-text-muted mt-1">
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}

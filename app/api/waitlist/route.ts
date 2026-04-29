import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract common fields
    const { 
      name, 
      email, 
      phone, 
      role, 
      
      // Driver fields
      city, 
      vehicle_type,
      
      // Provider fields
      service_type,
      
      // Business fields
      company, // From BusinessesClient
      state,
      business_type,
      message,
      fleet_size
    } = body;

    // Validate required fields
    if (!name || !email || !role) {
      return NextResponse.json(
        { error: 'Name, email, and role are required.' },
        { status: 400 }
      );
    }

    const normalizedRole = String(role).trim().toLowerCase();
    const normalizedServiceType = typeof service_type === 'string' ? service_type.trim() : '';

    if (normalizedRole === 'provider' && !normalizedServiceType) {
      return NextResponse.json(
        { error: 'Service type is required for providers.' },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();

    // Build payload mapping exact database columns
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() ?? '',
      role: normalizedRole,
      
      // Optional fields
      city: city?.trim() ?? null,
      state: state?.trim() ?? null,
      company: company?.trim() ?? null,
      vehicle_type: vehicle_type?.trim() ?? null,
      service_type: normalizedServiceType || null,
      business_type: business_type?.trim() ?? null,
      message: message?.trim() ?? null,
      fleet_size: fleet_size?.trim() ?? null,
    };

    // Remove null values to let DB defaults apply if any
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([, v]) => v !== null)
    );

    const { error } = await supabase.from('waitlist').insert(cleanPayload);

    if (error) {
      // Handle duplicate email gracefully
      if (error.code === '23505') {
        return NextResponse.json(
          { error: `This email is already on the waitlist. We'll be in touch!` },
          { status: 409 }
        );
      }
      
      console.error('[waitlist API] Supabase error:', error.message);
      return NextResponse.json(
        { error: 'Failed to join waitlist. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Successfully joined the waitlist!" },
      { status: 200 }
    );

  } catch (err) {
    console.error('[waitlist API] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

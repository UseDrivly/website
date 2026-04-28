'use server';

import { cookies } from 'next/headers';

export async function loginAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.warn("ADMIN_PASSWORD not set in environment variables. Falling back to 'admin123' for development.");
  }

  const expectedPassword = adminPassword || 'admin123';

  if (password === expectedPassword) {
    (await cookies()).set('drivly_admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  } else {
    return { success: false, error: 'Invalid password' };
  }
}

export async function logoutAdmin() {
  (await cookies()).delete('drivly_admin_session');
}

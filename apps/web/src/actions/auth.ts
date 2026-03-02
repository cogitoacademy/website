'use server';

import { cookies } from 'next/headers';

const PASSWORD = process.env.STUDENT_RESOURCES_PASSWORD || 'cogito2024';
const COOKIE_NAME = 'student_access';

export async function verifyPassword(password: string) {
  if (password === PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  }
  return { success: false, error: 'Incorrect password' };
}

export async function checkAccess() {
  const cookieStore = await cookies();
  return cookieStore.has(COOKIE_NAME);
}

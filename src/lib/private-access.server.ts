import { useSession } from '@tanstack/react-start/server';
import { createHash, timingSafeEqual } from 'node:crypto';
import { PRIVATE_SESSION_SECONDS, isCurrentPrivateSession } from './private-access-rules';

export function passwordMatches(input: string, expected: string) {
  return timingSafeEqual(createHash('sha256').update(input).digest(), createHash('sha256').update(expected).digest());
}
export async function privateSession() {
  const secret = process.env['SESSION_SECRET'];
  if (!secret) throw new Error('Private viewing is not configured');
  return useSession<{ fingerprint?: string; openedAt?: number }>({
    password: secret, name: 'synora-private', maxAge: PRIVATE_SESSION_SECONDS,
    cookie: { httpOnly: true, secure: true, sameSite: 'strict', path: '/' },
  });
}
export function passwordFingerprint(password: string) {
  return createHash('sha256').update(password).digest('hex');
}
export async function isPrivateUnlocked() {
  const expected = process.env['SITE_PASSWORD'];
  if (!expected) return false;
  try {
    const session = await privateSession();
    return isCurrentPrivateSession(session.data, passwordFingerprint(expected));
  } catch { return false; }
}
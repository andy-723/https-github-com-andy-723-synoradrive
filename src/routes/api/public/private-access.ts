import { createFileRoute } from '@tanstack/react-router';
import { isSameOriginPost } from '@/lib/private-access-rules';

export const Route = createFileRoute('/api/public/private-access')({
  server: { handlers: { POST: async ({ request }) => {
    if (!isSameOriginPost(request)) return new Response('Forbidden', { status: 403 });
    const { privateSession, passwordMatches, passwordFingerprint } = await import('@/lib/private-access.server');
    const form = await request.formData();
    const session = await privateSession();
    if (form.get('action') === 'lock') {
      await session.clear();
      return Response.redirect(new URL('/private', request.url), 303);
    }
    const password = form.get('password');
    const expected = process.env['SITE_PASSWORD'];
    if (!expected) return new Response('Private viewing is not configured.', { status: 503 });
    if (typeof password !== 'string' || password.length > 256 || !passwordMatches(password, expected)) {
      // Delay every failure without global, non-durable rate-limiting state.
      await new Promise(resolve => setTimeout(resolve, 800));
      return Response.redirect(new URL('/private?error=incorrect', request.url), 303);
    }
    await session.update({ fingerprint: passwordFingerprint(expected), openedAt: Date.now() });
    return Response.redirect(new URL('/private/site/', request.url), 303);
  } } },
});
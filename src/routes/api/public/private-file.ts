import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/public/private-file')({
  server: { handlers: { GET: async ({ request }) => {
    const { isPrivateUnlocked } = await import('@/lib/private-access.server');
    if (!await isPrivateUnlocked()) return new Response('Unauthorized', { status: 401 });
    const name = new URL(request.url).searchParams.get('name');
    if (name === 'session') return new Response(null, { status: 204 });
    const { privateFiles } = await import('@/private-generated/site.server');
    const file = name ? privateFiles[name] : undefined;
    if (!file) return new Response('Not found', { status: 404 });
    const bytes = Uint8Array.from(atob(file.base64), char => char.charCodeAt(0));
    return new Response(bytes, { headers: { 'Content-Type': file.contentType, 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } });
  } } },
});
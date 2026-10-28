export const PRIVATE_SESSION_SECONDS = 60 * 60 * 4;
export function isCurrentPrivateSession(data: { fingerprint?: string; openedAt?: number }, fingerprint: string, now = Date.now()) {
  return typeof data.openedAt === 'number' && data.openedAt <= now
    && now - data.openedAt < PRIVATE_SESSION_SECONDS * 1000 && data.fingerprint === fingerprint;
}
export function isPrivateEndpoint(path: string) {
  return path === '/api/public/private-access' || path === '/api/public/private-file';
}
export function isSameOriginPost(request: Request) {
  return request.method === 'POST' && request.headers.get('origin') === new URL(request.url).origin;
}
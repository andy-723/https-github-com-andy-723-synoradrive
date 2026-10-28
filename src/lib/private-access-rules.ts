export const PRIVATE_SESSION_SECONDS = 60 * 60 * 4;
export function isPrivateEndpoint(path: string) {
  return path === '/api/public/private-access' || path === '/api/public/private-file';
}
export function isSameOriginPost(request: Request) {
  return request.method === 'POST' && request.headers.get('origin') === new URL(request.url).origin;
}
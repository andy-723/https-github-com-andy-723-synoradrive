import { describe, expect, it } from 'vitest';
import { isCurrentPrivateSession, isPrivateEndpoint, isSameOriginPost, PRIVATE_SESSION_SECONDS } from '@/lib/private-access-rules';
import { passwordMatches, passwordFingerprint } from '@/lib/private-access.server';
import { blockedSiteRequest } from '@/lib/site-lock';

describe('Shared-password private viewing', () => {
  it('accepts the correct password but not a different or empty password', () => {
    expect(passwordMatches('test-only-password', 'test-only-password')).toBe(true);
    expect(passwordMatches('wrong', 'test-only-password')).toBe(false);
    expect(passwordMatches('', 'test-only-password')).toBe(false);
  });
  it('only accepts a server-issued session for the current password', () => {
    const fingerprint = passwordFingerprint('test-only-password');
    expect(isCurrentPrivateSession({ fingerprint, openedAt: 1000 }, fingerprint, 2000)).toBe(true);
    expect(isCurrentPrivateSession({}, fingerprint, 2000)).toBe(false);
    expect(isCurrentPrivateSession({ fingerprint: 'forged', openedAt: 1000 }, fingerprint, 2000)).toBe(false);
  });
  it('invalidates previous sessions when the shared password changes', () => {
    expect(isCurrentPrivateSession({ fingerprint: passwordFingerprint('old-password'), openedAt: 1000 }, passwordFingerprint('new-password'), 2000)).toBe(false);
  });
  it('expires access after four hours and rejects future timestamps', () => {
    expect(PRIVATE_SESSION_SECONDS).toBe(14400);
    expect(isCurrentPrivateSession({ fingerprint: 'abc', openedAt: 1000 }, 'abc', 14400999)).toBe(true);
    expect(isCurrentPrivateSession({ fingerprint: 'abc', openedAt: 1000 }, 'abc', 14401000)).toBe(false);
    expect(isCurrentPrivateSession({ fingerprint: 'abc', openedAt: 3000 }, 'abc', 2000)).toBe(false);
  });
  it('requires same-origin POST for opening and locking a view', () => {
    expect(isSameOriginPost(new Request('https://example.test/api/public/private-access', { method: 'POST', headers: { Origin: 'https://example.test' } }))).toBe(true);
    expect(isSameOriginPost(new Request('https://example.test/api/public/private-access', { method: 'POST', headers: { Origin: 'https://attacker.test' } }))).toBe(false);
    expect(isSameOriginPost(new Request('https://example.test/api/public/private-access', { method: 'POST' }))).toBe(false);
  });
  it('keeps demo and contact submissions blocked without broad endpoint exemptions', () => {
    for (const path of ['/demo', '/contact', '/_serverFn/x', '/api/public/private-access/other']) {
      expect(blockedSiteRequest(new Request('https://example.test' + path, { method: 'POST' }))?.status).toBe(503);
    }
    expect(isPrivateEndpoint('/api/public/private-access')).toBe(true);
    expect(isPrivateEndpoint('/api/public/private-file')).toBe(true);
    expect(isPrivateEndpoint('/api/public/private-file/other')).toBe(false);
  });
});
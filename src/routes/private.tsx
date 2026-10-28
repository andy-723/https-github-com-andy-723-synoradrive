import { createFileRoute } from '@tanstack/react-router';
import { SynoraDriveLogo } from '@/components/synoradrive-logo';
import { Button } from '@/components/ui/button';
import { LockKeyhole, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/private')({
  validateSearch: (search: Record<string, unknown>) => ({ error: search['error'] === 'incorrect' ? 'incorrect' : undefined }),
  head: () => ({ meta: [
    { title: 'SynoraDrive — Private viewing' },
    { name: "description", content: "Password-protected private viewing of SynoraDrive. Public website access remains paused." },
    { property: 'og:title', content: 'SynoraDrive — Private viewing' },
    { property: 'og:description', content: 'Private website viewing by invitation.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
  ] }),
  component: PrivateAccess,
});
function PrivateAccess() {
  const { error } = Route.useSearch();
  return <div className="min-h-svh bg-background text-foreground px-6 py-8 sm:px-10">
    <div className="mx-auto max-w-6xl"><SynoraDriveLogo /></div>
    <section className="mx-auto flex min-h-[70svh] max-w-6xl items-center py-16">
      <div className="w-full max-w-md border-l-2 border-brand-mint pl-6 sm:pl-10">
        <LockKeyhole className="mb-8 size-8 text-brand-mint" />
        <h1 className="text-4xl font-semibold">Private viewing.</h1>
        <form action="/api/public/private-access" method="post" className="mt-8 space-y-5">
          <div><label htmlFor="password" className="mb-2 block text-sm">Access password</label>
            <input id="password" name="password" type="password" required maxLength={256} autoComplete="current-password" className="h-12 w-full rounded-lg border border-input bg-background px-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          {error && <p role="alert" className="text-sm text-destructive">Incorrect password. Please try again.</p>}
          <Button type="submit" className="h-12 w-full">Enter private website<ArrowRight /></Button>
        </form>
      </div>
    </section>
    <footer className="mx-auto max-w-6xl border-t border-border py-6 text-xs text-muted-foreground">© 2026 SYNORA TECH. All rights reserved.</footer>
  </div>;
}
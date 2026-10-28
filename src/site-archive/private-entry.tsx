import { createRootRoute, createRoute, createRouter, RouterProvider, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { SiteHeader } from './components/site-header';
import { SiteFooter } from './components/site-footer';
import { CookieBanner } from './components/cookie-banner';
import { SiteHoverEffects } from '@/components/site-hover-effects';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';
import { Route as home } from './routes/index';
import { Route as about } from './routes/about';
import { Route as pricing } from './routes/pricing';
import { Route as platform } from './routes/platform.index';
import { Route as compliance } from './routes/platform.compliance';
import { Route as operations } from './routes/platform.operations';
import { Route as reporting } from './routes/platform.reporting';
import { Route as experience } from './routes/platform.customer-experience';
import { Route as how } from './routes/how-it-works';
import { Route as security } from './routes/security';
import { Route as partners } from './routes/partners';
import { Route as demo } from './routes/demo';
import { Route as contact } from './routes/contact';
import { Route as privacy } from './routes/privacy';
import { Route as terms } from './routes/terms';

const queryClient = new QueryClient();
function PrivateShell() {
  return <QueryClientProvider client={queryClient}>
    <div className="site-hover-effects min-h-screen overflow-x-clip">
      <SiteHoverEffects /><SiteHeader />
      <div className="fixed bottom-4 right-4 z-50">
        <form action="/api/public/private-access" method="post">
          <input type="hidden" name="action" value="lock" />
          <Button type="submit" variant="outline"><LockKeyhole />Lock private view</Button>
        </form>
      </div>
      <main id="main-content"><Outlet /></main><SiteFooter /><CookieBanner />
    </div>
  </QueryClientProvider>;
}
const root = createRootRoute({ component: PrivateShell });
const pages = [
  ['/', home], ['/about', about], ['/pricing', pricing], ['/platform', platform],
  ['/platform/compliance', compliance], ['/platform/operations', operations],
  ['/platform/reporting', reporting], ['/platform/customer-experience', experience],
  ['/how-it-works', how], ['/security', security], ['/partners', partners],
  ['/demo', demo], ['/contact', contact], ['/privacy', privacy], ['/terms', terms],
] as const;
const routeTree = root.addChildren(pages.map(([path, archived]) => createRoute({
  getParentRoute: () => root, path, component: archived.options.component,
})));
const router = createRouter({ routeTree, basepath: '/private/site', scrollRestoration: true });
const mount = document.getElementById('private-site');
if (mount) createRoot(mount).render(<RouterProvider router={router} />);

// A resumed tab must revalidate its encrypted session before revealing private content.
window.addEventListener('pageshow', (event) => { if (event.persisted) window.location.reload(); });
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    fetch('/api/public/private-file?name=session', { cache: 'no-store' }).then(response => {
      if (!response.ok) window.location.assign('/private');
    }).catch(() => window.location.assign('/private'));
  }
});
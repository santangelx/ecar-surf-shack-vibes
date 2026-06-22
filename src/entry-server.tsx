import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { AppShell } from './App';

// Re-exported so scripts/prerender.mjs gets the route list from the same source
// (src/lib/routes.ts) without a second hardcoded copy.
export { ROUTES } from './lib/routes';

// Rendered at build time by scripts/prerender.mjs, once per route.
// Returns the body HTML plus the serialized <head> tags collected by Helmet.
export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join('\n')
    : '';

  const htmlAttributes = helmet ? helmet.htmlAttributes.toString() : '';

  return { html, head, htmlAttributes };
}

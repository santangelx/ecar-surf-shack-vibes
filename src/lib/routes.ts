// Single source of truth for every localized route.
// Consumed by: LanguageContext (routePaths lookup + hreflang), vite.config.ts
// (sitemap dynamicRoutes), and scripts/prerender.mjs (which routes to prerender,
// re-exported via entry-server.tsx). Add a page here once — never in four places.

export const routePaths = {
  en: {
    home: '/',
    kayak: '/kayak-rental-almunecar',
    paddle: '/paddle-board-almunecar',
  },
  es: {
    home: '/es',
    kayak: '/es/alquiler-kayak-almunecar',
    paddle: '/es/paddle-surf-almunecar',
  },
  fr: {
    home: '/fr',
    kayak: '/fr/location-kayak-almunecar',
    paddle: '/fr/paddle-board-almunecar',
  },
};

// Flat list of every literal route, derived so it can never drift from routePaths.
export const ROUTES: string[] = Object.values(routePaths).flatMap((langPaths) =>
  Object.values(langPaths),
);

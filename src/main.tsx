import { hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// SSG: the HTML for each route is prerendered (see scripts/prerender.mjs), so
// hydrate the existing DOM rather than re-rendering it from scratch.
hydrateRoot(document.getElementById("root")!, <App />);

// Static prerender for GitHub Pages.
// Runs after `vite build` (client) + `vite build --config vite.config.ssr.ts`
// (server). Renders every route to its own dist/<route>/index.html so direct
// deep-link loads serve real HTML (no SPA 404) with correct per-page head tags.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");

const routeToFile = (route) =>
  route === "/" ? join(distDir, "index.html") : join(distDir, route, "index.html");

// Strip the static <title> and generic <meta name="description"> from the
// built template so Helmet's per-route tags don't duplicate them.
function cleanTemplateHead(template) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[^>]*>/i, "");
}

function injectHtmlLang(html, htmlAttributes) {
  if (!htmlAttributes) return html;
  // Replace the lang on the root <html> tag with Helmet's htmlAttributes.
  return html.replace(/<html[^>]*>/i, `<html ${htmlAttributes}>`);
}

async function main() {
  const template = cleanTemplateHead(
    await readFile(join(distDir, "index.html"), "utf-8"),
  );

  const { render, ROUTES } = await import(
    pathToFileURL(join(distDir, "server", "entry-server.js")).href
  );

  for (const route of ROUTES) {
    const { html, head, htmlAttributes } = render(route);
    let page = template
      .replace("</head>", `${head}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    page = injectHtmlLang(page, htmlAttributes);

    const outFile = routeToFile(route);
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, page, "utf-8");
    console.log(`prerendered ${route} -> ${outFile.replace(distDir, "dist")}`);
  }

  // 404.html for unknown paths (GitHub Pages serves this on a miss).
  const notFound = render("/this-route-does-not-exist");
  let notFoundPage = template
    .replace("</head>", `${notFound.head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${notFound.html}</div>`);
  notFoundPage = injectHtmlLang(notFoundPage, notFound.htmlAttributes);
  await writeFile(join(distDir, "404.html"), notFoundPage, "utf-8");
  console.log("prerendered 404 -> dist/404.html");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

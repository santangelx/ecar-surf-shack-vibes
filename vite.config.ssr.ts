import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Server build used only for SSG prerendering (scripts/prerender.mjs).
// Deliberately minimal: no sitemap/imagemin plugins, no manual chunks.
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    ssr: true,
    outDir: "dist/server",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "src/entry-server.tsx"),
      output: { entryFileNames: "entry-server.js" },
    },
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
});

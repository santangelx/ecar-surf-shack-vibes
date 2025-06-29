import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import sitemap from "vite-plugin-sitemap";
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    sitemap({
      hostname: 'https://opensea-almunecar.com',
      generateRobotsTxt: true,
      exclude: ['/404'],
      dynamicRoutes: [
        '/',
        '/kayak-rental-almunecar',
        '/paddle-board-almunecar', 
        '/sea-activities-costa-tropical',
        '/es',
        '/es/alquiler-kayak-almunecar',
        '/es/paddle-surf-almunecar',
        '/es/actividades-maritimas-costa-tropical',
        '/fr',
        '/fr/location-kayak-almunecar',
        '/fr/paddle-board-almunecar',
        '/fr/activites-maritimes-costa-tropical'
      ]
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      webp: {
        quality: 80,
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize build for better performance
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Skip manual chunks for SSR builds to avoid conflicts
          if (process.env.VITE_SSG) return;
          
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            if (id.includes('clsx') || id.includes('class-variance-authority') || id.includes('tailwind-merge')) {
              return 'utils';
            }
          }
        }
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Inline assets smaller than 4kb
    assetsInlineLimit: 4096,
    // Generate source maps for production debugging
    sourcemap: false,
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vite-pwa/assets-generator']
  },
  // SSR configuration
  ssr: {
    noExternal: ['react-helmet-async']
  }
}));

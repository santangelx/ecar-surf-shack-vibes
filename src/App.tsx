import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import KayakRental from "./pages/KayakRental";
import PaddleBoard from "./pages/PaddleBoard";

const queryClient = new QueryClient();

// Router-less app body. Used by both the client (wrapped in BrowserRouter via
// App below) and the SSG prerender (wrapped in StaticRouter in entry-server.tsx).
// Keep all providers EXCEPT the router here.
export const AppShell = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Default Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/kayak-rental-almunecar" element={<KayakRental />} />
          <Route path="/paddle-board-almunecar" element={<PaddleBoard />} />

          {/* Spanish Routes */}
          <Route path="/es" element={<Index />} />
          <Route path="/es/alquiler-kayak-almunecar" element={<KayakRental />} />
          <Route path="/es/paddle-surf-almunecar" element={<PaddleBoard />} />

          {/* French Routes */}
          <Route path="/fr" element={<Index />} />
          <Route path="/fr/location-kayak-almunecar" element={<KayakRental />} />
          <Route path="/fr/paddle-board-almunecar" element={<PaddleBoard />} />

          {/* Redirects for consistency */}
          <Route path="/kayak" element={<Navigate to="/kayak-rental-almunecar" replace />} />
          <Route path="/paddle" element={<Navigate to="/paddle-board-almunecar" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// Client entry: HelmetProvider outermost, then the browser router.
const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;

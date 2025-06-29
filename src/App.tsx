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
import SeaActivities from "./pages/SeaActivities";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <LanguageProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Default Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/kayak-rental-almunecar" element={<KayakRental />} />
              <Route path="/paddle-board-almunecar" element={<PaddleBoard />} />
              <Route path="/sea-activities-costa-tropical" element={<SeaActivities />} />
              
              {/* Spanish Routes */}
              <Route path="/es" element={<Index />} />
              <Route path="/es/alquiler-kayak-almunecar" element={<KayakRental />} />
              <Route path="/es/paddle-surf-almunecar" element={<PaddleBoard />} />
              <Route path="/es/actividades-maritimas-costa-tropical" element={<SeaActivities />} />
              
              {/* French Routes */}
              <Route path="/fr" element={<Index />} />
              <Route path="/fr/location-kayak-almunecar" element={<KayakRental />} />
              <Route path="/fr/paddle-board-almunecar" element={<PaddleBoard />} />
              <Route path="/fr/activites-maritimes-costa-tropical" element={<SeaActivities />} />
              
              {/* Redirects for consistency */}
              <Route path="/kayak" element={<Navigate to="/kayak-rental-almunecar" replace />} />
              <Route path="/paddle" element={<Navigate to="/paddle-board-almunecar" replace />} />
              <Route path="/activities" element={<Navigate to="/sea-activities-costa-tropical" replace />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

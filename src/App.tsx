import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";
import { TouristHome } from "./pages/TouristHome";
import { AuthorityDashboard } from "./pages/AuthorityDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tourist/:id" element={<TouristHome touristData={{
              fullName: "Emma Johnson",
              nationality: "USA",
              passport: "US123456789",
              digitalId: "0x1a2b3c4d5e6f7890abcdef1234567890",
              qrCode: "",
              currentLocation: "Guwahati, Assam",
              lastCheckIn: new Date().toISOString(),
              plannedRoute: "Guwahati → Kaziranga → Shillong",
              status: "safe"
            }} />} />
            <Route path="/dashboard" element={<AuthorityDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

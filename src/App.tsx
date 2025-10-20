import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import V2 from "./pages/V2";
import Admin from "./pages/Admin";
import NavigationSearch from "./pages/NavigationSearch";
import FinanceHub from "./pages/FinanceHub";
import MerchandisingHub from "./pages/MerchandisingHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/v2" element={<V2 />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/navigation-search" element={<NavigationSearch />} />
          <Route path="/finance" element={<FinanceHub />} />
          <Route path="/merchandising" element={<MerchandisingHub />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

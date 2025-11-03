import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExtensionProvider40 } from "@looker/extension-sdk-react";
import V8 from "./pages/V8";

const queryClient = new QueryClient();

const App = () => (
  <ExtensionProvider40>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <V8 />
      </TooltipProvider>
    </QueryClientProvider>
  </ExtensionProvider40>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/dashboard/Sales";
import Products from "./pages/dashboard/Products";
import Clients from "./pages/dashboard/Clients";
import Reports from "./pages/dashboard/Reports";
import Finances from "./pages/dashboard/Finances";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="sales" element={<Sales />} />
            <Route path="products" element={<Products />} />
            <Route path="stock" element={<Products />} />
            <Route path="clients" element={<Clients />} />
            <Route path="reports" element={<Reports />} />
            <Route path="finances" element={<Finances />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

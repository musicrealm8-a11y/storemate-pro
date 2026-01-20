import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/dashboard/Sales";
import Products from "./pages/dashboard/Products";
import Stock from "./pages/dashboard/Stock";
import StockDetail from "./pages/dashboard/StockDetail";
import Clients from "./pages/dashboard/Clients";
import Reports from "./pages/dashboard/Reports";
import Finances from "./pages/dashboard/Finances";
import Users from "./pages/dashboard/Users";
import Settings from "./pages/dashboard/Settings";
import Consignments from "./pages/dashboard/Consignments";
import ConsignmentDetail from "./pages/dashboard/ConsignmentDetail";
import AdminPortal from "./pages/admin/AdminPortal";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSales from "./pages/admin/AdminSales";
import AdminStock from "./pages/admin/AdminStock";
import AdminClients from "./pages/admin/AdminClients";
import AdminFinances from "./pages/admin/AdminFinances";
import AdminUsers from "./pages/admin/AdminUsers";
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
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="sales" element={<Sales />} />
            <Route path="products" element={<Products />} />
            <Route path="stock" element={<Stock />} />
            <Route path="stock/:productId" element={<StockDetail />} />
            <Route path="clients" element={<Clients />} />
            <Route path="consignments" element={<Consignments />} />
            <Route path="consignments/:consignmentId" element={<ConsignmentDetail />} />
            <Route path="reports" element={<Reports />} />
            <Route path="finances" element={<Finances />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/admin" element={<AdminPortal />}>
            <Route index element={<AdminDashboard />} />
            <Route path="sales" element={<AdminSales />} />
            <Route path="stock" element={<AdminStock />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="finances" element={<AdminFinances />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const weeklySalesData = [
  { name: "Mon", sales: 2400 },
  { name: "Tue", sales: 1398 },
  { name: "Wed", sales: 9800 },
  { name: "Thu", sales: 3908 },
  { name: "Fri", sales: 4800 },
  { name: "Sat", sales: 3800 },
  { name: "Sun", sales: 4300 },
];

const monthlySalesData = [
  { name: "Week 1", sales: 12400 },
  { name: "Week 2", sales: 18500 },
  { name: "Week 3", sales: 15200 },
  { name: "Week 4", sales: 21000 },
];

const yearlySalesData = [
  { name: "Jan", sales: 45000 },
  { name: "Feb", sales: 52000 },
  { name: "Mar", sales: 48000 },
  { name: "Apr", sales: 61000 },
  { name: "May", sales: 55000 },
  { name: "Jun", sales: 67000 },
  { name: "Jul", sales: 72000 },
  { name: "Aug", sales: 69000 },
  { name: "Sep", sales: 78000 },
  { name: "Oct", sales: 85000 },
  { name: "Nov", sales: 92000 },
  { name: "Dec", sales: 105000 },
];

const topProducts = [
  { name: "iPhone 15 Pro", sales: 142, revenue: "$156,800" },
  { name: "MacBook Air M3", sales: 89, revenue: "$115,700" },
  { name: "AirPods Pro 2", sales: 234, revenue: "$58,500" },
  { name: "iPad Pro 12.9", sales: 67, revenue: "$80,400" },
  { name: "Apple Watch Ultra", sales: 98, revenue: "$78,400" },
];

const lowStockItems = [
  { name: "USB-C Cables", stock: 5, threshold: 20 },
  { name: "iPhone Cases", stock: 8, threshold: 25 },
  { name: "Screen Protectors", stock: 3, threshold: 15 },
];

const DashboardHome = () => {
  const [chartPeriod, setChartPeriod] = useState("weekly");

  const getChartData = () => {
    switch (chartPeriod) {
      case "weekly":
        return weeklySalesData;
      case "monthly":
        return monthlySalesData;
      case "yearly":
        return yearlySalesData;
      default:
        return weeklySalesData;
    }
  };

  const getPeriodLabel = () => {
    switch (chartPeriod) {
      case "weekly":
        return "vs last week";
      case "monthly":
        return "vs last month";
      case "yearly":
        return "vs last year";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Sales"
          value="$12,426"
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-accent"
        />
        <StatCard
          title="Weekly Sales"
          value="$67,100"
          change="+23.5%"
          changeType="positive"
          icon={ShoppingCart}
          iconColor="text-info"
        />
        <StatCard
          title="Monthly Sales"
          value="$284,500"
          change="+18.2%"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-success"
        />
        <StatCard
          title="Yearly Sales"
          value="$2.4M"
          change="+32.1%"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-warning"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Orders"
          value="1,856"
          change="+8.2%"
          changeType="positive"
          icon={ShoppingCart}
          iconColor="text-info"
        />
        <StatCard
          title="Products in Stock"
          value="2,847"
          change="-2.4%"
          changeType="negative"
          icon={Package}
          iconColor="text-warning"
        />
        <StatCard
          title="Low Stock Alerts"
          value="12"
          change="3 critical"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-destructive"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart with Tabs */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <Tabs value={chartPeriod} onValueChange={setChartPeriod} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Sales Overview</h3>
                <p className="text-sm text-muted-foreground">{chartPeriod.charAt(0).toUpperCase() + chartPeriod.slice(1)} sales performance</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 text-success">
                    <ArrowUpRight className="h-4 w-4" />
                    23.5%
                  </span>
                  <span className="text-muted-foreground">{getPeriodLabel()}</span>
                </div>
                <TabsList>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="weekly" className="mt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklySalesData}>
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="hsl(160, 84%, 39%)" strokeWidth={2} fill="url(#salesGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlySalesData}>
                    <defs>
                      <linearGradient id="salesGradientMonthly" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="hsl(160, 84%, 39%)" strokeWidth={2} fill="url(#salesGradientMonthly)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="yearly" className="mt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={yearlySalesData}>
                    <defs>
                      <linearGradient id="salesGradientYearly" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="sales" stroke="hsl(160, 84%, 39%)" strokeWidth={2} fill="url(#salesGradientYearly)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Low Stock Alerts</h3>
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Threshold: {item.threshold}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-destructive">{item.stock}</p>
                  <p className="text-xs text-muted-foreground">in stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Top Selling Products</h3>
            <p className="text-sm text-muted-foreground">This month's best performers</p>
          </div>
          <TrendingUp className="h-5 w-5 text-accent" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Sales</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product.name} className="border-b border-border/50 last:border-0">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-sm font-medium text-accent">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-sm text-foreground">{product.sales} units</td>
                  <td className="py-3 px-4 text-right text-sm font-medium text-foreground">{product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const isHome = location.pathname === "/dashboard";

  const getPageInfo = () => {
    const path = location.pathname;
    if (path === "/dashboard") return { title: "Dashboard", subtitle: "Welcome back! Here's what's happening today." };
    if (path.includes("/sales")) return { title: "Sales", subtitle: "Process and manage sales transactions" };
    if (path.includes("/stock/")) return { title: "Stock Details", subtitle: "View item sales and performance" };
    if (path.includes("/stock")) return { title: "Stock", subtitle: "Monitor and update inventory levels" };
    if (path.includes("/products")) return { title: "Products", subtitle: "Manage your product catalog" };
    if (path.includes("/clients")) return { title: "Clients", subtitle: "View and manage customer information" };
    if (path.includes("/reports")) return { title: "Reports", subtitle: "Generate and download reports" };
    if (path.includes("/finances")) return { title: "Income & Expenses", subtitle: "Track financial records" };
    if (path.includes("/users")) return { title: "User Management", subtitle: "Manage team members and permissions" };
    if (path.includes("/settings")) return { title: "Settings", subtitle: "Configure your store settings" };
    return { title: "Dashboard", subtitle: "" };
  };

  const pageInfo = getPageInfo();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <DashboardHeader 
          title={pageInfo.title} 
          subtitle={pageInfo.subtitle}
          showAddButton={!isHome && !location.pathname.includes("/stock/")}
          addButtonText={pageInfo.title === "Sales" ? "New Sale" : "Add New"}
        />
        <main className="p-6">
          {isHome ? <DashboardHome /> : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

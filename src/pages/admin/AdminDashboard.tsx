import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  Building2,
  ArrowUpRight,
} from "lucide-react";

// Mock multi-store data
const stores = [
  { id: "1", name: "Downtown Store", revenue: 125000, orders: 1250, growth: 12.5 },
  { id: "2", name: "Mall Branch", revenue: 98000, orders: 980, growth: 8.3 },
  { id: "3", name: "Airport Outlet", revenue: 75000, orders: 650, growth: -2.1 },
];

const dailySalesData = [
  { date: "Mon", store1: 4200, store2: 3100, store3: 2400 },
  { date: "Tue", store1: 3800, store2: 2800, store3: 2100 },
  { date: "Wed", store1: 5100, store2: 4200, store3: 3200 },
  { date: "Thu", store1: 4600, store2: 3600, store3: 2800 },
  { date: "Fri", store1: 6200, store2: 5100, store3: 4100 },
  { date: "Sat", store1: 7500, store2: 6200, store3: 5200 },
  { date: "Sun", store1: 5800, store2: 4800, store3: 3800 },
];

const weeklySalesData = [
  { week: "Week 1", store1: 32000, store2: 26000, store3: 21000 },
  { week: "Week 2", store1: 35000, store2: 28000, store3: 22000 },
  { week: "Week 3", store1: 38000, store2: 31000, store3: 24000 },
  { week: "Week 4", store1: 42000, store2: 34000, store3: 26000 },
];

const monthlySalesData = [
  { month: "Jan", store1: 95000, store2: 78000, store3: 62000 },
  { month: "Feb", store1: 102000, store2: 85000, store3: 68000 },
  { month: "Mar", store1: 118000, store2: 92000, store3: 75000 },
  { month: "Apr", store1: 125000, store2: 98000, store3: 78000 },
];

const topProducts = [
  { name: "Laptop Pro 15", sales: 245, revenue: 318255, store: "Downtown" },
  { name: "Wireless Mouse", sales: 892, revenue: 44556, store: "Mall Branch" },
  { name: "USB-C Hub", sales: 567, revenue: 45272, store: "Downtown" },
  { name: "Mechanical Keyboard", sales: 334, revenue: 50066, store: "Airport" },
  { name: "Monitor 27\"", sales: 123, revenue: 49199, store: "Mall Branch" },
];

const storeDistribution = [
  { name: "Downtown Store", value: 125000, color: "hsl(var(--primary))" },
  { name: "Mall Branch", value: 98000, color: "hsl(var(--chart-2))" },
  { name: "Airport Outlet", value: 75000, color: "hsl(var(--chart-3))" },
];

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("daily");

  const totalRevenue = stores.reduce((sum, store) => sum + store.revenue, 0);
  const totalOrders = stores.reduce((sum, store) => sum + store.orders, 0);
  const avgGrowth = stores.reduce((sum, store) => sum + store.growth, 0) / stores.length;

  const getChartData = () => {
    switch (timeFilter) {
      case "weekly": return weeklySalesData;
      case "monthly": return monthlySalesData;
      default: return dailySalesData;
    }
  };

  const getXAxisKey = () => {
    switch (timeFilter) {
      case "weekly": return "week";
      case "monthly": return "month";
      default: return "date";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Multi-Store Dashboard</h1>
        <p className="text-muted-foreground">Aggregated analytics across all your stores</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{avgGrowth.toFixed(1)}% from last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all stores</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Stores</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.length}</div>
            <p className="text-xs text-muted-foreground">All operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / totalOrders).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Revenue comparison across stores</CardDescription>
              </div>
              <Tabs value={timeFilter} onValueChange={setTimeFilter}>
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey={getXAxisKey()} className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="store1" 
                    name="Downtown Store"
                    stackId="1" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="store2" 
                    name="Mall Branch"
                    stackId="1" 
                    stroke="hsl(var(--chart-2))" 
                    fill="hsl(var(--chart-2))" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="store3" 
                    name="Airport Outlet"
                    stackId="1" 
                    stroke="hsl(var(--chart-3))" 
                    fill="hsl(var(--chart-3))" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Store Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>By store location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={storeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {storeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Performance & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Store Performance</CardTitle>
            <CardDescription>Individual store metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stores.map((store) => (
                <div key={store.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{store.name}</p>
                      <p className="text-sm text-muted-foreground">{store.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${store.revenue.toLocaleString()}</p>
                    <div className={cn(
                      "flex items-center text-sm",
                      store.growth >= 0 ? "text-green-600" : "text-red-600"
                    )}>
                      {store.growth >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {store.growth >= 0 ? "+" : ""}{store.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performers across all stores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${product.revenue.toLocaleString()}</p>
                    <Badge variant="outline" className="text-xs">{product.store}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default AdminDashboard;

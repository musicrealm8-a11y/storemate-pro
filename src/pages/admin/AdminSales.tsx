import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock sales data
const salesTrendData = [
  { period: "Jan", downtown: 95000, mall: 78000, airport: 62000, total: 235000 },
  { period: "Feb", downtown: 102000, mall: 85000, airport: 68000, total: 255000 },
  { period: "Mar", downtown: 118000, mall: 92000, airport: 75000, total: 285000 },
  { period: "Apr", downtown: 125000, mall: 98000, airport: 78000, total: 301000 },
  { period: "May", downtown: 132000, mall: 105000, airport: 82000, total: 319000 },
  { period: "Jun", downtown: 145000, mall: 112000, airport: 88000, total: 345000 },
];

const storeComparison = [
  { store: "Downtown Store", sales: 717000, orders: 5420, avgOrder: 132.29, growth: 15.2 },
  { store: "Mall Branch", sales: 570000, orders: 4850, avgOrder: 117.53, growth: 12.8 },
  { store: "Airport Outlet", sales: 453000, orders: 3920, avgOrder: 115.56, growth: 8.5 },
];

const recentSales = [
  { id: "SAL-001", store: "Downtown", customer: "John Doe", amount: 1299.99, items: 3, date: "2024-01-20" },
  { id: "SAL-002", store: "Mall Branch", customer: "Jane Smith", amount: 549.98, items: 5, date: "2024-01-20" },
  { id: "SAL-003", store: "Airport", customer: "Mike Johnson", amount: 899.99, items: 2, date: "2024-01-20" },
  { id: "SAL-004", store: "Downtown", customer: "Sarah Williams", amount: 1599.97, items: 4, date: "2024-01-19" },
  { id: "SAL-005", store: "Mall Branch", customer: "Tom Brown", amount: 349.99, items: 1, date: "2024-01-19" },
];

const AdminSales = () => {
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [storeFilter, setStoreFilter] = useState("all");

  const totalSales = storeComparison.reduce((sum, store) => sum + store.sales, 0);
  const totalOrders = storeComparison.reduce((sum, store) => sum + store.orders, 0);
  const avgGrowth = storeComparison.reduce((sum, store) => sum + store.growth, 0) / storeComparison.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Analytics</h1>
          <p className="text-muted-foreground">Comprehensive sales data across all stores</p>
        </div>
        <div className="flex gap-2">
          <Select value={storeFilter} onValueChange={setStoreFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              <SelectItem value="downtown">Downtown Store</SelectItem>
              <SelectItem value="mall">Mall Branch</SelectItem>
              <SelectItem value="airport">Airport Outlet</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +{avgGrowth.toFixed(1)}% vs last period
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalSales / totalOrders).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Best Performer</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Downtown</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +15.2% growth
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sales Trends</CardTitle>
              <CardDescription>Revenue performance over time</CardDescription>
            </div>
            <Tabs value={timeFilter} onValueChange={setTimeFilter}>
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="period" className="text-xs" />
                <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="downtown" 
                  name="Downtown Store"
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mall" 
                  name="Mall Branch"
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="airport" 
                  name="Airport Outlet"
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Store Comparison & Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Store Comparison</CardTitle>
            <CardDescription>Performance metrics by store</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {storeComparison.map((store) => (
                  <TableRow key={store.store}>
                    <TableCell className="font-medium">{store.store}</TableCell>
                    <TableCell className="text-right">${store.sales.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{store.orders.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant="outline" 
                        className={store.growth >= 10 ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}
                      >
                        +{store.growth}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest transactions across all stores</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{sale.store}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">${sale.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSales;

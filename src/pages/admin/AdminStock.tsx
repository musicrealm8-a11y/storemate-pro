import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
} from "recharts";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Building2,
} from "lucide-react";

// Mock stock data
const stockOverview = [
  { store: "Downtown Store", totalItems: 1250, lowStock: 12, outOfStock: 3, value: 185000 },
  { store: "Mall Branch", totalItems: 980, lowStock: 8, outOfStock: 5, value: 142000 },
  { store: "Airport Outlet", totalItems: 650, lowStock: 15, outOfStock: 7, value: 98000 },
];

const categoryDistribution = [
  { name: "Electronics", value: 35, color: "hsl(var(--primary))" },
  { name: "Accessories", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Software", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Peripherals", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 7, color: "hsl(var(--chart-5))" },
];

const stockMovement = [
  { month: "Jan", inbound: 450, outbound: 380 },
  { month: "Feb", inbound: 520, outbound: 420 },
  { month: "Mar", inbound: 480, outbound: 510 },
  { month: "Apr", inbound: 600, outbound: 480 },
  { month: "May", inbound: 550, outbound: 520 },
  { month: "Jun", inbound: 620, outbound: 580 },
];

const lowStockItems = [
  { product: "Laptop Pro 15", store: "Downtown", current: 5, minimum: 10, status: "low" },
  { product: "USB-C Hub", store: "Mall Branch", current: 3, minimum: 15, status: "critical" },
  { product: "Wireless Mouse", store: "Airport", current: 0, minimum: 20, status: "out" },
  { product: "Monitor 27\"", store: "Downtown", current: 2, minimum: 5, status: "low" },
  { product: "Keyboard Mech", store: "Mall Branch", current: 0, minimum: 10, status: "out" },
];

const AdminStock = () => {
  const [storeFilter, setStoreFilter] = useState("all");

  const totalItems = stockOverview.reduce((sum, store) => sum + store.totalItems, 0);
  const totalLowStock = stockOverview.reduce((sum, store) => sum + store.lowStock, 0);
  const totalOutOfStock = stockOverview.reduce((sum, store) => sum + store.outOfStock, 0);
  const totalValue = stockOverview.reduce((sum, store) => sum + store.value, 0);

  const getStatusBadge = (status: string) => {
    const styles = {
      low: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      critical: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      out: "bg-red-500/10 text-red-600 border-red-500/20",
    };
    const labels = { low: "Low Stock", critical: "Critical", out: "Out of Stock" };
    return <Badge variant="outline" className={styles[status as keyof typeof styles]}>{labels[status as keyof typeof labels]}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stock Analytics</h1>
          <p className="text-muted-foreground">Aggregated inventory across all stores</p>
        </div>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Stock Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all stores</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stock Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8.2% vs last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totalLowStock}</div>
            <p className="text-xs text-muted-foreground">Items need restock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalOutOfStock}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Movement */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Movement</CardTitle>
            <CardDescription>Inbound vs outbound inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockMovement}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="inbound" name="Inbound" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="outbound" name="Outbound" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Stock breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, ""]}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Stock & Low Stock Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Stock Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Store Stock Overview</CardTitle>
            <CardDescription>Inventory levels by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockOverview.map((store) => (
                <div key={store.store} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{store.store}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{store.totalItems} items</span>
                  </div>
                  <Progress value={(store.totalItems / 1500) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Value: ${store.value.toLocaleString()}</span>
                    <span className="text-yellow-600">{store.lowStock} low | {store.outOfStock} out</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.store}</TableCell>
                    <TableCell className="text-right">{item.current}/{item.minimum}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
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

export default AdminStock;

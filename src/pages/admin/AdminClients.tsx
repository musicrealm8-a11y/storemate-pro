import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
} from "recharts";
import {
  Users,
  UserPlus,
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Building2,
} from "lucide-react";

// Mock client data
const clientOverview = [
  { store: "Downtown Store", total: 450, active: 380, newThisMonth: 28 },
  { store: "Mall Branch", total: 320, active: 275, newThisMonth: 22 },
  { store: "Airport Outlet", total: 180, active: 145, newThisMonth: 15 },
];

const clientGrowth = [
  { month: "Jan", downtown: 420, mall: 290, airport: 155 },
  { month: "Feb", downtown: 428, mall: 298, airport: 162 },
  { month: "Mar", downtown: 435, mall: 305, airport: 168 },
  { month: "Apr", downtown: 442, mall: 312, airport: 172 },
  { month: "May", downtown: 448, mall: 318, airport: 178 },
  { month: "Jun", downtown: 450, mall: 320, airport: 180 },
];

const purchaseTrends = [
  { segment: "Premium", count: 120, spend: 85000, avgOrder: 708 },
  { segment: "Regular", count: 450, spend: 125000, avgOrder: 278 },
  { segment: "Occasional", count: 280, spend: 42000, avgOrder: 150 },
  { segment: "New", count: 100, spend: 15000, avgOrder: 150 },
];

const topClients = [
  { name: "John Doe", store: "Downtown", totalSpent: 15420, orders: 45, lastOrder: "2024-01-20" },
  { name: "Jane Smith", store: "Mall Branch", totalSpent: 12850, orders: 38, lastOrder: "2024-01-19" },
  { name: "Mike Johnson", store: "Airport", totalSpent: 9820, orders: 29, lastOrder: "2024-01-18" },
  { name: "Sarah Williams", store: "Downtown", totalSpent: 8540, orders: 25, lastOrder: "2024-01-20" },
  { name: "Tom Brown", store: "Mall Branch", totalSpent: 7650, orders: 22, lastOrder: "2024-01-17" },
];

const AdminClients = () => {
  const [storeFilter, setStoreFilter] = useState("all");

  const totalClients = clientOverview.reduce((sum, store) => sum + store.total, 0);
  const activeClients = clientOverview.reduce((sum, store) => sum + store.active, 0);
  const newClients = clientOverview.reduce((sum, store) => sum + store.newThisMonth, 0);
  const totalSpend = purchaseTrends.reduce((sum, seg) => sum + seg.spend, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Client Analytics</h1>
          <p className="text-muted-foreground">Customer insights across all stores</p>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all stores</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Clients</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              {((activeClients / totalClients) * 100).toFixed(1)}% active rate
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New This Month</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{newClients}</div>
            <p className="text-xs text-muted-foreground">New registrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpend.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime value</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Client Growth</CardTitle>
            <CardDescription>Client base growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={clientGrowth}>
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
                  <Area 
                    type="monotone" 
                    dataKey="downtown" 
                    name="Downtown"
                    stackId="1"
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mall" 
                    name="Mall Branch"
                    stackId="1"
                    stroke="hsl(var(--chart-2))" 
                    fill="hsl(var(--chart-2))" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="airport" 
                    name="Airport"
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

        {/* Purchase Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Client Segments</CardTitle>
            <CardDescription>Spending behavior analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={purchaseTrends} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
                  <YAxis dataKey="segment" type="category" className="text-xs" width={80} />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Spend"]}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="spend" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Overview & Top Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Client Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Clients by Store</CardTitle>
            <CardDescription>Client distribution across locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientOverview.map((store) => (
                <div key={store.store} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{store.store}</p>
                      <p className="text-sm text-muted-foreground">{store.active} active</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{store.total} clients</p>
                    <p className="text-sm text-green-600">+{store.newThisMonth} new</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Top Clients</CardTitle>
            <CardDescription>Highest value customers</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topClients.map((client, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="w-6 h-6 rounded-full flex items-center justify-center p-0">
                          {index + 1}
                        </Badge>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{client.store}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">${client.totalSpent.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{client.orders}</TableCell>
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

export default AdminClients;

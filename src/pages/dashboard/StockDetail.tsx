import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Package, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Calendar
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for demonstration
const mockProducts: Record<string, any> = {
  "1": { 
    name: "iPhone 15 Pro", 
    category: "Phones", 
    unitPrice: 1099, 
    quantity: 25, 
    specification: "256GB Black",
    totalSales: 142,
    revenue: 156158,
  },
  "2": { 
    name: "MacBook Air M3", 
    category: "Laptops", 
    unitPrice: 1299, 
    quantity: 15, 
    specification: "13-inch Silver",
    totalSales: 89,
    revenue: 115611,
  },
};

const weeklySalesData = [
  { name: "Mon", sales: 12, revenue: 13188 },
  { name: "Tue", sales: 8, revenue: 8792 },
  { name: "Wed", sales: 15, revenue: 16485 },
  { name: "Thu", sales: 10, revenue: 10990 },
  { name: "Fri", sales: 18, revenue: 19782 },
  { name: "Sat", sales: 22, revenue: 24178 },
  { name: "Sun", sales: 14, revenue: 15386 },
];

const monthlySalesData = [
  { name: "Week 1", sales: 45, revenue: 49455 },
  { name: "Week 2", sales: 52, revenue: 57148 },
  { name: "Week 3", sales: 38, revenue: 41762 },
  { name: "Week 4", sales: 61, revenue: 67039 },
];

const yearlySalesData = [
  { name: "Jan", sales: 120, revenue: 131880 },
  { name: "Feb", sales: 145, revenue: 159355 },
  { name: "Mar", sales: 132, revenue: 145068 },
  { name: "Apr", sales: 168, revenue: 184632 },
  { name: "May", sales: 155, revenue: 170345 },
  { name: "Jun", sales: 142, revenue: 156058 },
  { name: "Jul", sales: 189, revenue: 207711 },
  { name: "Aug", sales: 176, revenue: 193424 },
  { name: "Sep", sales: 165, revenue: 181335 },
  { name: "Oct", sales: 198, revenue: 217602 },
  { name: "Nov", sales: 210, revenue: 230790 },
  { name: "Dec", sales: 245, revenue: 269255 },
];

const recentSales = [
  { id: "1", date: "2024-01-15", customer: "John Smith", quantity: 2, amount: 2198, paymentMethod: "Cash" },
  { id: "2", date: "2024-01-14", customer: "Jane Doe", quantity: 1, amount: 1099, paymentMethod: "Mobile Money" },
  { id: "3", date: "2024-01-13", customer: "Mike Johnson", quantity: 3, amount: 3297, paymentMethod: "Bank" },
  { id: "4", date: "2024-01-12", customer: "Sarah Williams", quantity: 1, amount: 1099, paymentMethod: "Cash" },
  { id: "5", date: "2024-01-11", customer: "Tom Brown", quantity: 2, amount: 2198, paymentMethod: "Mobile Money" },
];

const StockDetail = () => {
  const { productId } = useParams();
  const product = mockProducts[productId || "1"] || mockProducts["1"];

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/stock">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
          <p className="text-muted-foreground">{product.category} • {product.specification}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground">Current Stock</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{product.quantity} units</p>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-info" />
            </div>
            <span className="text-sm text-muted-foreground">Total Sales</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{product.totalSales} units</p>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <span className="text-sm text-muted-foreground">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-foreground">${product.revenue.toLocaleString()}</p>
        </div>
        
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-warning" />
            </div>
            <span className="text-sm text-muted-foreground">Unit Price</span>
          </div>
          <p className="text-2xl font-bold text-foreground">${product.unitPrice}</p>
        </div>
      </div>

      {/* Sales Charts with Tabs */}
      <div className="bg-card rounded-xl border border-border p-6">
        <Tabs defaultValue="weekly" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Sales Performance</h3>
              <p className="text-sm text-muted-foreground">Track sales trends over time</p>
            </div>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="weekly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklySalesData}>
                  <defs>
                    <linearGradient id="salesGradientDetail" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="hsl(160, 84%, 39%)" 
                    strokeWidth={2}
                    fill="url(#salesGradientDetail)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="sales" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="yearly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlySalesData}>
                  <defs>
                    <linearGradient id="yearlyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="hsl(160, 84%, 39%)" 
                    strokeWidth={2}
                    fill="url(#yearlyGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recent Sales Table */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Sales</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Quantity</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Payment</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 px-4 text-sm text-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(sale.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">{sale.customer}</td>
                  <td className="py-3 px-4 text-sm text-foreground text-right">{sale.quantity}</td>
                  <td className="py-3 px-4 text-sm font-medium text-foreground text-right">${sale.amount}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                      {sale.paymentMethod}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;

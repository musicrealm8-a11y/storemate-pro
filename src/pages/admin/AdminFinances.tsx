import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Building2,
  Receipt,
} from "lucide-react";

// Mock financial data
const financialOverview = [
  { store: "Downtown Store", income: 125000, expenses: 45000, profit: 80000 },
  { store: "Mall Branch", income: 98000, expenses: 38000, profit: 60000 },
  { store: "Airport Outlet", income: 75000, expenses: 32000, profit: 43000 },
];

const monthlyFinances = [
  { month: "Jan", income: 235000, expenses: 95000, profit: 140000 },
  { month: "Feb", income: 255000, expenses: 102000, profit: 153000 },
  { month: "Mar", income: 285000, expenses: 108000, profit: 177000 },
  { month: "Apr", income: 298000, expenses: 115000, profit: 183000 },
  { month: "May", income: 310000, expenses: 118000, profit: 192000 },
  { month: "Jun", income: 298000, expenses: 115000, profit: 183000 },
];

const expenseBreakdown = [
  { category: "Inventory", amount: 58000, percentage: 50 },
  { category: "Rent & Utilities", amount: 25000, percentage: 22 },
  { category: "Salaries", amount: 20000, percentage: 17 },
  { category: "Marketing", amount: 8000, percentage: 7 },
  { category: "Other", amount: 4000, percentage: 4 },
];

const recentTransactions = [
  { id: "TXN-001", store: "Downtown", type: "income", description: "Daily Sales", amount: 8500, date: "2024-01-20" },
  { id: "TXN-002", store: "Mall Branch", type: "expense", description: "Inventory Purchase", amount: 3200, date: "2024-01-20" },
  { id: "TXN-003", store: "Airport", type: "income", description: "Daily Sales", amount: 4200, date: "2024-01-20" },
  { id: "TXN-004", store: "Downtown", type: "expense", description: "Rent Payment", amount: 5000, date: "2024-01-19" },
  { id: "TXN-005", store: "Mall Branch", type: "income", description: "Daily Sales", amount: 6800, date: "2024-01-19" },
];

const AdminFinances = () => {
  const [timeFilter, setTimeFilter] = useState("monthly");
  const [storeFilter, setStoreFilter] = useState("all");

  const totalIncome = financialOverview.reduce((sum, store) => sum + store.income, 0);
  const totalExpenses = financialOverview.reduce((sum, store) => sum + store.expenses, 0);
  const totalProfit = financialOverview.reduce((sum, store) => sum + store.profit, 0);
  const profitMargin = ((totalProfit / totalIncome) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Summary</h1>
          <p className="text-muted-foreground">Consolidated income and expenses</p>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.5% vs last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">${totalExpenses.toLocaleString()}</div>
            <div className="flex items-center text-sm text-red-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8.2% vs last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Profit</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProfit.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +15.8% vs last period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitMargin}%</div>
            <p className="text-xs text-muted-foreground">Average across stores</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Financial trends over time</CardDescription>
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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyFinances}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
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
                    dataKey="income" 
                    name="Income"
                    stroke="hsl(142, 76%, 36%)" 
                    fill="hsl(142, 76%, 36%)" 
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    name="Expenses"
                    stroke="hsl(0, 84%, 60%)" 
                    fill="hsl(0, 84%, 60%)" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Where money is being spent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseBreakdown} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
                  <YAxis dataKey="category" type="category" className="text-xs" width={100} />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Financials & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Financials */}
        <Card>
          <CardHeader>
            <CardTitle>Store Financials</CardTitle>
            <CardDescription>Profitability by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialOverview.map((store) => (
                <div key={store.store} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{store.store}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600">
                      {((store.profit / store.income) * 100).toFixed(1)}% margin
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Income</p>
                      <p className="font-bold text-green-600">${store.income.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expenses</p>
                      <p className="font-bold text-red-500">${store.expenses.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Profit</p>
                      <p className="font-bold">${store.profit.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {txn.type === "income" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">{txn.description}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{txn.store}</Badge>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${txn.type === "income" ? "text-green-600" : "text-red-500"}`}>
                      {txn.type === "income" ? "+" : "-"}${txn.amount.toLocaleString()}
                    </TableCell>
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

export default AdminFinances;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CalendarDays,
  CalendarRange
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockTransactions = [
  { id: "1", type: "income", title: "Sales Revenue", description: "Daily store sales", amount: 4500, date: "2024-01-15" },
  { id: "2", type: "expense", title: "Supplier Payment", description: "Monthly inventory restock", amount: 2800, date: "2024-01-15" },
  { id: "3", type: "income", title: "Online Orders", description: "E-commerce sales", amount: 1200, date: "2024-01-14" },
  { id: "4", type: "expense", title: "Rent", description: "Monthly store rent", amount: 1500, date: "2024-01-14" },
  { id: "5", type: "expense", title: "Utilities", description: "Electricity and water", amount: 350, date: "2024-01-13" },
  { id: "6", type: "income", title: "Sales Revenue", description: "Daily store sales", amount: 3800, date: "2024-01-13" },
  { id: "7", type: "income", title: "Wholesale Order", description: "Bulk order from retailer", amount: 8500, date: "2024-01-10" },
  { id: "8", type: "expense", title: "Staff Wages", description: "Weekly payroll", amount: 3200, date: "2024-01-08" },
  { id: "9", type: "income", title: "Sales Revenue", description: "Daily store sales", amount: 2900, date: "2024-01-05" },
  { id: "10", type: "expense", title: "Marketing", description: "Social media ads", amount: 450, date: "2023-12-28" },
  { id: "11", type: "income", title: "Sales Revenue", description: "Holiday sales", amount: 6200, date: "2023-12-25" },
  { id: "12", type: "expense", title: "Equipment", description: "New POS system", amount: 1200, date: "2023-11-15" },
];

type TransactionFilter = "all" | "income" | "expense";
type DateFilter = "all" | "today" | "week" | "month" | "year" | "custom";

const Finances = () => {
  const [typeFilter, setTypeFilter] = useState<TransactionFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [customDate, setCustomDate] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: "income",
    title: "",
    description: "",
    amount: "",
    date: ""
  });

  const filterByDate = (transactions: typeof mockTransactions) => {
    const now = new Date("2024-01-15"); // Mock current date
    
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      
      switch (dateFilter) {
        case "today":
          return t.date === "2024-01-15";
        case "week":
          const weekAgo = new Date(now);
          weekAgo.setDate(weekAgo.getDate() - 7);
          return transactionDate >= weekAgo && transactionDate <= now;
        case "month":
          return transactionDate.getMonth() === now.getMonth() && 
                 transactionDate.getFullYear() === now.getFullYear();
        case "year":
          return transactionDate.getFullYear() === now.getFullYear();
        case "custom":
          if (!customDate) return true;
          return t.date === customDate;
        default:
          return true;
      }
    });
  };

  const getFilteredTransactions = () => {
    let filtered = mockTransactions.filter(t => 
      typeFilter === "all" || t.type === typeFilter
    );
    return filterByDate(filtered);
  };

  const filteredTransactions = getFilteredTransactions();

  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

  const getDateFilterLabel = () => {
    switch (dateFilter) {
      case "today": return "Today";
      case "week": return "This Week";
      case "month": return "This Month";
      case "year": return "This Year";
      case "custom": return customDate || "Select Date";
      default: return "All Time";
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">${totalIncome.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Income ({getDateFilterLabel()})</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          </div>
          <p className="text-2xl font-bold text-foreground">${totalExpenses.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Expenses ({getDateFilterLabel()})</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-accent" />
            </div>
            {netProfit >= 0 ? (
              <ArrowUpRight className="h-4 w-4 text-success" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-destructive" />
            )}
          </div>
          <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-success" : "text-destructive"}`}>
            ${Math.abs(netProfit).toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Net {netProfit >= 0 ? "Profit" : "Loss"} ({getDateFilterLabel()})</p>
        </div>
      </div>

      {/* Filters & Add Button */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground flex items-center mr-2">Type:</span>
            {[
              { value: "all", label: "All" },
              { value: "income", label: "Income" },
              { value: "expense", label: "Expenses" }
            ].map(f => (
              <Button
                key={f.value}
                variant={typeFilter === f.value ? "accent" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(f.value as TransactionFilter)}
              >
                {f.label}
              </Button>
            ))}
          </div>

          {/* Date Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground flex items-center mr-2">
              <CalendarDays className="h-4 w-4 mr-1" />
              Period:
            </span>
            {[
              { value: "all", label: "All Time" },
              { value: "today", label: "Today" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
              { value: "year", label: "Year" },
            ].map(f => (
              <Button
                key={f.value}
                variant={dateFilter === f.value ? "accent" : "outline"}
                size="sm"
                onClick={() => setDateFilter(f.value as DateFilter)}
              >
                {f.label}
              </Button>
            ))}
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value);
                  setDateFilter("custom");
                }}
                className="w-auto h-8 text-sm"
              />
            </div>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button variant="accent">
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setNewRecord(prev => ({ ...prev, type: "income" }))}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all ${
                        newRecord.type === "income"
                          ? "border-success bg-success/10 text-success"
                          : "border-border hover:border-success/50"
                      }`}
                    >
                      <TrendingUp className="h-4 w-4" />
                      Income
                    </button>
                    <button
                      onClick={() => setNewRecord(prev => ({ ...prev, type: "expense" }))}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all ${
                        newRecord.type === "expense"
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : "border-border hover:border-destructive/50"
                      }`}
                    >
                      <TrendingDown className="h-4 w-4" />
                      Expense
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Sales Revenue"
                    value={newRecord.title}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Add more details..."
                    value={newRecord.description}
                    onChange={(e) => setNewRecord(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={newRecord.amount}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newRecord.date}
                      onChange={(e) => setNewRecord(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                </div>

                <Button variant="accent" className="w-full">
                  Add Transaction
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} for {getDateFilterLabel().toLowerCase()}
          </p>
        </div>
        <div className="divide-y divide-border">
          {filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.type === "income" 
                    ? "bg-success/10" 
                    : "bg-destructive/10"
                }`}>
                  {transaction.type === "income" ? (
                    <TrendingUp className="h-5 w-5 text-success" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.title}</p>
                  <p className="text-sm text-muted-foreground">{transaction.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === "income" ? "text-success" : "text-destructive"
                }`}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground justify-end">
                  <Calendar className="h-3 w-3" />
                  {transaction.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transactions found for {getDateFilterLabel().toLowerCase()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Finances;
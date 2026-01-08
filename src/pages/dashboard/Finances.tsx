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
  Calendar
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const mockTransactions = [
  { id: "1", type: "income", title: "Sales Revenue", description: "Daily store sales", amount: 4500, date: "2024-01-15" },
  { id: "2", type: "expense", title: "Supplier Payment", description: "Monthly inventory restock", amount: 2800, date: "2024-01-15" },
  { id: "3", type: "income", title: "Online Orders", description: "E-commerce sales", amount: 1200, date: "2024-01-14" },
  { id: "4", type: "expense", title: "Rent", description: "Monthly store rent", amount: 1500, date: "2024-01-14" },
  { id: "5", type: "expense", title: "Utilities", description: "Electricity and water", amount: 350, date: "2024-01-13" },
  { id: "6", type: "income", title: "Sales Revenue", description: "Daily store sales", amount: 3800, date: "2024-01-13" },
];

const Finances = () => {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    type: "income",
    title: "",
    description: "",
    amount: "",
    date: ""
  });

  const filteredTransactions = mockTransactions.filter(t => 
    filter === "all" || t.type === filter
  );

  const totalIncome = mockTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = mockTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;

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
          <p className="text-sm text-muted-foreground">Total Income</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          </div>
          <p className="text-2xl font-bold text-foreground">${totalExpenses.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Expenses</p>
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
          <p className="text-sm text-muted-foreground">Net {netProfit >= 0 ? "Profit" : "Loss"}</p>
        </div>
      </div>

      {/* Filters & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-2">
          {[
            { value: "all", label: "All" },
            { value: "income", label: "Income" },
            { value: "expense", label: "Expenses" }
          ].map(f => (
            <Button
              key={f.value}
              variant={filter === f.value ? "accent" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value as typeof filter)}
            >
              {f.label}
            </Button>
          ))}
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

      {/* Transactions List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
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
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Finances;

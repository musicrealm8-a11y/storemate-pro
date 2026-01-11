import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Users,
  Phone,
  ShoppingBag,
  DollarSign,
  MoreHorizontal,
  Eye,
  Mail,
  AlertCircle,
  TrendingUp,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockClients = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john@example.com",
    phone: "+1 234 567 890", 
    totalPurchases: 24, 
    totalSpent: 15600,
    totalOwed: 1200,
    lastPurchase: "2024-01-15"
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane@example.com",
    phone: "+1 234 567 891", 
    totalPurchases: 18, 
    totalSpent: 12400,
    totalOwed: 0,
    lastPurchase: "2024-01-14"
  },
  { 
    id: "3", 
    name: "Mike Johnson", 
    email: "mike@example.com",
    phone: "+1 234 567 892", 
    totalPurchases: 32, 
    totalSpent: 28900,
    totalOwed: 3500,
    lastPurchase: "2024-01-13"
  },
  { 
    id: "4", 
    name: "Sarah Williams", 
    email: "sarah@example.com",
    phone: "+1 234 567 893", 
    totalPurchases: 8, 
    totalSpent: 4200,
    totalOwed: 800,
    lastPurchase: "2024-01-10"
  },
  { 
    id: "5", 
    name: "David Brown", 
    email: "david@example.com",
    phone: "+1 234 567 894", 
    totalPurchases: 45, 
    totalSpent: 52300,
    totalOwed: 0,
    lastPurchase: "2024-01-15"
  },
];

type ClientFilter = "all" | "top-spending" | "owing";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clientFilter, setClientFilter] = useState<ClientFilter>("all");

  const getFilteredClients = () => {
    let filtered = mockClients.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
    );

    switch (clientFilter) {
      case "top-spending":
        filtered = [...filtered].sort((a, b) => b.totalSpent - a.totalSpent);
        break;
      case "owing":
        filtered = filtered.filter(c => c.totalOwed > 0).sort((a, b) => b.totalOwed - a.totalOwed);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredClients = getFilteredClients();

  const totalClients = mockClients.length;
  const totalRevenue = mockClients.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOwed = mockClients.reduce((sum, c) => sum + c.totalOwed, 0);
  const avgSpending = totalRevenue / totalClients;
  const clientsOwing = mockClients.filter(c => c.totalOwed > 0).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalClients}</p>
              <p className="text-sm text-muted-foreground">Total Clients</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${totalOwed.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Owed ({clientsOwing} clients)</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${avgSpending.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Avg. Spending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={clientFilter === "all" ? "accent" : "outline"}
              size="sm"
              onClick={() => setClientFilter("all")}
            >
              <Users className="h-4 w-4 mr-2" />
              All Clients
            </Button>
            <Button
              variant={clientFilter === "top-spending" ? "accent" : "outline"}
              size="sm"
              onClick={() => setClientFilter("top-spending")}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Top Spending
            </Button>
            <Button
              variant={clientFilter === "owing" ? "accent" : "outline"}
              size="sm"
              onClick={() => setClientFilter("owing")}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Owing Money
            </Button>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Client</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contact</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Purchases</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Total Spent</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Total Owed</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Last Purchase</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr key={client.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-accent">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {clientFilter === "top-spending" && index < 3 && (
                          <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-warning flex items-center justify-center">
                            <span className="text-xs font-bold text-warning-foreground">#{index + 1}</span>
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-foreground">{client.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-foreground">{client.totalPurchases}</td>
                  <td className="py-4 px-4 text-right font-semibold text-foreground">
                    ${client.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {client.totalOwed > 0 ? (
                      <span className="font-semibold text-warning">${client.totalOwed.toLocaleString()}</span>
                    ) : (
                      <span className="text-muted-foreground">$0</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right text-muted-foreground">{client.lastPurchase}</td>
                  <td className="py-4 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Purchase History
                        </DropdownMenuItem>
                        {client.totalOwed > 0 && (
                          <DropdownMenuItem>
                            <DollarSign className="h-4 w-4 mr-2" />
                            Record Payment
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {clientFilter === "owing" ? "No clients with outstanding debt" : "No clients found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
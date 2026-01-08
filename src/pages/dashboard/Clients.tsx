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
  Mail
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
    lastPurchase: "2024-01-15"
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane@example.com",
    phone: "+1 234 567 891", 
    totalPurchases: 18, 
    totalSpent: 12400,
    lastPurchase: "2024-01-14"
  },
  { 
    id: "3", 
    name: "Mike Johnson", 
    email: "mike@example.com",
    phone: "+1 234 567 892", 
    totalPurchases: 32, 
    totalSpent: 28900,
    lastPurchase: "2024-01-13"
  },
  { 
    id: "4", 
    name: "Sarah Williams", 
    email: "sarah@example.com",
    phone: "+1 234 567 893", 
    totalPurchases: 8, 
    totalSpent: 4200,
    lastPurchase: "2024-01-10"
  },
  { 
    id: "5", 
    name: "David Brown", 
    email: "david@example.com",
    phone: "+1 234 567 894", 
    totalPurchases: 45, 
    totalSpent: 52300,
    lastPurchase: "2024-01-15"
  },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = mockClients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const totalClients = mockClients.length;
  const totalRevenue = mockClients.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgSpending = totalRevenue / totalClients;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Search */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search clients by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
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
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Last Purchase</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-accent">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
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
            <p className="text-muted-foreground">No clients found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;

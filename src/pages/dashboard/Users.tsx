import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  Shield,
  ShieldCheck,
  Edit,
  Trash2,
  Send
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockUsers = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john@store.com", 
    role: "admin", 
    status: "active",
    joinedAt: "2024-01-15",
    permissions: ["dashboard", "sales", "products", "stock", "clients", "reports", "finances", "users"]
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane@store.com", 
    role: "user", 
    status: "active",
    joinedAt: "2024-02-20",
    permissions: ["dashboard", "sales", "products"]
  },
  { 
    id: "3", 
    name: "Mike Wilson", 
    email: "mike@store.com", 
    role: "user", 
    status: "pending",
    joinedAt: "2024-03-10",
    permissions: ["sales"]
  },
  { 
    id: "4", 
    name: "Sarah Johnson", 
    email: "sarah@store.com", 
    role: "user", 
    status: "active",
    joinedAt: "2024-03-15",
    permissions: ["dashboard", "sales", "clients", "reports"]
  },
  { 
    id: "5", 
    name: "Tom Brown", 
    email: "tom@store.com", 
    role: "admin", 
    status: "active",
    joinedAt: "2024-04-01",
    permissions: ["dashboard", "sales", "products", "stock", "clients", "reports", "finances", "users"]
  },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("user");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    if (role === "admin") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
          <ShieldCheck className="h-3 w-3" />
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
        <Shield className="h-3 w-3" />
        User
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success">Active</span>;
      case "pending":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">Pending</span>;
      case "inactive":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">Inactive</span>;
      default:
        return null;
    }
  };

  const handleInvite = () => {
    console.log({ email: inviteEmail, name: inviteName, role: inviteRole });
    setIsDialogOpen(false);
    setInviteEmail("");
    setInviteName("");
    setInviteRole("user");
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="accent">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
              <DialogDescription>
                Send an invitation email to add a new team member.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Normal User</SelectItem>
                    <SelectItem value="admin">Store Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="accent" className="w-full" onClick={handleInvite}>
                <Send className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-accent">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {user.permissions.length} pages
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

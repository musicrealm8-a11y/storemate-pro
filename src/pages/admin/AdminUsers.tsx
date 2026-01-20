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
  Users,
  UserCheck,
  Shield,
  Activity,
  Building2,
  Clock,
} from "lucide-react";

// Mock user data
const userOverview = [
  { store: "Downtown Store", total: 12, admins: 2, active: 10 },
  { store: "Mall Branch", total: 8, admins: 1, active: 7 },
  { store: "Airport Outlet", total: 6, admins: 1, active: 5 },
];

const roleDistribution = [
  { name: "Store Admin", value: 4, color: "hsl(var(--primary))" },
  { name: "Sales Staff", value: 14, color: "hsl(var(--chart-2))" },
  { name: "Inventory Manager", value: 5, color: "hsl(var(--chart-3))" },
  { name: "Finance", value: 3, color: "hsl(var(--chart-4))" },
];

const activityData = [
  { day: "Mon", logins: 22, actions: 145 },
  { day: "Tue", logins: 25, actions: 168 },
  { day: "Wed", logins: 24, actions: 152 },
  { day: "Thu", logins: 26, actions: 178 },
  { day: "Fri", logins: 28, actions: 195 },
  { day: "Sat", logins: 18, actions: 98 },
  { day: "Sun", logins: 12, actions: 65 },
];

const allUsers = [
  { name: "John Admin", email: "john@company.com", role: "Store Admin", store: "Downtown", status: "active", lastActive: "2 min ago" },
  { name: "Jane Manager", email: "jane@company.com", role: "Store Admin", store: "Mall Branch", status: "active", lastActive: "15 min ago" },
  { name: "Mike Sales", email: "mike@company.com", role: "Sales Staff", store: "Downtown", status: "active", lastActive: "1 hour ago" },
  { name: "Sarah Finance", email: "sarah@company.com", role: "Finance", store: "All Stores", status: "active", lastActive: "30 min ago" },
  { name: "Tom Inventory", email: "tom@company.com", role: "Inventory Manager", store: "Airport", status: "inactive", lastActive: "2 days ago" },
  { name: "Lisa Sales", email: "lisa@company.com", role: "Sales Staff", store: "Mall Branch", status: "active", lastActive: "5 min ago" },
];

const AdminUsers = () => {
  const [storeFilter, setStoreFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const totalUsers = userOverview.reduce((sum, store) => sum + store.total, 0);
  const totalAdmins = userOverview.reduce((sum, store) => sum + store.admins, 0);
  const activeUsers = userOverview.reduce((sum, store) => sum + store.active, 0);

  const filteredUsers = allUsers.filter(user => {
    const matchesStore = storeFilter === "all" || user.store.toLowerCase().includes(storeFilter);
    const matchesRole = roleFilter === "all" || user.role.toLowerCase().includes(roleFilter);
    return matchesStore && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      "Store Admin": "bg-primary/10 text-primary border-primary/20",
      "Sales Staff": "bg-blue-500/10 text-blue-600 border-blue-500/20",
      "Inventory Manager": "bg-purple-500/10 text-purple-600 border-purple-500/20",
      "Finance": "bg-green-500/10 text-green-600 border-green-500/20",
    };
    return <Badge variant="outline" className={styles[role] || ""}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === "active" 
      ? <Badge variant="outline" className="bg-green-500/10 text-green-600">Active</Badge>
      : <Badge variant="outline" className="bg-muted text-muted-foreground">Inactive</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users Analytics</h1>
          <p className="text-muted-foreground">System users across all stores</p>
        </div>
        <div className="flex gap-2">
          <Select value={storeFilter} onValueChange={setStoreFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="mall">Mall Branch</SelectItem>
              <SelectItem value="airport">Airport</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
              <SelectItem value="sales">Sales Staff</SelectItem>
              <SelectItem value="inventory">Inventory</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Across all stores</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">{((activeUsers / totalUsers) * 100).toFixed(0)}% active rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAdmins}</div>
            <p className="text-xs text-muted-foreground">With admin privileges</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Daily Logins</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">Per day average</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Logins and actions by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="logins" name="Logins" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actions" name="Actions" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
            <CardDescription>Users by role type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
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

      {/* Store Users & User List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Store Users Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Store</CardTitle>
            <CardDescription>Staff distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userOverview.map((store) => (
                <div key={store.store} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{store.store}</p>
                      <p className="text-xs text-muted-foreground">{store.admins} admin(s)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{store.total}</p>
                    <p className="text-xs text-green-600">{store.active} active</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Users Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Complete user directory</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{user.store}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 text-muted-foreground text-sm">
                        <Clock className="h-3 w-3" />
                        {user.lastActive}
                      </div>
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

export default AdminUsers;

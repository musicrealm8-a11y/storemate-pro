import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  Package,
  Users,
  Wallet,
  UserCircle,
  Building2,
  ChevronLeft,
  LogOut,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Sales Analytics", href: "/admin/sales", icon: TrendingUp },
  { name: "Stock Analytics", href: "/admin/stock", icon: Package },
  { name: "Clients Analytics", href: "/admin/clients", icon: Users },
  { name: "Financial Summary", href: "/admin/finances", icon: Wallet },
  { name: "Users Analytics", href: "/admin/users", icon: UserCircle },
];

const AdminPortal = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-lg font-bold text-sidebar-foreground">Admin Portal</span>
                <p className="text-xs text-sidebar-foreground/60">Multi-Store Analytics</p>
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-1">
            {adminNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>

          <div className="my-4 px-3">
            <div className={cn("h-px bg-sidebar-border", collapsed && "mx-auto w-8")} />
          </div>

          {/* Store Selector */}
          {!collapsed && (
            <div className="px-3">
              <span className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">
                Stores
              </span>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-sidebar-accent/50 text-sm">
                  <Building2 className="h-4 w-4" />
                  <span>All Stores (3)</span>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-sidebar-border">
          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Back to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 overflow-auto transition-all duration-300",
        collapsed ? "ml-16" : "ml-64"
      )}>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;

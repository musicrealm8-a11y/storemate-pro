import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Package2,
  LayoutDashboard,
  ShoppingCart,
  Box,
  Layers,
  Users,
  FileText,
  Wallet,
  Settings,
  LogOut,
  ChevronLeft,
  UserCircle
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Sales", href: "/dashboard/sales", icon: ShoppingCart },
  { name: "Products", href: "/dashboard/products", icon: Box },
  { name: "Stock", href: "/dashboard/stock", icon: Layers },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Income & Expenses", href: "/dashboard/finances", icon: Wallet },
];

const adminNav = [
  { name: "User Management", href: "/dashboard/users", icon: UserCircle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isAdmin?: boolean;
}

const Sidebar = ({ isAdmin = true }: SidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Package2 className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-sidebar-foreground">StockFlow</span>
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
          {navigation.map((item) => (
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

        {isAdmin && (
          <>
            <div className="my-4 px-3">
              <div className={cn("h-px bg-sidebar-border", collapsed && "mx-auto w-8")} />
            </div>
            <div className="space-y-1">
              {!collapsed && (
                <span className="px-3 text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">
                  Admin
                </span>
              )}
              {adminNav.map((item) => (
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
          </>
        )}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-medium text-sidebar-foreground">JD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Admin</p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent flex-shrink-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

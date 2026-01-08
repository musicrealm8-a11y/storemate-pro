import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  showAddButton?: boolean;
  addButtonText?: string;
  onAdd?: () => void;
}

const DashboardHeader = ({ 
  title, 
  subtitle, 
  showAddButton = false, 
  addButtonText = "Add New",
  onAdd 
}: DashboardHeaderProps) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-64 bg-background"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-medium text-accent-foreground flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Add button */}
        {showAddButton && (
          <Button variant="accent" onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            {addButtonText}
          </Button>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;

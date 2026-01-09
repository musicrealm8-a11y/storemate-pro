import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MoreHorizontal,
  Edit,
  Trash2,
  TrendingUp,
  Package,
  AlertTriangle
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

const mockStock = [
  { id: "1", name: "iPhone 15 Pro", category: "Phones", unitPrice: 1099, quantity: 25, specification: "256GB Black", totalValue: 27475, status: "in_stock" },
  { id: "2", name: "MacBook Air M3", category: "Laptops", unitPrice: 1299, quantity: 15, specification: "13-inch Silver", totalValue: 19485, status: "in_stock" },
  { id: "3", name: "AirPods Pro 2", category: "Accessories", unitPrice: 249, quantity: 50, specification: "With MagSafe Case", totalValue: 12450, status: "in_stock" },
  { id: "4", name: "iPad Pro 12.9", category: "Tablets", unitPrice: 1199, quantity: 12, specification: "WiFi + Cellular", totalValue: 14388, status: "in_stock" },
  { id: "5", name: "Apple Watch Ultra", category: "Wearables", unitPrice: 799, quantity: 20, specification: "Alpine Loop", totalValue: 15980, status: "in_stock" },
  { id: "6", name: "iPhone 15", category: "Phones", unitPrice: 799, quantity: 0, specification: "128GB Blue", totalValue: 0, status: "out_of_stock" },
  { id: "7", name: "Magic Keyboard", category: "Accessories", unitPrice: 299, quantity: 8, specification: "Touch ID", totalValue: 2392, status: "low_stock" },
  { id: "8", name: "USB-C Cables", category: "Accessories", unitPrice: 19, quantity: 5, specification: "2m Length", totalValue: 95, status: "low_stock" },
];

const categories = ["All", "Phones", "Laptops", "Tablets", "Accessories", "Wearables"];

const Stock = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStock = mockStock.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success">In Stock</span>;
      case "low_stock":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">
            <AlertTriangle className="h-3 w-3" />
            Low Stock
          </span>
        );
      case "out_of_stock":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-destructive/10 text-destructive">Out of Stock</span>;
      default:
        return null;
    }
  };

  const handleRowClick = (productId: string) => {
    navigate(`/dashboard/stock/${productId}`);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search stock..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "accent" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Specification</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Total Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStock.map((item) => (
              <TableRow 
                key={item.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(item.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Package className="h-4 w-4 text-accent" />
                    </div>
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.category}</TableCell>
                <TableCell className="text-muted-foreground">{item.specification}</TableCell>
                <TableCell className="text-right font-medium">${item.unitPrice}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right font-medium">${item.totalValue.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleRowClick(item.id)}>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Sales
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredStock.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No stock items found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stock;

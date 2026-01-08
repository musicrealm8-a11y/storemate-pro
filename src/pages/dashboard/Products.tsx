import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter,
  MoreHorizontal,
  Box,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockProducts = [
  { id: "1", name: "iPhone 15 Pro", category: "Phones", price: 1099, stock: 25, status: "active" },
  { id: "2", name: "MacBook Air M3", category: "Laptops", price: 1299, stock: 15, status: "active" },
  { id: "3", name: "AirPods Pro 2", category: "Accessories", price: 249, stock: 50, status: "active" },
  { id: "4", name: "iPad Pro 12.9", category: "Tablets", price: 1199, stock: 12, status: "active" },
  { id: "5", name: "Apple Watch Ultra", category: "Wearables", price: 799, stock: 20, status: "active" },
  { id: "6", name: "iPhone 15", category: "Phones", price: 799, stock: 0, status: "out_of_stock" },
  { id: "7", name: "Magic Keyboard", category: "Accessories", price: 299, stock: 8, status: "low_stock" },
];

const categories = ["All", "Phones", "Laptops", "Tablets", "Accessories", "Wearables"];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success">In Stock</span>;
      case "low_stock":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">Low Stock</span>;
      case "out_of_stock":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-destructive/10 text-destructive">Out of Stock</span>;
      default:
        return null;
    }
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
              placeholder="Search products..."
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-card rounded-xl border border-border p-4 hover:border-accent/30 transition-all hover-lift"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Box className="h-6 w-6 text-accent" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View
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
            </div>
            
            <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-foreground">${product.price}</span>
              {getStatusBadge(product.status)}
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stock</span>
                <span className="font-medium text-foreground">{product.stock} units</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Box className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
};

export default Products;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Minus, 
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
  Package
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const mockProducts = [
  { id: "1", name: "iPhone 15 Pro", price: 1099, stock: 25, category: "Phones" },
  { id: "2", name: "MacBook Air M3", price: 1299, stock: 15, category: "Laptops" },
  { id: "3", name: "AirPods Pro 2", price: 249, stock: 50, category: "Accessories" },
  { id: "4", name: "iPad Pro 12.9", price: 1199, stock: 12, category: "Tablets" },
  { id: "5", name: "Apple Watch Ultra", price: 799, stock: 20, category: "Wearables" },
  { id: "6", name: "Magic Keyboard", price: 299, stock: 8, category: "Accessories" },
  { id: "7", name: "USB-C Cable", price: 19, stock: 100, category: "Accessories" },
  { id: "8", name: "iPhone Case", price: 49, stock: 75, category: "Accessories" },
];

const Sales = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof mockProducts[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product Selection */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Select Products</h3>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Product Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Package className="h-4 w-4 text-accent" />
                        </div>
                        <span className="font-medium text-foreground">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{product.category}</TableCell>
                    <TableCell className="text-right font-medium">${product.price}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{product.stock}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                      >
                        <Plus className="h-4 w-4 text-accent" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart & Checkout */}
      <div className="space-y-4">
        {/* Cart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Cart</h3>
            <span className="text-sm text-muted-foreground">({cart.length} items)</span>
          </div>

          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Cart is empty</p>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="h-7 w-7 rounded-md bg-background border border-border flex items-center justify-center hover:bg-muted"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="h-7 w-7 rounded-md bg-background border border-border flex items-center justify-center hover:bg-muted"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="h-7 w-7 rounded-md text-destructive hover:bg-destructive/10 flex items-center justify-center ml-2"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          {cart.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              <div className="flex justify-between text-lg font-semibold pt-2">
                <span className="text-foreground">Total</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Customer & Payment */}
        {cart.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Customer Details</h3>
            
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                placeholder="Enter name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input
                id="customerPhone"
                placeholder="Enter phone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "cash", icon: Banknote, label: "Cash" },
                  { value: "mobile", icon: Smartphone, label: "Mobile" },
                  { value: "bank", icon: CreditCard, label: "Bank" },
                ].map(method => (
                  <button
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                      paymentMethod === method.value
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <method.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button variant="accent" className="w-full" size="lg">
              Complete Sale - ${total.toFixed(2)}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Minus, 
  Trash2,
  CreditCard,
  Banknote,
  Smartphone
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const mockProducts = [
  { id: "1", name: "iPhone 15 Pro", price: 1099, stock: 25 },
  { id: "2", name: "MacBook Air M3", price: 1299, stock: 15 },
  { id: "3", name: "AirPods Pro 2", price: 249, stock: 50 },
  { id: "4", name: "iPad Pro 12.9", price: 1199, stock: 12 },
  { id: "5", name: "Apple Watch Ultra", price: 799, stock: 20 },
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
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

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

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all text-left"
              >
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.stock} in stock</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${product.price}</p>
                  <Plus className="h-4 w-4 text-accent ml-auto" />
                </div>
              </button>
            ))}
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
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span className="text-foreground">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
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

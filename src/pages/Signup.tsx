import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package2, Store, User, Mail, Lock, Phone, ArrowLeft, MapPin } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    storeLocation: "",
    adminName: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup - will be connected to Supabase
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Visual */}
      <div 
        className="hidden lg:flex flex-1 items-center justify-center p-12"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="max-w-lg text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center border border-accent/30 animate-float">
            <Store className="h-16 w-16 text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Create Your Store
          </h2>
          <p className="text-primary-foreground/70 mb-8">
            Set up your store in minutes and start managing your inventory like a pro.
          </p>
          
          <div className="space-y-4 text-left max-w-xs mx-auto">
            {[
              "Complete inventory management",
              "Real-time sales tracking",
              "Team collaboration tools",
              "Beautiful reports & analytics"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <span className="text-sm text-primary-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-12 overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Package2 className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">StockFlow</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">
            Create your store
          </h1>
          <p className="text-muted-foreground mb-8">
            Start your 14-day free trial. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Store Info Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Store className="h-4 w-4" />
                Store Information
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  name="storeName"
                  placeholder="My Awesome Store"
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeLocation">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="storeLocation"
                    name="storeLocation"
                    placeholder="City, Country"
                    value={formData.storeLocation}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Admin Info Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <User className="h-4 w-4" />
                Admin Account
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="adminName"
                    name="adminName"
                    placeholder="John Doe"
                    value={formData.adminName}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 234 567 890"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
              </div>
            </div>

            <Button type="submit" variant="accent" className="w-full" size="lg">
              Create Store
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By signing up, you agree to our{" "}
              <a href="#" className="text-accent hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-accent hover:underline">Privacy Policy</a>
            </p>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have a store?{" "}
            <Link to="/login" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

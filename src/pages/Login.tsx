import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Package2, Mail, Lock, ArrowLeft } from "lucide-react";

const Login = () => {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login - will be connected to Supabase
    console.log({ role, email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-12">
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
            Welcome back
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label>Sign in as</Label>
              <RadioGroup value={role} onValueChange={setRole} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="cursor-pointer">Store Admin</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user" className="cursor-pointer">Normal User</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-accent hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="accent" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have a store?{" "}
            <Link to="/signup" className="text-accent hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div 
        className="hidden lg:flex flex-1 items-center justify-center p-12"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="max-w-lg text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center border border-accent/30">
            <Package2 className="h-16 w-16 text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Manage your inventory with ease
          </h2>
          <p className="text-primary-foreground/70">
            Real-time stock tracking, sales analytics, and team management all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Box, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm font-medium text-accent">New: Multi-store support now available</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
            Manage Your Inventory
            <br />
            <span className="gradient-text">With Confidence</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            StockFlow gives you complete control over your products, sales, and stock levels. 
            Real-time insights, beautiful reports, and seamless team collaboration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup">
              <Button variant="hero" size="xl" className="group">
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="hero-ghost" size="xl">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
              <Box className="h-6 w-6 text-accent" />
              <span className="text-2xl font-bold text-primary-foreground">10K+</span>
              <span className="text-sm text-primary-foreground/60">Products Tracked</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
              <BarChart3 className="h-6 w-6 text-accent" />
              <span className="text-2xl font-bold text-primary-foreground">$2M+</span>
              <span className="text-sm text-primary-foreground/60">Sales Processed</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
              <Users className="h-6 w-6 text-accent" />
              <span className="text-2xl font-bold text-primary-foreground">500+</span>
              <span className="text-sm text-primary-foreground/60">Active Stores</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

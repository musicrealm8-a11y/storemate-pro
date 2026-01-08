import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime"
];

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/20 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Take Control of
            <br />
            <span className="gradient-text">Your Inventory?</span>
          </h2>
          <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Join hundreds of stores already using StockFlow to streamline their operations 
            and boost their productivity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/signup">
              <Button variant="hero" size="xl" className="group">
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground/70">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

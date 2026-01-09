import { Package2, Target, Users, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to helping businesses of all sizes manage their inventory efficiently and grow sustainably.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Every feature we build starts with understanding our customers' real challenges and needs.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your data security is our top priority. We employ enterprise-grade security measures.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously improve our platform with cutting-edge technology to stay ahead of the curve.",
  },
];

const team = [
  { name: "Sarah Johnson", role: "CEO & Founder", initials: "SJ" },
  { name: "Michael Chen", role: "CTO", initials: "MC" },
  { name: "Emily Rodriguez", role: "Head of Product", initials: "ER" },
  { name: "David Kim", role: "Head of Sales", initials: "DK" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Package2 className="h-5 w-5" />
              <span className="text-sm font-medium">About StockFlow</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Empowering Businesses with Smart Inventory Management
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Founded in 2024, StockFlow was born from a simple idea: inventory management 
              shouldn't be complicated. We've built a platform that's powerful yet intuitive, 
              helping thousands of businesses streamline their operations.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted/50 py-16 mb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Active Businesses" },
                { value: "$2B+", label: "Inventory Tracked" },
                { value: "50+", label: "Countries" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at StockFlow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
                  <value.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind StockFlow
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-accent-foreground">{member.initials}</span>
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Inventory Management?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of businesses that trust StockFlow to manage their inventory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="accent" size="lg">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;

import { 
  BarChart3, 
  Box, 
  Users, 
  FileText, 
  ShieldCheck, 
  TrendingUp,
  CreditCard,
  Bell
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track sales, revenue, and inventory levels with beautiful charts and insights updated in real-time."
  },
  {
    icon: Box,
    title: "Stock Management",
    description: "Organize products by categories, manage stock levels, and get automatic low-stock alerts."
  },
  {
    icon: CreditCard,
    title: "Sales Processing",
    description: "Process sales quickly with multiple payment methods including cash, mobile money, and bank transfers."
  },
  {
    icon: Users,
    title: "Client Tracking",
    description: "Build relationships with customer profiles, purchase history, and spending analytics."
  },
  {
    icon: FileText,
    title: "Smart Reports",
    description: "Generate daily, monthly, or yearly reports. Download as PDF or CSV with one click."
  },
  {
    icon: TrendingUp,
    title: "Income & Expenses",
    description: "Track all money coming in and going out. Get clear financial summaries when you need them."
  },
  {
    icon: ShieldCheck,
    title: "Role-based Access",
    description: "Control who sees what with granular permissions. Keep your data secure with admin controls."
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified about low stock, daily sales summaries, and important events via email."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to
            <br />
            <span className="gradient-text">Run Your Store</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From inventory tracking to financial reports, StockFlow provides all the tools 
            you need to manage your business efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover-lift"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

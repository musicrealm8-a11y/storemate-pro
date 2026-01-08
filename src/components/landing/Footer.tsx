import { Link } from "react-router-dom";
import { Package2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
              <Package2 className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">StockFlow</span>
          </Link>

          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2024 StockFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

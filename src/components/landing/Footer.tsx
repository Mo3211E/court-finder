import { BasketballIcon } from "@/components/icons/BasketballIcon";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 bg-secondary border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <BasketballIcon className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-secondary-foreground">Playground</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              How It Works
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              Report a Court
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} Playground. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

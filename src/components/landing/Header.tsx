import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BasketballIcon } from "@/components/icons/BasketballIcon";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BasketballIcon className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-secondary-foreground">Playground</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-smooth">
              Find Games
            </a>
            <a href="#" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-smooth">
              Report a Game
            </a>
            <a href="#" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-smooth">
              How It Works
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-secondary-foreground hover:text-primary">
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-accent text-primary-foreground">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-secondary-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-smooth">
                Find Games
              </a>
              <a href="#" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-smooth">
                Report a Game
              </a>
              <a href="#" className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-smooth">
                How It Works
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                <Button variant="ghost" className="justify-start text-secondary-foreground">
                  Sign In
                </Button>
                <Button className="bg-primary hover:bg-accent text-primary-foreground">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

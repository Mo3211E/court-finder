import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BasketballIcon } from "@/components/icons/BasketballIcon";

interface HeroProps {
  onFindGames: () => void;
}

export const Hero = ({ onFindGames }: HeroProps) => {
  return (
    <section className="relative min-h-screen bg-hero overflow-hidden flex items-center justify-center">
      {/* Court lines background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-4 border-primary rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-4 border-primary rounded-full" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-primary" />
      </div>

      {/* Floating basketball */}
      <div className="absolute top-20 right-10 md:right-20 animate-float opacity-20">
        <BasketballIcon className="w-32 h-32 md:w-48 md:h-48 text-primary" />
      </div>
      <div className="absolute bottom-20 left-10 md:left-20 animate-float opacity-15" style={{ animationDelay: "1.5s" }}>
        <BasketballIcon className="w-24 h-24 md:w-32 md:h-32 text-primary" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-primary-foreground text-sm font-medium">Community-powered pickup games</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Find Your Next
            <span className="block text-primary mt-2">Pickup Game</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover basketball runs near you, reported by players in your community. 
            Like Waze, but for finding your next game.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button 
              onClick={onFindGames}
              size="lg"
              className="group relative px-10 py-7 text-xl font-bold bg-primary hover:bg-accent text-primary-foreground shadow-button hover:shadow-glow transition-smooth animate-pulse-glow"
            >
              <MapPin className="w-6 h-6 mr-3 group-hover:animate-bounce-subtle" />
              Find Games Near Me
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-primary-foreground/60">Active Courts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">2.5K</div>
              <div className="text-sm text-primary-foreground/60">Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">Daily</div>
              <div className="text-sm text-primary-foreground/60">Updates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

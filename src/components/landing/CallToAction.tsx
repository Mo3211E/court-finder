import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BasketballIcon } from "@/components/icons/BasketballIcon";

interface CallToActionProps {
  onFindGames: () => void;
  onReportGame: () => void;
}

export const CallToAction = ({ onFindGames, onReportGame }: CallToActionProps) => {
  return (
    <section className="py-24 px-4 bg-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <BasketballIcon className="w-64 h-64 text-primary" />
        </div>
        <div className="absolute bottom-10 right-10">
          <BasketballIcon className="w-48 h-48 text-primary" />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Ready to Find Your
            <span className="block text-primary mt-2">Next Game?</span>
          </h2>
          <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10">
            Join thousands of players already using Playground to find pickup games in their area. 
            It's free, it's community-driven, and it's the future of pickup basketball.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onFindGames}
              size="lg"
              className="group px-8 py-6 text-lg font-bold bg-primary hover:bg-accent text-primary-foreground shadow-button hover:shadow-glow transition-smooth"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Find Games Near Me
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={onReportGame}
              className="px-8 py-6 text-lg font-bold border-primary/30 text-primary-foreground hover:bg-primary/10 transition-smooth"
            >
              Report a Game
            </Button>
          </div>

          <p className="mt-8 text-sm text-primary-foreground/50">
            Coming soon: Football, Soccer, and more sports!
          </p>
        </div>
      </div>
    </section>
  );
};

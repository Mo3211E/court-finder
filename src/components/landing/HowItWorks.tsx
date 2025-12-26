import { Search, MessageSquare, Zap } from "lucide-react";

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: <Search className="w-6 h-6" />,
    title: "Search Your Area",
    description: "Enter your location or enable GPS to find courts and games nearby. Filter by distance, time, and skill level.",
  },
  {
    number: "02",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Check Reports",
    description: "See what other players are saying. Is there a game running? How crowded is it? What's the skill level?",
  },
  {
    number: "03",
    icon: <Zap className="w-6 h-6" />,
    title: "Show Up & Play",
    description: "Head to the court and get in the game. After playing, report back to help the next hooper find their game.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-secondary">
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4">
            Simple as <span className="text-primary">1-2-3</span>
          </h2>
          <p className="text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            Getting on the court has never been easier. Here's how Playground works.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Number & Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-glow">
                    <span className="text-3xl font-bold text-primary-foreground">{step.number}</span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-secondary-foreground flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`flex-1 text-center md:text-left ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                <h3 className="text-2xl font-bold text-secondary-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-secondary-foreground/70 text-lg max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

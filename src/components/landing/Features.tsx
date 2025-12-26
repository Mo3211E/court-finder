import { Users, MapPin, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Location-Based",
    description: "Find courts and pickup games within your preferred radius. See exactly where the action is happening.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Driven",
    description: "All game info is reported by players like you. Real-time updates on game times, skill levels, and crowd size.",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Real-Time Updates",
    description: "Know when games are running right now. Get notified when your favorite courts heat up.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Verified Reports",
    description: "Player reputation system ensures accurate info. Trust the community to keep it real.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Playground connects hoopers through community-reported game information. 
            No more empty courts or missed runs.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group border-border/50 bg-card hover:border-primary/50 transition-smooth hover:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

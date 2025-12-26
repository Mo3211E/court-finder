import { useCallback } from "react";
import { toast } from "sonner";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const handleFindGames = useCallback(() => {
    // This will be connected to location/map functionality later
    toast.info("Finding games near you...", {
      description: "Location features coming soon!",
    });
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero onFindGames={handleFindGames} />
      <Features />
      <HowItWorks />
      <CallToAction onFindGames={handleFindGames} />
      <Footer />
    </main>
  );
};

export default Index;

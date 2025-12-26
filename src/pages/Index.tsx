import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";
import { FixedMapButton } from "@/components/FixedMapButton";

const Index = () => {
  const navigate = useNavigate();

  const handleFindGames = useCallback(() => {
    navigate('/map');
  }, [navigate]);

  return (
    <main className="min-h-screen">
      <Header />
      <FixedMapButton />
      <Hero onFindGames={handleFindGames} />
      <Features />
      <HowItWorks />
      <CallToAction onFindGames={handleFindGames} />
      <Footer />
    </main>
  );
};

export default Index;

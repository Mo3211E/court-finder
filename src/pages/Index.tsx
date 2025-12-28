import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";
import { FixedMapButton } from "@/components/FixedMapButton";
import { ReportGameModal } from "@/components/report/ReportGameModal";

const Index = () => {
  const navigate = useNavigate();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleFindGames = useCallback(() => {
    navigate('/map');
  }, [navigate]);

  const handleReportGame = useCallback(() => {
    setIsReportModalOpen(true);
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <FixedMapButton />
      <Hero onFindGames={handleFindGames} />
      <Features />
      <HowItWorks />
      <CallToAction onFindGames={handleFindGames} onReportGame={handleReportGame} />
      <Footer />
      <ReportGameModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </main>
  );
};

export default Index;

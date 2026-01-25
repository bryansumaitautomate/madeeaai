import Hero from "@/components/Hero";
import RealityCheck from "@/components/RealityCheck";
import Process from "@/components/Process";
import RevenueEngine from "@/components/RevenueEngine";
import MadeeaMethod from "@/components/MadeeaMethod";
import FAQ from "@/components/FAQ";
import FinalSignalSection from "@/components/FinalSignal";
import AuraBackground from "@/components/AuraBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-transparent">
      <AuraBackground />
      <Hero />
      <RealityCheck />
      <Process />
      <RevenueEngine />
      <MadeeaMethod />
      <FAQ />
      <FinalSignalSection />
    </div>
  );
};

export default Index;

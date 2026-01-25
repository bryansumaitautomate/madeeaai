import Hero from "@/components/Hero";
import RealityCheck from "@/components/RealityCheck";
import Process from "@/components/Process";
import RevenueEngine from "@/components/RevenueEngine";
import InfrastructureCards from "@/components/InfrastructureCard";
import ROISimulator from "@/components/ROISimulator";
import MadeeaMethod from "@/components/MadeeaMethod";
import Testimonials from "@/components/Testimonials";
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
      <InfrastructureCards />
      <ROISimulator />
      <MadeeaMethod />
      <Testimonials />
      <FAQ />
      <FinalSignalSection />
    </div>
  );
};

export default Index;

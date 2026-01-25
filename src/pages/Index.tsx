import Hero from "@/components/Hero";
import RealityCheck from "@/components/RealityCheck";
import RevenueEngine from "@/components/RevenueEngine";
import MadeeaMethod from "@/components/MadeeaMethod";
import FAQ from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <RealityCheck />
      <RevenueEngine />
      <MadeeaMethod />
      <FAQ />
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
              <div className="w-3 h-3 bg-background rounded-sm transform rotate-45" />
            </div>
            <span className="text-sm font-semibold tracking-tighter text-foreground">
              MADEEA<span className="text-primary">.IO</span>
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-[0.1em]">
            © 2025 Madeea.io — AI Sales Infrastructure
          </p>
          
          <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

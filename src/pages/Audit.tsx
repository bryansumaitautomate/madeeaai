import { useState, useRef } from "react";
import { AuditHero } from "@/components/audit/AuditHero";
import Navigation from "@/components/Navigation";
import { AuditWizard } from "@/components/audit/AuditWizard";
import { AuditAuraBackground } from "@/components/audit/AuditAuraBackground";

const AuditPage = () => {
  const [showWizard, setShowWizard] = useState(false);
  const wizardRef = useRef<HTMLDivElement>(null);

  const handleStartAudit = () => {
    setShowWizard(true);
    setTimeout(() => { wizardRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <AuditAuraBackground />
      <Navigation />
      {!showWizard ? (
        <AuditHero onStartAudit={handleStartAudit} />
      ) : (
        <div ref={wizardRef}>
          <AuditWizard />
        </div>
      )}
    </div>
  );
};

export default AuditPage;

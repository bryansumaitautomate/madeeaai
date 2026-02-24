import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Automation } from "@/lib/api/workflows";

interface AutomationCardProps {
  automation: Automation;
  onClick: (automation: Automation) => void;
}

const AutomationCard = forwardRef<HTMLDivElement, AutomationCardProps>(({ automation, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={() => onClick(automation)}
      className="infrastructure-card-wrapper group cursor-pointer"
    >
      <div className="infrastructure-card-border">
        <div className="infrastructure-card-gradient" />
        <div className="infrastructure-card-content flex flex-col h-full">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl p-2 bg-primary/20 rounded-xl flex-shrink-0">{automation.icon}</span>
            <h3 className="text-lg font-syne font-medium text-card-foreground group-hover:text-primary transition-colors">
              {automation.title}
            </h3>
          </div>

          <p className="text-muted-foreground text-sm font-syne font-light leading-relaxed mb-5 line-clamp-3 flex-1">
            {automation.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-wrap gap-2">
              {automation.tools.slice(0, 2).map((tool) => (
                <span key={tool} className="ai-hub-tool-badge font-mono">
                  {tool}
                </span>
              ))}
              {automation.tools.length > 2 && (
                <span className="ai-hub-tool-badge font-mono">+{automation.tools.length - 2}</span>
              )}
            </div>

            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
});

AutomationCard.displayName = "AutomationCard";

export default AutomationCard;

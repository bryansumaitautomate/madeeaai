import { ArrowRight } from "lucide-react";
import type { Automation } from "@/lib/api/workflows";

interface AutomationCardProps {
  automation: Automation;
  onClick: (automation: Automation) => void;
}

const AutomationCard = ({ automation, onClick }: AutomationCardProps) => {
  return (
    <article
      onClick={() => onClick(automation)}
      className="group bg-card border border-border rounded-2xl p-6 cursor-pointer ai-hub-card-hover animate-scale-in h-full flex flex-col"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl p-2 bg-secondary rounded-xl flex-shrink-0">{automation.icon}</span>
        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {automation.title}
        </h3>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
        {automation.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-2">
          {automation.tools.slice(0, 2).map((tool) => (
            <span key={tool} className="ai-hub-tool-badge">
              {tool}
            </span>
          ))}
          {automation.tools.length > 2 && (
            <span className="ai-hub-tool-badge">+{automation.tools.length - 2}</span>
          )}
        </div>

        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    </article>
  );
};

export default AutomationCard;

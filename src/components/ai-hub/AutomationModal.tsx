import { ExternalLink } from "lucide-react";
import type { Automation } from "@/lib/api/workflows";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AutomationModalProps {
  automation: Automation | null;
  isOpen: boolean;
  onClose: () => void;
}

const AutomationModal = ({ automation, isOpen, onClose }: AutomationModalProps) => {
  if (!automation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border rounded-2xl max-h-[85vh] flex flex-col p-0">
        <DialogHeader className="flex-shrink-0 p-6 pb-4 border-b border-border">
          <div className="flex items-start gap-4">
            <span className="text-3xl p-3 bg-secondary rounded-xl flex-shrink-0">{automation.icon}</span>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl leading-tight">{automation.title}</DialogTitle>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {automation.categories.slice(0, 3).map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
                {automation.categories.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{automation.categories.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0 px-6 py-5">
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">What this automation does</h4>
            <p className="text-muted-foreground leading-relaxed text-[15px] whitespace-pre-line">
              {automation.description}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-border">
            <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Tools & Integrations</h4>
            <div className="flex flex-wrap gap-2">
              {automation.tools.map((tool) => (
                <span key={tool} className="ai-hub-tool-badge">
                  {tool}
                </span>
              ))}
              {automation.tools.length === 0 && (
                <span className="text-muted-foreground text-sm">No specific tools listed</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 border-t border-border flex gap-3 flex-shrink-0">
          <Button
            className="flex-1"
            variant="default"
            size="lg"
            onClick={() => window.open('https://api.leadconnectorhq.com/widget/booking/0qkIXW7E44BcuiWW7g1k', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Get Started
          </Button>
          <Button variant="outline" size="lg" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AutomationModal;

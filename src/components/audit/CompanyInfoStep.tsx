import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Building2, Users, Briefcase, Code, MessageSquare } from "lucide-react";
import { CompanyInfo } from "@/types/audit";

interface CompanyInfoStepProps {
  data: CompanyInfo;
  onUpdate: (data: CompanyInfo) => void;
  onNext: () => void;
}

const industries = [
  "Coaching", "Consulting", "E-commerce", "Education", "Finance", "Fitness",
  "Healthcare", "Manufacturing", "Marketing & Advertising", "Media & Entertainment",
  "Professional Services", "Real Estate", "Restaurants & Hospitality", "Retail",
  "Salons & Spas", "Technology", "Other",
];

const referralSources = [
  { value: "google", label: "Google Search" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "podcast", label: "Podcast" },
  { value: "referral", label: "Friend/Colleague Referral" },
  { value: "event", label: "Event/Conference" },
  { value: "other", label: "Other" },
];

const employeeCounts = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

const techStackSuggestions = [
  "Slack", "Google Workspace", "Microsoft 365", "Notion", "Asana",
  "Trello", "Monday.com", "HubSpot", "Salesforce", "Mailchimp",
  "Zoom", "Calendly", "QuickBooks", "Stripe", "Shopify",
  "WordPress", "Zapier", "Airtable", "ClickUp", "Canva"
];

export const CompanyInfoStep = ({ data, onUpdate, onNext }: CompanyInfoStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.companyName.trim()) newErrors.companyName = "Company name is required";
    else if (data.companyName.trim().length < 2) newErrors.companyName = "Company name must be at least 2 characters";
    if (!data.industry) newErrors.industry = "Please select an industry";
    if (!data.employeeCount) newErrors.employeeCount = "Please select employee count";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => { if (validate()) onNext(); };

  const isToolSelected = (tool: string) => data.techStack.toLowerCase().includes(tool.toLowerCase());

  const toggleTool = (tool: string) => {
    const tools = data.techStack.split(',').map(t => t.trim()).filter(t => t.length > 0);
    if (isToolSelected(tool)) {
      const filtered = tools.filter(t => t.toLowerCase() !== tool.toLowerCase());
      onUpdate({ ...data, techStack: filtered.join(', ') });
    } else {
      tools.push(tool);
      onUpdate({ ...data, techStack: tools.join(', ') });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight mb-2">Where are you currently operating?</h2>
        <p className="text-muted-foreground">Tell us about your company and industry to personalize your audit</p>
      </div>

      <div className="audit-glass-card p-4 sm:p-8 max-w-xl mx-auto space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="flex items-center gap-2 text-sm font-medium">
            <Building2 className="w-4 h-4 text-primary" />
            Company Name <span className="text-destructive">*</span>
          </Label>
          <Input id="companyName" value={data.companyName} onChange={(e) => onUpdate({ ...data, companyName: e.target.value.slice(0, 100) })} placeholder="Enter your company name" maxLength={100} className={`h-12 bg-background/50 border-border focus:border-primary ${errors.companyName ? 'border-destructive' : ''}`} />
          {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Briefcase className="w-4 h-4 text-primary" /> Industry <span className="text-destructive">*</span>
          </Label>
          <Select value={data.industry} onValueChange={(value) => onUpdate({ ...data, industry: value })}>
            <SelectTrigger className="h-12 bg-background/50 border-border"><SelectValue placeholder="Select your industry" /></SelectTrigger>
            <SelectContent>{industries.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
          </Select>
          {errors.industry && <p className="text-sm text-destructive">{errors.industry}</p>}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Users className="w-4 h-4 text-primary" /> Number of Employees <span className="text-destructive">*</span>
          </Label>
          <Select value={data.employeeCount} onValueChange={(value) => onUpdate({ ...data, employeeCount: value })}>
            <SelectTrigger className="h-12 bg-background/50 border-border"><SelectValue placeholder="Select employee count" /></SelectTrigger>
            <SelectContent>{employeeCounts.map((c) => <SelectItem key={c} value={c}>{c} employees</SelectItem>)}</SelectContent>
          </Select>
          {errors.employeeCount && <p className="text-sm text-destructive">{errors.employeeCount}</p>}
        </div>

        <div className="space-y-3">
          <Label htmlFor="techStack" className="flex items-center gap-2 text-sm font-medium">
            <Code className="w-4 h-4 text-primary" /> Current Tech Stack
          </Label>
          <Textarea id="techStack" value={data.techStack} onChange={(e) => onUpdate({ ...data, techStack: e.target.value })} placeholder="Select from suggestions below or type your own tools here..." className="min-h-[80px] bg-background/50 border-border focus:border-primary resize-none" />
          <div className="flex flex-wrap gap-2 pt-2">
            {techStackSuggestions.map((tool) => (
              <button key={tool} type="button" onClick={() => toggleTool(tool)} className={`px-3 py-1.5 text-xs rounded-full border transition-all duration-200 ${isToolSelected(tool) ? 'bg-primary/20 border-primary text-primary' : 'bg-background/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}>
                {tool}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <MessageSquare className="w-4 h-4 text-primary" /> Where did you hear about us?
          </Label>
          <Select value={data.referralSource} onValueChange={(value) => onUpdate({ ...data, referralSource: value })}>
            <SelectTrigger className="h-12 bg-background/50 border-border"><SelectValue placeholder="Select how you found us" /></SelectTrigger>
            <SelectContent>{referralSources.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
          </Select>
          {data.referralSource === "other" && (
            <Input value={data.referralSourceCustom || ""} onChange={(e) => onUpdate({ ...data, referralSourceCustom: e.target.value })} placeholder="Please specify" className="h-12 bg-background/50 border-border" />
          )}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={handleSubmit} className="min-w-[200px] group rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold h-12 px-8">
          Next Step <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

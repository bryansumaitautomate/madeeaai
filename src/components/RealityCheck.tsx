import { useState } from 'react';
import { AlertTriangle, Phone, Headphones, Settings, Megaphone, Users, CheckCircle2 } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
interface ProblemCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  problems: string[];
  featured?: boolean;
}
const ProblemCard = ({
  title,
  icon: Icon,
  description,
  problems,
  featured = false
}: ProblemCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return <div className={`problem-card-wrapper ${featured ? 'md:col-span-2' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="problem-card-border">
        {/* Rotating gradient border */}
        <div className="problem-card-gradient" style={{
        animationDuration: isHovered ? '1.5s' : '4s'
      }} />
        
        {/* Card content */}
        <div className="problem-card-content">
          {/* Icon container */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 border border-primary/20">
            <Icon size={24} className="text-primary" />
          </div>

          {/* Title */}
          <h3 className="font-syne text-xl font-semibold text-foreground mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="font-syne text-sm text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>

          {/* Problem list */}
          <ul className="space-y-3">
            {problems.map((problem, index) => <li key={index} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="font-syne text-sm text-secondary-foreground">
                  {problem}
                </span>
              </li>)}
          </ul>

          {/* Subtle hover indicator */}
          
        </div>
      </div>
    </div>;
};
const problemData: ProblemCardProps[] = [{
  title: 'Sales Operations',
  icon: Phone,
  description: 'Missed leads and dead databases silently drain your pipeline every day.',
  problems: ['Unanswered calls going to voicemail', 'Leads sitting cold for hours or days', 'CRM full of duplicate and stale records'],
  featured: true
}, {
  title: 'Customer Support',
  icon: Headphones,
  description: 'Repetitive questions eating staff time that could be spent on real problems.',
  problems: ['Same FAQs answered 50+ times daily', 'Ticket backlogs growing faster than resolution', 'High-value issues buried under routine noise']
}, {
  title: 'Operations & Admin',
  icon: Settings,
  description: 'Manual data entry and document processing creating invisible bottlenecks.',
  problems: ['Hours spent on copy-paste data tasks', 'Documents processed by hand, one by one', 'Errors compounding across systems']
}, {
  title: 'Marketing & Outreach',
  icon: Megaphone,
  description: 'Inconsistent follow-through turning warm prospects cold.',
  problems: ['Campaign leads not nurtured in time', 'Personalization too slow at scale', 'Engagement metrics with no follow-up action']
}, {
  title: 'HR & Onboarding',
  icon: Users,
  description: 'Paperwork delays and scheduling chaos frustrating new hires.',
  problems: ['Offer letters stuck in approval queues', 'Interview scheduling taking days', 'Onboarding checklists managed manually']
}];
const RealityCheck = () => {
  return <section id="problems" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <AlertTriangle size={12} className="text-primary" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary">
              The Invisible Problem
            </span>
          </div>
          <h2 className="text-3xl font-syne font-normal tracking-tight text-foreground mb-4 md:text-4xl">
            Your teams are fighting fires <br className="hidden md:block" />
            <span className="italic text-primary">AI could prevent.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every department has hidden inefficiencies. Here's where the money leaks.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problemData.map(problem => <ProblemCard key={problem.title} {...problem} />)}
        </div>
      </div>
    </section>;
};
export default RealityCheck;
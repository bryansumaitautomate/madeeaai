import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ControlRoomButton from './ControlRoomButton';
import { ArrowRight } from 'lucide-react';

const faqItems = [
  {
    question: "What exactly is AI sales infrastructure?",
    answer: "AI sales infrastructure is a custom-built system of automated tools that handle your lead response, qualification, and appointment booking 24/7. It combines AI voice agents, automated messaging, and smart routing to ensure no lead falls through the cracks—even at 3 AM."
  },
  {
    question: "How quickly can you implement a system for my business?",
    answer: "Most implementations take 2-4 weeks from kickoff to full deployment. This includes our discovery audit, custom system design, integration with your existing tools (CRM, calendar, phone systems), and thorough testing before going live."
  },
  {
    question: "Will this replace my sales team?",
    answer: "No—it amplifies them. Our AI infrastructure handles the repetitive tasks like initial response, qualification questions, and scheduling. Your sales team focuses on what they do best: closing deals with qualified, warmed-up prospects."
  },
  {
    question: "What if a lead asks something the AI can't handle?",
    answer: "Our systems are designed with intelligent escalation paths. Complex questions or high-intent leads are seamlessly routed to your human team with full context. The AI knows its limits and hands off gracefully."
  },
  {
    question: "How much does this cost compared to hiring more SDRs?",
    answer: "Typically, our systems cost 60-80% less than a single SDR salary while handling unlimited concurrent conversations. Plus, there's no training ramp-up, no sick days, and consistent performance around the clock."
  },
  {
    question: "What's included in the free system audit?",
    answer: "We analyze your current lead response times, identify revenue leaks in your sales funnel, and map out exactly where AI automation would have the highest impact. You'll receive a detailed report with specific recommendations—no obligation, no pressure."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="relative py-24 px-6">
      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary mb-4 block">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gradient mb-4">
            Everything you need to know
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get answers about our AI sales infrastructure and how it can transform your revenue operations.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-border/50 last:border-0"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary transition-colors py-4 text-base md:text-lg font-medium [&[data-state=open]]:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <ControlRoomButton
            label="Get in touch"
            icon={ArrowRight}
            className="px-6 py-3"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;

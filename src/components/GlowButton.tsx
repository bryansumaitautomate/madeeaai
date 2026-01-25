import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const GlowButton = ({ children, className, ...props }: GlowButtonProps) => {
  return (
    <button
      className={cn(
        // Base styles
        "group relative h-14 px-10 rounded-full",
        "bg-[#0a0a0f] text-white font-semibold",
        // Ring
        "ring-1 ring-white/20",
        // Shadow with Ion Blue glow
        "shadow-[0_0_50px_-12px_#3b82f6]",
        // Transitions
        "transition-all duration-300",
        // Hover effects
        "hover:shadow-[0_0_70px_-12px_#3b82f6] hover:scale-[1.03]",
        // Active effects
        "active:scale-[0.98]",
        // Flex container for icon + text
        "flex items-center justify-center gap-2",
        // Custom className
        className
      )}
      {...props}
    >
      {/* Ion Blue gradient overlay */}
      <span 
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#60a5fa] opacity-80 transition-opacity duration-300 group-hover:opacity-100 z-0"
      />
      
      {/* Top radial gradient overlay */}
      <span 
        className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.2)_0%,_transparent_50%)] mix-blend-overlay z-10"
      />
      
      {/* Bottom radial gradient overlay */}
      <span 
        className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.2)_0%,_transparent_50%)] mix-blend-overlay z-10"
      />
      
      {/* Inner glow border */}
      <span 
        className="absolute inset-[1px] rounded-full border border-white/50 transition-all duration-300 group-hover:border-white/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] z-20"
      />
      
      {/* Text content with drop shadow */}
      <span className="relative z-30 drop-shadow-md flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default GlowButton;

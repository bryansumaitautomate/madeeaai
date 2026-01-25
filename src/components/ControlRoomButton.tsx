import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface ControlRoomButtonProps {
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  icon?: LucideIcon;
  className?: string;
}

const ControlRoomButton = ({
  label,
  onClick,
  isLoading = false,
  icon: Icon,
  className,
}: ControlRoomButtonProps) => {
  // Split label into individual letters with staggered animation delays
  const letters = useMemo(() => {
    return label.split('').map((char, index) => ({
      char,
      delay: index * 0.08, // 80ms stagger between each letter
    }));
  }, [label]);

  // Calculate approximate min-width based on label length to prevent jumping
  const minWidth = useMemo(() => {
    // Approximate character width (in ch units) + padding for icon
    return `${label.length + (Icon ? 4 : 0)}ch`;
  }, [label, Icon]);

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "control-room-btn",
        // Flexbox precision - centered layout
        "flex justify-center items-center",
        "text-base md:text-lg",
        isLoading && "loading",
        className
      )}
    >
      {/* Text wrapper with min-width to prevent layout shift */}
      <span 
        className="txt-wrapper relative z-10 flex justify-center items-center"
        style={{ minWidth }}
      >
        {/* Staggered letters container */}
        <span className="flex items-center justify-center">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="letter inline-block"
              style={{
                animationDelay: `${letter.delay}s`,
                // Preserve spaces with explicit width
                width: letter.char === ' ' ? '0.3em' : 'auto',
              }}
            >
              {letter.char === ' ' ? '\u00A0' : letter.char}
            </span>
          ))}
        </span>

        {/* Optional icon with consistent spacing and vertical alignment */}
        {Icon && (
          <Icon
            size={20}
            className="btn-icon relative z-10 ml-3 flex-shrink-0"
            style={{
              animationDelay: `${letters.length * 0.08}s`,
            }}
          />
        )}
      </span>

      {/* Loading indicator overlay */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/80 rounded-full z-20">
          <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </span>
      )}
    </button>
  );
};

export default ControlRoomButton;

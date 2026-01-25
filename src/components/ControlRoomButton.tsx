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

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "control-room-btn",
        "flex items-center justify-center gap-3",
        "text-base md:text-lg",
        isLoading && "loading",
        className
      )}
    >
      {/* Staggered letters */}
      <span className="relative z-10 flex items-center">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="letter"
            style={{
              animationDelay: `${letter.delay}s`,
              // Preserve spaces
              whiteSpace: letter.char === ' ' ? 'pre' : 'normal',
            }}
          >
            {letter.char}
          </span>
        ))}
      </span>

      {/* Optional icon with flicker animation */}
      {Icon && (
        <Icon
          size={20}
          className="btn-icon relative z-10"
          style={{
            animationDelay: `${letters.length * 0.08}s`,
          }}
        />
      )}

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

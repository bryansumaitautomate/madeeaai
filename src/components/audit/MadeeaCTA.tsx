interface MadeeaCTAProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const MadeeaCTA = ({ label, onClick, className = "" }: MadeeaCTAProps) => {
  return (
    <button 
      onClick={onClick}
      className={`group relative p-[1px] inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${className}`}
    >
      <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3B82F6_0%,#60A5FA_50%,#3B82F6_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-6 py-2.5 text-sm font-bold text-white backdrop-blur-3xl transition-all group-hover:bg-black/90">
        {label}
      </span>
    </button>
  );
};

export default MadeeaCTA;

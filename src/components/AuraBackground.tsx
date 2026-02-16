export default function AuraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f] will-change-transform">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0a0a0f]/80" />

      {/* Animated gradient orbs - reduced blur on mobile for performance */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-[#3b82f6] rounded-full mix-blend-screen filter blur-[80px] sm:blur-[128px] opacity-30 animate-blob" />
      
      <div className="absolute top-0 -right-4 w-72 h-72 bg-[#ffffff] rounded-full mix-blend-screen filter blur-[80px] sm:blur-[128px] opacity-10 animate-blob animation-delay-2000" />
      
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#3b82f6] rounded-full mix-blend-screen filter blur-[80px] sm:blur-[128px] opacity-20 animate-blob animation-delay-4000" />

      {/* Dot-matrix pattern overlay */}
      <div className="absolute inset-0 dot-matrix opacity-60" />

      {/* 4-column vertical grid - hidden on mobile for perf */}
      <div className="absolute inset-0 hidden sm:flex">
        <div className="flex-1 border-r border-white/5" />
        <div className="flex-1 border-r border-white/5" />
        <div className="flex-1 border-r border-white/5" />
        <div className="flex-1" />
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";

export const AuditAuraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;
    
    const loadUnicornStudio = () => {
      if (!window.UnicornStudio) {
        (window as any).UnicornStudio = { isInitialized: !1 };
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/gh/nicholashamilton/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
        script.onload = () => {
          if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
            window.UnicornStudio.init();
            (window.UnicornStudio as any).isInitialized = true;
          }
        };
        (document.head || document.body).appendChild(script);
        scriptLoadedRef.current = true;
      } else if (!window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        (window.UnicornStudio as any).isInitialized = true;
      }
    };

    loadUnicornStudio();
  }, []);

  return (
    <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
      <div
        ref={containerRef}
        data-us-project="NMLvqnkICwYYJ6lYb064"
        className="absolute w-full h-full left-0 top-0 -z-10"
      />
    </div>
  );
};

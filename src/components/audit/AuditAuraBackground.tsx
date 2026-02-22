import { useEffect, useRef } from "react";

export const AuditAuraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    const existingScript = document.querySelector(
      'script[src*="unicornStudio.umd.js"]'
    );

    const initStudio = () => {
      if (
        window.UnicornStudio &&
        typeof window.UnicornStudio.init === "function"
      ) {
        window.UnicornStudio.init();
      }
    };

    if (existingScript) {
      // Script already in DOM – may or may not have loaded yet
      initStudio();
      existingScript.addEventListener("load", initStudio);
    } else {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/nicholashamilton/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.onload = initStudio;
      document.head.appendChild(script);
    }
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

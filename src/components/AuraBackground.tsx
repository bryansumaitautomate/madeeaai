import { useEffect, useState } from 'react';

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void;
      isInitialized?: boolean;
    };
  }
}

const AuraBackground = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const scriptId = 'unicorn-studio-script';
    
    const initUnicorn = () => {
      if (window.UnicornStudio) {
        window.UnicornStudio.init();
        setScriptLoaded(true);
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
      script.onload = initUnicorn;
      document.head.appendChild(script);
    } else {
      // Script already exists, try to init
      initUnicorn();
    }
  }, []);

  // Re-init when component mounts (for HMR and navigation)
  useEffect(() => {
    if (scriptLoaded && window.UnicornStudio) {
      window.UnicornStudio.init();
    }
  }, [scriptLoaded]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-background">
      <div 
        data-us-project="bKN5upvoulAmWvInmHza" 
        className="absolute inset-0 w-full h-full"
      />
      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-background/30 pointer-events-none" />
    </div>
  );
};

export default AuraBackground;

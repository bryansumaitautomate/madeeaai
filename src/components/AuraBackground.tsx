import { useEffect } from 'react';

declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void;
      isInitialized?: boolean;
    };
  }
}

const AuraBackground = () => {
  useEffect(() => {
    const scriptId = 'unicorn-studio-script';
    
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
      script.onload = () => {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
        }
      };
      document.head.appendChild(script);
    } else {
      if (window.UnicornStudio) {
        window.UnicornStudio.init();
      }
    }
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        data-us-project="bKN5upvoulAmWvInmHza"
        className="w-full h-full"
        style={{ minHeight: '100vh' }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
};

export default AuraBackground;

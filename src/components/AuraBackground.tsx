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
    const initUnicorn = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    // Try immediately
    initUnicorn();

    // Retry after delays to ensure script is loaded
    const timeout1 = setTimeout(initUnicorn, 300);
    const timeout2 = setTimeout(initUnicorn, 800);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div className="absolute top-0 w-full h-full -z-10">
      <div 
        data-us-project="BqS5vTHVEpn6NiF0g8iJ" 
        className="absolute inset-0 w-full h-full"
        style={{ minHeight: '100vh', width: '100vw' }}
      />
    </div>
  );
};

export default AuraBackground;

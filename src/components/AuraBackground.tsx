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
    // Initialize Unicorn Studio when component mounts
    const initUnicorn = () => {
      if (window.UnicornStudio) {
        window.UnicornStudio.init();
      }
    };

    // Try immediately
    initUnicorn();

    // Also retry after a short delay in case script hasn't loaded yet
    const timeout = setTimeout(initUnicorn, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -10 }}>
      <div 
        data-us-project="bKN5upvoulAmWvInmHza" 
        className="absolute inset-0 w-full h-full"
        style={{ minHeight: '100vh', width: '100vw' }}
      />
    </div>
  );
};

export default AuraBackground;

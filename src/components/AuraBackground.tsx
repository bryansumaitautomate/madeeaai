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
    // Force Unicorn Studio to initialize when component loads
    if (window.UnicornStudio) {
      window.UnicornStudio.init();
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <div 
        data-us-project="bKN5upvoulAmWvInmHza" 
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default AuraBackground;

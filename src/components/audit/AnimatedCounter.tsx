import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export const AnimatedCounter = ({
  end,
  duration = 1000,
  delay = 0,
  suffix = '',
  prefix = '',
  decimals = 0
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (end - startValue) * easeOut;
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.round(count).toLocaleString();

  return (
    <span>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

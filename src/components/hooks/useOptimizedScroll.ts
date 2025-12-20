import { useEffect, useCallback, useRef } from 'react';


export function useOptimizedScroll(callback: () => void, deps: React.DependencyList = []) {
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }

    
    rafId.current = requestAnimationFrame(() => {
      
      if (lastScrollY.current !== window.scrollY) {
        lastScrollY.current = window.scrollY;
        callback();
      }
    });
  }, [callback, ...deps]);

  useEffect(() => {
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);
}


export function useThrottledScroll(callback: () => void, delay: number = 100) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const lastRan = useRef<number>(0);

  const handleScroll = useCallback(() => {
    const now = Date.now();
    
    if (now - lastRan.current >= delay) {
      callback();
      lastRan.current = now;
    } else {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      
      timeoutId.current = setTimeout(() => {
        callback();
        lastRan.current = Date.now();
      }, delay - (now - lastRan.current));
    }
  }, [callback, delay]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [handleScroll]);
}

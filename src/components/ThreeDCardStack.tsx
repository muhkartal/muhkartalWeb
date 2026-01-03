import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CardItem {
  id: string;
  content: React.ReactNode;
}

interface ThreeDCardStackProps {
  items: CardItem[];
  offset?: number;
  scaleFactor?: number;
  onScrollEnd?: () => void;
}

export function ThreeDCardStack({ items, offset = 15, scaleFactor = 0.08, onScrollEnd }: ThreeDCardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef<number>(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Handle scroll interaction
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      // Throttle scroll events (wait 50ms between switches)
      if (now - lastScrollTimeRef.current < 50) return;
      
      if (Math.abs(e.deltaY) < 10) return; // Ignore tiny scrolls

      if (e.deltaY > 0) {
        // SCROLL DOWN
        setCurrentIndex((prevIndex) => {
          // If we are at the LAST image
          if (prevIndex === items.length - 1) {
             // Do NOT stop propagation here - or explicitly trigger end
             // If we rely on stopPropagation below, we must handle the exit here.
             if (onScrollEnd) {
               onScrollEnd();
             }
             return prevIndex;
          }
          
          // If NOT at last image, go to next and TRAP the scroll
          e.preventDefault();
          e.stopPropagation();
          lastScrollTimeRef.current = now;
          return (prevIndex + 1) % items.length;
        });
      } else {
        // SCROLL UP
        setCurrentIndex((prevIndex) => {
          // If at FIRST image, let the page scroll up (don't trap)
          if (prevIndex === 0) {
            return prevIndex;
          }

          // Otherwise, go to prev image and TRAP the scroll
          e.preventDefault();
          e.stopPropagation();
          lastScrollTimeRef.current = now;
          return (prevIndex - 1 + items.length) % items.length;
        });
      }
    };

    // { passive: false } is required to use preventDefault()
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [items.length, onScrollEnd]);

  const VISIBLE_COUNT = 3;

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full py-16 outline-none"
    >
      {/* 
        Significantly increased size:
        - Mobile: w-full (up to screen width)
        - Tablet: max-w-[600px]
        - Desktop: max-w-[800px] !!
        - Aspect Ratio: 16/9 for wide cinematic look
      */}
      <div className="relative w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[800px] aspect-video">
        {items.map((item, index) => {
          let effectiveIndex = (index - currentIndex + items.length) % items.length;
          
          const isVisible = effectiveIndex < VISIBLE_COUNT;
          const isTop = effectiveIndex === 0;

          if (!isVisible) return null;

          return (
            <motion.div
              key={item.id}
              className="absolute top-0 left-0 w-full h-full rounded-2xl bg-[#111] shadow-2xl overflow-hidden cursor-pointer"
              style={{
                zIndex: VISIBLE_COUNT - effectiveIndex,
                transformOrigin: 'top center',
                boxShadow: isTop ? '0 30px 60px -12px rgba(0, 0, 0, 0.6)' : 'none'
              }}
              initial={false}
              animate={{ 
                scale: 1 - (effectiveIndex * scaleFactor), 
                y: -effectiveIndex * offset * 2.5, // slightly more spacing for larger cards
                opacity: 1 - (effectiveIndex * 0.3),
                filter: isTop ? 'blur(0px)' : 'blur(2px) grayscale(100%)'
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              onClick={() => {
                if (isTop) next();
              }}
            >
              {item.content}
            </motion.div>
          );
        })}
      </div>

      {/* Controls positioned lower due to larger size */}
      <div className="flex items-center gap-10 mt-16 z-10">
        <button 
          onClick={prev}
          className="text-[#a9a9a9] hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
          aria-label="Previous project"
        >
          <ChevronLeft size={32} strokeWidth={1.5} />
        </button>
        <div className="text-sm font-mono text-[#a9a9a9]/40 tracking-widest">
          {String(currentIndex + 1).padStart(2, '0')} — {String(items.length).padStart(2, '0')}
        </div>
        <button 
          onClick={next}
          className="text-[#a9a9a9] hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
          aria-label="Next project"
        >
          <ChevronRight size={32} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

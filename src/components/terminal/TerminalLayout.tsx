import React, { useEffect, useRef, useState } from 'react';
import { TerminalNavbar } from './TerminalNavbar';
import { TerminalPrompt } from './TerminalPrompt';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface TerminalLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onNavigate: (section: string) => void;
  onCommand: (command: string) => void;
  commandHistory: string[];
}

export function TerminalLayout({ children, activeSection, onNavigate, onCommand, commandHistory }: TerminalLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);
  const lastScrollTime = useRef(0);
  const overscrollAccumulator = useRef(0); // Track intentional scroll past boundary
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Smart scroll navigation with resistance
  useEffect(() => {
    const element = mainRef.current;
    if (!element) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      // Debounce navigation events
      if (now - lastScrollTime.current < 500) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = element;
      // Allow a larger tolerance (20px) for "at bottom" check
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 20;
      const isAtTop = scrollTop <= 0;

      // Hide indicator if at bottom of contact page (last page)
      if (activeSection === 'contact' && isAtBottom) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }

      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const currentIndex = sections.indexOf(activeSection);

      const OVERSCROLL_THRESHOLD = 300; // Require decent amount of scrolling past edge

      if (e.deltaY > 0) {
        // Scrolling Down
        
        // Disable auto-switch to next page for 'projects' only to prevent conflict with gallery interaction
        if (activeSection === 'projects') return;

        if (isAtBottom) {
          // If at bottom, accumulate "pressure" to switch
          overscrollAccumulator.current += e.deltaY;
          
          if (overscrollAccumulator.current > OVERSCROLL_THRESHOLD) {
            if (currentIndex < sections.length - 1) {
              onNavigate(sections[currentIndex + 1]);
              lastScrollTime.current = now;
              overscrollAccumulator.current = 0; // Reset
            }
          }
        } else {
          // Not at bottom yet, reset accumulator
          overscrollAccumulator.current = 0;
        }
      } else if (e.deltaY < 0) {
        // Scrolling Up
        if (isAtTop) {
          // Accumulate negative delta (make positive for comparison)
          overscrollAccumulator.current -= e.deltaY; // deltaY is negative, so this adds
          
          if (overscrollAccumulator.current > OVERSCROLL_THRESHOLD) {
            if (currentIndex > 0) {
              onNavigate(sections[currentIndex - 1]);
              lastScrollTime.current = now;
              overscrollAccumulator.current = 0;
            }
          }
        } else {
          // Not at top, reset
          overscrollAccumulator.current = 0;
        }
      }
    };

    // Reset accumulator when section changes
    overscrollAccumulator.current = 0;

    element.addEventListener('wheel', handleWheel);
    return () => element.removeEventListener('wheel', handleWheel);
  }, [activeSection, onNavigate]);
  
  const containerVariants = {
    initial: { 
      opacity: 0,
    },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-[#a9a9a9] font-terminal relative overflow-hidden selection:bg-[#333] selection:text-white">
      {/* CRT Effects */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-4 sm:p-8 md:p-12 min-h-screen flex flex-col max-w-7xl mx-auto">
        <TerminalNavbar activeSection={activeSection} onNavigate={onNavigate} />
        
        <main 
          ref={mainRef}
          className="flex-1 mt-8 mb-4 overflow-y-auto custom-scrollbar relative"
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeSection}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <TerminalPrompt onCommand={onCommand} history={commandHistory} />

        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && activeSection !== 'contact' && (
            <motion.div 
              className="fixed bottom-12 right-12 sm:right-24 z-50 hidden sm:flex flex-col items-center gap-3 pointer-events-none opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
            >
              <span className="text-xs font-mono tracking-widest uppercase writing-vertical-rl rotate-180 text-white">
                SCROLL
              </span>
              <div className="h-16 w-[2px] bg-white/20 relative overflow-hidden rounded-full">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1/2 bg-white"
                  animate={{ top: ['-100%', '100%'] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatDelay: 0.5
                  }}
                />
              </div>
              <ChevronDown size={20} className="text-white animate-bounce" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

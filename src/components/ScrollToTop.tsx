import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { useOptimizedScroll } from './hooks/useOptimizedScroll';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  
  useOptimizedScroll(() => {
    
    setIsVisible(window.scrollY > 300);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-2 rounded-full bg-black/80 dark:bg-white/80 backdrop-blur-md text-white dark:text-black border border-neutral-200 dark:border-neutral-700 shadow-lg group overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          aria-label="Scroll to top"
        >
          {}
          <motion.div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.3), rgba(150, 150, 150, 0.2), rgba(100, 100, 100, 0.3))',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <ChevronUp size={18} strokeWidth={2.5} />
          </motion.div>
          
          {}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white dark:border-black"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
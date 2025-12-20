import { useState, useEffect } from 'react';
import { Mail, Github } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AboutAndExperience } from './sections/AboutAndExperience';
import { Projects } from './sections/Projects';
import { Footer } from './sections/Footer';
import { ScrollToTop } from './ScrollToTop';
import { useTheme } from './ThemeProvider';
import { useOptimizedScroll } from './hooks/useOptimizedScroll';

export function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  // Parallax scroll effects - using Motion's optimized useScroll
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const navItems = [
    { name: 'home', id: 'home' },
    { name: 'work', id: 'work' },
    { name: 'projects', id: 'projects' },
    { name: 'contact', id: 'contact' }
  ];

  // Use optimized scroll hook for section detection
  useOptimizedScroll(() => {
    const sections = navItems.map(item => item.id);
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent relative transition-colors duration-300">
      {/* Global Dot Grid Background - extends across all sections */}
      {/* Light theme dot grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 dark:hidden"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          color: '#000000',
          opacity: 0.15,
          maskImage: `
            linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
          `,
          WebkitMaskImage: `
            linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
          `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in'
        }}
      />
      {/* Dark theme dot grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 hidden dark:block"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          color: '#ffffff',
          opacity: 0.12,
          maskImage: `
            linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
          `,
          WebkitMaskImage: `
            linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)
          `,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in'
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 py-4 md:py-6 flex items-center justify-between bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm transition-colors duration-300">
        <button 
          onClick={() => scrollToSection('home')}
          className="cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors"
        >
          <span 
            className="text-black dark:text-white tracking-tight"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
          >
            muhkartal.dev
          </span>
        </button>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`tracking-wider transition-colors duration-300 ${activeSection === 'home' ? 'text-black dark:text-white' : 'text-neutral-400 hover:text-black dark:hover:text-white'}`}
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('work')}
              className={`tracking-wider transition-colors duration-300 ${activeSection === 'work' ? 'text-black dark:text-white' : 'text-neutral-400 hover:text-black dark:hover:text-white'}`}
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className={`tracking-wider transition-colors duration-300 ${activeSection === 'projects' ? 'text-black dark:text-white' : 'text-neutral-400 hover:text-black dark:hover:text-white'}`}
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`tracking-wider transition-colors duration-300 ${activeSection === 'contact' ? 'text-black dark:text-white' : 'text-neutral-400 hover:text-black dark:hover:text-white'}`}
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
            >
              Connect
            </button>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300" 
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-4 h-4 text-neutral-400 dark:text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-neutral-400 dark:text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Left Navigation - Dot Style */}
      <nav className="fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <ul className="flex flex-col gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="group relative flex items-center"
                aria-label={`Navigate to ${item.name}`}
              >
                {/* Dot indicator */}
                <span 
                  className={`
                    w-2 rounded-full transition-all duration-500
                    ${activeSection === item.id ? 'bg-black dark:bg-white h-12' : 'bg-neutral-300 dark:bg-neutral-700 h-8 group-hover:bg-black dark:group-hover:bg-white'}
                  `}
                ></span>
                
                {/* Label on hover */}
                <span 
                  className="
                    absolute left-6 whitespace-nowrap text-black dark:text-white
                    opacity-0 group-hover:opacity-100 
                    -translate-x-2 group-hover:translate-x-0
                    transition-all duration-500
                    pointer-events-none
                  "
                >
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Side Text */}
      <div className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        
      </div>

      {/* Main Content */}
      <main>
        {/* Hero Section with Parallax */}
        <section 
          id="home" 
          data-scroll-section
          className="relative flex items-center justify-center min-h-screen px-4 bg-transparent transition-colors duration-300 overflow-hidden"
        >

          {/* Subtle Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-neutral-200/30 dark:bg-neutral-800/20 blur-3xl will-change-transform"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-neutral-200/30 dark:bg-neutral-800/20 blur-3xl will-change-transform"
              animate={{
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>



          {/* Noise Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] mix-blend-overlay pointer-events-none"
            style={{
              // Optimization: Use a smaller, simpler noise pattern or a static image if possible.
              // For now, ensuring it doesn't cause repaints
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              willChange: 'opacity'
            }}
          />

          <motion.div 
            className="text-center relative z-10"
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale, willChange: 'transform, opacity' }}
          >
            <motion.h1 
              className="text-black dark:text-white tracking-tight relative"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block text-[16px] sm:text-[18px] md:text-[20px]">
                <motion.span 
                  className="text-neutral-400 dark:text-neutral-500"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  full-stack.
                </motion.span>
                {' '}
                <motion.span 
                  className="text-neutral-600 dark:text-neutral-400"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  app
                </motion.span>
                {' '}
                <motion.span 
                  className="relative inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="text-black dark:text-white">&#123;developer&#125;</span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black dark:bg-white animate-[pulse_2s_ease-in-out_infinite]"></span>
                </motion.span>
                <motion.span 
                  className="block mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl text-neutral-600 dark:text-neutral-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Hi, I am Muhammed Kartal
                </motion.span>
              </span>
            </motion.h1>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 dark:bg-white/80 backdrop-blur-md text-white dark:text-black tracking-wider transition-all duration-300 hover:bg-black dark:hover:bg-white hover:scale-105 w-full sm:w-auto justify-center"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '14px' }}
              >
                <Mail size={16} />
                Contact Me
              </button>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 dark:border-white/20 bg-white/50 dark:bg-black/50 backdrop-blur-md text-black dark:text-white tracking-wider transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 w-full sm:w-auto justify-center"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '14px' }}
              >
                <Github size={16} />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Animated Mouse Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-3 z-10 hidden sm:flex"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
          >
            <svg 
              width="24" 
              height="40" 
              viewBox="0 0 24 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-black dark:text-white"
            >
              {/* Mouse outline */}
              <rect 
                x="2" 
                y="2" 
                width="20" 
                height="36" 
                rx="10" 
                stroke="currentColor" 
                strokeWidth="2"
                fill="none"
              />
              {/* Animated scroll wheel */}
              <circle 
                cx="12" 
                cy="10" 
                r="2" 
                fill="currentColor"
                className="animate-[scroll_1.5s_ease-in-out_infinite]"
              />
            </svg>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-400 dark:text-neutral-500 animate-[bounce_2s_ease-in-out_infinite]"
            >
              <path 
                d="M12 5v14m0 0l-7-7m7 7l7-7" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </section>

        {/* Smooth transition divider */}
        <div className="h-32 bg-gradient-to-b from-transparent to-neutral-50 dark:to-neutral-900 transition-colors duration-300" />

        {/* About & Work Section */}
        <motion.section 
          id="work" 
          className="relative bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-none shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)] transition-colors duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <AboutAndExperience />
        </motion.section>

        {/* Smooth transition divider */}
        <div className="h-32 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 transition-colors duration-300" />

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="relative bg-gradient-to-b from-white via-white to-white dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-950 transition-colors duration-300 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle gradient orbs for depth */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neutral-200/20 dark:bg-neutral-800/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neutral-200/20 dark:bg-neutral-800/10 blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <Projects />
          </div>
        </motion.section>

        {/* Smooth transition divider */}
        <div className="h-32 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 transition-colors duration-300" />

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="relative bg-gradient-to-b from-neutral-50 via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-900 dark:to-black transition-colors duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Footer />
        </motion.section>
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectItemProps {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

function ProjectItem({ id, title, description, technologies, image }: ProjectItemProps) {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isGradientHovered, setIsGradientHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleGradientMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGradientPosition({ x, y });
  };

  const handleClick = () => {
    navigate(`/project/${id}`);
  };

  return (
    <motion.div 
      onClick={handleClick}
      className="group border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-500 flex flex-col h-full relative cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mouse Spotlight */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(128, 128, 128, 0.15), transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
      
      {/* Dark Mode Spotlight */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-0 dark:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(200, 200, 200, 0.08), transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}
      
      {/* Image Container */}
      <div 
        className="relative w-full aspect-video overflow-hidden"
        onMouseMove={handleGradientMouseMove}
        onMouseEnter={() => setIsGradientHovered(true)}
        onMouseLeave={() => setIsGradientHovered(false)}
      >
        {/* Placeholder Background (Light) */}
        <div 
          className="absolute inset-0 dark:opacity-0 transition-opacity duration-300"
          style={{ background: 'rgb(220, 220, 220)' }}
        />
        
        {/* Placeholder Background (Dark) */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgb(17, 17, 17)' }}
        />
        
        {/* Animated Gradient Overlay - Default State */}
        <motion.div 
          className="absolute inset-0 dark:opacity-0"
          animate={!isGradientHovered ? {
            background: [
              `radial-gradient(circle at 20% 30%, rgba(180, 180, 180, 0.6) 0%, rgba(150, 150, 150, 0.4) 20%, rgba(120, 120, 120, 0.2) 40%, transparent 60%)`,
              `radial-gradient(circle at 80% 70%, rgba(180, 180, 180, 0.6) 0%, rgba(150, 150, 150, 0.4) 20%, rgba(120, 120, 120, 0.2) 40%, transparent 60%)`,
              `radial-gradient(circle at 50% 50%, rgba(180, 180, 180, 0.6) 0%, rgba(150, 150, 150, 0.4) 20%, rgba(120, 120, 120, 0.2) 40%, transparent 60%)`,
              `radial-gradient(circle at 30% 80%, rgba(180, 180, 180, 0.6) 0%, rgba(150, 150, 150, 0.4) 20%, rgba(120, 120, 120, 0.2) 40%, transparent 60%)`,
              `radial-gradient(circle at 70% 20%, rgba(180, 180, 180, 0.6) 0%, rgba(150, 150, 150, 0.4) 20%, rgba(120, 120, 120, 0.2) 40%, transparent 60%)`,
              `radial-gradient(circle at 20% 30%, rgba(180, 180, 180, 0.6) 0%, rgba(150, 150, 150, 0.4) 20%, rgba(120, 120, 120, 0.2) 40%, transparent 60%)`,
            ]
          } : undefined}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={isGradientHovered ? {
            background: `radial-gradient(
              circle at ${gradientPosition.x}% ${gradientPosition.y}%,
              rgba(180, 180, 180, 0.6) 0%,
              rgba(150, 150, 150, 0.4) 20%,
              rgba(120, 120, 120, 0.2) 40%,
              transparent 60%
            )`,
            transition: 'background 0.15s ease'
          } : undefined}
        />
        
        {/* Animated Gradient Overlay - Dark Mode */}
        <motion.div 
          className="absolute inset-0 opacity-0 dark:opacity-100"
          animate={!isGradientHovered ? {
            background: [
              `radial-gradient(circle at 20% 30%, rgba(100, 100, 100, 0.6) 0%, rgba(70, 70, 70, 0.4) 20%, rgba(50, 50, 50, 0.2) 40%, transparent 60%)`,
              `radial-gradient(circle at 80% 70%, rgba(100, 100, 100, 0.6) 0%, rgba(70, 70, 70, 0.4) 20%, rgba(50, 50, 50, 0.2) 40%, transparent 60%)`,
              `radial-gradient(circle at 50% 50%, rgba(100, 100, 100, 0.6) 0%, rgba(70, 70, 70, 0.4) 20%, rgba(50, 50, 50, 0.2) 40%, transparent 60%)`,
              `radial-gradient(circle at 30% 80%, rgba(100, 100, 100, 0.6) 0%, rgba(70, 70, 70, 0.4) 20%, rgba(50, 50, 50, 0.2) 40%, transparent 60%)`,
              `radial-gradient(circle at 70% 20%, rgba(100, 100, 100, 0.6) 0%, rgba(70, 70, 70, 0.4) 20%, rgba(50, 50, 50, 0.2) 40%, transparent 60%)`,
              `radial-gradient(circle at 20% 30%, rgba(100, 100, 100, 0.6) 0%, rgba(70, 70, 70, 0.4) 20%, rgba(50, 50, 50, 0.2) 40%, transparent 60%)`,
            ]
          } : undefined}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={isGradientHovered ? {
            background: `radial-gradient(
              circle at ${gradientPosition.x}% ${gradientPosition.y}%,
              rgba(100, 100, 100, 0.6) 0%,
              rgba(70, 70, 70, 0.4) 20%,
              rgba(50, 50, 50, 0.2) 40%,
              transparent 60%
            )`,
            transition: 'background 0.15s ease'
          } : undefined}
        />
      </div>
      
      {/* Content */}
      <div 
        className="p-4 sm:p-5 flex flex-col flex-1 relative overflow-hidden"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Glass Effect Layers */}
        <div 
          className="absolute inset-0 dark:opacity-0 transition-opacity duration-300"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            borderTop: '1px solid rgba(255, 255, 255, 0.8)'
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-300"
          style={{
            background: 'rgba(23, 23, 23, 0.7)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        />
        
        <div 
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.03) 100%)'
          }}
        />
        
        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-black dark:text-white transition-colors duration-300 mb-2">
            {title}
          </h3>
          
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed transition-colors duration-300 mb-4 text-xs sm:text-sm">
            {description}
          </p>
          
          {/* Technologies */}
          <div 
            className="flex flex-wrap gap-1.5 sm:gap-2 mb-4"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '10px' }}
          >
            {technologies.map((tech) => (
              <span 
                key={tech} 
                className="px-1.5 sm:px-2 py-0.5 rounded-full text-neutral-700 dark:text-neutral-300 transition-all duration-300 relative"
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                {/* Tech badge glass effect */}
                <div 
                  className="absolute inset-0 rounded-full dark:opacity-0 transition-all duration-300 group-hover:opacity-90"
                  style={{
                    background: 'rgba(240, 240, 240, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.6)',
                  }}
                />
                {/* Tech badge glass effect dark */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 dark:opacity-100 transition-all duration-300"
                  style={{
                    background: 'rgba(60, 60, 60, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                />
                <span className="relative z-10">{tech}</span>
              </span>
            ))}
          </div>
          
          {/* Footer */}
          <div className="flex items-center gap-2 pt-3 mt-auto border-t border-neutral-300/30 dark:border-white/10">
            <span 
              className="text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '11px' }}
            >
              View Project Details
            </span>
            <div className="ml-auto">
              <ExternalLink size={12} className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [visibleCount, setVisibleCount] = useState(3);
  
  const allProjects = [
    {
      id: 'fr-framework',
      title: 'FR Framework',
      description: 'Comprehensive modular face recognition framework offering everything from basic face detection to advanced facial analytics with REST API.',
      technologies: ['Python', 'OpenCV', 'dlib', 'FastAPI', 'Docker'],
      image: 'https://images.unsplash.com/photo-1555952494-bbd6f602e83f?q=80&w=2000&auto=format&fit=crop'
    },
    {
      id: 'sentinel-ai',
      title: 'PokeCoach - Battle Platform',
      description: 'Modern multiplayer battle platform with real-time WebSocket communication, AI-powered strategic coaching, and competitive gameplay.',
      technologies: ['Node.js', 'Socket.IO', 'Python', 'FastAPI', 'Docker'],
      image: 'https://images.unsplash.com/photo-1639803812104-749c0f7961cb?q=80&w=2000&auto=format&fit=crop'
    },
    {
      id: 'webgl-cosmic-visualizations',
      title: 'WebGL Cosmic Visualizations',
      description: 'Interactive 3D fractal and particle simulations with GPU-accelerated WebGL rendering, featuring mesmerizing cosmic landscapes.',
      technologies: ['WebGL 2.0', 'GLSL', 'JavaScript', 'Ray-marching'],
      image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2000&auto=format&fit=crop'
    },
    {
      id: 'llm-output-verifier',
      title: 'LLM Output Verifier',
      description: 'Verification system for large language model outputs with hallucination detection, fact-checking, and quality assessment.',
      technologies: ['Python', 'Transformers', 'LangChain', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop'
    },
    {
      id: 'slam-ai-istanbul',
      title: 'SLAM AI - Istanbul Canyon',
      description: 'Simultaneous Localization and Mapping AI system for autonomous navigation and 3D reconstruction of Istanbul Canyon terrain.',
      technologies: ['Python', 'ROS', 'OpenCV', 'PCL', 'C++'],
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2000&auto=format&fit=crop'
    },
    {
      id: 'vital-ai-health',
      title: 'VitalAI - Health Tracking',
      description: 'AI-powered personal health assistant with symptom analysis, medical literature integration, and natural language health interface.',
      technologies: ['Python', 'Streamlit', 'TensorFlow', 'OpenAI API'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop'
    }
  ];

  const visibleProjects = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allProjects.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, allProjects.length));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
      <motion.div 
        className="mb-8 sm:mb-12 md:mb-16"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 
          className="text-black dark:text-white transition-colors duration-300 mb-2"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
        >
          Projects
        </h2>
        <motion.div 
          className="h-px w-12 sm:w-16 bg-black dark:bg-white"
          initial={{ width: 0 }}
          whileInView={{ width: '3rem' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {visibleProjects.map((project, index) => (
          <ProjectItem 
            key={index} 
            {...project}
          />
        ))}
      </div>
      
      {/* View More Projects Button */}
      {hasMore && (
        <motion.div 
          className="flex justify-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.button
            onClick={loadMore}
            className="relative px-8 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 overflow-hidden group"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '12px' }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {/* Gradient background on hover */}
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.15), rgba(150, 150, 150, 0.1), rgba(100, 100, 100, 0.15))',
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
            
            {/* Border glow */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-neutral-400 dark:border-neutral-500" />
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              View More Projects
              <motion.svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-700 dark:text-neutral-300"
                initial={{ y: 0 }}
                animate={{ y: [0, 3, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <path 
                  d="M12 5v14m0 0l-7-7m7 7l7-7" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

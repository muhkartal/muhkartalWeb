import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThreeDCardStack, CardItem } from '../../ThreeDCardStack';

interface TerminalProjectsProps {
  onNavigate: (section: string) => void;
}

export function TerminalProjects({ onNavigate }: TerminalProjectsProps) {
  const projects = [
    {
      id: 'fr-framework',
      title: 'fr-framework',
      permissions: 'drwxr-xr-x',
      size: '4.2K',
      date: 'Dec 2024',
      description: 'Modular face recognition framework. Features: 68-point landmark detection, HOG/CNN models, REST API.',
      stack: ['Python', 'OpenCV', 'FastAPI', 'Docker']
    },
    {
      id: 'sentinel-ai',
      title: 'poke-coach',
      permissions: 'drwxr-xr-x',
      size: '8.1K',
      date: 'Jan 2025',
      description: 'Multiplayer battle platform with AI advisory. Features: WebSocket, Microservices, Prometheus.',
      stack: ['Node.js', 'Socket.IO', 'Python', 'Redis']
    },
    {
      id: 'webgl-cosmic',
      title: 'webgl-cosmic',
      permissions: 'drwxr-xr-x',
      size: '2.4K',
      date: 'Nov 2024',
      description: 'GPU-accelerated 3D fractal simulations. Features: Ray-marching, Custom GLSL shaders.',
      stack: ['WebGL 2.0', 'GLSL', 'JavaScript']
    },
    {
      id: 'llm-verifier',
      title: 'llm-verifier',
      permissions: 'drwxr-xr-x',
      size: '3.6K',
      date: 'Oct 2024',
      description: 'LLM output verification system. Features: Hallucination detection, Fact-checking pipelines.',
      stack: ['Python', 'LangChain', 'PostgreSQL']
    },
    {
      id: 'slam-ai',
      title: 'slam-ai',
      permissions: 'drwxr-xr-x',
      size: '5.9K',
      date: 'Feb 2025',
      description: 'Autonomous navigation system. Features: ROS integration, SLAM, Sensor fusion.',
      stack: ['Python', 'ROS', 'C++', 'OpenCV']
    },
    {
      id: 'vital-ai',
      title: 'vital-ai',
      permissions: 'drwxr-xr-x',
      size: '4.8K',
      date: 'Mar 2025',
      description: 'AI health assistant. Features: Symptom analysis, NLP engine, Medical literature integration.',
      stack: ['Python', 'TensorFlow', 'OpenAI', 'Streamlit']
    }
  ];

  const projectImages: Record<string, string> = {
    'fr-framework': 'https://raw.githubusercontent.com/muhkartal/fr-framework/main/images/fr-light.png',
    'sentinel-ai': 'https://github.com/muhkartal/pokeCoach-AI-Coach/raw/main/images/1.png',
    'webgl-cosmic': 'https://github.com/muhkartal/webGL-cosmicVisualizations/raw/main/fig/particles-light.png',
    'llm-verifier': 'https://github.com/muhkartal/llm-outputVerifier/raw/main/images/llm-outputVerifier.png',
    'slam-ai': 'https://github.com/muhkartal/slamAI-istanbulCanyon/raw/main/images/slamAI-istanbulCanyon.png',
    'vital-ai': 'https://github.com/muhkartal/vitalAI-healthTracking/raw/main/img/page1.png'
  };

  const cardItems: CardItem[] = projects.map(project => ({
    id: project.id,
    content: (
      <div className="relative w-full h-full group bg-[#090909]">
        {/* Full Image - Removed zoom animation */}
        <img 
          src={projectImages[project.id]} 
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/800x600/111/333?text=${project.title}`;
          }}
        />
        
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-80" />
        
        {/* Minimal Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300 group-hover:-translate-y-2">
           <div className="text-white/50 text-[10px] font-mono tracking-widest mb-3 uppercase border-l-2 border-white/20 pl-2">
             Project {String(projects.indexOf(project) + 1).padStart(2, '0')}
           </div>
           <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-mono tracking-tight shadow-black drop-shadow-lg">
             {project.title}
           </h3>
           <p className="text-white/70 text-sm font-mono line-clamp-2 max-w-xl drop-shadow-md">
             {project.description}
           </p>
        </div>
      </div>
    )
  }));

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <div className="space-y-8 font-mono text-sm sm:text-base pb-12">
      {/* File List View */}
      <div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#a9a9a9] mb-6"
        >
          <span className="text-green-500">➜</span> <span className="text-blue-400">~</span> ls -la ./projects
          <div className="mt-2 text-xs opacity-50 grid grid-cols-[100px_60px_80px_1fr] gap-4 border-b border-[#a9a9a9]/20 pb-2 mb-2">
            <span>PERMISSIONS</span>
            <span>SIZE</span>
            <span>DATE</span>
            <span>NAME</span>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="space-y-1"
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              className="group"
            >
              <div className="hidden sm:grid grid-cols-[100px_60px_80px_1fr] gap-4 items-baseline hover:bg-[#a9a9a9]/10 p-1 rounded transition-colors cursor-default">
                <span className="text-[#a9a9a9]/60 text-xs">{project.permissions}</span>
                <span className="text-[#a9a9a9]/60 text-xs">{project.size}</span>
                <span className="text-[#a9a9a9]/60 text-xs">{project.date}</span>
                <div>
                  <span className="text-blue-400 font-bold group-hover:underline decoration-blue-400/50 underline-offset-4">
                    {project.title}
                  </span>
                  <div className="mt-1 text-[#a9a9a9] opacity-80 text-sm pl-0">
                     {project.description}
                  </div>
                </div>
              </div>

              <div className="sm:hidden flex flex-col gap-1 mb-4 border-l-2 border-[#a9a9a9]/20 pl-3 py-1">
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-bold">{project.title}/</span>
                  <span className="text-[#a9a9a9]/40 text-xs">{project.date}</span>
                </div>
                <p className="text-[#a9a9a9] text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Visual Deck View */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
        className="pt-16 border-t border-[#a9a9a9]/10"
      >
        <div className="text-[#a9a9a9] mb-12 text-center sm:text-left flex items-center gap-4">
          <span className="text-green-500">➜</span> 
          <span className="text-blue-400">~</span> 
          <span>./launch_preview.sh --fullscreen</span>
          <span className="text-xs px-2 py-0.5 rounded bg-green-900/30 text-green-400 border border-green-500/20 animate-pulse">LIVE</span>
        </div>
        
        <div className="w-full flex justify-center">
           <ThreeDCardStack 
             items={cardItems} 
             onScrollEnd={() => onNavigate('contact')}
           />
        </div>
      </motion.div>
    </div>
  );
}

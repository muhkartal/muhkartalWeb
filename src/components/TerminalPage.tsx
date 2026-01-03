import { useState } from 'react';
import { TerminalLayout } from './terminal/TerminalLayout';
import { TerminalAbout } from './terminal/sections/TerminalAbout';
import { TerminalProjects } from './terminal/sections/TerminalProjects';
import { TerminalExperience } from './terminal/sections/TerminalExperience';
import { Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';

export function TerminalPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const handleCommand = (command: string) => {
    setCommandHistory(prev => [...prev, command]);
    
    const cmd = command.toLowerCase().trim();
    
    // Navigation commands
    if (cmd === 'home' || cmd === 'cd ~') {
      setActiveSection('home');
    } else if (cmd === 'about' || cmd === 'cd about') {
      setActiveSection('about');
    } else if (cmd === 'experience' || cmd === 'cd experience') {
      setActiveSection('experience');
    } else if (cmd === 'projects' || cmd === 'cd projects') {
      setActiveSection('projects');
    } else if (cmd === 'contact' || cmd === 'cd contact') {
      setActiveSection('contact');
    }
    // Help command
    else if (cmd === 'help' || cmd === 'ls') {
      // Show available commands in console
      console.log('Available commands: home, about, experience, projects, contact, help');
    }
  };

  const renderSection = () => {
    const itemVariants = {
      initial: { opacity: 0, y: 10, filter: 'blur(5px)' },
      animate: { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: { duration: 0.3 } 
      }
    };

    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="text-[#a9a9a9]">
                <span className="opacity-50">$</span> cat welcome.txt
              </div>
              <div className="pl-4 border-l-2 border-[#a9a9a9]/30 space-y-4 text-[#a9a9a9] max-w-6xl">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Muhammed Kartal
                </div>
                <div className="text-base opacity-80">
                  <span className="text-white">full-stack.</span> <span className="opacity-70">app</span> <span className="text-white">&#123;developer&#125;</span>
                </div>
                <p className="leading-relaxed text-sm">
                  I am a Software Engineer and Full-Stack Developer passionate about building high-performance, scalable applications. 
                  My expertise spans from architecting complex backend systems with <span className="text-white">Node.js</span> and <span className="text-white">Python</span> to crafting immersive frontend experiences using <span className="text-white">React</span> and <span className="text-white">WebGL</span>.
                </p>
                <p className="leading-relaxed text-sm opacity-90">
                  Driven by curiosity and innovation, I constantly push the boundaries of system design and AI integration. 
                  <span className="text-white block mt-2">Feel free to reach out for collaborations or to discuss the latest in tech.</span>
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-[#a9a9a9] mt-8">
              <span className="opacity-50">$</span> echo "Available commands: home, about, projects, contact, help"
            </motion.div>
          </div>
        );
      
      case 'about':
        return <TerminalAbout />;
      
      case 'experience':
        return <TerminalExperience />;
      
      case 'projects':
        return <TerminalProjects onNavigate={handleNavigate} />;
      
      case 'contact':
        return (
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="text-[#a9a9a9]">
                <span className="opacity-50">$</span> cat contact_info.txt
              </div>
              <div className="pl-4 border-l-2 border-[#a9a9a9]/30 space-y-4 text-[#a9a9a9]">
                <p className="max-w-2xl">
                  I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-[#a9a9a9] mt-8">
              <span className="opacity-50">$</span> ls ./contact/
            </motion.div>

            <motion.div variants={itemVariants} className="pl-4 space-y-4">
              <a 
                href="mailto:muhammed@muhkartal.dev" 
                className="flex items-center gap-3 text-[#a9a9a9] hover:text-white transition-colors duration-200 group w-fit"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-mono">muhammed@muhkartal.dev</span>
              </a>
              
              <a 
                href="https://github.com/muhkartal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#a9a9a9] hover:text-white transition-colors duration-200 group w-fit"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-mono">github.com/muhkartal</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/muhkartal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#a9a9a9] hover:text-white transition-colors duration-200 group w-fit"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-mono">linkedin.com/in/muhkartal</span>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="text-[#a9a9a9] mt-8 text-sm opacity-70">
              <span className="opacity-50">$</span> echo "Feel free to reach out through any of these channels"
            </motion.div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <TerminalLayout
      activeSection={activeSection}
      onNavigate={handleNavigate}
      onCommand={handleCommand}
      commandHistory={commandHistory}
    >
      {renderSection()}
    </TerminalLayout>
  );
}

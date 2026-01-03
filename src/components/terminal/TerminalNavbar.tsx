import React from 'react';
import { motion } from 'motion/react';

interface TerminalNavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function TerminalNavbar({ activeSection, onNavigate }: TerminalNavbarProps) {
  const navItems = [
    { id: 'home', label: 'home' },
    { id: 'about', label: 'about' },
    { id: 'experience', label: 'experience' },
    { id: 'projects', label: 'projects' },
    { id: 'contact', label: 'contact' }
  ];

  const currentPath = activeSection === 'home' ? '~' : `~/${activeSection}`;

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="flex justify-between items-center text-sm sm:text-base opacity-70">
        <div>guest@muhkartal.dev:{currentPath}$ <span className="animate-pulse">_</span></div>
        <div>v2.0.0-terminal</div>
      </div>
      
      <nav className="flex flex-wrap gap-x-6 gap-y-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative px-2 py-1 transition-colors duration-200"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#a9a9a9] -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={`${isActive ? 'text-black font-bold' : 'text-[#a9a9a9] hover:text-white'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}


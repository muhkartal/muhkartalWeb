import React from 'react';
import { motion } from 'motion/react';

export function TerminalAbout() {
  const itemVariants = {
    initial: { opacity: 0, y: 10, filter: 'blur(5px)' },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.3 } 
    }
  };

  return (
    <div className="space-y-4">
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="text-[#a9a9a9]">
          <span className="opacity-50">$</span> cat about.txt
        </div>
        <div className="pl-4 border-l-2 border-[#a9a9a9]/30 space-y-4 max-w-3xl text-[#a9a9a9]">
          <p>
            Software Engineer and Haliç University graduate with a strong foundation in leadership and innovation.
          </p>
          <p>
            As the former Lead of Google Developer Student Clubs (GDSC) and Team Leader of the Altair Team 
            (Teknofest 2025 UAV Competition), I specialize in uniting technology enthusiasts and driving complex 
            projects to success.
          </p>
          <p>
            Passionate about system architecture, continuous learning, and making a tangible impact in the tech world.
          </p>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-8 text-[#a9a9a9]">
        <span className="opacity-50">$</span> ls -la skills/
      </motion.div>
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-4 text-[#a9a9a9]">
        <div>
          <div className="text-white mb-2">Languages</div>
          <ul className="list-disc pl-5 opacity-80">
            <li>TypeScript / JavaScript</li>
            <li>Python</li>
            <li>C#</li>
            <li>SQL</li>
          </ul>
        </div>
        <div>
          <div className="text-white mb-2">Frontend</div>
          <ul className="list-disc pl-5 opacity-80">
            <li>React / Next.js</li>
            <li>Tailwind CSS</li>
            <li>Three.js / WebGL</li>
            <li>HTML5 / CSS3</li>
          </ul>
        </div>
        <div>
          <div className="text-white mb-2">Backend & Tools</div>
          <ul className="list-disc pl-5 opacity-80">
            <li>Node.js</li>
            <li>PostgreSQL</li>
            <li>Docker / Git</li>
            <li>AWS / Cloud</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}


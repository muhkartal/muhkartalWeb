import React from 'react';
import { motion } from 'motion/react';

export function TerminalExperience() {
  const experiences = [
    {
      role: 'Software Engineer',
      company: 'İstanbul Esenyurt Üniversitesi',
      type: 'Full-time',
      period: 'Sep 2025 - Present',
      location: 'Esenyurt/İstanbul',
      details: [
        'Developing and maintaining university systems & web applications.',
        'Contributing to digital transformation of academic/admin processes.',
        'Ensuring high performance and scalability.',
        'Stack: React, TypeScript, Node.js, PostgreSQL, REST APIs'
      ]
    },
    {
      role: 'AI Engineer Intern',
      company: 'BLUESENSE',
      type: 'Internship',
      period: 'Jun 2025 - Aug 2025',
      location: 'Vancouver, Canada (Remote)',
      details: [
        'Developed new features and APIs for cloud sensor-analytics platform.',
        'Automated testing & deployment pipelines.',
        'Presented ML research insights to engineering team.',
        'Stack: Python, Machine Learning, Cloud Computing, Automation'
      ]
    },
    {
      role: 'Software Engineer Intern',
      company: 'Halic Universitesi',
      type: 'Part-time',
      period: 'Jun 2024 - Jun 2025',
      location: 'Istanbul, Turkey',
      details: [
        'Developed administrative web systems.',
        'Focused on UI/UX and performance improvements.',
        'Stack: JavaScript, React, Web Development'
      ]
    }
  ];

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
    <div className="font-mono text-sm sm:text-base space-y-12 pb-12">
      {/* Work Experience */}
      <div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#a9a9a9] mb-6"
        >
          <span className="text-white">➜</span> <span className="text-blue-400">~</span> cat experience.log | grep "WORK" -A 20
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="space-y-10 pl-0 sm:pl-2"
        >
          {experiences.map((exp, i) => (
            <motion.div key={i} variants={itemVariants} className="relative group">
               {/* Timeline Line */}
               <div className="absolute left-0 top-8 bottom-0 w-[1px] bg-[#a9a9a9]/10 group-last:hidden sm:left-[-1rem]"></div>
               
               <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                 <div>
                   <span className="text-white font-bold text-lg">{exp.role}</span>
                   <span className="text-[#a9a9a9] mx-2">@</span>
                   <span className="text-blue-400 font-semibold">{exp.company}</span>
                 </div>
                 <div className="text-[#a9a9a9]/60 text-xs sm:text-sm font-mono mt-1 sm:mt-0">
                   [{exp.period}]
                 </div>
               </div>

               <div className="flex items-center gap-2 mb-4 text-xs text-[#a9a9a9]/50 uppercase tracking-wider">
                 <span>{exp.type}</span>
                 <span>•</span>
                 <span>{exp.location}</span>
               </div>

               <ul className="list-none space-y-2 text-[#a9a9a9] opacity-90 pl-2 border-l border-[#a9a9a9]/20 ml-1">
                 {exp.details.map((detail, idx) => (
                   <li key={idx} className="flex items-start">
                     <span className="mr-2 opacity-50 text-white">➜</span>
                     <span>{detail}</span>
                   </li>
                 ))}
               </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Spacer to allow comfortable scrolling */}
      <div className="h-12 w-full text-center text-[#a9a9a9]/20 text-xs py-4">
        -- End of Log --
      </div>
    </div>
  );
}

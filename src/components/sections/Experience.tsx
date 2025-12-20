import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

function ExperienceItem({ title, company, period, description, technologies, isExpanded, onToggle }: ExperienceItemProps) {
  return (
    <div className="space-y-3 sm:space-y-4 sm:group-hover:translate-x-1 transition-transform duration-300">
      {}
      <div className="sm:hidden border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 space-y-3 bg-white dark:bg-black transition-colors duration-300">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-1">
            <h3 className="text-black dark:text-white transition-colors duration-300">
              {title}
            </h3>
            <div 
              className="text-neutral-600 dark:text-neutral-400 tracking-wide transition-colors duration-300"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '13px' }}
            >
              {company}
            </div>
          </div>
          <div 
            className="text-neutral-500 dark:text-neutral-400 tracking-wide transition-colors duration-300 text-xs whitespace-nowrap"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
          >
            {period}
          </div>
        </div>
        
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed transition-colors duration-300 text-sm">
          {description}
        </p>
        
        <div 
          className="flex flex-wrap gap-2 text-neutral-500 dark:text-neutral-400 transition-colors duration-300 pt-2 border-t border-neutral-100 dark:border-neutral-800"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '11px' }}
        >
          {technologies.map((tech, index) => (
            <span key={tech} className="px-2 py-1 rounded bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {}
      <div className="hidden sm:block space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div 
              className="text-neutral-500 dark:text-neutral-400 tracking-wide transition-colors duration-300 text-[13px]"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
            >
              {period}
            </div>
          </div>
          <button
            onClick={onToggle}
            className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 text-[13px] flex items-center gap-1.5 whitespace-nowrap"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
          >
            {isExpanded ? 'Hide Details' : 'View Details'}
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
        
        <h3 className="text-black dark:text-white transition-colors duration-300">
          {title}
        </h3>
        <div 
          className="text-neutral-600 dark:text-neutral-400 tracking-wide transition-colors duration-300 text-[14px]"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
        >
          {company}
        </div>
        
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed transition-colors duration-300 pt-2">
          {description}
        </p>
        
        <div 
          className="flex flex-wrap gap-x-3 gap-y-2 text-neutral-500 dark:text-neutral-400 transition-colors duration-300 text-[13px] pt-1"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
        >
          {technologies.map((tech, index) => (
            <span key={tech} className="flex items-center gap-3">
              <span className="hover:text-black dark:hover:text-white transition-colors duration-300 cursor-default">
                {tech}
              </span>
              {index < technologies.length - 1 && (
                <span className="text-neutral-300 dark:text-neutral-600">•</span>
              )}
            </span>
          ))}
        </div>
        
        {isExpanded && (
          <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-3">
            <div 
              className="text-neutral-600 dark:text-neutral-400 text-[13px]"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
            >
              Key Achievements:
            </div>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm list-none">
              <li className="flex gap-2">
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span>Designed and implemented scalable architecture patterns</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span>Collaborated with cross-functional teams on product roadmap</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400 dark:text-neutral-600">•</span>
                <span>Established best practices and code review standards</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function Experience() {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'İstanbul Esenyurt Üniversitesi · Full-time',
      period: 'Sep 2025 - Present · 2 mos',
      description: 'Working on developing and maintaining university systems and web applications. Contributing to the digital transformation of academic and administrative processes while ensuring high performance and scalability. Location: Zafer, Adile Naşit Blv. No:1, 34510 Esenyurt/İstanbul · On-site',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Git']
    },
    {
      title: 'AI Engineer Intern',
      company: 'BLUESENSE · Full-time',
      period: 'Jun 2025 - Aug 2025 · 3 mos',
      description: 'Developing new features and APIs for Bluesense\'s cloud-based sensor-analytics platform, automating tests/deployments, and presenting ML research insights to the engineering team. Location: Vancouver, British Columbia, Canada · Remote',
      technologies: ['Python', 'Machine Learning', 'API Development', 'Cloud Computing', 'Automation', 'Testing']
    },
    {
      title: 'Software Engineer Intern',
      company: 'Halic Universitesi · Part-time',
      period: 'Jun 2024 - Jun 2025 · 1 yr 1 mo',
      description: 'Develop and maintain web applications for university administrative systems, focusing on performance and usability. Location: On-site',
      technologies: ['JavaScript', 'React', 'Web Development', 'Database Management', 'UI/UX']
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mb-8 sm:mb-12 md:mb-16">
        <h2 
          className="text-black dark:text-white transition-colors duration-300 mb-2"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
        >
          Work Experience
        </h2>
        <div className="h-px w-12 sm:w-16 bg-black dark:bg-white"></div>
      </div>
      
      <div className="space-y-6 sm:space-y-12 md:space-y-14 lg:space-y-16">
        {experiences.map((exp, index) => (
          <div key={index} className="group relative">
            {}
            <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-black dark:bg-white hidden sm:block group-hover:scale-150 transition-transform duration-300"></div>
            
            {}
            {index !== experiences.length - 1 && (
              <div className="absolute left-1 top-12 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>
            )}
            
            {}
            <div className="sm:pl-6 md:pl-8">
              <ExperienceItem 
                {...exp} 
                isExpanded={expandedItems.includes(index)}
                onToggle={() => toggleExpanded(index)}
              />
            </div>
          </div>
        ))}
      </div>
      
      {}
      <motion.div 
        className="flex justify-center mt-12 sm:mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.button
          onClick={() => navigate('/experience')}
          className="relative px-8 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 overflow-hidden group"
          style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '12px' }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {}
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
          
          {}
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-neutral-400 dark:border-neutral-500" />
          
          {}
          <span className="relative z-10 flex items-center gap-2">
            View Experience Gallery
            <ExternalLink size={14} className="text-neutral-700 dark:text-neutral-300" />
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

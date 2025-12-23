import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

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
    <motion.div 
      className="space-y-3 sm:space-y-4 sm:group-hover:translate-x-1 transition-transform duration-300"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
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
        
        <p 
          className="text-neutral-700 dark:text-neutral-300 leading-relaxed transition-colors duration-300 text-sm"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        
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
        
        <p 
          className="text-neutral-700 dark:text-neutral-300 leading-relaxed transition-colors duration-300 pt-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        
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
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="text-neutral-600 dark:text-neutral-400 text-[13px]"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
              >
                Key Achievements:
              </div>
              <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm list-none">
                <li className="flex gap-2">
                  <span className="text-neutral-400 dark:text-neutral-600">•</span>
                  <span>Designed and implemented <span className="font-semibold text-neutral-900 dark:text-neutral-100">scalable architecture patterns</span></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400 dark:text-neutral-600">•</span>
                  <span>Collaborated with <span className="font-semibold text-neutral-900 dark:text-neutral-100">cross-functional teams</span> on product roadmap</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-neutral-400 dark:text-neutral-600">•</span>
                  <span>Established <span className="font-semibold text-neutral-900 dark:text-neutral-100">best practices</span> and <span className="font-semibold text-neutral-900 dark:text-neutral-100">code review standards</span></span>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function AboutAndExperience() {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  
  const experiences = [
    {
      title: 'Software Engineer',
      company: 'İstanbul Esenyurt Üniversitesi · Full-time',
      period: 'Sep 2025 - Present · 2 mos',
      description: 'Working on <span class="font-semibold text-neutral-900 dark:text-neutral-100">developing and maintaining university systems</span> and web applications. Contributing to the <span class="font-semibold text-neutral-900 dark:text-neutral-100">digital transformation</span> of academic and administrative processes while ensuring <span class="font-semibold text-neutral-900 dark:text-neutral-100">high performance</span> and <span class="font-semibold text-neutral-900 dark:text-neutral-100">scalability</span>. Location: Zafer, Adile Naşit Blv. No:1, 34510 Esenyurt/İstanbul · On-site',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST APIs', 'Git']
    },
    {
      title: 'AI Engineer Intern',
      company: 'BLUESENSE · Intern',
      period: 'Jun 2025 - Aug 2025 · 3 mos',
      description: 'Developing <span class="font-semibold text-neutral-900 dark:text-neutral-100">new features and APIs</span> for Bluesense\'s <span class="font-semibold text-neutral-900 dark:text-neutral-100">cloud-based sensor-analytics platform</span>, <span class="font-semibold text-neutral-900 dark:text-neutral-100">automating tests/deployments</span>, and presenting <span class="font-semibold text-neutral-900 dark:text-neutral-100">ML research insights</span> to the engineering team. Location: Vancouver, British Columbia, Canada · Remote',
      technologies: ['Python', 'Machine Learning', 'API Development', 'Cloud Computing', 'Automation', 'Testing']
    },
    {
      title: 'Software Engineer Intern',
      company: 'Halic Universitesi · Intern',
      period: 'Jun 2024 - Jun 2025 · 1 yr 1 mo',
      description: 'Develop and maintain <span class="font-semibold text-neutral-900 dark:text-neutral-100">web applications</span> for university administrative systems, focusing on <span class="font-semibold text-neutral-900 dark:text-neutral-100">performance</span> and <span class="font-semibold text-neutral-900 dark:text-neutral-100">usability</span>. Location: On-site',
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
      {}
      <motion.div 
        className="mb-12 sm:mb-16 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 sm:mb-8">
          <h2 
            className="text-black dark:text-white transition-colors duration-300 mb-2"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
          >
            About
          </h2>
          <motion.div 
            className="h-px w-12 sm:w-16 bg-black dark:bg-white"
            initial={{ width: 0 }}
            whileInView={{ width: '3rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
        </div>
        <motion.p 
          className="text-neutral-700 dark:text-neutral-300 leading-relaxed transition-colors duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Software Engineer and Haliç University graduate with a strong foundation in <span className="font-semibold text-neutral-900 dark:text-neutral-100">leadership and innovation</span>. As the former Lead of <span className="font-semibold text-neutral-900 dark:text-neutral-100">Google Developer Student Clubs (GDSC)</span> and Team Leader of the <span className="font-semibold text-neutral-900 dark:text-neutral-100">Altair Team (Teknofest 2025 UAV Competition)</span>, I specialize in uniting technology enthusiasts and driving complex projects to success. Passionate about <span className="font-semibold text-neutral-900 dark:text-neutral-100">system architecture</span>, continuous learning, and making a tangible impact in the tech world.
        </motion.p>
      </motion.div>

      {}
      <div>
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
            Work Experience
          </h2>
          <motion.div 
            className="h-px w-12 sm:w-16 bg-black dark:bg-white"
            initial={{ width: 0 }}
            whileInView={{ width: '3rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
        </motion.div>
        
        <div className="space-y-6 sm:space-y-12 md:space-y-14 lg:space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className="group relative">
              {}
              <motion.div 
                className="absolute left-0 top-2 w-2 h-2 rounded-full bg-black dark:bg-white hidden sm:block group-hover:scale-150 transition-transform duration-300"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              ></motion.div>
              
              {}
              {index !== experiences.length - 1 && (
                <motion.div 
                  className="absolute left-1 top-12 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block"
                  initial={{ scaleY: 0, originY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                ></motion.div>
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
          className="mt-8 sm:mt-12 md:mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
    </div>
  );
}

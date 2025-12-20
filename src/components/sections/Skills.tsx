import { Badge } from './ui/badge';

interface SkillCategoryProps {
  category: string;
  skills: string[];
}

function SkillCategory({ category, skills }: SkillCategoryProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-black dark:text-white transition-colors duration-300">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge 
            key={skill} 
            variant="secondary" 
            className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 transition-colors duration-300"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const skillCategories = [
    {
      category: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Go', 'SQL']
    },
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS', 'Redux']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL']
    },
    {
      category: 'DevOps & Tools',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD', 'Linux']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <h2 className="text-black dark:text-white mb-6 sm:mb-8 transition-colors duration-300">Skills</h2>
      <div className="space-y-5 sm:space-y-6">
        {skillCategories.map((category, index) => (
          <SkillCategory key={index} {...category} />
        ))}
      </div>
    </div>
  );
}

interface EducationItemProps {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

function EducationItem({ degree, institution, period, details }: EducationItemProps) {
  return (
    <div className="space-y-2">
      <div>
        <h3 className="text-black dark:text-white transition-colors duration-300">{degree}</h3>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="text-neutral-700 dark:text-neutral-300 transition-colors duration-300">{institution}</span>
          <span className="text-neutral-400 dark:text-neutral-500 transition-colors duration-300">•</span>
          <span className="text-neutral-500 dark:text-neutral-400 transition-colors duration-300">{period}</span>
        </div>
      </div>
      {details && (
        <p className="text-neutral-700 dark:text-neutral-300 transition-colors duration-300">{details}</p>
      )}
    </div>
  );
}

export function Education() {
  const education = [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      period: '2014 - 2016',
      details: 'Focus on Distributed Systems and Machine Learning. GPA: 3.9/4.0'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'UC Berkeley',
      period: '2010 - 2014',
      details: 'Graduated with Honors. Relevant coursework: Data Structures, Algorithms, Software Engineering'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <h2 className="text-black dark:text-white mb-6 sm:mb-8 transition-colors duration-300">Education</h2>
      <div className="space-y-6 sm:space-y-8">
        {education.map((edu, index) => (
          <EducationItem key={index} {...edu} />
        ))}
      </div>
    </div>
  );
}

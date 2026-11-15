export const profile = {
  name: 'Muhammed Kartal',
  role: 'Software Engineer · Computer Vision & Full-Stack',
  location: 'İstanbul',
  timeZone: 'Europe/Istanbul',
  avatar: '/avatar.jpg',
  email: 'muhammed@muhkartal.dev',
  socials: [
    { label: 'GitHub', handle: 'github.com/muhkartal', href: 'https://github.com/muhkartal' },
    { label: 'LinkedIn', handle: 'linkedin.com/in/muhkartal', href: 'https://linkedin.com/in/muhkartal' },
    { label: 'Email', handle: 'muhammed@muhkartal.dev', href: 'mailto:muhammed@muhkartal.dev' },
  ],
};

export type Experience = {
  role: string;
  company: string;
  type: string;
  location: string;
  years: string;
  current?: boolean;
};

export const experience: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'İstanbul Esenyurt Üniversitesi',
    type: 'Full-time',
    location: 'İstanbul',
    years: '2025 – Now',
    current: true,
  },
  {
    role: 'AI Engineer Intern',
    company: 'BLUESENSE',
    type: 'Internship',
    location: 'Vancouver, Canada · Remote',
    years: '2025',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Haliç Üniversitesi',
    type: 'Part-time',
    location: 'İstanbul',
    years: '2024 – 2025',
  },
];

export type Project = {
  title: string;
  date: string;
  description: string;
  stack: string[];
  /** Public link. Work projects in private repos have none. */
  href?: string;
  /** Headline number shown as a badge, e.g. "5,000+ users". */
  stat?: string;
  /** Screenshot shown on hover in the project list (desktop). */
  image?: string;
};

export const featured = {
  title: 'koi-pond',
  year: '2026',
  description:
    'Koi swimming in a jade pond, drawn live in coloured ASCII. Stir the water, feed the koi.',
  stack: ['HTML', 'Canvas 2D', 'Generative ASCII'],
  href: 'https://muhkartal.github.io/koi-pond/',
  image: '/projects/koi-pond.webp',
  embed: 'https://muhkartal.github.io/koi-pond/?font=8&ks=1.8',
  alt: 'Koi pond drawn in coloured ASCII characters',
};

export const projects: Project[] = [
  {
    title: 'Çözüm Merkezi',
    date: 'Sep 2026',
    stat: '15,000+ users',
    description:
      'The university feedback portal: requests and complaints tracked by reference code and handled from a staff portal with SSO.',
    stack: ['Next.js', 'TypeScript', 'SQL Server', 'SSO'],
    href: 'https://cozummerkezi.esenyurt.edu.tr',
    image: '/projects/cozum-merkezi.webp',
  },
  {
    title: 'Active Directory automation',
    date: 'Mar 2026',
    stat: '20,000+ accounts',
    description:
      'Keeps Windows Active Directory in sync with student and staff records: accounts, OU placement and groups, fully automated.',
    stack: ['.NET 8', 'PostgreSQL', 'Active Directory'],
    image: '/projects/ad-automation.webp',
  },
  {
    title: 'Integration layer',
    date: 'Dec 2025',
    stat: '20,000+ records',
    description:
      'One API over five university data sources (YÖKSİS, MERNİS, OBS, Canias ERP, Proliz), keeping student and staff records in sync.',
    stack: ['C#', '.NET', 'Hangfire'],
    image: '/projects/integration.webp',
  },
  {
    title: 'Esenyurt Mobil',
    date: 'Oct 2025',
    stat: '5,000+ users',
    description:
      'The university mobile app: courses, campus map, digital student ID and services, in Turkish and English.',
    stack: ['React Native', 'Expo', 'TypeScript'],
    image: '/projects/esenyurt-mobil.webp',
  },
  {
    title: 'slam-ai',
    date: 'Feb 2025',
    description: 'Autonomous navigation system with ROS integration, SLAM and sensor fusion.',
    stack: ['Python', 'ROS', 'C++', 'OpenCV'],
    href: 'https://github.com/muhkartal/slamAI-istanbulCanyon',
    image: 'https://github.com/muhkartal/slamAI-istanbulCanyon/raw/main/images/slamAI-istanbulCanyon.png',
  },
  {
    title: 'poke-coach',
    date: 'Jan 2025',
    description:
      'Multiplayer battle platform with AI advisory, built on WebSockets, microservices and Prometheus.',
    stack: ['Node.js', 'Socket.IO', 'Python', 'Redis'],
    href: 'https://github.com/muhkartal/pokeCoach-AI-Coach',
    image: 'https://github.com/muhkartal/pokeCoach-AI-Coach/raw/main/images/1.png',
  },
];

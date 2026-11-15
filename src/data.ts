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
  href: string;
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
    title: 'vital-ai',
    date: 'Mar 2025',
    description:
      'AI health assistant with symptom analysis, an NLP engine and medical literature integration.',
    stack: ['Python', 'TensorFlow', 'OpenAI', 'Streamlit'],
    href: 'https://github.com/muhkartal/vitalAI-healthTracking',
    image: 'https://github.com/muhkartal/vitalAI-healthTracking/raw/main/img/page1.png',
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
  {
    title: 'fr-framework',
    date: 'Dec 2024',
    description:
      'Modular face recognition framework with 68-point landmark detection, HOG/CNN models and a REST API.',
    stack: ['Python', 'OpenCV', 'FastAPI', 'Docker'],
    href: 'https://github.com/muhkartal/fr-framework',
    image: 'https://raw.githubusercontent.com/muhkartal/fr-framework/main/images/fr-light.png',
  },
  {
    title: 'webgl-cosmic',
    date: 'Nov 2024',
    description: 'GPU-accelerated 3D fractal simulations using ray-marching and custom GLSL shaders.',
    stack: ['WebGL 2.0', 'GLSL', 'JavaScript'],
    href: 'https://github.com/muhkartal/webGL-cosmicVisualizations',
    image: 'https://github.com/muhkartal/webGL-cosmicVisualizations/raw/main/fig/particles-light.png',
  },
  {
    title: 'llm-verifier',
    date: 'Oct 2024',
    description:
      'LLM output verification system with hallucination detection and fact-checking pipelines.',
    stack: ['Python', 'LangChain', 'PostgreSQL'],
    href: 'https://github.com/muhkartal/llm-outputVerifier',
    image: 'https://github.com/muhkartal/llm-outputVerifier/raw/main/images/llm-outputVerifier.png',
  },
];

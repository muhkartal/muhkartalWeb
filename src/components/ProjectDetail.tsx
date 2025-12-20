import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';
import { ImageWithFallback } from './ui/ImageWithFallback';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  year: string;
  keyFeatures?: string[];
  components?: { name: string; description: string }[];
  screenshots?: { url: string; caption: string }[];
}

const projectsData: Record<string, ProjectData> = {
  'fr-framework': {
    id: 'fr-framework',
    title: 'FR Framework',
    description: 'A comprehensive, modular face recognition framework offering everything from basic face detection to advanced facial analytics. Built with flexibility and performance in mind, providing a complete solution for facial recognition technology.',
    technologies: ['Python', 'OpenCV', 'dlib', 'FastAPI', 'Docker'],
    image: 'https://raw.githubusercontent.com/muhkartal/fr-framework/main/images/fr-light.png',
    githubUrl: 'https://github.com',
    year: '2024',
    keyFeatures: [
      'Modular architecture - use only the components you need',
      'Multiple detection models supporting both HOG (CPU) and CNN (GPU)',
      '68-point facial landmark detection and tracking',
      'Real-time processing with live camera feed integration',
      'REST API for easy integration with other applications',
      'Docker support for simple containerized deployment'
    ],
    components: [
      { name: 'fr-photo', description: 'Photo-based face detection and recognition' },
      { name: 'fr-landmark', description: '68-point facial landmark detection' },
      { name: 'fr-analyze', description: 'Face analysis with blur detection and pose estimation' },
      { name: 'fr-live', description: 'Real-time face recognition from camera feed' },
      { name: 'fr-video', description: 'Video processing with temporal face tracking' },
      { name: 'fr-system', description: 'Core system functionality and configuration' }
    ]
  },
  'sentinel-ai': {
    id: 'sentinel-ai',
    title: 'PokeCoach - Multiplayer Battle Platform',
    description: 'A modern multiplayer battle platform that brings together classic game mechanics with real-time web technology. Provides competitive turn-based battles through WebSocket communication, offering strategic depth with containerized microservices architecture.',
    technologies: ['Node.js', 'Socket.IO', 'Python', 'FastAPI', 'Docker'],
    image: 'https://images.unsplash.com/photo-1639803812104-749c0f7961cb?q=80&w=2000&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    year: '2025',
    keyFeatures: [
      'Real-time multiplayer battles with WebSocket communication and deterministic turn resolution',
      'Complete type system implementation with all 18 types and accurate effectiveness multipliers',
      'AI-powered strategic advisory system with move recommendations and risk assessment',
      'Interactive team building with comprehensive roster management and synergy analysis',
      'Sophisticated room management with chat, spectator support, and reconnection system',
      'Comprehensive monitoring with Prometheus metrics, Grafana dashboards, and automated testing'
    ],
    components: [
      { name: 'Battle Engine', description: 'Real-time turn-based combat with WebSocket synchronization' },
      { name: 'Team Builder', description: 'Strategic team composition with type coverage analysis' },
      { name: 'AI Coach', description: 'Intelligent move recommendations and outcome prediction' },
      { name: 'Room Manager', description: 'Multiplayer lobby system with chat integration' },
      { name: 'REST API', description: 'FastAPI service for battle statistics and metadata' },
      { name: 'Monitoring', description: 'Prometheus metrics and Grafana visualization' }
    ],
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1614294148960-9e740db8d370?q=80&w=2000&auto=format&fit=crop', caption: 'Battle Interface' },
      { url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop', caption: 'Team Builder' },
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop', caption: 'Analytics Dashboard' }
    ]
  },
  'webgl-cosmic-visualizations': {
    id: 'webgl-cosmic-visualizations',
    title: 'WebGL Cosmic Visualizations',
    description: 'An interactive 3D visualization project featuring WebGL-powered fractal and particle simulations rendered entirely in the browser. The project leverages GPU-accelerated rendering through WebGL and custom GLSL shaders to create mesmerizing cosmic landscapes and particle systems that respond to user interaction in real time, featuring high-performance 3D fractal and particle simulations.',
    technologies: ['WebGL 2.0', 'GLSL ES 3.0', 'JavaScript', 'Ray-marching', 'Transform Feedback', 'Curl Noise', 'CSS Grid', 'Flexbox'],
    image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=2000&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    year: '2024',
    keyFeatures: [
      'GPU-accelerated rendering through WebGL 2.0',
      'Custom GLSL shaders for visual effects and computations',
      'Interactive 3D Mandelbulb fractal with ray-marching techniques',
      'Fluid particle simulation with curl noise algorithms',
      'Real-time camera manipulation with mouse and keyboard',
      'Multiple visual presets (nebula, galaxy, stardust, energetic flow)',
      'Adaptive quality scaling based on device performance',
      'Temporal anti-aliasing for smoother visuals',
      'Level-of-detail rendering for complex fractals',
      'Instanced rendering for particle visualization',
      'Pure JavaScript with no external dependencies',
      'Responsive design using CSS Grid and Flexbox'
    ],
    components: [
      { name: 'Mandelbulb Explorer', description: '3D fractal visualization with adjustable parameters, advanced lighting, and animated transitions' },
      { name: 'Ray-marching Engine', description: 'Custom fragment shaders implementing distance field calculations for fractal rendering' },
      { name: 'Cosmic Particles', description: 'Galaxy formation with spiral arms and physically-inspired particle behavior' },
      { name: 'Curl Noise System', description: 'Fluid-like motion algorithms for beautiful cosmic effects' },
      { name: 'Camera Controller', description: 'Quaternion rotations for 3D camera control with mouse and keyboard' },
      { name: 'Performance Manager', description: 'Adaptive quality scaling, frustum culling, and texture-based lookup tables' },
      { name: 'Shader Pipeline', description: 'Vertex and fragment shaders for particle rendering and physics computation' },
      { name: 'UI Controls', description: 'Custom parameter adjustment interface with real-time visual updates' }
    ]
  },
  'llm-output-verifier': {
    id: 'llm-output-verifier',
    title: 'LLM Output Verifier',
    description: 'An enterprise-grade production-ready system that analyzes chain-of-thought (CoT) reasoning from large language models, scrutinizing each reasoning step to classify it as either grounded or hallucinated. The pipeline leverages the GSM8K (Grade School Math 8K) dataset, augmenting it with carefully designed synthetic corruptions to create high-quality training data, achieving 94.3% accuracy on benchmark datasets.',
    technologies: ['Python 3.9+', 'FastAPI', 'Streamlit', 'Transformers', 'PyTorch', 'Docker', 'Weights & Biases', 'Pydantic', 'GitHub Actions'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    year: '2024',
    keyFeatures: [
      'State-of-the-art transformer-based sequence classification',
      'Mixed-precision training and gradient checkpointing for efficiency',
      'Efficient vectorized data loading and processing',
      'Synthetic data augmentation techniques for robust training',
      'Clean, modular design with comprehensive type annotations',
      'Memory-efficient processing for large datasets',
      'Scalable FastAPI backend with Pydantic validation',
      'Intuitive Streamlit frontend with confidence-scored visualizations',
      'Fully dockerized with multi-stage builds',
      'Comprehensive CI/CD with GitHub Actions and 95%+ test coverage',
      'Experiment tracking with Weights & Biases integration',
      '94.3% accuracy on benchmark hallucination detection tasks'
    ],
    components: [
      { name: 'Data Augmentation', description: 'Synthetic corruption techniques for training data generation' },
      { name: 'Dataset Handler', description: 'Dataset class with efficient dataloader creation' },
      { name: 'Hallucination Classifier', description: 'Transformer-based architecture for sequence classification' },
      { name: 'Training Pipeline', description: 'Main training loop with metrics tracking and optimization' },
      { name: 'Evaluation Framework', description: 'Classification metrics and result visualization' },
      { name: 'Inference Engine', description: 'Prediction logic for analyzing reasoning chains' },
      { name: 'FastAPI Backend', description: 'RESTful API with health checks and batch processing' },
      { name: 'Streamlit UI', description: 'Interactive web interface with color-coded confidence scoring' }
    ]
  },
  'slam-ai-istanbul': {
    id: 'slam-ai-istanbul',
    title: 'SLAM AI - Istanbul Canyon',
    description: 'Enhancing drone Visual Odometry/SLAM robustness in simulated İstanbul urban canyons. This project improves Visual SLAM algorithms for drone navigation in challenging urban environments using machine learning techniques to enhance feature detection, description, and loop closure under difficult conditions like poor lighting, textureless surfaces, and GPS-denied environments.',
    technologies: ['Python', 'PyTorch', 'AirSim', 'ORB-SLAM3', 'OpenCV', 'CUDA', 'NumPy', 'TensorBoard'],
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2000&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    year: '2023',
    keyFeatures: [
      'Realistic İstanbul urban canyon simulation using AirSim',
      'ML-enhanced SLAM with neural network augmentation',
      'Feature Enhancement Network for improved visibility in challenging lighting',
      'Deep Loop Closure Detection for robust place recognition',
      'Robust Patch Descriptor Network for better feature matching',
      'Comprehensive evaluation framework with ATE, RPE metrics',
      'Support for multiple SLAM algorithms (ORB-SLAM3, DSO, SVO)',
      '50% improvement in tracking accuracy over baseline SLAM'
    ],
    components: [
      { name: 'AirSim Setup', description: 'Detailed Istanbul urban canyon environment configuration' },
      { name: 'Feature Enhancement Network', description: 'CNN-based image enhancement for challenging lighting' },
      { name: 'Loop Closure Detection', description: 'Deep learning for robust place recognition' },
      { name: 'Patch Descriptor Network', description: 'ML-generated descriptors for feature matching' },
      { name: 'SLAM Integration', description: 'Integration layer for ML models with SLAM algorithms' },
      { name: 'Evaluation Framework', description: 'Quantitative comparison metrics and visualization' }
    ]
  },
  'vital-ai-health': {
    id: 'vital-ai-health',
    title: 'VitalAI - Health Tracking',
    description: 'A state-of-the-art personal health assistant powered by artificial intelligence and machine learning. Provides comprehensive symptom analysis, identifies potential medical conditions, uncovers health patterns, and delivers personalized insights through an intuitive interface.',
    technologies: ['Python', 'Streamlit', 'TensorFlow', 'OpenAI API', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop',
    githubUrl: 'https://github.com',
    year: '2025',
    keyFeatures: [
      'Multi-modal symptom input via structured selection, natural language, or voice recognition',
      'Advanced AI pattern recognition for identifying complex symptom patterns',
      'Interactive health dashboard with dynamic visualizations and correlation analysis',
      'Natural language processing engine for nuanced health discussions',
      'Medical literature integration with real-time research synthesis',
      'Comprehensive health timeline with progression analysis and pattern intelligence'
    ],
    components: [
      { name: 'Symptom Analyzer', description: 'AI-powered analysis with personalized risk stratification' },
      { name: 'Health Dashboard', description: 'Interactive visualizations and multi-dimensional correlation analysis' },
      { name: 'AI Assistant', description: 'Natural language interface with medical entity recognition' },
      { name: 'Medical Literature', description: 'Dynamic research synthesis and personalized recommendations' },
      { name: 'Health Tracking', description: 'Chronological timeline with progression analysis' },
      { name: 'User Profile', description: 'Comprehensive health profile and preference management' }
    ]
  }
};

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  if (!projectId || !projectsData[projectId]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-black dark:text-white mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '13px' }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const project = projectsData[projectId];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '13px' }}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </motion.button>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300" 
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        
        {/* Hero Image */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Image Container */}
          <div 
            className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden mb-8 group"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Mouse Spotlight */}
            {isHovered && (
              <div 
                className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(128, 128, 128, 0.2) 0%, transparent 50%)`,
                  opacity: isHovered ? 1 : 0,
                }}
              />
            )}

            {/* Dark Mode Spotlight */}
            {isHovered && (
              <div 
                className="absolute inset-0 pointer-events-none z-10 opacity-0 dark:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(200, 200, 200, 0.15) 0%, transparent 50%)`,
                  opacity: isHovered ? 1 : 0,
                }}
              />
            )}

            {/* Background Gradient Animation */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(150, 150, 150, 0.3) 0%, rgba(100, 100, 100, 0.2) 100%)',
                  'linear-gradient(225deg, rgba(150, 150, 150, 0.3) 0%, rgba(100, 100, 100, 0.2) 100%)',
                  'linear-gradient(315deg, rgba(150, 150, 150, 0.3) 0%, rgba(100, 100, 100, 0.2) 100%)',
                  'linear-gradient(135deg, rgba(150, 150, 150, 0.3) 0%, rgba(100, 100, 100, 0.2) 100%)',
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-black/50 to-transparent" />
            <ImageWithFallback 
              src={project.image} 
              alt={project.title}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Year */}
          <div 
            className="text-neutral-500 dark:text-neutral-500 mb-3"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '12px', letterSpacing: '0.05em' }}
          >
            {project.year}
          </div>

          {/* Title */}
          <h1 className="text-black dark:text-white mb-6">
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-neutral-600 dark:text-neutral-400 mb-10 max-w-3xl leading-relaxed">
            {project.description}
          </p>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mb-10">
              <div 
                className="text-neutral-500 dark:text-neutral-500 mb-4"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '11px', letterSpacing: '0.05em' }}
              >
                KEY FEATURES
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
                {project.keyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 group-hover:bg-neutral-600 dark:group-hover:bg-neutral-400 transition-colors duration-300" />
                    <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300" style={{ fontSize: '14px' }}>
                      {feature}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Components */}
          {project.components && project.components.length > 0 && (
            <div className="mb-10">
              <div 
                className="text-neutral-500 dark:text-neutral-500 mb-4"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '11px', letterSpacing: '0.05em' }}
              >
                FRAMEWORK COMPONENTS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl">
                {project.components.map((component, index) => (
                  <motion.div
                    key={component.name}
                    className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    <div 
                      className="text-neutral-700 dark:text-neutral-300 mb-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-300"
                      style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '13px' }}
                    >
                      {component.name}
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-500" style={{ fontSize: '12px' }}>
                      {component.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-12">
              <div 
                className="text-neutral-500 dark:text-neutral-500 mb-6"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '11px', letterSpacing: '0.05em' }}
              >
                SCREENSHOTS
              </div>
              <div className="space-y-8">
                {project.screenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300">
                      <ImageWithFallback
                        src={screenshot.url}
                        alt={screenshot.caption}
                        className="w-full h-auto"
                      />
                    </div>
                    <p 
                      className="text-neutral-600 dark:text-neutral-400 text-center"
                      style={{ fontSize: '13px', fontStyle: 'italic' }}
                    >
                      {screenshot.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-10">
            <div 
              className="text-neutral-500 dark:text-neutral-500 mb-3"
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '11px', letterSpacing: '0.05em' }}
            >
              TECHNOLOGIES
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <motion.div
                  key={tech}
                  className="relative px-4 py-2 rounded-md overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Light mode background */}
                  <div 
                    className="absolute inset-0 dark:opacity-0 transition-all duration-300 group-hover:opacity-90"
                    style={{
                      background: 'rgba(240, 240, 240, 0.8)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  
                  {/* Dark mode background */}
                  <div 
                    className="absolute inset-0 opacity-0 dark:opacity-100 transition-all duration-300"
                    style={{
                      background: 'rgba(60, 60, 60, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  />
                  
                  <span 
                    className="relative z-10 text-neutral-700 dark:text-neutral-300"
                    style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '12px' }}
                  >
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black transition-all duration-300 hover:bg-neutral-800 dark:hover:bg-neutral-100"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '13px' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github size={18} />
                View on GitHub
              </motion.a>
            )}
            
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '13px' }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={18} />
                Live Demo
              </motion.a>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

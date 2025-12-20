import { motion } from 'motion/react';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface ExperiencePhoto {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  location?: string;
  imageUrl: string;
  category: 'work' | 'speaking' | 'award' | 'community';
}

const experiencePhotos: ExperiencePhoto[] = [
  {
    id: '1',
    title: 'TÜBİTAK 2209-A Research Project',
    company: 'AI-Powered Car Design Optimization',
    period: '2024',
    location: 'TÜBİTAK 2209-A',
    description: 'Developed an AI model trained on a specialized dataset to optimize car designs by predicting the drag coefficient. The project aimed to identify the most aerodynamically efficient car designs, leveraging machine learning techniques to provide actionable insights for automotive innovation.',
    imageUrl: 'https://halic.edu.tr/wp-content/uploads/2025/04/tubitak-2209-a-basari-haberi.jpg',
    category: 'award'
  },
  {
    id: '2',
    title: 'Campus Representative',
    company: 'Türkiye Teknoloji Takımı Vakfı (T3)',
    period: 'Oct 2024 - Jun 2025',
    location: 'Part-time',
    description: 'Lead a technology-focused team, driving innovation and collaboration. Oversee strategic planning, project execution, and team coordination while mentoring members to enhance problem-solving and leadership skills.',
    imageUrl: 'https://i.ibb.co/whRHJzR2/Ads-z-tasar-m-1.png',
    category: 'work'
  },
  {
    id: '3',
    title: 'Software Engineer',
    company: 'İstanbul Esenyurt Üniversitesi',
    period: 'Sep 2025 - Present · 2 mos',
    location: 'Zafer, Adile Naşit Blv. No:1, 34510 Esenyurt/İstanbul · On-site',
    description: 'Full-time Software Engineer at İstanbul Esenyurt Üniversitesi, working on developing and maintaining university systems and web applications. Contributing to the digital transformation of academic and administrative processes.',
    imageUrl: 'https://i.ibb.co/mChRQpSB/Bluesense-ai-2.png',
    category: 'work'
  },
  {
    id: '5',
    title: 'Graduation Ceremony',
    company: 'University Degree Completion',
    period: 'March 2025',
    location: 'Graduation Ceremony',
    description: 'Successfully completed degree program and graduated with honors. A significant milestone marking the culmination of years of academic achievement and personal growth.',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQGhVeDME5wYbQ/feedshare-shrink_2048_1536/B4DZfpc91YHkAo-/0/1751968375582?e=1767830400&v=beta&t=JKGVAy_djBoLEitTZxtAQRXhLC03FR6_1QND-3V4tOs',
    category: 'award'
  },
  {
    id: '6',
    title: 'Software Engineer Intern',
    company: 'Halic Universitesi · Part-time',
    period: 'Jun 2024 - Jun 2025 · 1 yr 1 mo',
    location: 'On-site',
    description: 'Develop and maintain web applications for university administrative systems, focusing on performance and usability.',
    imageUrl: 'https://i.ibb.co/5xgtT6Qq/Bluesense-ai-1.png',
    category: 'work'
  },
  {
    id: '7',
    title: 'Take Off Event - Altair Project Team',
    company: 'Teknofest Club & T3 Haliç University',
    period: 'December 2024',
    location: 'Take Off Event',
    description: 'Represented Altair Project Team at Take Off event showcasing autonomous drone systems for natural disaster response. Connected with industry leaders and received valuable feedback on innovative solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2000&auto=format&fit=crop',
    category: 'community'
  },
  {
    id: '8',
    title: 'Conference Presentation - ICICV 2025',
    company: 'Università della Calabria, Italy',
    period: 'January 2025',
    location: 'Calabria, Italy',
    description: 'Presented graduation project "Crowd Counting: A VGG-Driven Convolutional Framework" at the Fifth International Conference on Innovations in Computational Intelligence and Computer Vision. Study accepted for publication in Springer\'s Scopus-indexed Notes in Networks and Systems series.',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQE5LDcSgIC1TQ/feedshare-shrink_800/B4DZdqIW5MGUAg-/0/1749832266040?e=1767830400&v=beta&t=VD8utHBdg7CiJ22zUpoRtlK49YQZIqyABQgZOA5AVH0',
    category: 'speaking'
  },
  {
    id: '9',
    title: 'AI Engineer Intern',
    company: 'BLUESENSE',
    period: 'Jun 2025 - Aug 2025 · 3 mos',
    location: 'Vancouver, British Columbia, Canada · Remote',
    description: 'Full-time AI Engineer Intern developing new features and APIs for Bluesense\'s cloud-based sensor-analytics platform, automating tests/deployments, and presenting ML research insights to the engineering team.',
    imageUrl: 'https://i.ibb.co/84t9CP3J/Bluesense-ai.png',
    category: 'work'
  },
  {
    id: '10',
    title: 'Teknofest Altair Team Leader',
    company: '2025 International UAV Competition',
    period: 'January 2025',
    location: 'Teknofest',
    description: 'Led Altair team to successfully complete the "Free Mission Project Presentation Report Evaluation" phase. Coordinated cross-functional team efforts and technical project development under the guidance of Prof. Figen Özen.',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQH3EFHrYqyfDQ/feedshare-shrink_800/B4DZZUn169HwAg-/0/1745176453725?e=1767830400&v=beta&t=vWPbjPwLD_WdYjZt6I6SAa9yoeQzGuJNVenNpO3LE6I',
    category: 'award'
  },
  {
    id: '11',
    title: 'GDSC Lead',
    company: 'Google Developer Student Clubs',
    period: '2023 - 2024',
    location: 'Haliç University',
    description: 'Led Google Developer Student Clubs during presidency, developing skills in technological projects, community management, teamwork and leadership. Successfully managed team, mentors and community throughout the journey.',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQEKusRtNnK-AA/feedshare-shrink_800/feedshare-shrink_800/0/1727123244024?e=1767830400&v=beta&t=HFR-bcC00y1sWTCHARNRuPL9r4dcOc-KePuO2aTAyfs',
    category: 'community'
  },
  {
    id: '12',
    title: 'Alaz Team Leader - Teknofest',
    company: 'Air Defense Systems Competition',
    period: '2024',
    location: 'Teknofest',
    description: 'Led Alaz team to successfully complete Preliminary Design Report (ÖTR) phase and advance to Critical Design Report stage in Teknofest Air Defense Systems Competition. Supervised technical team under guidance of Assoc. Prof. Dr. Alireza Souri.',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQEZEqCWHNjh9A/feedshare-shrink_800/feedshare-shrink_800/0/1713868706152?e=1767830400&v=beta&t=2XoFwyol31QWUcO28HfA6J1cQLHNzI_F01o-2f59J-Q',
    category: 'community'
  }
];

const categoryLabels = {
  work: 'Professional Experience',
  speaking: 'Speaking Engagement',
  award: 'Recognition & Award',
  community: 'Community Contribution'
};

export function ExperienceGallery() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', fontSize: '13px' }}
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        {/* Gallery Title */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="text-black dark:text-white transition-colors duration-300 mb-4"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
          >
            Professional Archive
          </h1>
          <p 
            className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300 max-w-2xl mb-2"
            style={{ fontSize: '15px', lineHeight: '1.7' }}
          >
            A comprehensive visual documentation of professional experiences, speaking engagements, and community contributions spanning my career.
          </p>
          <motion.div 
            className="h-px bg-neutral-300 dark:bg-neutral-700 mt-6"
            initial={{ width: 0 }}
            animate={{ width: '64px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Gallery Grid */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3, 1280: 4 }}>
          <Masonry gutter="16px">
            {experiencePhotos.map((photo, index) => {
              const isHovered = hoveredId === photo.id;

              return (
                <motion.div
                  key={photo.id}
                  className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-all duration-300 group shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(255,255,255,0.05)]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  onMouseEnter={() => setHoveredId(photo.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ 
                    y: -4,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                  }}
                >
                  {/* Image Container */}
                  <div 
                    className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-800"
                    style={{ aspectRatio: 'auto' }}
                  >
                    <ImageWithFallback
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-auto object-contain transition-all duration-700 ease-out"
                      style={{
                        filter: isHovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.9)',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        display: 'block'
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 dark:from-black/80 via-transparent to-transparent" />

                    {/* Category Label */}
                    <div className="absolute top-3 left-3">
                      <span 
                        className="px-2 py-1 bg-black/80 dark:bg-neutral-800/90 text-white dark:text-neutral-200 backdrop-blur-sm border border-white/20 dark:border-neutral-600/50 transition-colors duration-300"
                        style={{ 
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                          fontSize: '10px',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {categoryLabels[photo.category]}
                      </span>
                    </div>

                    {/* Hover Info Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/85 dark:bg-black/90 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-end"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
                    >
                      <div className="space-y-2">
                        <p 
                          className="text-neutral-400 dark:text-neutral-500"
                          style={{ 
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: '11px',
                            letterSpacing: '0.5px'
                          }}
                        >
                          {photo.period}
                        </p>
                        <h3 
                          className="text-white dark:text-neutral-100"
                          style={{ 
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: '16px',
                            lineHeight: '1.4'
                          }}
                        >
                          {photo.title}
                        </h3>
                        <p 
                          className="text-neutral-300 dark:text-neutral-300"
                          style={{ 
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            fontSize: '13px'
                          }}
                        >
                          {photo.company}
                        </p>
                        {photo.location && (
                          <p 
                            className="text-neutral-400 dark:text-neutral-500"
                            style={{ 
                              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                              fontSize: '11px'
                            }}
                          >
                            {photo.location}
                          </p>
                        )}
                        <p 
                          className="text-neutral-300 dark:text-neutral-400 pt-2 border-t border-neutral-700 dark:border-neutral-600"
                          style={{ fontSize: '13px', lineHeight: '1.6' }}
                        >
                          {photo.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Info Section (Visible by default) */}
                  <div className="p-3 sm:p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition-colors duration-300">
                    <h3 
                      className="text-black dark:text-neutral-100 mb-1 transition-colors duration-300"
                      style={{ 
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        fontSize: '14px',
                        lineHeight: '1.4'
                      }}
                    >
                      {photo.title}
                    </h3>
                    <p 
                      className="text-neutral-600 dark:text-neutral-400 transition-colors duration-300"
                      style={{ 
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        fontSize: '12px'
                      }}
                    >
                      {photo.company} • {photo.period}
                    </p>
                  </div>

                  {/* Border Glow Effect */}
                  <div 
                    className="absolute inset-0 border border-black dark:border-white pointer-events-none transition-opacity duration-300"
                    style={{ opacity: isHovered ? 0.15 : 0 }}
                  />
                </motion.div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>

        {/* Footer Note */}
        <motion.div
          className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p 
            className="text-neutral-500 dark:text-neutral-600 text-center"
            style={{ 
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: '11px',
              letterSpacing: '0.5px'
            }}
          >
            Archive contains {experiencePhotos.length} documented experiences spanning {new Date().getFullYear() - 2016}+ years
          </p>
        </motion.div>
      </div>
    </div>
  );
}

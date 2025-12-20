import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ProjectDetail } from './components/ProjectDetail';
import { ExperienceGallery } from './components/sections/ExperienceGallery';
import { ThemeProvider } from './components/ThemeProvider';

import { RootLayout } from './layouts/RootLayout';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <RootLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/experience" element={<ExperienceGallery />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RootLayout>
      </Router>
    </ThemeProvider>
  );
}

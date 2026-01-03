import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TerminalPage } from './components/TerminalPage';
import { ThemeProvider } from './components/ThemeProvider';

import { RootLayout } from './layouts/RootLayout';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <RootLayout>
          <Routes>
            <Route path="/" element={<TerminalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RootLayout>
      </Router>
    </ThemeProvider>
  );
}

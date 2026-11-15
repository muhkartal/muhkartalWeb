import { Contact, Footer } from './components/Contact';
import { Experience } from './components/Experience';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { profile } from './data';
import { useRevealOnScroll } from './lib/hooks';

export default function App() {
  useRevealOnScroll();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <div id="top" />
      <Header name={profile.name} />
      <main id="main" className="mx-auto max-w-3xl px-5 sm:px-6">
        <Hero />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

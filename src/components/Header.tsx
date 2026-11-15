import { useEffect, useState } from 'react';
import { useActiveSection, useScrolled, useTheme } from '../lib/hooks';
import { MoonIcon, SunIcon } from './Icons';

const NAV = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
const IDS = NAV.map((n) => n.id);

export function Header({ name }: { name: string }) {
  const scrolled = useScrolled();
  const active = useActiveSection(IDS);
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('scroll', close, { passive: true, once: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        open
          ? 'border-b border-line bg-bg/95 backdrop-blur-xl'
          : scrolled
            ? 'border-b border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-5 sm:px-6">
        <a
          href="#top"
          className="text-[15px] font-semibold tracking-tight text-fg transition-opacity hover:opacity-70"
          onClick={() => setOpen(false)}
        >
          {name}
        </a>

        <nav className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 sm:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 ${
                    active === n.id ? 'text-fg' : 'text-fg-3 hover:text-fg'
                  }`}
                >
                  {n.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-px origin-center bg-accent transition-transform duration-500 ease-out-soft ${
                      active === n.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="relative ml-1 grid h-9 w-9 place-items-center rounded-lg text-fg-3 transition-colors hover:bg-surface hover:text-fg"
          >
            <SunIcon
              className={`absolute transition-all duration-500 ease-out-soft ${
                theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
              }`}
            />
            <MoonIcon
              className={`absolute transition-all duration-500 ease-out-soft ${
                theme === 'dark' ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative grid h-9 w-9 place-items-center rounded-lg text-fg-3 transition-colors hover:bg-surface hover:text-fg sm:hidden"
          >
            <span
              className={`absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ease-out-soft ${
                open ? 'rotate-45' : '-translate-y-[3.5px]'
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ease-out-soft ${
                open ? '-rotate-45' : 'translate-y-[3.5px]'
              }`}
            />
          </button>
        </nav>
      </div>

      <div
        id="mobile-nav"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out-soft sm:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <ul className="min-h-0 px-5 pb-3">
          {NAV.map((n, i) => (
            <li
              key={n.id}
              className={`border-b border-line transition-[transform,opacity] duration-500 ease-out-soft last:border-0 ${
                open ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
            >
              <a
                href={`#${n.id}`}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between py-3 text-[15px] ${
                  active === n.id ? 'text-fg' : 'text-fg-2'
                }`}
              >
                {n.label}
                {active === n.id && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

import { useEffect, useState } from 'react';
import { useActiveSection, useScrolled, useTheme } from '../lib/hooks';
import { profile } from '../data';
import { GitHubIcon, LinkedInIcon, MailIcon, MoonIcon, SunIcon } from './Icons';

const SOCIAL_ICONS = { GitHub: GitHubIcon, LinkedIn: LinkedInIcon, Email: MailIcon } as const;

const NAV = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
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
            className={`relative ml-1 h-11 w-11 place-items-center rounded-lg text-fg-3 transition-colors hover:bg-surface hover:text-fg sm:grid sm:h-9 sm:w-9 ${
              open ? 'hidden' : 'grid'
            }`}
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
            className={`relative grid h-11 w-11 place-items-center rounded-lg transition-colors hover:bg-surface hover:text-fg sm:hidden ${
              open ? 'bg-surface text-fg' : 'text-fg-3'
            }`}
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
        <div className="min-h-0">
        <ul className="px-5">
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

        <div
          className={`mx-5 mb-3 flex items-center justify-between gap-3 border-t border-line pt-3 transition-opacity duration-500 ${
            open ? 'opacity-100 delay-200' : 'opacity-0'
          }`}
        >
          <ul className="-ml-3 flex">
            {profile.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    tabIndex={open ? 0 : -1}
                    className="grid h-11 w-11 place-items-center text-fg-3 transition-colors hover:text-fg"
                  >
                    <Icon width={18} height={18} />
                  </a>
                </li>
              );
            })}
          </ul>

          <div role="group" aria-label="Theme" className="flex rounded-xl border border-line bg-surface p-[3px]">
            {(['light', 'dark'] as const).map((t) => (
              <button
                key={t}
                type="button"
                tabIndex={open ? 0 : -1}
                aria-pressed={theme === t}
                onClick={() => theme !== t && toggle()}
                className={`inline-flex h-[38px] items-center gap-1.5 rounded-[9px] px-3 text-[13px] capitalize transition-colors duration-300 ${
                  theme === t ? 'bg-bg text-fg shadow-[0_1px_2px_rgb(0_0_0/0.12)]' : 'text-fg-3'
                }`}
              >
                {t === 'light' ? <SunIcon width={14} height={14} /> : <MoonIcon width={14} height={14} />}
                {t}
              </button>
            ))}
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}

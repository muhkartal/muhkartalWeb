import { useState } from 'react';
import { profile } from '../data';
import { ArrowUp, ArrowUpRight, CheckIcon, CopyIcon } from './Icons';
import { Section } from './Section';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Section id="contact" title="Contact">
      <p className="reveal max-w-xl text-[15px] leading-[1.75] text-fg-2 sm:text-base">
        I&apos;m always open to new opportunities, collaborations, or just a chat about technology.
        The quickest way to reach me is email.
      </p>

      <div className="reveal mt-6 flex flex-wrap items-center gap-2" style={{ '--d': 1 } as React.CSSProperties}>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex h-10 items-center rounded-xl bg-fg px-4 text-sm font-medium text-bg transition-[opacity,transform] duration-300 hover:-translate-y-0.5 hover:opacity-90"
        >
          {profile.email}
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy email address"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-line text-fg-3 transition-colors hover:bg-surface hover:text-fg"
        >
          <CopyIcon
            className={`absolute transition-all duration-300 ${copied ? 'scale-50 opacity-0' : 'opacity-100'}`}
          />
          <CheckIcon
            className={`absolute text-accent transition-all duration-300 ${
              copied ? 'opacity-100' : 'scale-50 opacity-0'
            }`}
          />
        </button>
        <span
          role="status"
          className={`font-mono text-xs text-fg-3 transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}
        >
          copied
        </span>
      </div>

      <ul className="reveal mt-10 border-t border-line" style={{ '--d': 2 } as React.CSSProperties}>
        {profile.socials.filter((s) => s.label !== 'Email').map((s) => (
          <li key={s.label} className="border-b border-line">
            <a
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 py-3.5"
            >
              <span className="text-sm text-fg-2 transition-colors group-hover:text-fg">{s.label}</span>
              <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-fg-3 transition-colors group-hover:text-fg-2">
                <span className="truncate">{s.handle}</span>
                <ArrowUpRight
                  width={13}
                  height={13}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 flex items-center justify-between gap-4 border-t border-line py-8 text-xs text-fg-3">
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
      <a href="#top" className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg">
        Back to top
        <ArrowUp
          width={13}
          height={13}
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        />
      </a>
    </footer>
  );
}

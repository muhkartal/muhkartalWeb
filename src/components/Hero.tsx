import { Fragment, useState } from 'react';
import { profile } from '../data';
import { useClock } from '../lib/hooks';
import { Banner } from './Banner';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

const socialIcon = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
} as const;

const Em = ({ children }: { children: React.ReactNode }) => (
  <span className="text-fg">{children}</span>
);

export function Hero() {
  const time = useClock(profile.timeZone);
  const [avatarOk, setAvatarOk] = useState(true);

  return (
    <section id="about" aria-label="About" className="pt-20 sm:pt-24">
      <div className="rise" style={{ '--d': 0 } as React.CSSProperties}>
        <Banner />
      </div>

      <div className="relative -mt-10 px-4 sm:-mt-12 sm:px-6">
        <div
          className="rise relative h-20 w-20 overflow-hidden rounded-2xl bg-surface shadow-[0_0_0_4px_var(--bg)] sm:h-24 sm:w-24"
          style={{ '--d': 1 } as React.CSSProperties}
        >
          {avatarOk ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
              onError={() => setAvatarOk(false)}
            />
          ) : (
            <span className="grid h-full w-full place-items-center text-xl font-semibold text-fg-2">
              MK
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 sm:px-0">
        <div
          className="rise flex flex-wrap items-baseline gap-x-3 gap-y-1"
          style={{ '--d': 2 } as React.CSSProperties}
        >
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-[28px]">
            {profile.name}
          </h1>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-fg-3">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.location} · {time}
          </span>
        </div>

        <p
          className="rise mt-1.5 text-[15px] text-fg-2"
          style={{ '--d': 3 } as React.CSSProperties}
        >
          {profile.role.split(' · ').map((part, i, all) => (
            <Fragment key={part}>
              {i > 0 && ' '}
              <span className="whitespace-nowrap">
                {part}
                {i < all.length - 1 && <span className="text-fg-3"> ·</span>}
              </span>
            </Fragment>
          ))}
        </p>

        <ul className="rise mt-4 flex items-center gap-1" style={{ '--d': 4 } as React.CSSProperties}>
          {profile.socials.map((s) => {
            const Icon = socialIcon[s.label as keyof typeof socialIcon];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="-ml-1 grid h-9 w-9 place-items-center rounded-lg text-fg-3 transition-[color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-surface hover:text-fg"
                >
                  <Icon width={17} height={17} />
                </a>
              </li>
            );
          })}
        </ul>

        <div
          className="rise mt-6 space-y-4 text-[15px] leading-[1.75] text-fg-2 sm:text-base"
          style={{ '--d': 5 } as React.CSSProperties}
        >
          <p>
            I&apos;m a software engineer and full-stack developer who likes building high-performance,
            scalable applications, from backend systems in <Em>Node.js</Em> and <Em>Python</Em> to
            immersive frontends with <Em>React</Em> and <Em>WebGL</Em>.
          </p>
          <p>
            <Em>Haliç University</Em> graduate. I led <Em>Google Developer Student Clubs (GDSC)</Em> and
            the <Em>Altair Team</Em> at the Teknofest 2025 UAV Competition, which taught me how to bring
            people together and push complex projects over the finish line.
          </p>
          <p>
            I care about system architecture, AI integration and continuous learning. Feel free to reach
            out for collaborations or to talk about the latest in tech.
          </p>
        </div>
      </div>
    </section>
  );
}

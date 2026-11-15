import { experience } from '../data';
import { Section } from './Section';

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="-mt-3">
        {experience.map((x, i) => (
          <li
            key={x.company + x.role}
            className="reveal flex gap-3.5 border-b border-line py-4 sm:gap-4"
            style={{ '--d': i } as React.CSSProperties}
          >
            <span aria-hidden="true" className="mt-[7px] flex h-[7px] w-[7px] shrink-0 items-center justify-center">
              <span
                className={`rounded-full ${
                  x.current ? 'pulse-dot h-[7px] w-[7px] bg-accent' : 'h-[5px] w-[5px] border border-fg-3'
                }`}
              />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[15px] font-medium text-fg">
                  {x.role}
                  <span className="hidden font-normal sm:inline">
                    <span className="text-fg-3"> · </span>
                    <span className="text-fg-2">{x.company}</span>
                  </span>
                </h3>
                <span className="shrink-0 font-mono text-xs text-fg-3">{x.years}</span>
              </div>
              <p className="mt-0.5 text-sm text-fg-2 sm:hidden">{x.company}</p>
              <p className="mt-0.5 text-[13px] text-fg-3">
                {x.current && <span className="sr-only">Current role. </span>}
                {x.type} · {x.location}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

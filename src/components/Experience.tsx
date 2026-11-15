import { experience } from '../data';
import { Chip, Section } from './Section';

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="relative">
        {experience.map((x, i) => (
          <li
            key={x.company + x.role}
            className="reveal group relative pb-10 pl-7 last:pb-0"
            style={{ '--d': i } as React.CSSProperties}
          >
            {/* timeline */}
            <span className="absolute top-[22px] bottom-0 left-[3.5px] w-px bg-line group-last:hidden" />
            <span
              className={`absolute top-[7px] left-0 h-2 w-2 rounded-full ${
                x.current ? 'pulse-dot bg-accent' : 'border border-fg-3/60 bg-bg'
              }`}
            />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="text-[15px] font-medium text-fg">
                {x.role}
                <span className="text-fg-3"> · </span>
                <span className="text-fg-2">{x.company}</span>
              </h3>
              <span className="shrink-0 font-mono text-xs text-fg-3">{x.period}</span>
            </div>
            <p className="mt-1 text-[13px] text-fg-3">
              {x.type} · {x.location}
            </p>

            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-fg-2">
              {x.details.map((d) => (
                <li key={d} className="relative pl-4">
                  <span className="absolute top-[0.7em] left-0 h-px w-2 bg-fg-3/60" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {x.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

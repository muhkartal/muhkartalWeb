import { skills } from '../data';
import { Section } from './Section';

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
        {skills.map((g, i) => (
          <div key={g.group} className="reveal" style={{ '--d': i } as React.CSSProperties}>
            <h3 className="mb-3 text-[13px] text-fg-3">{g.group}</h3>
            <ul className="flex flex-wrap gap-1.5 sm:flex-col sm:gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-line bg-surface px-2 py-0.5 text-sm text-fg-2 sm:border-0 sm:bg-transparent sm:p-0"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

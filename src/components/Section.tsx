import type { ReactNode } from 'react';

export function Section({
  id,
  title,
  aside,
  children,
}: {
  id: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-20 sm:mt-24">
      <div className="reveal mb-7 flex items-center gap-4">
        <h2 id={`${id}-title`} className="text-sm font-medium text-fg">
          {title}
        </h2>
        <span className="h-px flex-1 bg-line" />
        {aside && <span className="font-mono text-xs text-fg-3">{aside}</span>}
      </div>
      {children}
    </section>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[11px] leading-5 text-fg-3">
      {children}
    </span>
  );
}

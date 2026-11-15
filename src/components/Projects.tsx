import { useEffect, useRef, useState } from 'react';
import { featured, profile, projects } from '../data';
import { ArrowUpRight } from './Icons';
import { Section } from './Section';

const canHover = () =>
  window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;

/** Floating screenshot that trails the cursor while a project row is hovered. */
function usePreview() {
  const box = useRef<HTMLDivElement>(null);
  const [img, setImg] = useState<string | null>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const tick = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.16;
      p.y += (p.ty - p.y) * 0.16;
      if (box.current) box.current.style.translate = `${p.x}px ${p.y}px`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const move = (e: React.PointerEvent) => {
    const W = 300;
    const H = 188;
    const tx = Math.min(e.clientX + 28, window.innerWidth - W - 16);
    const ty = Math.min(Math.max(e.clientY - H / 2, 72), window.innerHeight - H - 16);
    const p = pos.current;
    if (!img) {
      p.x = tx;
      p.y = ty;
    }
    p.tx = tx;
    p.ty = ty;
  };

  return { box, img, setImg, move };
}

function FeaturedCard() {
  return (
    <a
      href={featured.href}
      target="_blank"
      rel="noreferrer"
      className="reveal group block overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform] duration-500 ease-out-soft hover:-translate-y-0.5 hover:border-fg-3/40"
    >
      <div className="overflow-hidden">
        <img
          src={featured.image}
          alt={featured.alt}
          width={1440}
          height={640}
          loading="lazy"
          decoding="async"
          className="block aspect-[9/4] w-full object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.03]"
        />
      </div>
      <div className="border-t border-line px-4 pt-4 pb-4.5 sm:px-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="flex items-center gap-2 text-base font-medium text-fg">
            {featured.title}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-px font-mono text-[10px] font-normal tracking-wide text-accent uppercase">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Live
            </span>
            <ArrowUpRight
              width={14}
              height={14}
              className="-translate-x-1 translate-y-0.5 text-fg-3 opacity-0 transition-all duration-300 ease-out-soft group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
            />
          </h3>
          <span className="shrink-0 font-mono text-xs text-fg-3">{featured.year}</span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{featured.description}</p>
        <p className="mt-2.5 font-mono text-[11px] text-fg-3">{featured.stack.join('  /  ')}</p>
      </div>
    </a>
  );
}

export function Projects() {
  const { box, img, setImg, move } = usePreview();
  const [hoverable, setHoverable] = useState(false);

  useEffect(() => {
    setHoverable(canHover());
    // warm the cache so previews appear instantly
    const idle = window.setTimeout(() => {
      if (!canHover()) return;
      projects.forEach((p) => {
        if (p.image) new Image().src = p.image;
      });
    }, 1500);
    return () => window.clearTimeout(idle);
  }, []);

  return (
    <Section id="projects" title="Projects" aside={`${projects.length + 1}`}>
      <FeaturedCard />

      <h3 className="reveal mt-10 mb-1 text-[13px] text-fg-3">More projects</h3>
      <ul className="-mx-3 sm:-mx-4" onPointerLeave={() => setImg(null)}>
        {projects.map((p, i) => (
          <li key={p.title} className="reveal" style={{ '--d': i } as React.CSSProperties}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              onPointerEnter={(e) => {
                if (!hoverable) return;
                move(e);
                setImg(p.image ?? null);
              }}
              onPointerMove={hoverable ? move : undefined}
              className="group block rounded-xl px-3 py-4 transition-colors duration-300 hover:bg-surface sm:px-4"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="flex items-center gap-2 text-[15px] font-medium text-fg">
                  {p.title}
                  <ArrowUpRight
                    width={14}
                    height={14}
                    className="-translate-x-1 translate-y-0.5 text-fg-3 opacity-0 transition-all duration-300 ease-out-soft group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </h4>
                <span className="shrink-0 font-mono text-xs text-fg-3">{p.date}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{p.description}</p>
              <p className="mt-2.5 font-mono text-[11px] text-fg-3">{p.stack.join('  /  ')}</p>
            </a>
          </li>
        ))}
      </ul>

      <div className="reveal mt-6">
        <a
          href={profile.socials[0].href + '?tab=repositories'}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm text-fg-3 transition-colors hover:text-fg"
        >
          <span className="link">More on GitHub</span>
          <ArrowUpRight
            width={14}
            height={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      {hoverable && (
        <div
          ref={box}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-40 h-[188px] w-[300px] overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)] transition-[opacity,scale] duration-300 ease-out-soft ${
            img ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {projects.map(
            (p) =>
              p.image && (
                <img
                  key={p.title}
                  src={img ? p.image : undefined}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
                    img === p.image ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ),
          )}
        </div>
      )}
    </Section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { featured, profile, projects } from '../data';
import { prefersReducedMotion } from '../lib/hooks';
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

/**
 * The koi pond itself, running live in the card. It mounts only when the card
 * nears the viewport; the screenshot stays on top until the pond has drawn,
 * then cross-fades away. Reduced-motion visitors keep the still image.
 */
function LivePond() {
  const media = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(media.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={media} className="relative aspect-[9/4] overflow-hidden bg-[#050807]">
      {mounted && (
        <iframe
          src={featured.embed}
          title="Live koi pond. Move the pointer to stir the water, click to feed the koi."
          loading="lazy"
          onLoad={() => window.setTimeout(() => setReady(true), 450)}
          // Taller than the frame so the pond's own hint caption is clipped
          // (it wraps onto more lines on narrow screens, hence the larger margin).
          className="absolute top-0 left-0 h-[calc(100%+88px)] w-full border-0 sm:h-[calc(100%+40px)]"
        />
      )}
      <img
        src={featured.image}
        alt={featured.alt}
        width={1080}
        height={480}
        loading="lazy"
        decoding="async"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out-soft ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-3 bottom-3 rounded-md bg-[#050807]/80 px-2 py-1 font-mono text-[10px] tracking-wide text-[#9fb3a9] transition-opacity delay-300 duration-700 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="hidden sm:inline">move to stir · click to feed</span>
        <span className="sm:hidden">tap to feed</span>
      </span>
    </div>
  );
}

function FeaturedCard() {
  return (
    <div className="reveal group/card overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-500 hover:border-fg-3/40">
      <LivePond />
      <a
        href={featured.href}
        target="_blank"
        rel="noreferrer"
        className="group block border-t border-line px-4 pt-4 pb-4.5 sm:px-5"
      >
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
      </a>
    </div>
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

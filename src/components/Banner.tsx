import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/hooks';

/**
 * A quiet field of dots that drifts like water. Brighter crests pick up the
 * accent colour, and the pointer pushes a soft lens through the grid.
 */
export function Banner() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext('2d')!;
    const reduced = prefersReducedMotion();

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let t0 = performance.now();
    let dot = '237 237 237';
    let glow = '106 214 181';
    const mouse = { x: -999, y: -999, tx: -999, ty: -999, a: 0, ta: 0 };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      dot = cs.getPropertyValue('--dot').trim() || dot;
      glow = cs.getPropertyValue('--glow').trim() || glow;
    };

    const resize = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.a += (mouse.ta - mouse.a) * 0.08;

      const gap = w < 480 ? 11 : 13;
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;
      const cx = w * (0.5 + 0.28 * Math.sin(t * 0.13));
      const cy = h * (0.55 + 0.2 * Math.cos(t * 0.17));

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = ox + i * gap;
          const y = oy + j * gap;

          const dx = x - cx;
          const dy = y - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          let f =
            0.5 +
            0.22 * Math.sin(x * 0.016 + t * 0.55) * Math.cos(y * 0.045 - t * 0.4) +
            0.18 * Math.sin((x + y * 1.6) * 0.011 - t * 0.35) +
            0.16 * Math.cos(d * 0.035 - t * 0.9);

          if (mouse.a > 0.01) {
            const mx = x - mouse.x;
            const my = y - mouse.y;
            const md = Math.sqrt(mx * mx + my * my);
            if (md < 110) f += (1 - md / 110) ** 2 * 0.55 * mouse.a;
          }

          f = Math.max(0, Math.min(1, f));
          const e = f * f;
          const r = 0.7 + e * 1.3;
          const crest = Math.max(0, (f - 0.64) / 0.36);
          const alpha = 0.1 + e * 0.55;

          ctx.fillStyle =
            crest > 0
              ? `rgb(${glow} / ${Math.min(1, alpha + crest * 0.25)})`
              : `rgb(${dot} / ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) draw(t0 + 4000);
      else raf = requestAnimationFrame(loop);
    };

    readColors();
    resize();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(t0 + 4000);
    });
    ro.observe(el);

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) start();
    });
    io.observe(el);

    const mo = new MutationObserver(() => {
      readColors();
      if (reduced) draw(t0 + 4000);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.x < -500) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.ta = 1;
    };
    const onLeave = () => (mouse.ta = 0);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="banner relative h-36 w-full overflow-hidden rounded-2xl border border-line bg-surface sm:h-44"
      aria-hidden="true"
    >
      <canvas ref={canvas} className="absolute inset-0 block" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgb(var(--glow)/0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,var(--surface))] opacity-70" />
    </div>
  );
}

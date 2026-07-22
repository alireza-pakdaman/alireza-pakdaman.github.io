/**
 * Custom cursor: a dot that tracks the pointer 1:1 and a ring that follows on
 * a spring. The native cursor is never hidden — this is an accent, not a
 * replacement. Interactive elements grow the ring; elements marked
 * [data-magnetic] are gently pulled toward the pointer (≤ 6px).
 *
 * Gated to fine pointers with no reduced-motion preference.
 */
export function initCursor() {
  if (!matchMedia('(pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let dot: HTMLElement | null = null;
  let ring: HTMLElement | null = null;
  const grab = () => {
    dot = document.querySelector('.cursor-dot');
    ring = document.querySelector('.cursor-ring');
    document.documentElement.classList.add('has-cursor');
  };
  grab();
  document.addEventListener('astro:after-swap', grab);
  if (!dot || !ring) return;

  let tx = innerWidth / 2;
  let ty = innerHeight / 2;
  let rx = tx;
  let ry = ty;
  let vx = 0;
  let vy = 0;
  let seen = false;

  const STIFFNESS = 0.14;
  const DAMPING = 0.68;
  const MAX_PULL_X = 6;
  const MAX_PULL_Y = 5;

  let magnetEl: HTMLElement | null = null;

  const releaseMagnet = () => {
    if (magnetEl) {
      magnetEl.style.transform = '';
      magnetEl = null;
    }
  };

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
    if (!seen) {
      // First movement: snap the ring to the pointer instead of flying in.
      rx = tx;
      ry = ty;
      seen = true;
    }
    if (dot) dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;

    const target = e.target as Element | null;
    const interactive = target?.closest?.('a, button, [role="button"], input, textarea, select, summary');
    document.documentElement.toggleAttribute('data-cursor-hover', !!interactive);

    const magnet = target?.closest?.('[data-magnetic]') as HTMLElement | null;
    if (magnet !== magnetEl) releaseMagnet();
    if (magnet) {
      magnetEl = magnet;
      const r = magnet.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.18;
      magnet.style.transform = `translate(${Math.max(-MAX_PULL_X, Math.min(MAX_PULL_X, dx))}px, ${Math.max(
        -MAX_PULL_Y,
        Math.min(MAX_PULL_Y, dy)
      )}px)`;
    }
  });

  document.addEventListener('mouseleave', () => {
    document.documentElement.removeAttribute('data-cursor-hover');
    releaseMagnet();
  });

  const loop = () => {
    vx = (vx + (tx - rx) * STIFFNESS) * DAMPING;
    vy = (vy + (ty - ry) * STIFFNESS) * DAMPING;
    rx += vx;
    ry += vy;
    if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

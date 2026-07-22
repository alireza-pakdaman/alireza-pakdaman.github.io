type Theme = 'light' | 'dark';

const root = () => document.documentElement;

export const currentTheme = (): Theme => (root().dataset.theme === 'dark' ? 'dark' : 'light');

function announce(msg: string) {
  const live = document.getElementById('live-region');
  if (live) live.textContent = msg;
}

export function setTheme(next: Theme, origin?: { x: number; y: number }) {
  const el = root();
  const apply = () => {
    el.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private browsing */
    }
  };

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduced) {
    apply();
  } else {
    // Circle reveal expanding from the click point (View Transitions API).
    const x = origin?.x ?? innerWidth / 2;
    const y = origin?.y ?? 0;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    el.style.setProperty('--sweep-x', `${x}px`);
    el.style.setProperty('--sweep-y', `${y}px`);
    el.style.setProperty('--sweep-r', `${r}px`);
    el.classList.add('theme-sweep');
    const vt = document.startViewTransition(apply);
    vt.finished.finally(() => el.classList.remove('theme-sweep'));
  }
  announce(next === 'dark' ? 'Dark theme on' : 'Light theme on');
}

export function toggleTheme(origin?: { x: number; y: number }) {
  setTheme(currentTheme() === 'dark' ? 'light' : 'dark', origin);
}

export function initThemeToggle() {
  // Event delegation so listeners survive ClientRouter page swaps.
  document.addEventListener('click', (e) => {
    const btn = (e.target as Element | null)?.closest?.('.theme-toggle');
    if (!btn) return;
    // Keyboard "clicks" report (0,0); sweep from the button instead.
    let { clientX: x, clientY: y } = e as MouseEvent;
    if (x === 0 && y === 0) {
      const r = btn.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    toggleTheme({ x, y });
  });
}

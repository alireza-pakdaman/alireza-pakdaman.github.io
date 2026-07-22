import { useEffect, useState } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';

const APP = `import MagneticButton from './MagneticButton';
import StatCard from './StatCard';
import './styles.css';

// ────────────────────────────────────────────────────────────
//  This is live code. Edit the props below — the preview
//  updates as you type. Try strength={0.8}, theme="dark",
//  or change the values entirely.
// ────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="stage">
      <MagneticButton strength={0.35} radius={130}>
        Hover me
      </MagneticButton>

      <div className="row">
        <StatCard label="Lighthouse" value={100} suffix="/100" theme="dark" />
        <StatCard label="Island JS" value={2.1} suffix=" kB" theme="light" />
      </div>
    </div>
  );
}
`;

const MAGNETIC = `import { useRef, useEffect } from 'react';

// The same spring physics as the cursor on arshiatech.me,
// as a reusable component. No animation library.
export default function MagneticButton({
  strength = 0.35, // how hard the pull is (0–1)
  radius = 130,    // px within which the magnet engages
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let raf;
    let tx = 0, ty = 0; // target offset
    let x = 0, y = 0;   // sprung position
    let vx = 0, vy = 0; // velocity

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const inRange = Math.hypot(dx, dy) < radius;
      tx = inRange ? dx * strength : 0;
      ty = inRange ? dy * strength : 0;
    };

    const loop = () => {
      vx = (vx + (tx - x) * 0.12) * 0.75; // stiffness, damping
      vy = (vy + (ty - y) * 0.12) * 0.75;
      x += vx;
      y += vy;
      el.style.transform = \`translate(\${x}px, \${y}px)\`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return (
    <button ref={ref} className="magnetic">
      {children}
    </button>
  );
}
`;

const STATCARD = `import { useEffect, useState } from 'react';

// Theme-aware stat tile with an eased count-up.
export default function StatCard({
  label,
  value,
  suffix = '',
  theme = 'light', // "light" | "dark"
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let start, raf;
    const tick = (t) => {
      start ??= t;
      const p = Math.min((t - start) / 900, 1);
      setN(value * (1 - Math.pow(1 - p, 3))); // cubic ease-out
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const shown = Number.isInteger(value) ? Math.round(n) : n.toFixed(1);

  return (
    <div className={'stat stat--' + theme}>
      <span className="stat-value">
        {shown}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
`;

const STYLES = `.stage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  font-family: system-ui, sans-serif;
  background: #f6f5f2;
}

.magnetic {
  padding: 14px 30px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: #4338ca;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 10px 30px -12px rgba(67, 56, 202, 0.7);
}

.row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px 22px;
  border-radius: 14px;
  min-width: 130px;
}

.stat--light {
  background: #fff;
  border: 1px solid #e5e2db;
  color: #1a1b20;
}

.stat--dark {
  background: #0b0f16;
  border: 1px solid #1f2733;
  color: #e7eaf2;
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.stat--dark .stat-value {
  color: #3ecf8e;
}

.stat-label {
  font-size: 12px;
  opacity: 0.65;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
`;

export default function Playground() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Follow the site theme, including live toggles.
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  return (
    <Sandpack
      template="react"
      theme={theme}
      files={{
        '/App.js': APP,
        '/MagneticButton.js': MAGNETIC,
        '/StatCard.js': STATCARD,
        '/styles.css': STYLES,
      }}
      options={{
        editorHeight: 480,
        showLineNumbers: true,
        showTabs: true,
        resizablePanels: true,
      }}
    />
  );
}

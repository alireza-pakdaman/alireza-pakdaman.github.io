import { navigate } from 'astro:transitions/client';
import { toggleTheme } from './theme';

interface SiteData {
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  projects: { slug: string; title: string; tagline: string }[];
}

interface Cmd {
  id: string;
  label: string;
  group: string;
  keywords?: string;
  run: (e?: MouseEvent | KeyboardEvent) => void;
}

function siteData(): SiteData {
  const el = document.getElementById('site-data');
  return el ? (JSON.parse(el.textContent || '{}') as SiteData) : ({ projects: [] } as unknown as SiteData);
}

function announce(msg: string) {
  const live = document.getElementById('live-region');
  if (live) live.textContent = msg;
}

function buildCommands(): Cmd[] {
  const data = siteData();
  const go = (href: string) => () => {
    close();
    navigate(href);
  };
  const out = (href: string) => () => {
    close();
    window.open(href, '_blank', 'noopener');
  };

  const cmds: Cmd[] = [
    { id: 'home', label: 'Go home', group: 'Navigate', keywords: 'top start', run: go('/') },
    { id: 'work', label: 'Jump to projects', group: 'Navigate', keywords: 'work portfolio', run: go('/#projects') },
    { id: 'exp', label: 'Jump to experience', group: 'Navigate', keywords: 'jobs timeline', run: go('/#experience') },
    { id: 'skills', label: 'Jump to skills', group: 'Navigate', keywords: 'stack tech', run: go('/#skills') },
    { id: 'contact', label: 'Jump to contact', group: 'Navigate', keywords: 'email hire', run: go('/#contact') },
    { id: 'playground', label: 'Open the playground', group: 'Navigate', keywords: 'sandbox code live', run: go('/playground') },
  ];

  for (const p of data.projects) {
    cmds.push({
      id: `p-${p.slug}`,
      label: `Open project: ${p.title}`,
      group: 'Projects',
      keywords: p.tagline,
      run: go(`/projects/${p.slug}`),
    });
  }

  cmds.push(
    {
      id: 'theme',
      label: 'Toggle theme',
      group: 'Actions',
      keywords: 'dark light mode',
      run: () => {
        close();
        toggleTheme();
      },
    },
    {
      id: 'email',
      label: 'Copy email address',
      group: 'Actions',
      keywords: 'contact mail',
      run: async () => {
        close();
        try {
          await navigator.clipboard.writeText(data.email);
          announce('Email copied to clipboard');
        } catch {
          location.href = `mailto:${data.email}`;
        }
      },
    },
    { id: 'resume', label: 'Download resume (PDF)', group: 'Actions', keywords: 'cv', run: out(data.resume) },
    { id: 'gh', label: 'Open GitHub', group: 'Actions', keywords: 'code repos', run: out(data.github) },
    { id: 'li', label: 'Open LinkedIn', group: 'Actions', keywords: 'profile', run: out(data.linkedin) },
    {
      id: 'term',
      label: 'Open terminal',
      group: 'Actions',
      keywords: 'cli console shell',
      run: () => {
        close();
        window.dispatchEvent(new CustomEvent('ap:open-terminal'));
      },
    }
  );
  return cmds;
}

/** Subsequence fuzzy match. Higher is better; -1 means no match. */
function fuzzy(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (!q) return 0;
  let qi = 0;
  let score = 0;
  let streak = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      streak++;
      score += 1 + streak * 2 + (ti === 0 || t[ti - 1] === ' ' ? 6 : 0);
      qi++;
    } else {
      streak = 0;
    }
  }
  return qi === q.length ? score : -1;
}

let dialog: HTMLDialogElement | null = null;
let input: HTMLInputElement | null = null;
let list: HTMLUListElement | null = null;
let commands: Cmd[] = [];
let filtered: Cmd[] = [];
let selected = 0;

function close() {
  dialog?.close();
}

function render() {
  if (!list || !input) return;
  const q = input.value.trim();
  filtered = commands
    .map((c) => ({ c, s: fuzzy(q, `${c.label} ${c.keywords ?? ''}`) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.c);
  selected = Math.min(selected, Math.max(0, filtered.length - 1));

  list.innerHTML = '';
  let lastGroup = '';
  filtered.forEach((c, i) => {
    if (!q && c.group !== lastGroup) {
      lastGroup = c.group;
      const g = document.createElement('li');
      g.className = 'cmdk-group';
      g.setAttribute('role', 'presentation');
      g.textContent = c.group;
      list!.appendChild(g);
    }
    const li = document.createElement('li');
    li.id = `cmdk-opt-${i}`;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', String(i === selected));
    li.className = 'cmdk-item' + (i === selected ? ' is-selected' : '');
    li.textContent = c.label;
    li.addEventListener('click', () => c.run());
    li.addEventListener('mousemove', () => {
      if (selected !== i) {
        selected = i;
        updateSelection();
      }
    });
    list!.appendChild(li);
  });
  if (filtered.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'cmdk-empty';
    empty.setAttribute('role', 'presentation');
    empty.textContent = 'No matching commands';
    list.appendChild(empty);
  }
  input.setAttribute('aria-activedescendant', filtered.length ? `cmdk-opt-${selected}` : '');
}

function updateSelection() {
  if (!list || !input) return;
  list.querySelectorAll('.cmdk-item').forEach((el) => {
    const isSel = el.id === `cmdk-opt-${selected}`;
    el.classList.toggle('is-selected', isSel);
    el.setAttribute('aria-selected', String(isSel));
    if (isSel) el.scrollIntoView({ block: 'nearest' });
  });
  input.setAttribute('aria-activedescendant', `cmdk-opt-${selected}`);
}

function open() {
  dialog = document.getElementById('cmdk') as HTMLDialogElement | null;
  input = document.getElementById('cmdk-input') as HTMLInputElement | null;
  list = document.getElementById('cmdk-list') as HTMLUListElement | null;
  if (!dialog || !input || !list) return;
  commands = buildCommands();
  selected = 0;
  input.value = '';
  if (!dialog.open) dialog.showModal();
  render();
  input.focus();
}

export function initPalette() {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const d = document.getElementById('cmdk') as HTMLDialogElement | null;
      d?.open ? close() : open();
    }
  });

  document.addEventListener('click', (e) => {
    const t = e.target as Element | null;
    if (t?.closest?.('.palette-btn')) open();
    // Click on the backdrop closes.
    if (t instanceof HTMLDialogElement && t.id === 'cmdk') close();
  });

  document.addEventListener('input', (e) => {
    if ((e.target as Element).id === 'cmdk-input') {
      selected = 0;
      render();
    }
  });

  document.addEventListener(
    'keydown',
    (e) => {
      if ((e.target as Element).id !== 'cmdk-input') return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const delta = e.key === 'ArrowDown' ? 1 : -1;
        selected = (selected + delta + filtered.length) % Math.max(filtered.length, 1);
        updateSelection();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filtered[selected]?.run(e);
      }
    },
    true
  );
}

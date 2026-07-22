/**
 * Mini terminal easter egg. Lazy-loaded: this module is only fetched the
 * first time the user opens it (`>` key, footer prompt, or command palette).
 */
import { navigate } from 'astro:transitions/client';
import { setTheme } from './theme';

interface SiteData {
  email: string;
  github: string;
  linkedin: string;
  resume: string;
  projects: { slug: string; title: string; tagline: string }[];
}

let booted = false;
const history: string[] = [];
let historyIdx = -1;

function siteData(): SiteData {
  const el = document.getElementById('site-data');
  return el ? (JSON.parse(el.textContent || '{}') as SiteData) : ({ projects: [] } as unknown as SiteData);
}

function el<T extends HTMLElement>(id: string) {
  return document.getElementById(id) as T | null;
}

function print(text: string, cls = '') {
  const out = el<HTMLDivElement>('term-out');
  if (!out) return;
  const line = document.createElement('div');
  line.className = `term-row ${cls}`.trim();
  line.textContent = text;
  out.appendChild(line);
  out.scrollTop = out.scrollHeight;
}

function printHTMLSafeLink(label: string, href: string) {
  const out = el<HTMLDivElement>('term-out');
  if (!out) return;
  const line = document.createElement('div');
  line.className = 'term-row';
  const a = document.createElement('a');
  a.href = href;
  a.textContent = label;
  if (href.startsWith('http')) {
    a.target = '_blank';
    a.rel = 'noopener';
  }
  line.append('  → ', a);
  out.appendChild(line);
  out.scrollTop = out.scrollHeight;
}

const HELP = `available commands:
  help          this list
  about         who am i
  projects      list projects
  open <slug>   open a project page
  skills        what i work with
  resume        download the pdf
  theme <mode>  light | dark
  github        open github profile
  linkedin      open linkedin profile
  email         copy my email
  whoami        you, presumably
  clear         clear the screen
  exit          close terminal`;

async function run(raw: string) {
  const data = siteData();
  const [cmd, ...rest] = raw.trim().split(/\s+/);
  const arg = rest.join(' ');

  switch ((cmd || '').toLowerCase()) {
    case '':
      break;
    case 'help':
      print(HELP);
      break;
    case 'about':
      print('Alireza Pakdaman — software engineer.');
      print('CS @ Ontario Tech (2027). Data analysis, C++, generative AI.');
      print('Currently: Data Analyst @ Ontario Tech University.');
      break;
    case 'projects':
      data.projects.forEach((p) => print(`  ${p.slug.padEnd(26)} ${p.tagline}`));
      print('open one with: open <slug>');
      break;
    case 'open': {
      const p = data.projects.find((x) => x.slug === arg || x.slug.startsWith(arg));
      if (p) {
        print(`opening ${p.slug}…`, 'term-ok');
        closeTerminal();
        navigate(`/projects/${p.slug}`);
      } else {
        print(`no such project: ${arg || '(none)'} — try \`projects\``, 'term-err');
      }
      break;
    }
    case 'skills':
      print('C++ · Python · TypeScript · R · SQL');
      print('ML · GANs & diffusion · statistical analysis');
      print('React · Astro · Node.js');
      break;
    case 'resume':
      print('fetching resume.pdf…', 'term-ok');
      window.open(data.resume, '_blank', 'noopener');
      break;
    case 'theme':
      if (arg === 'dark' || arg === 'light') {
        setTheme(arg);
        print(`theme set to ${arg}`, 'term-ok');
      } else {
        print('usage: theme <light|dark>', 'term-err');
      }
      break;
    case 'github':
      printHTMLSafeLink(data.github, data.github);
      window.open(data.github, '_blank', 'noopener');
      break;
    case 'linkedin':
      printHTMLSafeLink(data.linkedin, data.linkedin);
      window.open(data.linkedin, '_blank', 'noopener');
      break;
    case 'email':
      try {
        await navigator.clipboard.writeText(data.email);
        print(`${data.email} — copied to clipboard`, 'term-ok');
      } catch {
        print(data.email);
      }
      break;
    case 'whoami':
      print('visitor (hopefully a recruiter with excellent taste)');
      break;
    case 'sudo':
      print('visitor is not in the sudoers file. this incident will be reported.', 'term-err');
      break;
    case 'clear': {
      const out = el<HTMLDivElement>('term-out');
      if (out) out.innerHTML = '';
      break;
    }
    case 'exit':
      closeTerminal();
      break;
    default:
      print(`command not found: ${cmd} — try \`help\``, 'term-err');
  }
}

function closeTerminal() {
  (document.getElementById('terminal') as HTMLDialogElement | null)?.close();
}

export function openTerminal() {
  const dialog = document.getElementById('terminal') as HTMLDialogElement | null;
  const input = el<HTMLInputElement>('term-in');
  const form = el<HTMLFormElement>('term-form');
  if (!dialog || !input || !form) return;

  if (!dialog.open) dialog.showModal();

  if (!booted) {
    booted = true;
    print('arshiatech.me — v2.0.0');
    print('type `help` to get started.');
    print('');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input.value;
      print(`visitor@arshiatech:~$ ${value}`, 'term-echo');
      if (value.trim()) {
        history.push(value);
        historyIdx = history.length;
      }
      input.value = '';
      run(value);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIdx > 0) input.value = history[--historyIdx] ?? '';
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx < history.length - 1) {
          input.value = history[++historyIdx] ?? '';
        } else {
          historyIdx = history.length;
          input.value = '';
        }
      }
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) closeTerminal();
    });

    document.addEventListener('click', (e) => {
      if ((e.target as Element).closest?.('.term-close')) closeTerminal();
    });
  }

  input.focus();
}

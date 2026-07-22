import { initThemeToggle } from './theme';
import { initCursor } from './cursor';
import { initPalette } from './palette';

initThemeToggle();
initCursor();
initPalette();

function isEditable(t: EventTarget | null): boolean {
  if (!(t instanceof HTMLElement)) return false;
  return t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName);
}

// Terminal is a lazy chunk — nothing loads until someone actually asks for it.
async function openTerminal() {
  const mod = await import('./terminal');
  mod.openTerminal();
}

window.addEventListener('ap:open-terminal', () => void openTerminal());

document.addEventListener('keydown', (e) => {
  if (e.key === '>' && !isEditable(e.target) && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    void openTerminal();
  }
});

document.addEventListener('click', (e) => {
  if ((e.target as Element | null)?.closest?.('.terminal-btn')) void openTerminal();
});

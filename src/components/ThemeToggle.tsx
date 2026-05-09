import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export function getInitialTheme(prefersDark: () => boolean): Theme {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
  if (stored === 'light' || stored === 'dark') return stored;
  return prefersDark() ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    getInitialTheme(
      () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches,
    ),
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={theme === 'dark'}
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      className="rounded-md border border-current/10 bg-(--color-bg-elevated) px-3 py-1 text-sm font-semibold text-(--color-text) transition-colors hover:bg-(--color-divider) focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}

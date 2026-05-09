import { beforeEach, describe, expect, it } from 'vitest';
import { getInitialTheme } from './ThemeToggle';

describe('getInitialTheme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the stored theme when localStorage has a value', () => {
    localStorage.setItem('theme', 'dark');
    expect(getInitialTheme(() => false)).toBe('dark');

    localStorage.setItem('theme', 'light');
    expect(getInitialTheme(() => true)).toBe('light');
  });

  it('falls back to dark when no localStorage and prefers-color-scheme is dark', () => {
    expect(getInitialTheme(() => true)).toBe('dark');
  });

  it('falls back to light when no localStorage and prefers-color-scheme is light', () => {
    expect(getInitialTheme(() => false)).toBe('light');
  });

  it('ignores invalid values in localStorage', () => {
    localStorage.setItem('theme', 'rainbow');
    expect(getInitialTheme(() => true)).toBe('dark');
    expect(getInitialTheme(() => false)).toBe('light');
  });
});

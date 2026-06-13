// The selectable site themes. Add more here and they appear in the admin picker.
export type ThemeId = 'sky' | 'mint' | 'lavender';

export type ThemeInfo = {
  id: ThemeId;
  name: string;
  tagline: string;
  swatch: string; // representative color for the picker
};

export const THEMES: ThemeInfo[] = [
  { id: 'sky', name: 'Sky Blue', tagline: 'Clean • Trustworthy • Professional', swatch: '#2563eb' },
  { id: 'mint', name: 'Mint Green', tagline: 'Fresh • Friendly • Approachable', swatch: '#0d9488' },
  { id: 'lavender', name: 'Lavender', tagline: 'Light • Uplifting • Inspiring', swatch: '#7c3aed' },
];

export const DEFAULT_THEME: ThemeId = 'sky';

export function isValidTheme(value: string | undefined | null): value is ThemeId {
  return !!value && THEMES.some((t) => t.id === value);
}

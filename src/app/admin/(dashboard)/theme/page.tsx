import { getActiveTheme } from '@/lib/data';
import { THEMES } from '@/lib/themes';
import { setThemeAction } from '../../actions';

export const dynamic = 'force-dynamic';

// A few extra accent dots per theme so the picker previews the palette.
const PREVIEW: Record<string, string[]> = {
  sky: ['#2563eb', '#38bdf8', '#e4eeff'],
  mint: ['#0d9488', '#2dd4bf', '#d8f5ec'],
  lavender: ['#7c3aed', '#a78bfa', '#ece2fe'],
};

export default async function ThemeAdminPage() {
  const active = await getActiveTheme();

  return (
    <>
      <div className="admin-topbar"><h1>Site Theme</h1></div>
      <div className="admin-content">
        <div className="notice">
          🎨 Choose a color theme for the whole website. The change applies instantly for every
          visitor — great for refreshing the look periodically (seasons, events, etc.).
        </div>

        <div className="theme-grid">
          {THEMES.map((t) => {
            const selected = t.id === active;
            return (
              <form key={t.id} action={setThemeAction}>
                <input type="hidden" name="theme" value={t.id} />
                <button type="submit" className={`theme-option ${selected ? 'selected' : ''}`}>
                  <div className="theme-swatches">
                    {(PREVIEW[t.id] ?? [t.swatch]).map((c, i) => <span key={i} style={{ background: c }} />)}
                  </div>
                  <h3>{t.name}</h3>
                  <p>{t.tagline}</p>
                  <div className="theme-current">{selected ? '● Currently active' : 'Click to apply'}</div>
                </button>
              </form>
            );
          })}
        </div>
      </div>
    </>
  );
}

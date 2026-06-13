import 'server-only';
import { db } from '@/db';
import { careers, categories, about, settings, interviews } from '@/db/schema';
import { and, asc, desc, eq, ilike, or, sql } from 'drizzle-orm';
import { DEFAULT_THEME, isValidTheme, type ThemeId } from '@/lib/themes';
import type { Career, Category, Member } from '@/db/schema';

// ---------- Categories ----------
export async function getCategories(): Promise<Category[]> {
  return db.select().from(categories).orderBy(asc(categories.sort), asc(categories.name));
}

export async function getCategory(id: string): Promise<Category | undefined> {
  const rows = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return rows[0];
}

export async function getCategoriesWithCounts() {
  const cats = await getCategories();
  const counts = await db
    .select({ categoryId: careers.categoryId, count: sql<number>`count(*)::int` })
    .from(careers)
    .groupBy(careers.categoryId);
  const map = new Map(counts.map((c) => [c.categoryId, c.count]));
  return cats.map((c) => ({ ...c, count: map.get(c.id) ?? 0 }));
}

// ---------- Careers ----------
export async function getCareers(): Promise<Career[]> {
  return db.select().from(careers).orderBy(desc(careers.createdAt));
}

export async function getFeaturedCareers(): Promise<Career[]> {
  return db.select().from(careers).where(eq(careers.featured, true)).orderBy(desc(careers.createdAt));
}

export async function getCareer(id: string): Promise<Career | undefined> {
  const rows = await db.select().from(careers).where(eq(careers.id, id)).limit(1);
  return rows[0];
}

export async function getCareersByCategory(categoryId: string): Promise<Career[]> {
  return db.select().from(careers).where(eq(careers.categoryId, categoryId)).orderBy(desc(careers.createdAt));
}

export async function searchCareers(q?: string, categoryId?: string): Promise<Career[]> {
  const conditions = [];
  if (q && q.trim()) {
    const term = `%${q.trim()}%`;
    conditions.push(
      or(
        ilike(careers.title, term),
        ilike(careers.shortDescription, term),
        ilike(careers.whatTheyDo, term),
      ),
    );
  }
  if (categoryId) conditions.push(eq(careers.categoryId, categoryId));

  const where = conditions.length ? and(...conditions) : undefined;
  return db.select().from(careers).where(where).orderBy(desc(careers.createdAt));
}

export async function getCareerSlugs(): Promise<string[]> {
  const rows = await db.select({ id: careers.id }).from(careers);
  return rows.map((r) => r.id);
}

// ---------- About ----------
export async function getAbout() {
  const rows = await db.select().from(about).where(eq(about.id, 1)).limit(1);
  return (
    rows[0] ?? {
      id: 1,
      heading: 'About Us',
      intro: '',
      mission: '',
      members: [] as Member[],
    }
  );
}

// ---------- Interviews ----------
export async function getInterviews() {
  return db.select().from(interviews).orderBy(asc(interviews.sort), desc(interviews.createdAt));
}

export async function getInterview(id: number) {
  const rows = await db.select().from(interviews).where(eq(interviews.id, id)).limit(1);
  return rows[0];
}

// ---------- Settings / Theme ----------
export async function getActiveTheme(): Promise<ThemeId> {
  const rows = await db.select().from(settings).where(eq(settings.key, 'theme')).limit(1);
  const value = rows[0]?.value;
  return isValidTheme(value) ? value : DEFAULT_THEME;
}

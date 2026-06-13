'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { careers, categories, about, settings, interviews } from '@/db/schema';
import type { Member } from '@/db/schema';
import { checkPassword, createSession, destroySession } from '@/lib/auth';
import { slugify } from '@/lib/slug';
import { isValidTheme } from '@/lib/themes';

function str(fd: FormData, key: string): string {
  return (fd.get(key) ?? '').toString().trim();
}

function revalidateSite() {
  revalidatePath('/', 'layout');
}

// ---------- Auth ----------
export async function loginAction(formData: FormData) {
  const password = str(formData, 'password');
  if (checkPassword(password)) {
    await createSession();
    redirect('/admin');
  }
  redirect('/admin/login?error=1');
}

export async function logoutAction() {
  await destroySession();
  redirect('/admin/login');
}

// ---------- Careers ----------
export async function saveCareerAction(formData: FormData) {
  const existingId = str(formData, 'id');
  const title = str(formData, 'title');
  if (!title) redirect('/admin/careers');

  const skills = str(formData, 'skills')
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const data = {
    title,
    categoryId: str(formData, 'categoryId') || null,
    icon: str(formData, 'icon'),
    featured: formData.get('featured') === 'on',
    shortDescription: str(formData, 'shortDescription'),
    whatTheyDo: str(formData, 'whatTheyDo'),
    workEnvironment: str(formData, 'workEnvironment'),
    howToBecome: str(formData, 'howToBecome'),
    skills,
    salary: str(formData, 'salary'),
    jobOutlook: str(formData, 'jobOutlook') || 'medium',
    education: str(formData, 'education'),
    dayInLife: str(formData, 'dayInLife'),
  };

  if (existingId) {
    await db.update(careers).set(data).where(eq(careers.id, existingId));
  } else {
    let id = slugify(title) || `career-${Date.now()}`;
    const clash = await db.select({ id: careers.id }).from(careers).where(eq(careers.id, id)).limit(1);
    if (clash.length) id = `${id}-${Date.now().toString(36)}`;
    await db.insert(careers).values({ id, ...data });
  }

  revalidateSite();
  redirect('/admin/careers');
}

export async function deleteCareerAction(formData: FormData) {
  const id = str(formData, 'id');
  if (id) await db.delete(careers).where(eq(careers.id, id));
  revalidateSite();
  redirect('/admin/careers');
}

export async function toggleFeaturedAction(formData: FormData) {
  const id = str(formData, 'id');
  if (id) {
    const rows = await db.select({ featured: careers.featured }).from(careers).where(eq(careers.id, id)).limit(1);
    if (rows[0]) await db.update(careers).set({ featured: !rows[0].featured }).where(eq(careers.id, id));
  }
  revalidateSite();
  redirect('/admin/careers');
}

// ---------- Categories ----------
export async function saveCategoryAction(formData: FormData) {
  const existingId = str(formData, 'id');
  const name = str(formData, 'name');
  if (!name) redirect('/admin/categories');

  const data = {
    name,
    icon: str(formData, 'icon'),
    description: str(formData, 'description'),
  };

  if (existingId) {
    await db.update(categories).set(data).where(eq(categories.id, existingId));
  } else {
    let id = slugify(name) || `category-${Date.now()}`;
    const clash = await db.select({ id: categories.id }).from(categories).where(eq(categories.id, id)).limit(1);
    if (clash.length) id = `${id}-${Date.now().toString(36)}`;
    await db.insert(categories).values({ id, ...data, sort: 99 });
  }

  revalidateSite();
  redirect('/admin/categories');
}

export async function deleteCategoryAction(formData: FormData) {
  const id = str(formData, 'id');
  if (id) {
    // Careers in this category become uncategorized
    await db.update(careers).set({ categoryId: null }).where(eq(careers.categoryId, id));
    await db.delete(categories).where(eq(categories.id, id));
  }
  revalidateSite();
  redirect('/admin/categories');
}

// ---------- About ----------
export async function saveAboutAction(formData: FormData) {
  const members: Member[] = [0, 1, 2].map((i) => ({
    name: str(formData, `m${i}_name`),
    role: str(formData, `m${i}_role`),
    emoji: str(formData, `m${i}_emoji`),
    bio: str(formData, `m${i}_bio`),
  }));

  const data = {
    heading: str(formData, 'heading') || 'About Us',
    intro: str(formData, 'intro'),
    mission: str(formData, 'mission'),
    members,
  };

  await db
    .insert(about)
    .values({ id: 1, ...data })
    .onConflictDoUpdate({ target: about.id, set: data });

  revalidateSite();
  redirect('/admin/about');
}

// ---------- Interviews ----------
export async function saveInterviewAction(formData: FormData) {
  const existingId = str(formData, 'id');
  const title = str(formData, 'title');
  const youtubeUrl = str(formData, 'youtubeUrl');
  if (!title) redirect('/admin/interviews');

  if (existingId) {
    await db.update(interviews).set({ title, youtubeUrl }).where(eq(interviews.id, Number(existingId)));
  } else {
    await db.insert(interviews).values({ title, youtubeUrl, sort: 0 });
  }

  revalidateSite();
  redirect('/admin/interviews');
}

export async function deleteInterviewAction(formData: FormData) {
  const id = str(formData, 'id');
  if (id) await db.delete(interviews).where(eq(interviews.id, Number(id)));
  revalidateSite();
  redirect('/admin/interviews');
}

// ---------- Theme ----------
export async function setThemeAction(formData: FormData) {
  const theme = str(formData, 'theme');
  if (isValidTheme(theme)) {
    await db
      .insert(settings)
      .values({ key: 'theme', value: theme })
      .onConflictDoUpdate({ target: settings.key, set: { value: theme } });
    revalidateSite();
  }
  redirect('/admin/theme');
}

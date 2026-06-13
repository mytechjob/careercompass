import type { MetadataRoute } from 'next';
import { getCareerSlugs, getCategories } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const [careerSlugs, cats] = await Promise.all([getCareerSlugs(), getCategories()]);

  const staticRoutes = ['', '/browse', '/categories', '/interviews', '/about'].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));

  const careerRoutes = careerSlugs.map((slug) => ({ url: `${base}/career/${slug}`, lastModified: new Date() }));
  const categoryRoutes = cats.map((c) => ({ url: `${base}/category/${c.id}`, lastModified: new Date() }));

  return [...staticRoutes, ...categoryRoutes, ...careerRoutes];
}

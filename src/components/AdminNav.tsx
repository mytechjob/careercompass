'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/careers', label: 'Careers', icon: '💼' },
  { href: '/admin/categories', label: 'Categories', icon: '📁' },
  { href: '/admin/interviews', label: 'Interviews', icon: '🎤' },
  { href: '/admin/about', label: 'About Page', icon: '🎀' },
  { href: '/admin/theme', label: 'Theme', icon: '🎨' },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav">
      {items.map((it) => {
        const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link key={it.href} href={it.href} className={active ? 'active' : undefined}>
            {it.icon} <span>{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

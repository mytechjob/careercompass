import Link from 'next/link';
import NavLink from './NavLink';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/" className="brand">
          <span className="logo">🧭</span>
          Career Compass
        </Link>
        <nav className="nav-links">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/browse">Browse Careers</NavLink>
          <NavLink href="/categories">Categories</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <Link href="/admin" className="btn btn-ghost btn-sm">Admin</Link>
        </nav>
      </div>
    </header>
  );
}

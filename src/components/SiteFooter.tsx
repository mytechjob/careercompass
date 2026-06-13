import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="f-top">
          <Link href="/" className="brand"><span className="logo">🧭</span> Career Compass</Link>
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/browse">Browse</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/about">About Us</Link>
          </nav>
        </div>
        <div className="f-bottom">
          🎀 A Girl Scout Silver Award project — helping students explore careers and the steps to reach them.
        </div>
      </div>
    </footer>
  );
}

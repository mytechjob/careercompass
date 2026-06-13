import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section">
          <div className="container">
            <div className="empty">
              <div className="e-icon">🧭</div>
              <h2>Page not found</h2>
              <p>We couldn’t find what you were looking for.</p>
              <Link href="/" className="btn btn-primary" style={{ marginTop: 10 }}>Go home</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

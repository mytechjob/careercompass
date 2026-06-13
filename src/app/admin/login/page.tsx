import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { isAuthenticated } from '@/lib/auth';
import { loginAction } from '../actions';

export const metadata: Metadata = { title: 'Admin Login', robots: { index: false } };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) redirect('/admin');
  const { error } = await searchParams;

  return (
    <div className="login-wrap">
      <form className="login-card" action={loginAction}>
        <div className="logo">🧭</div>
        <h1>Career Compass CMS</h1>
        <p>Sign in to manage careers and categories.</p>
        <div className="form-group" style={{ textAlign: 'left', marginBottom: 14 }}>
          <label htmlFor="password">Password</label>
          <input className="form-control" id="password" name="password" type="password" placeholder="Enter admin password" autoComplete="current-password" required />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
        {error && <div className="login-error">Incorrect password. Please try again.</div>}
      </form>
    </div>
  );
}

# 🧭 Career Compass

A website that helps students explore careers — what people do, where they work, the
skills they need, and the steps to get there. Built as a **Girl Scout Silver Award project**.

This is the **full web application**: a server-rendered, search-engine-friendly
**Next.js 15** site backed by a **Neon PostgreSQL** database, with a password-protected
content management system (CMS) for adding careers, organizing categories, editing the
About page, and switching the site's color theme.

> The original clickable design prototype is preserved in the [`prototype/`](prototype/) folder.

---

## ✨ Features

**Public website** (server-rendered for SEO — fast, shareable, Google-friendly)
- **Home** with hero, search, and **featured careers** you choose
- **Browse** with search + category filters
- **Categories** that group related careers (e.g. Healthcare = doctors + nurses)
- **Career pages** with: what they do · work environment · how to become one ·
  skills needed · salary & job outlook · education & training · a day in the life
- **About Us** page featuring the three Girl Scouts
- Auto-generated `sitemap.xml`, `robots.txt`, page titles, and structured data (JSON-LD)

**Admin CMS** (`/admin`, password-protected)
- 🔒 Secure password login (cookie-based session)
- Dashboard with stats and quick actions
- Add / edit / delete **careers**, with a one-click ⭐ to feature on the home page
- Add / edit / delete **categories**
- Edit the **About** page and team members
- 🎨 **Theme switcher** — pick **Sky Blue**, **Mint Green**, or **Lavender**; the change
  applies to the whole site instantly for every visitor

---

## 🧰 Tech stack

- **Next.js 15** (App Router, React 19, TypeScript) — server-side rendering for SEO
- **Neon PostgreSQL** — serverless Postgres database
- **Drizzle ORM** — type-safe database access + migrations
- Deploys to **Vercel** with zero config

---

## ▶️ Run it locally

1. **Install dependencies** (already done once):
   ```bash
   npm install
   ```
2. **Set up your `.env`** — copy `.env.example` to `.env` and fill in the values.
   (Your `.env` is already created with the database connection.)
3. **Create the database tables** (already done once):
   ```bash
   npm run db:migrate
   ```
4. **Add the starter careers & categories** (already done once):
   ```bash
   npm run db:seed
   ```
5. **Start the site:**
   ```bash
   npm run dev
   ```
   Open <http://localhost:3000> — the admin CMS is at <http://localhost:3000/admin>.

**Admin password:** set by `ADMIN_PASSWORD` in `.env` (currently `scouts2026`).

---

## 🔐 Important: rotate your database password

The database password was shared in chat, so **please change it**:
1. Go to your [Neon dashboard](https://console.neon.tech) → your project → **Roles** → reset the password.
2. Copy the new connection string into `DATABASE_URL` in `.env` (and into Vercel's
   environment variables — see below).

Also change `ADMIN_PASSWORD` and `SESSION_SECRET` in `.env` to your own values.

---

## 🚀 Deploy to Vercel (so it's live on the internet)

1. Push this project to a **GitHub** repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. In Vercel → **Settings → Environment Variables**, add:
   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | your Neon connection string |
   | `ADMIN_PASSWORD` | your chosen admin password |
   | `SESSION_SECRET` | a long random string |
   | `NEXT_PUBLIC_SITE_URL` | your live URL, e.g. `https://career-compass.vercel.app` |
4. Click **Deploy**. Vercel builds and hosts it automatically.
5. After the first deploy, your database tables already exist (you ran `db:migrate`),
   so the live site uses the same data right away.

Every time you push to GitHub, Vercel redeploys automatically.

---

## 📁 Project structure

```
career-compass/
├── src/
│   ├── app/
│   │   ├── (public)/        # Public pages: home, browse, categories, career, about
│   │   ├── admin/           # CMS: login + protected dashboard (careers, categories, about, theme)
│   │   ├── layout.tsx       # Root layout — applies the active theme site-wide
│   │   ├── globals.css      # All styles + the 3 theme palettes
│   │   ├── sitemap.ts       # SEO sitemap
│   │   └── robots.ts        # SEO robots rules
│   ├── components/          # Reusable UI (cards, nav, forms, search)
│   ├── db/                  # Drizzle schema, connection, migrate + seed scripts
│   └── lib/                 # Data queries, auth, themes, helpers
├── drizzle/                 # Generated SQL migrations
├── prototype/               # The original static design prototype
└── .env                     # Secrets (NOT committed to git)
```

## 🛠️ Useful commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the site in development mode |
| `npm run build` | Build for production |
| `npm run db:generate` | Regenerate SQL after changing the schema |
| `npm run db:migrate` | Apply migrations to the database |
| `npm run db:seed` | Load the starter careers & categories |

---

## 🎨 Adding or changing themes

Themes live in two places:
- Palettes (colors): `src/app/globals.css` under `[data-theme='...']`
- The picker list: `src/lib/themes.ts`

Add a new entry in both and it appears in the admin theme picker automatically.

---

🎀 *Made for a Girl Scout Silver Award — helping students discover their future.*

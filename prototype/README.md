# 🧭 Career Compass

A website that helps students explore careers — what people do, where they work, the
skills they need, and the exact steps to get there. Built as a **Girl Scout Silver Award project**.

This is the **design prototype**: a fully clickable website plus a working content
management system (CMS). It runs entirely in the browser and saves your data in the
browser's local storage, so you can add and edit careers and see the whole site flow
before we build the real backend.

---

## ✨ What's included

**Public website (`index.html`)**
- **Home page** with a hero, search, and **featured careers** you choose
- **Browse careers** with live search and category filters
- **Categories** (e.g. Healthcare, Technology) that group related careers
- **Career detail pages** showing: what they do · work environment · how to become one ·
  skills needed · salary & job outlook · education & training · a day in the life

**Content Management System (`admin.html`)**
- 🔒 **Simple password login** (prototype password: `scouts2026`)
- **Dashboard** with quick stats and quick actions
- **Add / edit / delete careers** with a friendly form
- **Manage categories** (add, edit, delete)
- ⭐ **One-click "feature"** toggle to choose which careers appear on the home page

---

## ▶️ How to run it

No installation needed. Either:

1. **Double-click `index.html`** to open it in your web browser, **or**
2. Run a tiny local server (recommended so everything behaves like a real site):
   ```bash
   # from the career-compass folder
   python -m http.server 8000
   ```
   Then open <http://localhost:8000> in your browser.

- Public site: **`index.html`**
- Admin CMS: **`admin.html`** (or click **Admin** in the top-right of the site)

---

## 🔑 Admin password

The prototype password is **`scouts2026`** (set near the top of `js/admin.js`).
When we build the real backend, this becomes a secure, proper login.

---

## 💾 About the data

Right now all careers and categories are stored in your browser's **local storage**.
That means:
- Your changes are saved on **your computer / browser** only.
- The site comes pre-loaded with 8 example careers and 8 categories.
- To start fresh, open the browser console and run: `Store.resetData()`

When we move to the full web application, this same data will live in a real database
so it's shared with everyone who visits the site.

---

## 🗂️ Project structure

```
career-compass/
├── index.html        # Public website
├── admin.html        # Content management system (CMS)
├── css/
│   └── styles.css    # All styling (clean & professional navy theme)
└── js/
    ├── store.js      # Data layer + sample careers (becomes the API later)
    ├── public.js     # Public site logic & pages
    └── admin.js      # CMS logic
```

---

## 🚀 Next step: the full web application

Once you're happy with this design, the plan to turn it into a complete web app is:

1. **Database** — store careers & categories in a real database (e.g. PostgreSQL on your
   existing Replit, or a service like Neon/Supabase) so data is shared and permanent.
2. **Backend API** — replace the functions in `js/store.js` with calls to a small server
   (Node.js/Express or Replit) that reads and writes the database.
3. **Secure admin login** — swap the prototype password for proper, secure accounts.
4. **Deploy** — publish it to your Replit URL so anyone at school can visit.

The front-end design you see here carries straight over — only the data layer changes.

---

🎀 *Made for a Girl Scout Silver Award — helping students discover their future.*

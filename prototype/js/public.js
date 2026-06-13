/* ============================================================
   Career Compass — Public Site
   Hash-based router rendering Home, Browse, Categories, Detail.
   ============================================================ */

const app = document.getElementById('app');

// ---------- small helpers ----------
const esc = (s = '') => String(s).replace(/[&<>"']/g, m =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

function outlookLabel(o) {
  return { high: 'In high demand', medium: 'Steady demand', low: 'Limited demand' }[o] || 'Steady demand';
}
function outlookClass(o) {
  return { high: 'outlook-high', medium: 'outlook-med', low: 'outlook-low' }[o] || 'outlook-med';
}
function catName(id) {
  const c = Store.getCategory(id);
  return c ? c.name : 'General';
}

// ---------- reusable components ----------
function careerCard(c) {
  return `
    <a class="career-card" href="#/career/${esc(c.id)}">
      <div class="cc-banner">
        ${c.icon || '💼'}
        ${c.featured ? '<span class="badge-featured">★ Featured</span>' : ''}
      </div>
      <div class="cc-body">
        <div class="cc-cat">${esc(catName(c.category))}</div>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.shortDescription)}</p>
        <div class="cc-meta">
          <span><span class="label">💰</span> ${esc(c.salary || '—')}</span>
        </div>
      </div>
    </a>`;
}

function categoryCard(cat) {
  const count = Store.countByCategory(cat.id);
  return `
    <a class="cat-card" href="#/category/${esc(cat.id)}">
      <div class="cat-icon">${cat.icon || '📁'}</div>
      <h3>${esc(cat.name)}</h3>
      <p>${esc(cat.description || '')}</p>
      <div class="cat-count">${count} career${count === 1 ? '' : 's'} →</div>
    </a>`;
}

// ---------- pages ----------
function renderHome() {
  const featured = Store.getFeatured();
  const cats = Store.getCategories();
  const total = Store.getCareers().length;

  app.innerHTML = `
    <section class="hero">
      <div class="container hero-inner">
        <span class="eyebrow">🎀 Girl Scout Silver Award Project</span>
        <h1>Find the career that fits your future.</h1>
        <p>Explore real careers, learn what people actually do all day, and discover the
           exact steps — school, skills, and training — to get there.</p>
        <div class="hero-actions">
          <a href="#/browse" class="btn btn-primary">Browse all careers</a>
          <a href="#/categories" class="btn btn-light">Explore by category</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="searchbar" style="margin: -90px auto 0; position: relative; z-index: 2;">
          <span class="icon">🔍</span>
          <input id="homeSearch" type="text" placeholder="Search careers — try “nurse”, “design”, “code”..." />
        </div>
      </div>
    </section>

    <section class="section" style="padding-top: 8px;">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Featured Careers</h2>
            <p>Hand-picked careers to get you started exploring.</p>
          </div>
          <a href="#/browse" class="btn btn-ghost btn-sm">View all ${total} →</a>
        </div>
        <div class="card-grid">
          ${featured.length ? featured.map(careerCard).join('') :
            '<div class="empty"><div class="e-icon">⭐</div>No featured careers yet. Add some in the Admin area!</div>'}
        </div>
      </div>
    </section>

    <section class="section" style="background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Browse by Category</h2>
            <p>Careers grouped by field, so you can explore what interests you.</p>
          </div>
        </div>
        <div class="cat-grid">
          ${cats.map(categoryCard).join('')}
        </div>
      </div>
    </section>`;

  const s = document.getElementById('homeSearch');
  s.addEventListener('keydown', e => {
    if (e.key === 'Enter' && s.value.trim()) location.hash = '#/browse?q=' + encodeURIComponent(s.value.trim());
  });
}

function renderBrowse(query) {
  const params = new URLSearchParams(query || '');
  const q = params.get('q') || '';
  const activeCat = params.get('cat') || '';
  const cats = Store.getCategories();

  let results = q ? Store.search(q) : Store.getCareers();
  if (activeCat) results = results.filter(c => c.category === activeCat);

  app.innerHTML = `
    <section class="detail-hero" style="padding: 36px 0;">
      <div class="container">
        <h1 style="font-size:1.9rem;">Browse Careers</h1>
        <p class="d-lead">Search and filter to find a career you want to learn more about.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="searchbar" style="margin-bottom: 22px;">
          <span class="icon">🔍</span>
          <input id="browseSearch" type="text" placeholder="Search careers..." value="${esc(q)}" />
        </div>

        <div class="chips" style="margin-bottom: 28px;">
          <a class="chip ${!activeCat ? 'active' : ''}" href="#/browse${q ? '?q=' + encodeURIComponent(q) : ''}">All</a>
          ${cats.map(c => `
            <a class="chip ${activeCat === c.id ? 'active' : ''}"
               href="#/browse?${q ? 'q=' + encodeURIComponent(q) + '&' : ''}cat=${c.id}">
               ${c.icon} ${esc(c.name)} <span class="count">${Store.countByCategory(c.id)}</span>
            </a>`).join('')}
        </div>

        <div class="card-grid">
          ${results.length ? results.map(careerCard).join('') :
            '<div class="empty"><div class="e-icon">🔍</div>No careers match your search. Try a different word.</div>'}
        </div>
      </div>
    </section>`;

  const s = document.getElementById('browseSearch');
  s.addEventListener('input', () => {
    const val = s.value.trim();
    const base = '#/browse?' + (val ? 'q=' + encodeURIComponent(val) : '') + (activeCat ? (val ? '&' : '') + 'cat=' + activeCat : '');
    history.replaceState(null, '', base);
    // live re-filter without full re-render of input focus
    let r = val ? Store.search(val) : Store.getCareers();
    if (activeCat) r = r.filter(c => c.category === activeCat);
    document.querySelector('.card-grid').innerHTML = r.length
      ? r.map(careerCard).join('')
      : '<div class="empty"><div class="e-icon">🔍</div>No careers match your search. Try a different word.</div>';
  });
}

function renderCategories() {
  const cats = Store.getCategories();
  app.innerHTML = `
    <section class="detail-hero" style="padding: 36px 0;">
      <div class="container">
        <h1 style="font-size:1.9rem;">Career Categories</h1>
        <p class="d-lead">Pick a field to see all the careers inside it.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="cat-grid">${cats.map(categoryCard).join('')}</div>
      </div>
    </section>`;
}

function renderCategory(id) {
  const cat = Store.getCategory(id);
  if (!cat) return renderNotFound();
  const careers = Store.getByCategory(id);
  app.innerHTML = `
    <section class="detail-hero" style="padding: 36px 0;">
      <div class="container">
        <div class="breadcrumb"><a href="#/categories">Categories</a> › ${esc(cat.name)}</div>
        <div class="d-top">
          <div class="d-icon">${cat.icon || '📁'}</div>
          <div>
            <h1 style="font-size:1.9rem;">${esc(cat.name)}</h1>
            <p class="d-lead">${esc(cat.description || '')}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="card-grid">
          ${careers.length ? careers.map(careerCard).join('') :
            '<div class="empty"><div class="e-icon">📭</div>No careers in this category yet.</div>'}
        </div>
      </div>
    </section>`;
}

function renderCareer(id) {
  const c = Store.getCareer(id);
  if (!c) return renderNotFound();
  const cat = Store.getCategory(c.category);

  const block = (icon, title, body) => body ? `
    <div class="block">
      <h2><span class="b-icon">${icon}</span>${title}</h2>
      ${body}
    </div>` : '';

  const skillsList = (c.skills && c.skills.length)
    ? `<ul>${c.skills.map(s => `<li>${esc(s)}</li>`).join('')}</ul>` : '';

  app.innerHTML = `
    <section class="detail-hero">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/browse">Careers</a> ›
          ${cat ? `<a href="#/category/${cat.id}">${esc(cat.name)}</a> › ` : ''}${esc(c.title)}
        </div>
        <div class="d-top">
          <div class="d-icon">${c.icon || '💼'}</div>
          <div>
            ${cat ? `<div class="d-cat">${esc(cat.name)}</div>` : ''}
            <h1>${esc(c.title)}</h1>
            <p class="d-lead">${esc(c.shortDescription)}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="container">
      <div class="detail-layout">
        <div class="detail-main">
          ${block('💡', 'What they do', `<p>${esc(c.whatTheyDo)}</p>`)}
          ${block('🏢', 'Work environment', `<p>${esc(c.workEnvironment)}</p>`)}
          ${block('🎓', 'How to become one', `<p>${esc(c.howToBecome)}</p>`)}
          ${block('🌟', 'Skills you’ll need', skillsList)}
          ${block('☀️', 'A day in the life', `<p>${esc(c.dayInLife)}</p>`)}
        </div>

        <aside class="detail-side">
          <h3>Quick Facts</h3>
          <div class="fact">
            <div class="fact-label">💰 Typical Salary</div>
            <div class="fact-value">${esc(c.salary || '—')}</div>
          </div>
          <div class="fact">
            <div class="fact-label">📈 Job Outlook</div>
            <div class="fact-value"><span class="outlook-pill ${outlookClass(c.jobOutlook)}">${outlookLabel(c.jobOutlook)}</span></div>
          </div>
          <div class="fact">
            <div class="fact-label">🎓 Education & Training</div>
            <div class="fact-value">${esc(c.education || '—')}</div>
          </div>
          <div class="fact">
            <div class="fact-label">📁 Category</div>
            <div class="fact-value">${esc(cat ? cat.name : 'General')}</div>
          </div>
          <a href="#/browse" class="btn btn-ghost btn-block" style="margin-top:18px;">← Back to all careers</a>
        </aside>
      </div>
    </section>`;
}

function renderAbout() {
  const a = Store.getAbout();
  const members = a.members || [];
  app.innerHTML = `
    <section class="hero" style="padding: 60px 0 68px;">
      <div class="container hero-inner">
        <span class="eyebrow">🎀 Girl Scout Silver Award Project</span>
        <h1>${esc(a.heading || 'About Us')}</h1>
        <p>${esc(a.intro || '')}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Our Mission</h2>
          </div>
        </div>
        <div class="form-card" style="max-width:820px; box-shadow:var(--shadow);">
          <p style="margin:0; font-size:1.05rem; color:var(--ink);">${esc(a.mission || '')}</p>
        </div>
      </div>
    </section>

    <section class="section" style="background:#fff; border-top:1px solid var(--line); border-bottom:1px solid var(--line);">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Meet the Team</h2>
            <p>The Girl Scouts behind Career Compass.</p>
          </div>
        </div>
        <div class="cat-grid">
          ${members.map(m => `
            <div class="cat-card" style="cursor:default; text-align:center;">
              <div class="cat-icon" style="margin:0 auto 14px; width:64px; height:64px; font-size:2rem; border-radius:50%;">${m.emoji || '🙂'}</div>
              <h3 style="text-align:center;">${esc(m.name || '')}</h3>
              <div class="cat-count" style="margin-bottom:10px;">${esc(m.role || '')}</div>
              <p style="text-align:center;">${esc(m.bio || '')}</p>
            </div>`).join('')}
        </div>
      </div>
    </section>`;
}

function renderNotFound() {
  app.innerHTML = `
    <section class="section">
      <div class="container">
        <div class="empty">
          <div class="e-icon">🧭</div>
          <h2>Page not found</h2>
          <p>We couldn’t find what you were looking for.</p>
          <a href="#/" class="btn btn-primary" style="margin-top:10px;">Go home</a>
        </div>
      </div>
    </section>`;
}

// ---------- router ----------
function router() {
  const hash = location.hash.slice(1) || '/';
  const [path, query] = hash.split('?');
  const parts = path.split('/').filter(Boolean);

  // highlight nav
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + path);
  });

  window.scrollTo(0, 0);

  if (parts.length === 0) return renderHome();
  switch (parts[0]) {
    case 'browse': return renderBrowse(query);
    case 'categories': return renderCategories();
    case 'category': return renderCategory(parts[1]);
    case 'career': return renderCareer(parts[1]);
    case 'about': return renderAbout();
    default: return renderNotFound();
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
router();
